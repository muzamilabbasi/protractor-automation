/**
 * These tests assume test-data has been seeded
 * (i.e.seed-rover-postgres has been run)
 */
"use strict";

describe( "Homepage", function() {
	var UtilityTasks = require( "automation-automation/utilities/utilityTasks.js" ),
		FreHomeGet = require( "automation-automation/freautomation/home/freHomeGet.js" ),
		FreHomeObjects = require( "automation-automation/freautomation/home/freHomeObjects.js" );


	it( "contains full list content items.", function() {
		//navigate to the homepage for all specs
		UtilityTasks.freGet( "/" );

		UtilityTasks.waitUntilVisible( $( FreHomeObjects.itemFull ) );
		expect( UtilityTasks.getElementCount( FreHomeObjects.itemFull ) ).toBeGreaterThan( 0 );
	} );

	it( "list items contain images.", function() {
		FreHomeGet.getFullItems().then( function( items ) {
			// loop over found items
			items.forEach( function( item ) {
				// verify images
				expect( item.findElement( by.css( FreHomeObjects.itemImage ) ).isDisplayed() ).toBe( true );
			} );
		} );
	} );

	it( "contains required ad containers", function() {
		// bottom leaderboard
		UtilityTasks.waitUntilVisible( $( FreHomeObjects.adLeaderboardBottom ) );
		expect( FreHomeGet.getLeaderboardBottom().isDisplayed() ).toBe( true );
		// top leaderboard
		expect( FreHomeGet.getLeaderboardTop().isDisplayed() ).toBe( true );
		// bottom vertical
		expect( FreHomeGet.getVerticalBottom().isDisplayed() ).toBe( true );
		// top vertical
		expect( FreHomeGet.getVerticalTop().isDisplayed() ).toBe( true );
	} );
} );
