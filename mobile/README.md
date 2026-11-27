# AyaOne Android app

A Capacitor shell that opens https://app.ayaone.in full screen. Web deploys update
the app automatically; rebuild the APK only for icon/permission/name changes.

    npm install
    npx cap add android      # first time only
    npm run icons            # app icon + splash from assets/
    npm run sync
    npm run open             # opens Android Studio -> Build > Build APK(s)

Signing keys (*.jks) must never be committed. Back them up somewhere safe:
losing the key means you can't update the app on the Play Store.
