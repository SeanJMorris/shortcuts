// ==UserScript==
// @name         YouTube Auto-Transcript 2 fix attempt
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Automatically opens the transcript on YouTube video pages
// @author       Sean Morris
// @match        https://www.youtube.com/watch?v=*
// @grant        none
// ==/UserScript==


(function() {
    'use strict';

    function YouTubeAutomaticTranscript() {
        // 1. Find the "...more" button
        const moreButton = document.querySelector('#expand');

        if (moreButton) {
            moreButton.click();
            console.log('Description expanded.');

            // 2. Wait for the transcript/chapters button to appear
            // We use a slightly longer delay or a repeated check because
            // the expanded description takes a moment to animate in.
            setTimeout(() => {
                const transcriptButton = Array.from(document.querySelectorAll('button'))
                    .find(btn => btn.innerText.includes('Show transcript'));
                const chaptersButton = Array.from(document.querySelectorAll('button'))
                    .find(btn => btn.innerText.includes('View all'));

                if (chaptersButton) {
                    chaptersButton.click();
                    console.log('Chapters opened.');
                } else if (transcriptButton) {
                    transcriptButton.click();
                    console.log('Transcript opened.');
                } else {
                    console.log('Transcript/Chapters button not found yet.');
                }
            }, 700);
        } else {
            // If the button isn't there, the page might still be loading.
            // We'll try again in 1 second.
            setTimeout(YouTubeAutomaticTranscript, 1000);
        }
    };

    // This event fires when the page finishes loading OR navigates to a new video
    window.addEventListener('yt-navigate-finish', () => {
        // Short delay to ensure the DOM is ready for the new video
        setTimeout(YouTubeAutomaticTranscript, 1000);
    });

    // Run on initial page load
    YouTubeAutomaticTranscript();

})();
