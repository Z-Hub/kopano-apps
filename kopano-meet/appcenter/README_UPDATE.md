## Univention app for Kopano Meet

### 2.1.0-3

- Fixes a mountpoint in kapi to retain call and group history over updates

### 2.1.0-2

- Fixes a bug in the Konnect Container where upon changing the FQDN the old value would persist in the identifier registration.

### 2.1.0-1

With this update the app will auto configure a free TURN server offered by Kopano. This free service is shared between all Meet-instances and there is no guarantee on availability. For your production setup an own TURN service or at least a paid service with guaranteed availability is highly recommended.

- Add free Turn service for all users of the app
- Update Kopano Kwmserver to 1.1.1
- Rework readme files
- Expose configuration options for own turn service to the settings menu

### 2.1.0

- Update Kopano Meet to 2.1.0
  - this release features a new and improved guest login workflow where guests have the possibility to give their name and check microphone/webcam before joining a call
  - guests that have used a previous release will need to reload Meet manually to see the new guest flow
- Update Kopano Konnect to 0.30.0
- Update Kopano Kwmserver to 1.1.0
- (internal change) the bundled Kopano Konnect is now reachable at `/meetid` instead of `/kopanoid`
- Predefine variables in preinst script instead of letting the settings dialogue do this
- Add script `appliance_hook` to configure Meet for a single domain setup (used in UCS App Appliance)

### 1.2.1-2

- Make it possible to run Kopano Meet with a custom domain name
- Make it possible to specify where the OpenID Provider App is running
- Redirects from the wrong domain name/plain http now always go to `/meet`

### 1.2.1

- Update Konnect to 0.28.0 and Meet to 1.2.1

### 1.1.2

- initial release
