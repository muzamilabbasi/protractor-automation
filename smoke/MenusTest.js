/**
 * Tests the presence of menus across different types of FRE templates.
 */
"use strict";

describe( "Menus", function() {
	// pull in Utils
	var timeStamp = Date.now(),
		UtilityTasks = require( "automation-automation/utilities/utilityTasks.js" ),
		FreHomeGet = require( "automation-automation/freautomation/home/freHomeGet.js" ),


	// set up a list of test url paths
	paths = [
		"/", // homepage
		"/sex-love/", // section page
		"/style-beauty/beauty/", // subsection page
	];

	it( "All required menus have been rendered for all page types.", function() {
		paths.forEach( function( path ) {
			// navigate
			UtilityTasks.freGet( path );

			// look for footer menu
			expect( FreHomeGet.getFooterMenu().isDisplayed() ).toBe( true );

			// look for legal menu
			expect( FreHomeGet.getLegalMenu().isDisplayed() ).toBe( true );

			// look for nav menu
			expect( FreHomeGet.getNavMenu().isDisplayed() ).toBe( true );

			// sidepanel menu should be hidden initially, button should be present
			expect( FreHomeGet.getSidepanelButton().isDisplayed() ).toBe( true );
			expect( FreHomeGet.getSidepanelContainer().isDisplayed() ).toBe( true );

			// right sidepanel menu should be hidden initially, button should be present
			expect( FreHomeGet.getRightSidepanelButton().isDisplayed() ).toBe( true );
			expect( FreHomeGet.getRightSidepanelCountry().isDisplayed() ).toBe( true );

			// hidden menu
			browser.sleep( 3000 );
			expect( FreHomeGet.getSidepanelItem().isDisplayed() ).toBe( false );
			expect( FreHomeGet.getRightSidepanelContainer().isDisplayed() ).toBe( false );
		}.bind( this ) );
	} );

	// TODO - MenuBuilder data validation across different menus
} );
