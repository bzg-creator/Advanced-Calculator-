const educationSelect = document.getElementById("education");
const netWorthSelect = document.getElementById("net-worth");
const casteSelect = document.getElementById("caste");
const skillsCheckboxes = [
    { id: "musical", value: 10 },
    { id: "cook", value: 20 },
    { id: "character", value: 15 },
    { id: "sings", value: 10 }
];
const ageRadios = document.getElementsByName("age");
const reputationCheckboxes = [
    { id: "gossip-parents", multiplier: 0.85 },
    { id: "gossip-character", multiplier: 0.9 },
    { id: "general-gossip", adjustment: -20 }
];

const nameInput = document.getElementById("name");
const startingBidInput = document.getElementById("starting_bid");
const loveLetterTextarea = document.getElementById("love_letter");

const calculateTotalPrice = () => {
    let name = nameInput.value;
    let price = Number(startingBidInput.value);
    const loveLetter = loveLetterTextarea.value;

    if (!name || !price || price < 0) { 
        alert("Enter both the name and starting bid (positive number).");
        return;
    }

    price *= Number(educationSelect.value);
    price *= Number(netWorthSelect.value);
    price += Number(casteSelect.value);

    const skillPrice = skillsCheckboxes
        .filter(skill => document.getElementById(skill.id).checked)
        .reduce((acc, skill) => acc + skill.value, 0);
    price += skillPrice;

    ageRadios.forEach((radio) => {
        if (radio.checked) {
            price *= Number(radio.value);
        }
    });

    reputationCheckboxes.forEach((rep) => {
        if (document.getElementById(rep.id).checked) {
            if (rep.multiplier) price *= rep.multiplier;
            if (rep.adjustment) price += rep.adjustment;
        }
    });

    const person = {
        name: name,
        price: price.toFixed(2),
        love_letter: loveLetter
    };

    document.getElementById("final_price_display").innerHTML = `
        <p>The final price for ${person.name} is $${person.price}</p>
        <p>Your love letter:</p>
        <p>${person.love_letter}</p>
    `;
};

document.getElementById("calculate_final").addEventListener("click", calculateTotalPrice);
