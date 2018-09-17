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
		FreArticleTasks = require( "automation-automation/freautomation/articles/freArticleTasks.js" ),
		FreArticleObjects = require( "automation-automation/freautomation/articles/freArticleObjects.js" );

	it ( " - navigate to and log into the edit tool", function() {
		UtilityTasks.editGet();
		UtilityTasks.editLogin();
	} );

	// create article to test, edit article without saving
	it ( " - create new content without saving", function() {
		EditCreateContentTasks.navigateCreateNewContent();
		EditCreateContentTasks.createNewArticle( title );
		EditCreateContentTasks.publishArticle()
	} );

	// gets preview url & verifies updated content title
	xit ( " - verify preview content change", function() {
		var startingUrl = browser.getCurrentUrl();
		var url_extension = EditCreateContentTasks.returnNewArticleURL();
		url_extension.then(function ( url_extension ) {
			wd.get( freUrl + url_extension );
			browser.sleep( 3000 );
			var currentUrl = browser.getCurrentUrl();
			// MetaTagsPage.getCanonicalUrl().then( function( canonicalUrl ) {
			// FreArticleTasks.returnCanonicalUrl().then( function( canonicalUrl ) {
			// 	expect( canonicalUrl.includes( FreArticleObjects.cannonicalSectionCareerLink ) ).toBe( true );
			// } );
			if ( !( freUrl.includes( "master" ) ) ) {
				expect( currentUrl ).toEqual( FreArticleTasks.returnCanonicalUrl() );
			}
			else {
				currentUrl.then( function( urlString ) {
					var currentUrlExtension = urlString.substring( urlString.indexOf( ".feature" ) );
					expect( currentUrlExtension ).toEqual( FreArticleTasks.returnCanonicalUrl() );
				} )
			}
			startingUrl.then( function( url ) {
				wd.get( url )
			} );
		} );
	} );

	xit ( "Edits published content", function() {
		EditCreateContentTasks.setSectionType( "Author" );
		EditCreateContentTasks.saveArticleChanges();
	} );

	xit ( "Gets FRE url and verifies that edit changes are immediately visible on FRE", function() {
		var startingUrl = browser.getCurrentUrl();
		var url_extension = EditCreateContentTasks.returnNewArticleURL();
		url_extension.then(function ( url_extension ) {
			wd.get( freUrl + url_extension );
			browser.sleep( 3000 );
			browser.refresh();
			var currentUrl = browser.getCurrentUrl();
			FreArticleTasks.returnCanonicalUrl().then(function ( canonicalUrl ) {
				expect( canonicalUrl.includes( FreArticleObjects.cannonicalSectionAuthorsLink ) ).toBe( true );
			});
			if ( !( freUrl.includes( "master" ) ) ) {
				expect( currentUrl).toEqual( FreArticleTasks.returnCanonicalUrl() );
			}
			else {
				currentUrl.then(function ( urlString ) {
					var currentUrlExtension = urlString.substring( urlString.indexOf( ".feature" ) );
					expect( currentUrlExtension ).toEqual( FreArticleTasks.returnCanonicalUrl() );
				})
			}
		} );
	} );
} );

