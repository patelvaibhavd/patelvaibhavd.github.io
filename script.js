// Global Configuration
const APP_CONFIG = {
    enableCollapsibleSections: false // Set to false to disable section collapse/expand
};

document.addEventListener('DOMContentLoaded', () => {
    // 1. Loader Logic
    const loader = document.getElementById('loader');
    if (loader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.style.display = 'none';
                }, 500);
            }, 800);
        });
    }

    // 2. Theme Toggle Logic
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    if (themeToggle) {
        const icon = themeToggle.querySelector('i');

        // Check for saved theme
        const savedTheme = localStorage.getItem('theme') || 'dark-mode';
        body.classList.add(savedTheme);
        updateThemeIcon(savedTheme, icon);

        themeToggle.addEventListener('click', () => {
            if (body.classList.contains('dark-mode')) {
                body.classList.remove('dark-mode');
                body.classList.add('light-mode');
                localStorage.setItem('theme', 'light-mode');
                updateThemeIcon('light-mode', icon);
            } else {
                body.classList.remove('light-mode');
                body.classList.add('dark-mode');
                localStorage.setItem('theme', 'dark-mode');
                updateThemeIcon('dark-mode', icon);
            }
        });
    }

    function updateThemeIcon(theme, icon) {
        if (!icon) return;
        if (theme === 'dark-mode') {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        } else {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
    }

    // 3. Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // 4. Mobile Menu Logic
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            const isVisible = navLinks.style.display === 'flex';
            if (window.innerWidth <= 992) {
                navLinks.style.display = isVisible ? 'none' : 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.background = 'var(--bg-primary)';
                navLinks.style.padding = '2rem';
                navLinks.style.borderBottom = '1px solid var(--border-color)';
            }
        });
    }

    // 5. Scroll Reveal Animation
    const sections = document.querySelectorAll('section');
    const options = {
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
                observer.unobserve(entry.target);
            }
        });
    }, options);

    sections.forEach(section => {
        section.classList.add('hidden-section');
        observer.observe(section);
    });

    // 6. Download CV Animation
    const downloadBtn = document.getElementById('download-cv');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', (e) => {
            e.preventDefault();
            downloadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Preparing...';

            setTimeout(() => {
                downloadBtn.innerHTML = '<i class="fas fa-check"></i> Downloaded!';
                downloadBtn.style.background = '#10b981'; // Success green
                downloadBtn.style.color = '#fff';

                // Trigger actual download
                const link = document.createElement('a');
                link.href = 'VP-CV.pdf';
                link.download = 'Vaibhav_Patel_CV.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

                setTimeout(() => {
                    downloadBtn.innerHTML = '<i class="fas fa-download"></i> Download CV';
                    downloadBtn.style.background = '';
                    downloadBtn.style.color = '';
                }, 3000);
            }, 1500);
        });
    }

    // 7. Dynamic Experience Calculation
    function calculateExperience() {
        const experienceElements = document.querySelectorAll('.experience-years-count');
        experienceElements.forEach(el => {
            const startDateStr = el.getAttribute('data-start-date');
            if (!startDateStr) return;

            const startDate = new Date(startDateStr);
            const today = new Date();

            let years = today.getFullYear() - startDate.getFullYear();
            let months = today.getMonth() - startDate.getMonth();

            if (months < 0) {
                years--;
                months += 12;
            }

            let displayYears = years;
            if (months >= 6) {
                displayYears += 0.5;
            }

            el.textContent = `${displayYears}+`;
        });
    }

    // 8. Experience Duration Calculation for roles
    function calculateTimelineDurations() {
        const durationElements = document.querySelectorAll('.total-duration, .role-date');

        durationElements.forEach(el => {
            const startStr = el.getAttribute('data-start');
            let endStr = el.getAttribute('data-end');

            if (!startStr || !endStr) return;

            const startDate = new Date(startStr);
            const endDate = endStr.toLowerCase() === 'present' ? new Date() : new Date(endStr);

            let years = endDate.getFullYear() - startDate.getFullYear();
            let months = endDate.getMonth() - startDate.getMonth();

            if (months < 0) {
                years--;
                months += 12;
            }

            if (months === 12) {
                years++;
                months = 0;
            }

            let durationText = '';
            if (years > 0) {
                durationText += `${years} year${years > 1 ? 's' : ''}`;
            }
            if (months > 0) {
                durationText += `${years > 0 ? ' ' : ''}${months} month${months > 1 ? 's' : ''}`;
            }

            if (durationText) {
                const originalText = el.textContent.split('(')[0].trim();
                el.textContent = `${originalText} (${durationText})`;
            }
        });
    }

    calculateExperience();
    calculateTimelineDurations();

    // 9. Section Collapsible Logic
    if (APP_CONFIG.enableCollapsibleSections) {
        const sectionsToCollapse = ['expertise', 'experience', 'projects', 'poc', 'education', 'certifications', 'contact'];

        sectionsToCollapse.forEach(id => {
            const section = document.getElementById(id);
            if (!section) return;

            const container = section.querySelector('.container');
            const title = section.querySelector('.section-title');

            if (!container || !title) return;

            const headerToggle = document.createElement('div');
            headerToggle.className = 'section-header-toggle';
            headerToggle.appendChild(title);

            const icon = document.createElement('div');
            icon.className = 'toggle-icon';
            icon.innerHTML = '<i class="fas fa-chevron-up"></i>';
            headerToggle.appendChild(icon);

            const contentWrapper = document.createElement('div');
            contentWrapper.className = 'section-content-wrapper';

            const children = Array.from(container.children);
            children.forEach(child => {
                contentWrapper.appendChild(child);
            });

            container.appendChild(headerToggle);
            container.appendChild(contentWrapper);

            headerToggle.addEventListener('click', () => {
                toggleSection(section);
            });

            section.classList.add('collapsed');
        });

        function toggleSection(section, forceExpand = false) {
            if (forceExpand) {
                section.classList.remove('collapsed');
            } else {
                section.classList.toggle('collapsed');
            }
        }

        // Update Navigation to auto-expand
        document.querySelectorAll('.nav-links a, .nav-links-mobile a').forEach(link => {
            link.addEventListener('click', () => {
                const href = link.getAttribute('href');
                if (href && href.startsWith('#')) {
                    const targetId = href.substring(1);
                    const targetSection = document.getElementById(targetId);
                    if (targetSection && targetSection.classList.contains('collapsed')) {
                        toggleSection(targetSection, true);
                    }
                }
            });
        });
    }
});

// Reveal animation styles
const style = document.createElement('style');
style.textContent = `
    .hidden-section {
        opacity: 0;
        transform: translateY(50px);
        transition: all 0.8s ease-out;
    }
    .reveal {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);
