"use strict";

require("./helpers/setup");

var wd = require("wd"),
    _ = require('underscore'),
    serverConfigs = require('./helpers/appium-servers');

describe("mac simple", function () {
    this.timeout(300000);
    var driver;
    var allPassed = true;

    before(function () {
        var serverConfig = process.env.npm_package_config_sauce ?
            serverConfigs.sauce : serverConfigs.local;
        driver = wd.promiseChainRemote(serverConfig);
        require("./helpers/logging").configure(driver);

        var desired = _.clone(require("./helpers/caps").mac01);
        //desired.app = require("./helpers/apps").macTestApp;
        console.log(desired);
        if (process.env.npm_package_config_sauce) {
            desired.name = 'mac - simple';
            desired.tags = ['sample'];
        }
        return driver
            .init(desired);
    });

    after(function () {
        return driver
            .quit()
            .finally(function () {
                if (process.env.npm_package_config_sauce) {
                    return driver.sauceJobStatus(allPassed);
                }
            });
    });

    afterEach(function () {
        allPassed = allPassed && this.currentTest.state === 'passed';
    });

   /* it("should open the installer", function () {
            var installerXPath = "/AXApplication[@AXTitle='Finder']/AXScrollArea[0]/AXGroup[0]/AXImage[@AXTitle='Penneo-2.1.0.dmg']";
            var penneoApp = driver.elementByXPath(installerXPath);
            return penneoApp.doubleclick();

    });


    it("should drag the installer to the applications folder", function () {
        var installerXPath = "/AXApplication[@AXTitle='Finder']/AXWindow[@AXTitle='Penneo 2.1.0' and @AXIdentifier='_NS:9' " +
            "and @AXSubrole='AXStandardWindow']";
        var penneoIcon =  "/AXApplication[@AXTitle='Finder']/AXWindow[@AXTitle='Penneo 2.1.0' and @AXIdentifier='_NS:9' " +
            "and @AXSubrole='AXStandardWindow']/AXSplitGroup[0]/AXSplitGroup[0]/AXScrollArea[@AXIdentifier='_NS:31']" +
            "/AXList[@AXIdentifier='IconView' and @AXSubrole='AXCollectionList']/AXList[@AXSubrole='AXSectionList']" +
            "/AXGroup[@AXIdentifier='Icon View']/AXImage[0]";

            return driver
                .sleep(2000)
                //point to the installler
                .elementByXPath(penneoIcon)
                .moveTo()
                .buttonDown()
                //move the installer to the pplications folder
                .elementByXPath(penneoIcon)
                .moveTo(355, 60)
                .buttonUp()
                //close the installer window
                .elementByXPath(installerXPath + "/AXButton[@AXSubrole='AXCloseButton']")
                .click();
    });


    it("should open the Penneo application", function () {
        return driver
            .get("Penneo")
        //todo: click on the pop-ul to open the application first time
    });*/


    //precondition - the printer should be enbaled in the application and running
   /* it("should set up the Penneo printer", function () {
        var systemPreferencesXPath = "/AXApplication[@AXTitle='System Preferences']";

        return driver
            .get("System Preferences")
            //click on printers and scanners
            .elementByXPath(systemPreferencesXPath + "/AXWindow[@AXTitle='System Preferences' and @AXSubrole='AXStandardWindow']" +
                "/AXScrollArea[0]/AXButton[@AXTitle='Printers &\nScanners']")
            .click()
            //click on '+' to add the printer
            .elementByXPath(systemPreferencesXPath + "/AXWindow[@AXTitle='Printers & Scanners' and " +
                "@AXSubrole='AXStandardWindow']/AXButton[@AXIdentifier='_NS:9']")
            .click()
            .elementByXPath("/AXApplication[@AXTitle='AddPrinter']/AXWindow[@AXTitle='Add ' and @AXIdentifier='_NS:101' and " +
                "@AXSubrole='AXStandardWindow']/AXGroup[@AXIdentifier='_NS:84']/AXScrollArea[@AXIdentifier='_NS:31']" +
                "/AXTable[@AXIdentifier='defaultTableView']/AXRow[@AXSubrole='AXTableRow']/AXStaticText[@AXValue='Penneo Printer']")
            .click()
            //wait until it loads
            .sleep(7000)
            //click add button to add the printer
            .elementByXPath("/AXApplication[@AXTitle='AddPrinter']/AXWindow[@AXTitle='Add ' and @AXIdentifier='_NS:101' and " +
                "@AXSubrole='AXStandardWindow']/AXButton[@AXTitle='Add' and @AXIdentifier='_NS:11']")
            .click()
            .sleep(5000)
            .elementByXPath("/AXApplication[@AXTitle='AddPrinter']/AXWindow[@AXTitle='Add ' and @AXIdentifier='_NS:101' " +
                "and @AXSubrole='AXStandardWindow']/AXSheet[@AXIdentifier='_NS:290']/AXGroup[@AXIdentifier='_NS:9']/AXButton" +
                "[@AXTitle='OK' and @AXIdentifier='_NS:67']")
            .click()
            .elementByXPath("/AXApplication[@AXTitle='System Preferences']/AXWindow[@AXTitle='Printers & Scanners' and " +
                "@AXSubrole='AXStandardWindow']/AXButton[@AXSubrole='AXCloseButton']")
            .click();
    });*/

    it("should open print a document in Penneo", function () {
        return driver
            .get("TextEdit")
            .element('name', 'New Document')
            .click()
            .sendKeys('Hello from Appium with JS');
        //to be done: need xcode on the computer
    });

});

