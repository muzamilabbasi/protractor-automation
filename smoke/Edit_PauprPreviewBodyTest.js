"use strict";

/**
 * These tests create an article, edit content,
 *
 */

describe( "Paupr body preview test", function() {
		var timeStamp = Date.now(),
			title = "Poller " + timeStamp,
			UtilityTasks = require( "automation-automation/utilities/utilityTasks.js" ),
			EditCreateContentTasks = require( "automation-automation/edit/content/create/editCreateContentTasks.js" ),
			EditCreateContentGet = require( "automation-automation/edit/content/create/editCreateContentGet.js" ),
			EditCreateContentObjects = require( "automation-automation/edit/content/create/editCreateContentObjects.js" );

		// navigates to edit tool and logs in
		it ( " - navigate to and log into the edit tool", function() {
			UtilityTasks.editGet();
			UtilityTasks.editLogin();
		} );

		// select paupr, edit fields and refresh preview
		it ( " - clicking paupr button, editing preview pane without saving and refreshing preview", function() {
			EditCreateContentTasks.navigateCreateNewContent();
			EditCreateContentTasks.clickPauprButton();
			EditCreateContentTasks.setPauprBodyContent( "Edited paupr body: paupr test-content-body" );
			EditCreateContentTasks.clickPauprRefreshButton();
		} );

		// on preview reload, find iframe and verify body text matches paupr editor body text
		xit ( " - waiting for preview to load, switching to preview iframe and verifying body text matches", function() {
			var pauprEditBodyText = EditCreateContentGet.getPauprEditorBody().getText();
			var getIframe = EditCreateContentGet.getBodyPreviewIframe();

			// wait for iframe to reload
			UtilityTasks.waitUntilVisible( $( EditCreateContentObjects.bodyPreviewIframe ) );

			// switch to preview iframe
			wd.switchTo().frame( getIframe );
			var pauprPreviewBodyText = EditCreateContentGet.getPauprPreviewBody().getText();

			// expect preview body text to match the editor body text
			pauprPreviewBodyText.then( ( text ) => {
				expect( text ).toBe( pauprEditBodyText );
		} );
		} );

	}
);
