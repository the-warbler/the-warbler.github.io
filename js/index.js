const committedHabits = document.getElementById('committedHabits');

loadCommittedHabits();

function loadCommittedHabits() {
    let committed = [];

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);

        if (key.endsWith('Committed')) {
            const habitTitle = key.replace('Committed', '');
            committed.push(habitTitle);
        }
    }

    committed.sort();

    committed.forEach(habitTitle => {
        const habitDiv = document.createElement('div');
        habitDiv.textContent = habitTitle;
        habitDiv.classList.add('habit-item');
        committedHabits.appendChild(habitDiv);
    });
}

const date = new Date();
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
document.getElementById('month').innerText = monthNames[date.getMonth()];
document.getElementById('day').innerText = date.getDate();

const quotes = [
    "The Earth is what we all have in common. - Wendell Berry",
    "He that plants trees loves others besides himself. - Thomas Fuller",
    "In every walk with nature, one receives far more than he seeks. - John Muir",
    "Nature does not hurry, yet everything is accomplished. - Lao Tzu",
    "The environment is where we all meet. - Lady Bird Johnson"
];
document.getElementById('randomQuote').innerText = quotes[Math.floor(Math.random() * quotes.length)];

const facts = [
    "Forests cover about 31% of the Earth’s land area, but they're disappearing at an alarming rate of around 10 million hectares each year.", 
    "Renewable energy sources, like solar and wind, accounted for nearly 30% of global electricity generation in 2021.",
    "The Great Barrier Reef has lost about half of its coral cover since the 1970s, largely due to rising sea temperatures.",
    "One in five plant and animal species faces extinction due to climate change, habitat loss, and invasive species, with amphibians being particularly vulnerable."
];
document.getElementById('randomFact').innerText = facts[Math.floor(Math.random() * facts.length)];



