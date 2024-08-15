# Nishat Hotel

An application offers luxurious accommodation through its Presidential & Royal Suites, as well as Executive & Standard rooms, through to even bigger Annexes depending on the space required. It offers ornamental Banqueting & Conference Hall facilities, as well as Gym & Pool for its guests, with a Lebanese team offering unique Spa & Salon services.

### Software dependencies

Ensure you have a development environment setup for node and for android.

- [Android Studio](https://developer.android.com/studio 'Android Studio')
- [Node JS](https://nodejs.org/en/ 'Node')

<strong>Note:</strong> The recommended node version for this project is `v19.1.0`
<strong>Note:</strong> Follow the android studio setup recommended by react native. At the time of development the SDK build tools version used was `33.0.1` as indicated in the `build.gradle`.

These are recommendations based on what is known to work when the project was in initial development

<strong>Note:</strong> It is not necessary to install typescript globally as it is installed as a dependency. However given that the project is a mono -repository it is crucial that the version of typescript is consistent throughout. This can be checked in the root directory with:

## Install

Install Yarn

Ensure you have the package manager `yarn` installed recommended by [Meta](https://www.facebook.com/Meta/ 'Meta').

- [Yarn](https://classic.yarnpkg.com/en/docs/install/#mac-stable 'yarn install')

Install Cocoapods

- [CocoaPods](https://guides.cocoapods.org/using/getting-started.html/ 'CocoaPods')

Clone the repository:

`git clone git@github.com:origami-studios-llc/NishatHotelsApp.git`

<strong>Note:</strong> the clone url may be different for different languages

Go to the root directory of the project:

Install the dependencies:

 - type `yarn`

Go to the ios directory of the project:

Install the dependencies:

 - type `pod install`

## Setup

After all dependencies are installed. 
## Start react native

### Run react native for Android

In your root directory
 - type `npm run android` and make sure simulator is installed 

### Run react native for iOS

In your root directory
 - type `npm run ios` and make sure simulator is installed 

If you are running the react native application on a device and you want to make all the services available to it run:

In your root directory
 - type `yarn reverse:all-ports`

Or for just a single service (in this case API) run:

In your root directory
 - type `adb reverse tcp:3000 tcp:3000`


## Deploy the APK

Go to `android/gradle.properties`

 MYAPP_UPLOAD_STORE_FILE=my-upload-key.keystore 
 
 MYAPP_UPLOAD_KEY_ALIAS=crewlogix

 MYAPP_UPLOAD_STORE_PASSWORD=**(NotPublic)**

 MYAPP_UPLOAD_KEY_PASSWORD=**(NotPublic)**


### To make your own keystore

- [Publishing keystore](https://reactnative.dev/docs/signed-apk-android/ 'keystore')

<strong>Note:</strong> Do not forget to add you sdk file directories specific to your development environment:


// example depends on OS and specific environment set up
sdk.dir=/Users/**My_USER_NAME**/Library/Android/sdk
//... remainder of the local.properties

You will also need to ensure a few things:

- The build version has been bumped in `app/build.gradle`
- You have cleaned and synced gradle files. Do it twice just to be sure ;)

Build the apk for release with (remember to sync your gradle files!):

In your root directory
 - type `npm run sync`

## Common commands
How to install packages:

In your root directory
 - `yarn add react-native-reanimated`

In your root directory
How to uninstall packages:
 - `yarn remove react-native-reanimated`

### VSCode
Open the NishatHotel project with VS Code, and install the following extensions:

- Prettier.
- JavaScript (ES6) code snippets
- ES7+ React/Redux/React-Native snippets

### API Collection
 - Postman Collection: [Nishat Hotel API Collection](https://www.getpostman.com/collections/98e768cef073cff3ae74 'Nishat Hotel API')
