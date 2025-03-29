document.addEventListener('DOMContentLoaded', () => { 
    const habitForm = document.getElementById('habitForm');
    const habitContainer = document.getElementById('habitContainer');

    loadHabits();

    habitForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // input field values
        const title = document.getElementById('habitTitle').value;
        const description = document.getElementById('habitDescription').value;

        if (!title) {
            showToast('Please enter a title!');
            return;
        }

        const habit = { title, description: description.trim() || '' }; // set description to '' if empty
        saveHabit(habit);
        localStorage.setItem(`${title}Committed`, Date.now()); // saves habit, uses timestamp for order

        showToast('Habit saved!');
        addHabitBox(habit, habitContainer.childElementCount);
        habitForm.reset();
    });

    function saveHabit(habit) {
        let habits = JSON.parse(localStorage.getItem('habits')) || []; // gets existing habits from local
        habits.push(habit); // adds new habit to array
        localStorage.setItem('habits', JSON.stringify(habits)); // save updated array back to local
    }

    function loadHabits() {
        let habits = JSON.parse(localStorage.getItem('habits')) || [];
        habits.forEach((habit, index) => addHabitBox(habit, index)); // renders
    }

    function addHabitBox(habit, index) {
        const newHabitBox = document.createElement('div');
        newHabitBox.classList.add('HabitBox');
        newHabitBox.style.flexDirection = 'column';

        newHabitBox.innerHTML = `
            <div class="HabitContent">
                    <i class="fas fa-star"></i>
                    <div class="HabitText">
                        <h2>${habit.title}</h2>
                        <p>${habit.description}</p>
                    </div>
            </div>
            <button class="delete-btn btn" >Delete</button>
            
        `;
    
        newHabitBox.querySelector('.delete-btn').addEventListener('click', () => {
            deleteHabit(index, habit.title);
            newHabitBox.remove();
        });
    
        habitContainer.appendChild(newHabitBox);
    }
    
    function deleteHabit(index, title) {
        let habits = JSON.parse(localStorage.getItem('habits')) || [];
        habits.splice(index, 1);
        localStorage.removeItem(`${title}Committed`);
        localStorage.setItem('habits', JSON.stringify(habits));
    }

    
    function showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerText = message;

        document.body.appendChild(toast);

        setTimeout(() => {
            toast.remove();
        }, 3000);
    }
});
