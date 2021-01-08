## Univention app for Kopano Meet

### 2.3.1

With this update Kopano Meet is updated to the 2.3 release, which brings the following improvements and new features:

- The left panel is now kept open and shows list of participants in group calls (desktop)
- Participants without video stream are no longer visible in the video grid in group calls
- Talking indicator in call grid, participant list and own video
- A swipeable bottom panel is now available on mobile to access the participant list and invite functionality while in a call
- Updated text indicators for Guest and Me markers
- Join flow is automatically used for all direct links to a meet group
- Meet Ui no longer is unable to start new calls if multiple remote peers hang up at the same time as yourself
- And the usual various improvements to design, usability, translations and functionality
- Also updates Kopano Konnect to version 0.33.11

### 2.2.3-2 (unreleased)

- Updates Kopano Konnect to allow login through the Kopano WebApp Intranet plugin (requires update of OpenID Connect Provider to at least 0.33.7)

### 2.2.3-1

With this update Kopano Meet is compatible with the current in development version of Kwmbridge, a "selective forwarding unit" (SFU for short) for Meet. A SFU is typically used to reduce bandwidth requirements on the sender side through the means of rather sending audio/video to a central point instead to each participant individually. While with todays technology this breaks end to end encryption of calls, Kwmbridge is still a component that an administrator can setup in his own environment.

If you want to help beta testing Kwmbridge and provide feedback on its functionality [please reach out](mailto:feedback@kopano.com?subject=Kwmbridge%20testing) with a description of your use case and environment.

- Fixes an issue with signing out of the latest OpenID Connect Provider app (app needs to be updated to 0.33.5 as well)
- Updates components to the latest versions

### 2.1.0-3

- Fixes a mountpoint in kapi to retain call and group history over updates
- Update Kopano Konnect to 0.33.0
  - This adds the ability for users to sign out of the Univention OpenID Provider when logging out of Kopano Meet

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
