let heroDiv = document.querySelector("#jewellery__hero_div");
let infobarText = document.querySelector(".hero_infobar--text");
let buyingGuide = document.querySelector(".hero_infobar--grid");
let buyingGuideBtn = document.querySelector(".buying_guide-button")
let heroGrid = document.querySelector(".hero_grid");

let toggleShowDropdown = (e) => {
    if (buyingGuide.classList.contains("hide")) {
        // Adjust the CSS grid to have space for the dropdown menu
        heroDiv.style.gridTemplateRows = "45% 50% 35%";
        // Remove the infobar text
        infobarText.classList.add("hide");
        // Show the buying guide
        buyingGuide.classList.remove("hide");
        // Change the text content of the button
        buyingGuideBtn.textContent = "Read Less";
        // Hide the grid below the buying guide when dropdown open
        heroGrid.classList.add("hide");
    } else {
        // Return grid to orignal size
        heroDiv.style.gridTemplateRows = "45% 10% 35%";
        // Display infobar text
        infobarText.classList.remove("hide");
        // Hide the buying guide
        buyingGuide.classList.add("hide");
        // Change the text content of the button
        buyingGuideBtn.textContent = "Read More";
        // Show the grid below the buying guide when dropdown closed
        heroGrid.classList.remove("hide");
    }
};

buyingGuideBtn.addEventListener("click", toggleShowDropdown)