document.addEventListener('DOMContentLoaded', () => {
    // Existing code...

    const resetButton = document.getElementById('resetCalendars');

    if (resetButton) {
        resetButton.addEventListener('click', () => {
            resetAllCalendars();
        });
    }

    function resetAllCalendars() {
        // List of habit types corresponding to the calendar IDs
        const habits = ['recycling', 'trees', 'compost', 'walking', 'showers', 'bags'];

        habits.forEach(habit => {
            const habitKey = `${habit}Committed`;
            // Clear localStorage for each habit's calendar
            for (let day of ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']) {
                localStorage.removeItem(`${habit}-calendar-${day}`);
            }
            localStorage.removeItem(habitKey); // Optionally clear the commitment status
        });

        // Show a toast notification to confirm reset
        showToast('All calendars have been reset!');
    }

    function showToast(message) {
        // Create a toast element
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerText = message;

        // Append toast to the body
        document.body.appendChild(toast);

        // Remove the toast after 3 seconds
        setTimeout(() => {
            toast.remove();
        }, 3000);
    }
});
