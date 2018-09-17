"use strict";

/**
 * These tests assume test-data has been seeded
 * (i.e.seed-rover-postgres has been run)
 */
describe( "SidepanelTest", function() {

	var UtilityTasks = require( "automation-automation/utilities/utilityTasks.js" ),
		freHomeGet = require( "automation-automation/freautomation/home/freHomeGet.js" ),
		freHomeObjects = require( "automation-automation/freautomation/home/freHomeObjects.js" );

	// navigate to the homepage
	UtilityTasks.freGet( "/" );

	it( "Sidepanel opens when clicked", function() {
		// expect the sidepanel menu to be hidden initially
		expect( freHomeGet.getSidepanelItem().isDisplayed() ).toBe( false );

	});

	it( "Attempts to open side panel", function() {
		// Attempt to open the sidepanel
		freHomeGet.getSidepanelButton().click();

		// wait for the menu to become visible
		UtilityTasks.waitUntilVisible( $( freHomeObjects.sidepanelItem ) );

		// expect the sidepanel to have the active class
		expect( UtilityTasks.hasClass( freHomeGet.getSidepanelContainer(), "active" ) ).toBe( true );

	});

	it( "Attempts to close side panel", function() {
		// Attempt to close the sidepanel
		freHomeGet.getSidepanelButton().click();

		// wait for the menu to become visible
		UtilityTasks.waitUntilInvisible( $( freHomeObjects.sidepanelItem ) );

		// expect the sidepanel to have the active class
		expect( UtilityTasks.hasClass( freHomeGet.getSidepanelContainer(), "active" ) ).toBe( false );
	} );
} );
