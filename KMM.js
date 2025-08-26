let linked_badge = false; // true or false
let booster_badge = false; // true or false
let type = "override"; // 'append' or 'override'

let badgeMapping = {};
let allIds = [];

async function fetchBadgeData() {
  const res = await fetch("https://opensheet.elk.sh/1fEctP3Xsg_mw2xk1_gEQVIeWLUAhnYH-8vZUApvJCDY/1");
  const sheetData = await res.json();

  sheetData.forEach(entry => {
    if (entry.id) {
      let badges = [];

      Object.keys(entry).forEach(key => {
        if (key.toLowerCase().includes("badge") && entry[key]) {
          badges.push(entry[key]);
        }
      });

      badgeMapping[entry.id] = badges;
      allIds.push(entry.id);
    }
  });
}

const originalFetch = window.fetch;

window.fetch = async function (...args) {
  if (args[0] === "https://juice-api.irrvlo.xyz/api/customizations") {
    const response = await originalFetch(...args);
    const clonedResponse = response.clone();
    let data = await clonedResponse.json();

    // Load badge data and all user IDs
    await fetchBadgeData();

    let updatedData = [];

    allIds.forEach(id => {
      let obj = {
        shortId: id,
        booster: booster_badge,
        badges: badgeMapping[id] || []
      };

      if (linked_badge) {
        obj.discord = "123"; // simulate Discord linking
      }

      updatedData.push(obj);
    });

    if (type === "override") {
      data = updatedData;
    } else if (type === "append") {
      data.push(...updatedData);
    }

    return new Response(JSON.stringify(data), {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    });
  }

  return originalFetch(...args);
};


//KMM Discord Server://

// ==UserScript==
// @name         Discord Button Customizer (KMM)
// @version      0.1
// @description  Customize Discord button link, text, and icon
// @author       Akuma (#Y2OOB2)
// @match        *://*/*  // You can customize the match URL to only target specific pages
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Function to change Discord button link, text, and style
    const changeDiscordLink = () => {
        const discordButton = document.getElementById("juice-discord-btn");

        if (discordButton) {
            // Set the new Discord link
            const newDiscordLink = "https://discord.gg/Ckc9JfpvUs";

            // Add an onclick event to open the new Discord link
            discordButton.onclick = () => {
                window.open(newDiscordLink, "_blank");
            };

            // Change button text
            const textDivs = discordButton.querySelectorAll(".text-soc div");
            if (textDivs.length >= 2) {
                textDivs[0].textContent = "KMM"; // Change "JUICE" to "KMM"
                textDivs[1].textContent = "DISCORD"; // Keep "DISCORD" as it is
            }

            // Update button's background color and styles
            discordButton.style.background = "linear-gradient(to top, rgba(34, 193, 195, 0.75), rgba(253, 187, 45, 0.75))"; // New gradient background
            discordButton.style.borderBottomColor = "#FF4500"; // New bottom border color
            discordButton.style.borderTopColor = "#FF4500"; // New top border color
            discordButton.style.borderRightColor = "#4A5961"; // New right border color
            discordButton.style.padding = "12px 24px"; // Add padding for better button size

            // Optional: Change text color or font size
            textDivs.forEach(div => {
                div.style.color = "#FFFFFF"; // White text color
                div.style.fontSize = "18px"; // Change font size for text
            });

            // Replace the icon with a custom image (replace with your image URL)
            const icon = discordButton.querySelector("i.fab.fa-discord");
            if (icon) {
                const newIcon = document.createElement("img");
                newIcon.src = "https://i.postimg.cc/prww9WfD/1200079405226143764.webp";  // Change this URL to your custom image URL
                newIcon.style.width = "48px"; // Set the size of the image icon
                newIcon.style.height = "48px"; // Set the size of the image icon
                newIcon.style.margin = "3.2px 1.6px 0px"; // Add margin for positioning
                discordButton.querySelector("i.fab.fa-discord").replaceWith(newIcon);
            }

            console.log("✅ Discord button styles and icon updated!");
        } else {
            console.log("❌ Discord button not found on the page.");
        }
    };

    // Run the function to update the link, styles, and icon when the page has loaded
    window.addEventListener('load', () => {
        changeDiscordLink();
    });

})();
