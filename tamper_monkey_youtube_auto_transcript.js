// ==UserScript==
// @name         YouTube Auto-Show Transcript - 3.8.26 - works
// @namespace    http://tampermonkey.net/
// @version      1.4
// @description  Automatically opens the transcript on any YouTube video page
// @author       Gemini
// @match        *://www.youtube.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let lastVideoId = "";

    function openTranscript() {
        // 1. Find and click the "...more" button in the description
        const moreButton = document.querySelector('#expand, #description-inline-expander');
        if (moreButton) {
            moreButton.click();

            // 2. Wait a brief moment for the description to expand, then find "Show transcript"
            setTimeout(() => {
                // YouTube uses a button with specific text or a specialized component
                const transcriptButton = Array.from(document.querySelectorAll('button'))
                    .find(btn => btn.innerText.includes('Show transcript'));

                if (transcriptButton) {
                    transcriptButton.click();
                    console.log("Transcript opened!");
                }
            }, 500); // 500ms delay to let the UI update
        }
    }

    function checkVideoChange() {
        const urlParams = new URLSearchParams(window.location.search);
        const currentVideoId = urlParams.get('v');

        if (currentVideoId && currentVideoId !== lastVideoId) {
            lastVideoId = currentVideoId;

            // Give the video page a second to load the description elements
            setTimeout(openTranscript, 2000);
        }
    }

    // Standard SPA listeners
    window.addEventListener('yt-navigate-finish', checkVideoChange);

    // Safety check for direct loads
    if (window.location.href.includes('watch?v=')) {
        setTimeout(checkVideoChange, 2000);
    }

})();
