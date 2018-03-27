"use strict";

require("./helpers/setup");

var wd = require("wd"),
    _ = require('underscore'),
    serverConfigs = require('./helpers/appium-servers');

describe("windows simple", function () {
    this.timeout(300000);
    var driver;
    var allPassed = true;

    before(function () {
        var serverConfig = process.env.npm_package_config_sauce ?
            serverConfigs.sauce : serverConfigs.local;
        driver = wd.promiseChainRemote(serverConfig);

        require("./helpers/logging").configure(driver);

        var desired = _.clone(require("./helpers/caps").windowsNotepad);
        //desired.app = require("./helpers/apps").windowsTestApp;
        console.log(desired);
        if (process.env.npm_package_config_sauce) {
            desired.name = 'windoews - simple';
            desired.tags = ['sample'];
        }

        return driver
            .init(desired)
            .setImplicitWaitTimeout(3000);// wait so the application is opened
    });

    after(function () {
        return driver
            .elementByName('Close').click()
            .elementByName("Don't Save").click()
            .quit();
    });

    afterEach(function () {
        allPassed = allPassed && this.currentTest.state === 'passed';
    });

    //this file tests the penneo printer.

    //prerequisites: you have to be logged in and the app running in the background
    it("print a test document using the penneo printer", function () {
        return driver
            .elementByName("Text Editor")
            .sendKeys('Penneo test document')
            .elementByName("Text Editor").text()
            .should.become('Penneo test document')
            .elementByName("File").click()
            .elementByXPath("//MenuItem[starts-with(@Name, \"Print...\")]").click()
            .sleep(3000)
            .elementByName("Penneo Printer").doubleclick()// actually clicks print
            .sleep(10000)
            //.elementByXPath("/Window/Custom/Custom[2]/Custom/Custom[1]/Document/Custom/Custom[2]" +
               // "/Custom/Custom/Custom[1]/Custom[1]/Custom[2]/Custom/Custom/List/ListItem")
            .element('name','brev')
            .isEnabled();
    });
});

