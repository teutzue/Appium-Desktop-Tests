"use strict";

require("./helpers/setup");

//var WindowsDriver = require('appium-windows-driver');
//console.log(Object.keys(WindowsDriver));

var wd = require("wd"),
    _ = require('underscore'),
    serverConfigs = require('./helpers/appium-servers');
//windowsDriver = require('WindowsDriver');

describe("windows setup", function () {
    this.timeout(300000);
    var driver;
    var allPassed = true;

    before(function () {
        var serverConfig = process.env.npm_package_config_sauce ?
            serverConfigs.sauce : serverConfigs.local;
        driver = wd.promiseChainRemote(serverConfig);

        require("./helpers/logging").configure(driver);

        var desired = _.clone(require("./helpers/caps").windows01);
        //desired.app = require("./helpers/apps").windowsTestApp;
        console.log(desired);
        if (process.env.npm_package_config_sauce) {
            desired.name = 'windoews - simple';
            desired.tags = ['sample'];
        }

        return driver
            .init(desired)
            .sleep(10000);// wait so the application is opened
    });

    after(function () {
        return driver
            .quit();
    });

    afterEach(function () {
        allPassed = allPassed && this.currentTest.state === 'passed';
    });

    it("click next on the installer window", function () {
        /* return driver
             .get("Penneo");*/
        //return driver.element('name', 'eula').doubleclick();
        //return driver.source();
        //let's try to start another session here
        //driver.KeyboardEvent.send(Keys.Meta + "s" + Keys.Meta);
        //driver.source().then(function(value) {
        //console.log("About to do something");
        return 1;
        //return driver.element('name', 'Deploy.exe').doubleclick()
        //.sleep(30000)
        //.element('name', 'Yes').click().sleep(4000)
            //.element('name', 'Continue').click();
        //getAttribute('NativeWindowHandle');
        //console.log(penneoFolder);
        //});
        //console.log(cortanaWindow);
        //console.log(cortanaTopLevelWindowHandle);
        //return driver.source();
    });

});

