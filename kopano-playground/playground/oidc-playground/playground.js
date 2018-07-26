'use strict';

function parseParams(s) {
	if (!s) {
		return {};
	}
	let pieces = s.split('&');
	let data = {};
	let parts;
	for (let i=0; i<pieces.length; i++) {
		parts = pieces[i].split('=');
		if (parts.length < 2) {
			parts.push('');
		}
		data[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]);
	}

	return data;
}

function encodeParams(data) {
	let ret = [];
	for (let d in data) {
		ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
	}
	return ret.join('&');
}

function toHexString(byteArray) {
	return byteArray.map(function(byte) {
		/* jshint bitwise: false */
		return ('0' + (byte & 0xFF).toString(16)).slice(-2);
	}).join('');
}

function getRandomString(length) {
	let bytes = new Uint8Array((length || 32) / 2);
	window.crypto.getRandomValues(bytes);
	return toHexString(Array.from(bytes));
}

function makeURLFromPath(path) {
	var a = document.createElement('a');
	a.href = path;
	return a.href;
}

function scrollBottom() {
	window.scrollTo(0,document.body.scrollHeight);
}

window.app = new Vue({
	el: '#app',
	data: {
		discovery: '',
		started: false,
		accessToken: '',
		idToken: '',
		refreshToken: '',
		code: '',
		expiresIn: 0,
		userInfo: null,

		discoveryEndpointURI: '',
		authorizationEndpointURI: '',
		tokenEndpointURI: '',
		userInfoEndpointURI: '',
		endSessionEndpointURI: '',
		clientID: '',
		prompt: '',
		responseType: 'id_token token',
		scope: 'openid profile email',
		maxAge: '',

		error: null
	},
	created: function() {
		console.log('welcome to the playground');
		let queryValues = parseParams(location.search.substr(1));

		this.$data.discovery = queryValues.discovery || false;
		let discoveryEndpointURI = queryValues.discovery_uri;
		if (!discoveryEndpointURI) {
			discoveryEndpointURI = localStorage.getItem('oidc-playground.discoveryEndpointURI');
		} else {
			if (!this.$data.discovery) {
				this.$data.discovery = 'yes';
			}
		}
		if (!discoveryEndpointURI) {
			discoveryEndpointURI = makeURLFromPath('/.well-known/openid-configuration');
		}
		let authorizationEndpointURI = localStorage.getItem('oidc-playground.authorizationEndpointURI');
		if (!authorizationEndpointURI) {
			authorizationEndpointURI = makeURLFromPath('/provider/simple/oidc/v1/authorize');
		}
		let tokenEndpointURI = localStorage.getItem('oidc-playground.tokenEndpointURI');
		if (!tokenEndpointURI) {
			tokenEndpointURI = makeURLFromPath('/provider/oidc/v1/token');
		}
		let userInfoEndpointURI = localStorage.getItem('oidc-playground.userInfoEndpointURI');
		if (!userInfoEndpointURI) {
			userInfoEndpointURI = makeURLFromPath('/provider/oidc/v1/userinfo');
		}
		let endSessionEndpointURI = localStorage.getItem('oidc-playground.endSessionEndpointURI');
		if (!endSessionEndpointURI) {
			endSessionEndpointURI = '';
		}
		let clientID = localStorage.getItem('oidc-playground.clientID');
		if (!clientID) {
			clientID = 'playground.js';
		}
		this.$data.discoveryEndpointURI = discoveryEndpointURI;
		this.$data.authorizationEndpointURI = authorizationEndpointURI;
		this.$data.tokenEndpointURI = tokenEndpointURI;
		this.$data.userInfoEndpointURI = userInfoEndpointURI;
		this.$data.endSessionEndpointURI = endSessionEndpointURI;
		this.$data.clientID = clientID;

		this.$data.started = location.hash.indexOf('#oidc-cb') === 0;
		let hashValues = parseParams(location.hash.substr(9));
		console.log('URL hash values on load', hashValues);
		history.replaceState('', document.title, window.location.pathname + window.location.search);

		this.$data.accessToken = hashValues.access_token;
		this.$data.idToken = hashValues.id_token;
		this.$data.expiresIn = hashValues.expires_in;
		this.$data.code = hashValues.code;

		if (hashValues.error) {
			this.$data.error = {
				error: hashValues.error,
				errorDescription: (hashValues.error_description || '').replace(/\+/g, ' ')
			};
		}

		if (this.$data.started) {
			Vue.nextTick(scrollBottom);
		} else {
			if (this.$data.discovery === 'auto') {
				Vue.nextTick(() => {
					this.startDiscovery();
				});
			}
		}
	},
	filters: {
		prettyJWT: function(value) {
			const parts = value.split('.');
			if (parts.length !== 3) {
				return '';
			}
			const result = ['<span class="jwt-header">',
				parts[0], '</span><span class="jwt-dot">.</span><span class="jwt-payload">',
				parts[1], '</span><span class="jwt-dot">.</span><span class="jwt-signature">',
				parts[2], '</span>'];
			return result.join('');
		}
	},
	watch: {
		authorizationEndpointURI: val => {
			if (val) {
				localStorage.setItem('oidc-playground.authorizationEndpointURI', val);
			} else {
				localStorage.removeItem('oidc-playground.authorizationEndpointURI');
			}
		},
		tokenEndpointURI: val => {
			if (val) {
				localStorage.setItem('oidc-playground.tokenEndpointURI', val);
			} else {
				localStorage.removeItem('oidc-playground.tokenEndpointURI');
			}
		},
		userInfoEndpointURI: val => {
			if (val) {
				localStorage.setItem('oidc-playground.userInfoEndpointURI', val);
			} else {
				localStorage.removeItem('oidc-playground.userInfoEndpointURI');
			}
		},
		endSessionEndpointURI: val => {
			if (val) {
				localStorage.setItem('oidc-playground.endSessionEndpointURI', val);
			} else {
				localStorage.removeItem('oidc-playground.endSessionEndpointURI');
			}
		},
		clientID: val => {
			if (val) {
				localStorage.setItem('oidc-playground.clientID', val);
			} else {
				localStorage.removeItem('oidc-playground.clientID');
			}
		}
	},
	methods: {
		startDiscovery: function() {
			console.log('start discovery clicked');
			this.$data.discovery = 'pending';

			this.$http.get(this.$data.discoveryEndpointURI).then(response => {
				return response.json();
			}, errorResponse => {
				let error = {
					status: errorResponse.status,
					error: errorResponse.statusText
				};

				return error;
			}).then(discoveryResult => {
				if (discoveryResult.error) {;
					this.$data.discovery = 'error';
					this.$data.error = discoveryResult;
					return;
				}

				this.$data.authorizationEndpointURI = discoveryResult.authorization_endpoint;
				this.$data.tokenEndpointURI = discoveryResult.token_endpoint;
				this.$data.userInfoEndpointURI = discoveryResult.userinfo_endpoint;
				this.$data.endSessionEndpointURI = discoveryResult.end_session_endpoint;
				this.$data.discovery = 'done';

				Vue.nextTick(scrollBottom);
			});
		},
		startOIDC: function() {
			console.log('start OIDC clicked');
			let params = {
				'redirect_uri': location.href + '#oidc-cb',
				'response_type': this.$data.responseType,
				'response_mode': 'fragment', // Always use fragment response mode for playground.
				'scope': this.$data.scope,
				'client_id': this.$data.clientID,
				'nonce': getRandomString(32),
				'state': getRandomString(16)
			};
			if (this.$data.prompt) {
				params.prompt = this.$data.prompt;
			}
			if (this.$data.maxAge !== "") {
				params.max_age = this.$data.maxAge; // eslint-disable-line camelcase
			}

			let target = this.$data.authorizationEndpointURI + '?' + encodeParams(params);
			console.log('redirecting to', target);
			location.href = target;
		},
		exchangeCode: function() {
			console.log('exchange code clicked');
			let target = this.$data.tokenEndpointURI;
			let params = {
				'redirect_uri': location.href + '#oidc-cb',
				'grant_type': 'authorization_code',
				'code': this.$data.code,
				'client_id': this.$data.clientID
			};
			this.$http.post(target, encodeParams(params), {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			}).then(response => {
				this.$data.code = '';
				return response.json();
			}, errorResponse => {
				let error = {
					status: errorResponse.status,
					error: errorResponse.statusText
				};

				return error;
			}).then(tokenResult => {
				if (tokenResult.error) {
					this.$data.error = tokenResult;
					return;
				}

				this.$data.accessToken = tokenResult.access_token;
				this.$data.expiresIn = tokenResult.expires_in;
				if (tokenResult.id_token) {
					this.$data.idToken = tokenResult.id_token;
				}
				if (tokenResult.refresh_token) {
					this.$data.refreshToken = tokenResult.refresh_token;
				}

				Vue.nextTick(scrollBottom);
			});
		},
		refresh: function() {
			console.log('refresh clicked');
			let target = this.$data.tokenEndpointURI;
			let params = {
				'grant_type': 'refresh_token',
				'refresh_token': this.$data.refreshToken,
				'client_id': this.$data.clientID
			};
			this.$http.post(target, encodeParams(params), {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			}).then(response => {
				return response.json();
			}, errorResponse => {
				let error = {
					status: errorResponse.status,
					error: errorResponse.statusText
				};

				return error;
			}). then(tokenResult => {
				if (tokenResult.error) {
					this.$data.error = tokenResult;
					return;
				}

				this.$data.accessToken = tokenResult.access_token;
				this.$data.expiresIn = tokenResult.expires_in;
				if (tokenResult.id_token) {
					this.$data.idToken = tokenResult.id_token;
				}
				if (tokenResult.refresh_token) {
					this.$data.refreshToken = tokenResult.refresh_token;
				}
			});
		},
		getOIDCUserInfo: function() {
			console.log('get OIDC userInfo clicked');
			this.$data.userInfo = null;
			let target = this.$data.userInfoEndpointURI;
			this.$http.get(target, {
				headers: {
					'Authorization': 'Bearer ' + this.$data.accessToken
				}
			}).then(response => {
				return response.json();
			}, errorResponse => {
				let error = {
					status: errorResponse.status,
					error: errorResponse.statusText
				};
				let wwwAuthenticate = errorResponse.headers.get('WWW-Authenticate');
				if (wwwAuthenticate) {
					error.errorDescription = wwwAuthenticate;
				}
				if (error.status === 0 && error.error === '')  {
					error.error = 'request_failed';
				}

				return error;
			}).then(userInfo => {
				if (userInfo.error) {
					this.$data.error = userInfo;
					userInfo = null;
				}

				this.$data.userInfo = userInfo;
				Vue.nextTick(scrollBottom);
			});
		},
		reload: function() {
			window.location.replace(window.location.href);
		},
		endsession: function(postLogoutRedirectURI) {
			let params = {
				state: 'endsession-cb-' + getRandomString(6)
			};
			if (this.$data.idToken) {
				params.id_token_hint = this.$data.idToken; // eslint-disable-line camelcase
			}
			if (postLogoutRedirectURI) {
				params.post_logout_redirect_uri = postLogoutRedirectURI + '#oidc-cb'; // eslint-disable-line camelcase
			}
			window.location.replace(this.$data.endSessionEndpointURI + '?' +  encodeParams(params));
		},
		closeErrorModal: function() {
			this.$data.error = null;
		}
	}
});
