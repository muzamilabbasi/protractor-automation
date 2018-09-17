/**
 * This page object contains various helper properties/methods for
 * testing the video hub page elements.
 */
"use strict";
// add export BASIC_VIDEO_ID="whatever it's supposed to be" to bash_profile, ex. "4f0a68e9-d58d-4993-91cb-56804742fac0"

var VideoHubPage = {
	get: function () {
		wd.get( freUrl + "/video/" + process.env.BASIC_VIDEO_ID + "/" );
	},

	/**
	 * Gets the video iframe
	 * @returns WebElement
	 */
	videoIframe: function () {
		return wd.findElement( by.css( "#hdsMainContainer" ) );
	},

	/**
	 * Gets the main video element
	 * @returns WebElement
	 */
	mainVideo: function () {
		return wd.findElement( by.css( ".jw-video.jw-reset" ) );
	},

	/**
	 * Gets the share button
	 * @returns WebElement
	 */
	shareButton: function () {
		return wd.findElement( by.css( ".jw-dock-button.jw-sharing-dock-btn" ) );
	},

	/**
	 * Gets the left slide button
	 * @returns WebElement
	 */
	leftSlideButton: function () {
		return wd.findElement( by.css( ".slider-decorator-0" ) );
	},

	/**
	 * Gets the left slide arrow
	 * @returns WebElement
	 */
	leftSlideArrow: function () {
		return wd.findElement( by.css( ".prev-slide" ) );
	},

	/**
	 * Gets the right slide button
	 * @returns WebElement
	 */
	rightSlideButton: function () {
		return wd.findElement( by.css( ".slider-decorator-1" ) );
	},

	/**
	 * Gets the right slide arrow
	 * @returns WebElement
	 */
	rightSlideArrow: function () {
		return wd.findElement( by.css( ".next-slide" ) );
	},

	/**
	 * Gets the filmStrip background color
	 * @returns string
	 */
	getfilmStrip: function () {
		return wd.findElement( by.css( ".filmstrip-container" ) );
	}
};

module.exports = VideoHubPage;
