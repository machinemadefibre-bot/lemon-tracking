Lemon Tracking Android 0.1.1

This package uses Android Usage Access to read foreground application time for the current day. The app has no INTERNET permission and writes records.json to its private application-data directory.

First run:

1. Install LemonTracking-Android.apk.
2. Open Lemon Tracking.
3. On Android 15 and newer, or when Android shows a restricted-setting message, select Open app info. In App info, open the three-dot menu and select Allow restricted settings.
4. Select Open Usage Access and enable Lemon Tracking in Android Settings.
5. Return to the app and select Refresh today.

Android supplies aggregate usage statistics. The app labels its records automatic and stores application, package, duration and source fields locally.

Build:

Set LEMON_ANDROID_SDK to an Android SDK containing platform android-35 and Build Tools 35.0.1, then run build.ps1. The checked-in build script uses only the Android SDK, JDK javac/jar/keytool and the generated development signing key.

The APK is signed for side-loading. A separate release key is required for Play distribution.
