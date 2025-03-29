document.addEventListener("DOMContentLoaded", function() {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = 'css/components/navbar.css';  // path to your navbar CSS file
    document.head.appendChild(link);

    const headerHTML = `
        <div class="sidebar">
            <a href="home.html" class="sidebar-item">
                <i class="fas fa-home"></i>
                <span>Home</span>
            </a>
            <a href="habits.html" class="sidebar-item">
                <i class="fa-solid fa-calendar-week"></i>
                <span>Habits</span>
            </a>
            <a href="databases.html" class="sidebar-item">
                <i class="fas fa-book"></i>
                <span>Databases</span>
            </a>
        </div>
    `;
    document.body.insertAdjacentHTML('afterbegin', headerHTML);
});
