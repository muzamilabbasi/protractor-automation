"use strict";

describe( "Adds and verified subhed to Marquee Header", function() {
	var timeStamp = Date.now(),
		marqueeSubhed = "TEST_" + timeStamp,
		UtilityTasks = require( "automation-automation/utilities/utilityTasks.js" ),
		EditFeedsHomeTasks = require( "automation-automation/edit/feeds/homepage/editFeedsHomeTasks.js" ),
		EditFeedsHomeGet = require( "automation-automation/edit/feeds/homepage/editFeedsHomeGet.js" ),
		EditFeedsHomeObjects = require( "automation-automation/edit/feeds/homepage/editFeedsHomeObjects.js" ),
		freHomeGet = require( "automation-automation/freautomation/home/freHomeGet.js" ),
		freHomeObjects = require( "automation-automation/freautomation/home/freHomeObjects.js" );

	it ( "Navigates to and logs into the edit tool", function() {
		UtilityTasks.editGet();
		UtilityTasks.editLogin();
	} );

	it ( "Navigates to Homepage Feeds", function() {
		EditFeedsHomeTasks.navigateFeedsHome();
	} );

	it ( "Modifies text in Marquee Header subhed then verify change in corresponding iframe", function() {
		EditFeedsHomeGet.getMarqueeSubHedTextbox().clear();
		EditFeedsHomeGet.getMarqueeSubHedTextbox().sendKeys( marqueeSubhed );
		browser.sleep( 2000 );
		wd.findElement( by.css( EditFeedsHomeObjects.marqueeSubhedUrlButton ) ).click();
		browser.sleep( 2000 );
		wd.switchTo().frame( EditFeedsHomeGet.getMarqueeHeaderIframe() );
		EditFeedsHomeGet.getMarqueeSubhedSponsoredText().getText()
		.then( ( text ) => {
			expect( text ).toBe( marqueeSubhed );
	} );
	} );

	it ( "Exit iframe, go to iframe src and verify subhed updated there", function() {
		wd.switchTo().defaultContent();
		EditFeedsHomeGet.getMarqueeHeaderIframe().getAttribute( 'src' )
		.then( ( marqueeUrl ) => {
			marqueeUrl = UtilityTasks.travisFeatureUrlAdjust(marqueeUrl, freUrl);
		wd.get( marqueeUrl );
		browser.sleep( 2000 );
		wd.findElement( by.css( EditFeedsHomeObjects.marqueeSubhedSponsoredText ) ).getText()
		.then( ( subhedText ) => {
			expect( subhedText ).toBe( marqueeSubhed );
	} );
	} );
	} );
} );
