let infobar = document.querySelector(".hero_infobar");
let infobarText = document.querySelector(".hero_infobar--text");
let buyingGuide = document.querySelector(".hero_infobar--grid");
let buyingGuideBtn = document.querySelector(".buying_guide-button");

let toggleShowDropdown = async (e) => {
    if (buyingGuide.classList.contains("hide")) {
        // Remove the infobar text and button
        infobarText.classList.add("hide");
        buyingGuideBtn.classList.add("hide");
        // Show the buying guide
        buyingGuide.classList.remove("hide"); 
        buyingGuide.classList.remove("fade-out");
        buyingGuide.classList.add("fade-in");
        setTimeout(() => {
            buyingGuide.classList.add("active");  
        }, 1000);

        // Resize the infobar
        infobar.classList.remove("dropup"); 
        infobar.classList.add("dropdown");
        // Add an active class to set the new div height 
        setTimeout(() => {
            infobar.classList.add("active");  

            // Show and change the text content of the button
            buyingGuideBtn.classList.remove("hide");
            buyingGuideBtn.textContent = "Read Less";
        }, 500);


    } else {
        // Hide the button 
        buyingGuideBtn.classList.add("hide");

        // Hide the buying guide
        buyingGuide.classList.remove("fade-in");
        buyingGuide.classList.add("fade-out");
        setTimeout(() => {
            buyingGuide.classList.remove("active");
            buyingGuide.classList.add("hide");   

            // Display infobar text
            infobarText.classList.remove("hide");
        }, 500);

        // Resize the infobar
        infobar.classList.remove("dropdown"); 
        infobar.classList.add("dropup"); 
        // Remove active class to set the div height to initial
        setTimeout(() => {
            infobar.classList.remove("active");  

            // Show and change the text content of the button
            buyingGuideBtn.classList.remove("hide");
            buyingGuideBtn.textContent = "Read More";
        }, 500);
    }
};

if (buyingGuideBtn) {
    buyingGuideBtn.addEventListener("click", toggleShowDropdown);
}