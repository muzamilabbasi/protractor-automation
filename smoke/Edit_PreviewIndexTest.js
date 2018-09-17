"use strict";

/**
 * These tests create an article, edit content without saving, clicks on Preview Button to attain content preview url,
 * attaches URL onto new window, verifies edited content from preview displays in preview url window
 */
describe( "Preview page test", function() {
	var timeStamp = Date.now(),
		title = "Poller " + timeStamp,
		UtilityTasks = require( "automation-automation/utilities/utilityTasks.js" ),
		EditCreateContentTasks = require( "automation-automation/edit/content/create/editCreateContentTasks.js" ),
		EditCreateContentGet = require( "automation-automation/edit/content/create/editCreateContentGet.js" ),
		freHomeGet = require( "automation-automation/freautomation/home/freHomeGet.js" ),
		freHomeObjects = require( "automation-automation/freautomation/home/freHomeObjects.js" );

		it ( " - navigate to and log into the edit tool", function() {
			UtilityTasks.editGet();
			UtilityTasks.editLogin();
		} );

		// create article to test, edit article without saving
		it ( " - create new content without saving", function() {
			EditCreateContentTasks.navigateCreateNewContent();
			EditCreateContentTasks.createNewArticleWithoutSave( title );
		} );

		// edit article without saving, click preview button and copy content preview url
		it ( " - edit article, preview button click and preview url copy", function() {
			EditCreateContentTasks.EditCurrentArticleWithoutSaving( title );
			EditCreateContentTasks.clickPreviewButton();
			EditCreateContentTasks.clickPreviewCopyUrlButton();
		} );

		// gets preview url & verifies updated content title
		it ( " - verify preview content change", function() {
			var url_extension = EditCreateContentGet.getPreviewButtonUrl().getAttribute( "data-clipboard-text" );
			url_extension.then(function ( url_extension ) {
				url_extension = UtilityTasks.travisFeatureUrlAdjust(url_extension, freUrl);
				wd.get( url_extension );
			});
			EditCreateContentTasks.verifyEditedContent( title );
		} );
	}
);
