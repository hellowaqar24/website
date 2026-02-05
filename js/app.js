const pages = {
    home: 'pages/home.html',
    blog: 'pages/blog.html',
    'blog/conquer-procrastination': 'pages/conquer-procrastination.html',
    now: 'pages/now.html',
    courses: 'pages/courses.html',
    'courses/cs50x': 'pages/cs50x.html'
};
            
            <div style="margin-top: 60px; padding-top: 40px; border-top: 1px solid var(--border);">
                <p style="margin-bottom: 8px;">
                    <span style="display: inline-block; width: 90px;">Reach out:</span>
                    [<a href="mailto:waqarch1124@gmail.com" class="bracket-link">waqarch1124@gmail.com</a>] or @waqarisawesome on Discord
                </p>
                
                <p style="margin-bottom: 0;">
                    <span style="display: inline-block; width: 90px;">Find me:</span>
                    [<a href="https://github.com/hellowaqar24" target="_blank" class="bracket-link">GitHub</a>]
                    [<a href="https://x.com/waqarisawesome" target="_blank" class="bracket-link">X</a>]
                    [<a href="https://reddit.com/user/No_Report4868" target="_blank" class="bracket-link">Reddit</a>]
                </p>
                
                <p style="margin-top: 20px; font-size: 14px; color: var(--text-dim);">
                    P.S: If you wanna contact me I generally respond to most messages! 😊
                </p>
            </div>
        </div>
;

const pageTitles = {
    'home': 'Waqar Chaudhry - Home',
    'blog': 'Blog - Waqar Chaudhry',
    'blog/conquer-procrastination': 'Conquer Procrastination - Waqar Chaudhry',
    'now': 'Now - Waqar Chaudhry',
    'courses': 'Courses - Waqar Chaudhry',
    'courses/cs50x': 'CS50x - Waqar Chaudhry'
};

async function router() {
    const hash = window.location.hash.slice(1) || 'home';
    const app = document.getElementById('app');
    
    // Update page title
    document.title = pageTitles[hash] || 'Waqar Chaudhry';
    
    let pagePath = pages[hash];
    
    // If not found, try just the first part
    if (!pagePath) {
        const page = hash.split('/')[0];
        if (pages[page]) {
            pagePath = pages[page];
            document.title = pageTitles[page] || 'Waqar Chaudhry';
        } else {
            pagePath = pages.home;
            document.title = pageTitles['home'];
        }
    }
    
    try {
        const response = await fetch(pagePath);
        if (response.ok) {
            app.innerHTML = await response.text();
        } else {
            app.innerHTML = '<p>Page not found</p>';
        }
    } catch (error) {
        console.error('Error loading page:', error);
        app.innerHTML = '<p>Error loading page</p>';
    }
    
    // Update active states
    setTimeout(() => {
        document.querySelectorAll('nav a').forEach(link => {
            const href = link.getAttribute('href').slice(1);
            const currentPage = hash.split('/')[0];
            const linkPage = href.split('/')[0];
            if (linkPage === currentPage) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }, 0);
}

window.addEventListener('hashchange', router);
window.addEventListener('load', router);
    
// Handle all clicks on links
document.addEventListener('click', (e) => {
    const target = e.target.closest('a');
    if (target && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const hash = target.getAttribute('href');
        window.location.hash = hash;
        router();
    }
});

// Handle email form submission
document.addEventListener('submit', (e) => {
    if (e.target.id === 'emailForm') {
        e.preventDefault();
        const email = document.getElementById('emailInput').value;
        const message = document.getElementById('formMessage');
        
        // Show success message
        message.textContent = `Thanks! I'll send interesting things to ${email} very rarely.`;
        message.style.display = 'block';
        message.style.color = 'var(--accent)';
        
        // Clear the form
        document.getElementById('emailInput').value = '';
        
        // Hide message after 5 seconds
        setTimeout(() => {
            message.style.display = 'none';
        }, 5000);
    }
});
