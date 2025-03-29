document.addEventListener('DOMContentLoaded', () => {
    const calendars = ['recycling-calendar', 'trees-calendar', 'compost-calendar', 'bags-calendar', 'showers-calendar', 'walking-calendar'];  // List of calendar IDs

    function eachCalendar(calendarId) {
        const calendar = document.getElementById(calendarId); 
        console.log(calendarId)
        if (!calendar) return; 

        const days = calendar.querySelectorAll('.day'); 

        // loops through each 'day' element
        days.forEach(day => {
            const dayTrue = calendarId + '-' + day.dataset.day;

            if (localStorage.getItem(dayTrue) === 'active') {
                day.classList.add('active');  
            }
        });
        
        // clicks for each 
        days.forEach(day => {
            day.addEventListener('click', () => { 
                day.classList.toggle('active'); 

                const dayTrue = calendarId + '-' + day.dataset.day;

                if (day.classList.contains('active')) {
                    localStorage.setItem(dayTrue, 'active'); 
                } else {
                    localStorage.removeItem(dayTrue);
                }
            });
        });
    }

    calendars.forEach(calendarId => {
        eachCalendar(calendarId);
    });
});


document.addEventListener('DOMContentLoaded', () => {
    // checks data-habit attribute on all habit pages
    const habitPage = document.querySelector('.habit-page');
    
    if (habitPage) {
        const habitType = habitPage.getAttribute('data-habit');
        const commitButton = habitPage.querySelector('.commit-button');
        const calendar = habitPage.querySelector('.weekly-calendar');
        const isCommitted = localStorage.getItem(`${habitType}Committed`) === 'true';

        // update UI based on the commitment status
        if (isCommitted) {
            commitButton.textContent = 'Uncommit Habit';
            commitButton.style.backgroundColor = 'grey';
            calendar.style.display = 'block'; // Show calendar if committed
        } else {
            calendar.style.display = 'none'; // Hide calendar if not committed
        }

        commitButton.addEventListener('click', () => {
            const currentlyCommitted = localStorage.getItem(`${habitType}Committed`) === 'true';

            if (currentlyCommitted) {
                // uncommit
                localStorage.removeItem(`${habitType}Committed`);
                commitButton.textContent = 'Commit Habit';
                commitButton.style.backgroundColor = '';
                calendar.style.display = 'none';
            } else {
                // commit
                localStorage.setItem(`${habitType}Committed`, 'true');
                commitButton.textContent = 'Uncommit Habit';
                commitButton.style.backgroundColor = 'grey';
                calendar.style.display = 'block';
            }
        });
    }
});




