# Node.js samples

## Prerequisites

Install local packages:

```
npm install
```

### To run tests using Sauce Labs cloud

[Sign up here](https://saucelabs.com/signup/trial)

Then when running the tests, add your Sauce Labs credentials as npm config parameters, example :

```
npm run ios-simple --appium-sample-code:sauce=1 --appium-sample-code:username=<SAUCE_USERNAME> --appium-sample-code:key=<SAUCE_ACCESS_KEY>

```

Or set the config parameters directly in package.json :

```
// package.json

...
"config":{
  "sauce":"1",
  "sauce_username":"<SAUCE_USERNAME>",
  "sauce_access_key":"<SAUCE_ACCESS_KEY>"
},
...
```

If you also want to use Sauce Connect (secure tunelling):

- [Read the doc here](https://saucelabs.com/docs/connect)
- Install and start the Sauce Connect client


### To run tests locally

Install appium and start the appium server for your device, please refer to:

- http://appium.io
- https://github.com/appium/appium/blob/master/README.md

## Running tests

### MAC

```
npm run mac-simple

```

### Node.js 0.11 + Generator with Yiewd

prerequisite: switch to node > 0.11

```
npm run ios-yiewd
```
