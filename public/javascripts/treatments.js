const energyTreatment = document.querySelector(".treatments_hero_grid--1");
const absenteeTreatment = document.querySelector(".treatments_hero_grid--2");
const energyButton = document.querySelector(".energy-button");
const absenteeButton = document.querySelector(".absentee-button");

// Click button when div is clicked
energyTreatment.addEventListener("click", () => {
    energyButton.click();
});

// Click button when div is clicked
absenteeTreatment.addEventListener("click", () => {
    absenteeButton.click();
});