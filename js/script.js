// ECMAScript Guide - Interactive JavaScript

// Mobile navigation toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Tab functionality for feature explorer
const tabButtons = document.querySelectorAll('.tab-btn');
const tabPanes = document.querySelectorAll('.tab-pane');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetTab = button.getAttribute('data-tab');
        
        // Remove active class from all buttons and panes
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabPanes.forEach(pane => pane.classList.remove('active'));
        
        // Add active class to clicked button and corresponding pane
        button.classList.add('active');
        document.getElementById(targetTab).classList.add('active');
    });
});

// Interactive code examples
function runExample(exampleId) {
    const output = document.getElementById(`${exampleId}-output`);
    output.innerHTML = '';
    output.style.display = 'block';
    
    try {
        // Capture console.log output
        const originalLog = console.log;
        const logs = [];
        console.log = (...args) => {
            logs.push(args.join(' '));
            originalLog.apply(console, args);
        };
        
        // Execute the example code
        switch(exampleId) {
            case 'template-literals':
                const name = 'John';
                const age = 30;
                const city = 'New York';

                // Old way (ES5)
                const message1 = 'Hello, my name is ' + name + 
                                ', I am ' + age + ' years old, ' +
                                'and I live in ' + city + '.';

                // New way (ES6)
                const message2 = `Hello, my name is ${name}, 
I am ${age} years old, and I live in ${city}.`;

                console.log(message1);
                console.log(message2);
                break;
                
            case 'destructuring':
                // Object destructuring
                const user = {
                    name: 'Alice',
                    age: 25,
                    email: 'alice@example.com',
                    address: {
                        city: 'Boston',
                        country: 'USA'
                    }
                };

                const { name: userName, age: userAge, address: { city: userCity } } = user;

                console.log(userName); // Alice
                console.log(userAge);  // 25
                console.log(userCity); // Boston

                // Array destructuring
                const colors = ['red', 'green', 'blue'];
                const [first, second, third] = colors;

                console.log(first, second, third);
                break;
                
            case 'optional-chaining':
                const user2 = {
                    name: 'John',
                    profile: {
                        avatar: {
                            url: 'https://example.com/avatar.jpg'
                        }
                    }
                };

                // Without optional chaining
                const avatarUrl1 = user2.profile && 
                                  user2.profile.avatar && 
                                  user2.profile.avatar.url;

                // With optional chaining
                const avatarUrl2 = user2.profile?.avatar?.url;

                console.log('Old way:', avatarUrl1);
                console.log('New way:', avatarUrl2);

                // With nullish coalescing
                const defaultUrl = user2.profile?.avatar?.url ?? 'default-avatar.jpg';
                console.log('Default:', defaultUrl);
                break;
        }
        
        // Restore console.log
        console.log = originalLog;
        
        // Display output
        logs.forEach(log => {
            const logLine = document.createElement('div');
            logLine.className = 'log-line';
            logLine.textContent = log;
            output.appendChild(logLine);
        });
        
    } catch (error) {
        const errorLine = document.createElement('div');
        errorLine.className = 'error-line';
        errorLine.textContent = `Error: ${error.message}`;
        output.appendChild(errorLine);
    }
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.timeline-item, .feature-card, .example-card, .resource-card');
    animateElements.forEach(el => observer.observe(el));
});

// Version comparison tool
function compareVersions(version1, version2) {
    const versions = {
        'ES1': 1, 'ES2': 2, 'ES3': 3, 'ES5': 5, 'ES6': 6, 'ES7': 7, 'ES8': 8, 'ES9': 9, 'ES10': 10,
        'ES11': 11, 'ES12': 12, 'ES13': 13, 'ES14': 14, 'ES15': 15,
        'ES2015': 6, 'ES2016': 7, 'ES2017': 8, 'ES2018': 9, 'ES2019': 10,
        'ES2020': 11, 'ES2021': 12, 'ES2022': 13, 'ES2023': 14, 'ES2024': 15
    };
    
    return versions[version1] - versions[version2];
}

// Feature search functionality
function searchFeatures(query) {
    const featureCards = document.querySelectorAll('.feature-card');
    const searchTerm = query.toLowerCase();
    
    featureCards.forEach(card => {
        const text = card.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Add search functionality if search input exists
const searchInput = document.querySelector('.search-input');
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        searchFeatures(e.target.value);
    });
}

// Syntax highlighting for code blocks
function highlightSyntax() {
    const codeBlocks = document.querySelectorAll('pre code');
    codeBlocks.forEach(block => {
        // Basic syntax highlighting
        let html = block.innerHTML;
        
        // Keywords
        html = html.replace(/\b(const|let|var|function|class|if|else|for|while|return|new|this|async|await|try|catch|finally)\b/g, 
                           '<span class="keyword">$1</span>');
        
        // Strings
        html = html.replace(/(['"`])(.*?)\1/g, '<span class="string">$1$2$1</span>');
        
        // Numbers
        html = html.replace(/\b(\d+)\b/g, '<span class="number">$1</span>');
        
        // Comments
        html = html.replace(/(\/\/.*$)/gm, '<span class="comment">$1</span>');
        
        block.innerHTML = html;
    });
}

// Initialize syntax highlighting
document.addEventListener('DOMContentLoaded', highlightSyntax);

// Copy code functionality
function addCopyButtons() {
    const codeBlocks = document.querySelectorAll('pre');
    codeBlocks.forEach(block => {
        const copyButton = document.createElement('button');
        copyButton.className = 'copy-btn';
        copyButton.innerHTML = '<i class="fas fa-copy"></i>';
        copyButton.title = 'Copy code';
        
        copyButton.addEventListener('click', () => {
            const code = block.querySelector('code').textContent;
            navigator.clipboard.writeText(code).then(() => {
                copyButton.innerHTML = '<i class="fas fa-check"></i>';
                setTimeout(() => {
                    copyButton.innerHTML = '<i class="fas fa-copy"></i>';
                }, 2000);
            });
        });
        
        block.appendChild(copyButton);
    });
}

// Initialize copy buttons
document.addEventListener('DOMContentLoaded', addCopyButtons);

// Progress indicator for timeline
function updateTimelineProgress() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const totalItems = timelineItems.length;
    
    timelineItems.forEach((item, index) => {
        const progress = ((index + 1) / totalItems) * 100;
        item.style.setProperty('--progress', `${progress}%`);
    });
}

// Initialize timeline progress
document.addEventListener('DOMContentLoaded', updateTimelineProgress);

// Dark mode toggle (if implemented)
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDark);
}

// Check for saved dark mode preference
document.addEventListener('DOMContentLoaded', () => {
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'true') {
        document.body.classList.add('dark-mode');
    }
});

// Export functions for global access
window.runExample = runExample;
window.searchFeatures = searchFeatures;
window.toggleDarkMode = toggleDarkMode; 