"use strict";

/**
 * These tests create an article, edit content without saving, clicks on Preview Button to attain content preview url,
 * attaches URL onto new window, verifies edited content from preview displays in preview url window
 */

xdescribe( "Preview page test", function() {

	var timeStamp = Date.now(),
		title = "Poller " + timeStamp,
		UtilityTasks = require( "automation-automation/utilities/utilityTasks.js" ),
		EditCreateContentTasks = require( "automation-automation/edit/content/create/editCreateContentTasks.js" ),
		EditCreateContentGet = require( "automation-automation/edit/content/create/editCreateContentGet.js" ),
		FreArticleTasks = require( "automation-automation/freautomation/articles/freArticleTasks.js" );

	it ( " - navigate to and log into the edit tool", function() {
		UtilityTasks.editGet();
		UtilityTasks.editLogin();
	} );

	it ( " - create new standard content and publish", function() {
		EditCreateContentTasks.navigateCreateNewContent();
		EditCreateContentTasks.createNewArticle( title );
		EditCreateContentTasks.publishArticle();
	} );

	it ( "Sets custom canonical url, saves change", function() {
		EditCreateContentGet.getCustomCanonicalUrl().sendKeys( freUrl + "/health-fitness/automationTest/" );
		EditCreateContentTasks.saveArticleChanges();
	} );

	it ( " - verify new custom canonical url present on fre", function() {
		var url_extension = EditCreateContentTasks.returnNewArticleURL();
		url_extension.then(function ( url_extension ) {
			wd.get( freUrl + url_extension );
			browser.sleep( 3000 );
			var currentUrl = browser.getCurrentUrl();
			expect( freUrl + "/health-fitness/automationTest/" ).toEqual( FreArticleTasks.returnCanonicalUrl() );
		} );
	} );
} );
