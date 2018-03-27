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

        var desired = _.clone(require("./helpers/caps").windows02);
        //desired.app = require("./helpers/apps").windowsTestApp;
        console.log(desired);
        if (process.env.npm_package_config_sauce) {
            desired.name = 'windoews - simple';
            desired.tags = ['sample'];
        }

        //

        return driver
            .init(desired)
            .setImplicitWaitTimeout(3000);// wait so the application is opened
    });

    after(function () {
        return driver
            .quit();
    });

    afterEach(function () {
        allPassed = allPassed && this.currentTest.state === 'passed';
    });

    //when you use the DEAS bundled installer
    it("intall the application", function () {
        return driver.element('name', 'Continue').doubleclick();
    });

    it("open the application", function () {
        return driver.element('name', 'Penneo')
            .doubleclick();
    });
    //try to login in the penneo application
    //send keys to user name and password and then click log in
    //access by name: username, password, Log in to Penneo

    it("login into the Penneo application", function () {
        return driver
            .sleep(6000)
            .element('name', 'Enter your username')
            //.clear()
            .click()

            .sendKeys('tc@penneo.com')

            .sleep(500)

            .element('name', 'Password')
            //.clearElement('Enter your username')
            .click()
            .sendKeys('test')//change the password to a valid one to see the test working

            .element('name', 'Log in to Penneo')
            .click()

            .element('name', 'Add Documents')//this does not work properly
            .isEnabled();
        // this fully works, might have problems because the machine is slow :)
    });

    //this file only tests the login

    /*//prerequisites: you have to be logged in and the app running in the background
    it("print a test document using the penneo printer", function () {
        return driver
            .elementByName("Edit").click()
            .elementByXPath("//MenuItem[starts-with(@Name, \"Select All\")]").click()
            .elementByName("Edit").click()
            .elementByXPath("//MenuItem[starts-with(@Name, \"Del\")]").click()
            .sleep(3000)
            .elementByName("Text Editor")
            .sendKeys('Hello from Appium with JS')
            .elementByName("Text Editor").text()
            .should.become('Penneo printer test document');
    });*/
});

