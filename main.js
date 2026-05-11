document.addEventListener('DOMContentLoaded', () => {

    /* ----------------------------------------------------
       1. MEGA-MENU A-Z PROGRAM SEARCH FILTER
       Filters the CSS Grid of programs instantly.
    ---------------------------------------------------- */
    const searchInput = document.getElementById('program-search');
    const programsList = document.getElementById('programs-list');
    
    if (searchInput && programsList) {
        const programs = programsList.getElementsByTagName('a');

        searchInput.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            Array.from(programs).forEach(program => {
                const txtValue = program.textContent || program.innerText;
                if (txtValue.toLowerCase().indexOf(term) > -1) {
                    program.style.display = ""; // Keep grid layout integrity
                } else {
                    program.style.display = "none";
                }
            });
        });
    }

    /* ----------------------------------------------------
       2. SCROLLYTELLING (Intersection Observer)
       Syncs scrolling graphics with sticky text nodes.
    ---------------------------------------------------- */
    const visuals = document.querySelectorAll('.scroll-visual-block');
    const textItems = document.querySelectorAll('.scroll-text-item');

    if (visuals.length > 0 && textItems.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: '-40% 0px -40% 0px', // Trigger when item enters the middle 20% of screen
            threshold: 0
        };

        const scrollyObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Find corresponding text item via ID/Index
                    const index = Array.from(visuals).indexOf(entry.target);
                    
                    // Remove active from all
                    textItems.forEach(item => item.classList.remove('active'));
                    // Add active to current
                    if(textItems[index]) {
                        textItems[index].classList.add('active');
                    }
                }
            });
        }, observerOptions);

        visuals.forEach(visual => scrollyObserver.observe(visual));
    }

    /* ----------------------------------------------------
       3. STICKY PURCHASE BAR
       Triggers when scrolling past the Program Page hero.
    ---------------------------------------------------- */
    const stickyBar = document.getElementById('sticky-bar');
    const programHero = document.getElementById('program-hero-trigger');

    if (stickyBar && programHero) {
        const stickyObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                // If hero is NOT intersecting (scrolled past), show the bar
                if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
                    stickyBar.classList.add('visible');
                } else {
                    stickyBar.classList.remove('visible');
                }
            });
        }, {
            root: null,
            threshold: 0,
            rootMargin: "-80px 0px 0px 0px" // Offset by height of main nav
        });

        stickyObserver.observe(programHero);
    }

    /* ----------------------------------------------------
       4. TABBED INTERFACE LOGIC
       Swaps content without page reload.
    ---------------------------------------------------- */
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active states
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));

            // Add active state to clicked button and target pane
            btn.classList.add('active');
            const targetId = btn.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');
        });
    });
});
