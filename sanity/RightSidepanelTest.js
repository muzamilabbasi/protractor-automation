"use strict";

/**
 * These tests assume test-data has been seeded
 * (i.e.seed-rover-postgres has been run)
 */
describe( "RightSidepanelTest", function() {
	var UtilityTasks = require( "automation-automation/utilities/utilityTasks.js" ),
		freHomeGet = require( "automation-automation/freautomation/home/freHomeGet.js" ),
		freHomeObjects = require( "automation-automation/freautomation/home/freHomeObjects.js" );

	// navigate to the homepage
	UtilityTasks.freGet( "/" );

	it( "RightSidepanel opens when clicked", function() {
		// expect the right side panel menu to be hidden initially
		expect( freHomeGet.getRightSidepanelContainer().isDisplayed() ).toBe( false );

		// Attempt to open the right sidepanel
		freHomeGet.getRightSidepanelButton().click();

		// wait for the menu to become visible
		UtilityTasks.waitUntilVisible( $( freHomeObjects.rightSidePanelContainer ) );

		// expect the right sidepanel to have the active class
		expect( UtilityTasks.hasClass( freHomeGet.getRightSidepanelContainer(), "active" ) ).toBe( true );

		// Attempt to close the right sidepanel
		freHomeGet.getRightSidepanelButton().click();

		// wait for the menu to become visible
		UtilityTasks.waitUntilInvisible( $( freHomeObjects.rightSidePanelContainer ) );

		// expect the right sidepanel to have the active class
		expect( UtilityTasks.hasClass( freHomeGet.getRightSidepanelContainer(), "active" ) ).toBe( false );
	} );
} );
