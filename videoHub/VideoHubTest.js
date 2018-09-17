/**
 * Tests the presence of video hub elements and its functionality.
 */
"use strict";
// add export BASIC_VIDEO_ID="whatever it's supposed to be" to bash_profile, ex. "4f0a68e9-d58d-4993-91cb-56804742fac0"

xdescribe( "Video Hub", function () {
	var VideoHubPage = require( "./../pages/VideoHubPage.js" );

	beforeEach( () => {
		VideoHubPage.get();
		browser.sleep( 2500 );
		// switches from page to within the video iframe
		wd.switchTo().frame( wd.findElement( by.css( ".video-iframe" ) ) );
	} );

	it( "Video Hub Should Render Correctly", function () {
		expect( VideoHubPage.videoIframe().isDisplayed() ).toBe( true );
		expect( VideoHubPage.mainVideo().isDisplayed() ).toBe( true );
		expect( VideoHubPage.leftSlideButton().isDisplayed() ).toBe( true );
		expect( VideoHubPage.leftSlideArrow().isDisplayed() ).toBe( true );
		expect( VideoHubPage.rightSlideButton().isDisplayed() ).toBe( true );
		expect( VideoHubPage.rightSlideArrow().isDisplayed() ).toBe( true );
	} );

	it( "FilmStrip contains a background-color of rgba(0,0,0,0.9)", function () {
		VideoHubPage.getfilmStrip().getCssValue( "background-color" ).then( function ( bgColor ) {
			expect( bgColor === "rgba(0, 0, 0, 0.9)" ).toBe( true );
		} );
	} );

	it( "FilmStrip contains at least 4 videos", function () {
		element.all( by.css( ".slider-slide" ) ).then( function ( videos ) {
			expect( videos.length >= 4 ).toBe( true );
		} );
	} );

	it( "Iframe is sized correctly", function () {
		VideoHubPage.mainVideo().getSize().then( function ( iframe ) {
			expect( iframe.width ).toEqual( 1120 );
			expect( iframe.height ).toEqual( 630 );
		} );
	} );

	it( "FilmStrip is sized correctly", function () {
		VideoHubPage.getfilmStrip().getSize().then( function ( iframe ) {
			expect( iframe.width ).toEqual( 1120 );
			expect( iframe.height ).toEqual( 179 );
		} );
	} );

	xit( "Video should be able to play and pause", function () {
		// wait for ad to finish
		browser.sleep( 31000 );
		VideoHubPage.mainVideo().click();
		browser.sleep( 2000 );
		VideoHubPage.mainVideo().click();
		browser.sleep( 2000 );
		expect( VideoHubPage.shareButton().isDisplayed() ).toBe( true );
	} );

	it( "Selects a video in the filmstrip, starts playing the video, URL updates", function () {
		// wait for ad to finish
		browser.wait( ec.elementToBeClickable( $( ".jw-video.jw-reset" ) ), 5000 );

		browser.getCurrentUrl().then( function ( url ) {
			var videoId = url.split( "/video/" )[ 1 ];
			var filmstripVideos, secondVideo;
			filmstripVideos = element.all( by.css( '.header' ) );
			secondVideo = filmstripVideos.get( 1 );
			secondVideo.click();
			browser.sleep( 2000 );

			expect( browser.getCurrentUrl() )
				.not.toBe( freUrl + "/video/" + videoId );
		} );
	} );
} );
