"use strict";
const fs = require( 'fs' );
const jasmineReporters = require( 'jasmine-reporters' );
const htmlReport = require( 'jasmine-xml2html-converter' );
const path = require( 'path');
const time = (new Date()).toISOString();
const reportPath = path.join( __dirname, 'testresults' );
const emailSender = require( '' );
const sync = require( 'deasync' );

const recordResults = process.env.RECORD_PROTRACTOR_RESULTS || false;
const emailResults = process.env.EMAIL_PROTRACTOR_RESULTS || false;
const mailingList = process.env.MAILING_LIST;

// webRep is the object of reporter
var webRep = require( "npm.automation" ),
// define a slack hook
webhook = process.env.SLACK_HOOK;

exports.config = {
	suites : {
		smoke : "./smoke/*.js",
		sanity : "./sanity/*.js",
		videoHub : "./videoHub/*.js",
		travis : [
			"./smoke/HomePageTest.js",
		],
		dailyAutomation : [
			"./smoke/*.js",
			"./sanity/*.js",
		],
	},

	framework : 'jasmine2',

	//increase timeouts
	getPageTimeout : 60000,
	allScriptsTimeout : 60000,
	jasmineNodeOpts : { defaultTimeoutInterval : 120000 },

	onPrepare : function() {
		//define global vars
		global.wd = browser.driver;
		global.freUrl = process.env.FRONTEND_PROTRACTOR_BASE_URL;
		global.ec = protractor.ExpectedConditions;
		//global variables used when working with Edit tool.
		global.editUrl = process.env.EDIT_PROTRACTOR_BASE_URL;
		global.userid = process.env.USER_ACCOUNT || "qa@localhost.com";
		global.password = process.env.USER_PASSWORD;

		//maximize browser to prevent mobile outlay
		wd.manage().window().maximize();
		if ( recordResults ) {
			jasmine.getEnv().addReporter( new jasmineReporters.JUnitXmlReporter({
				consolidateAll: true,
				savePath: reportPath,
				filePrefix: 'xmloutput'
			}) );
		}

		//ignore synchronization, this is only needed for angular apps
		browser.ignoreSynchronization = true;

		// reporting hook is here
		jasmine.getEnv().addReporter( new webRep.WebReporter ( {
			// set default values per project e.g EDIT INTERFACE
			projectName: process.env.PROJECT_NAME,
			environment: freUrl,
			slackUrl: webhook,
			channel: '#' + process.env.CHANNEL_NAME || "Default Channel Name",
			suite: process.env.FRONTEND_TEST_SUITE || "Default Test Suite",
			// this flag is set to false by default, setting reportToSlack='true' will start reporting
			flag: process.env.REPORT_TO_SLACK || 'false',
		} ) );
	},
	onComplete: function() {
		if ( recordResults ) {
			var newReportPath = `${reportPath}/test-report_${time}.html`;
			var testConfig = {
				reportTitle: 'FRE-automation Test Execution Report ',
				outputPath: reportPath,
				seleniumServer: process.env.SELENIUM_ADDRESS,
				applicationUrl: freUrl
			};
			new htmlReport().from( `${reportPath}/xmloutput.xml`, testConfig );
			fs.unlinkSync( `${reportPath}/xmloutput.xml` );
			fs.rename( `${reportPath}/test-html-report.html`, newReportPath );
		}
		if ( emailResults ) {
			emailSender( "Automation Results", newReportPath, mailingList );
			sync.sleep( 5000 );
		}
	}
};
