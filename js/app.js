/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 *
*/
const sections = document.querySelectorAll('section');
const topButton = document.querySelector('#scroll-to-top');

const showElementCSS = 'opacity: 1; transition: 0.5s linear;';
const hideElementCSS = 'opacity: 0; transition: 0.5s linear;';
/**
 * End Global Variables
 * Start Helper Functions
 *
*/

/**
* @description Sets up event listeners for each menu item to scroll to.
* @param {string} section - The section to scroll to.
* @param {string} navMenuItem - The menu item to click.
*/
function scrollToSection(section, navMenuItem) {
    navMenuItem.addEventListener('click', function(event) {
        event.preventDefault();
        section.scrollIntoView({behavior: 'smooth'});
    });
}
/**
 * End Helper Functions
 * Begin Main Functions
 *
*/

/**
* @description Creates the navigation menu.
*/
function buildNavigation() {
    const navMenuList = document.querySelector('#navbar__list');

    // Loop through each section in the document.
    sections.forEach(section => {
        const navMenuItem = document.createElement('li');
        // Create a list item for each section using class, anchor tag, and the data-nav attribute.
        navMenuItem.innerHTML = `<a class="menu__link">${section.dataset.nav}</a>`;
        // Add the li element to the ul.
        navMenuList.appendChild(navMenuItem);

        // Add the scroll functionality to the navigation menu. Setup the event listener for each menu item.
        scrollToSection(section, navMenuItem);
    });

    // Add the navigation menu to the navbar.
    const navMenuBar = document.querySelector('.navbar__menu');
    navMenuBar.appendChild(navMenuList);
}

/**
 * @description Sets the active section based on the current section in the viewport. This applies to all the sections and all the navMenuItems that use the .menu__link class.
 */
function setActiveSection() {
    const navMenuActive = document.querySelectorAll('.menu__link');

    sections.forEach((section, index) => {
        const bounding = section.getBoundingClientRect();
        if (bounding.top <= 380 && bounding.bottom >= 350) {
            section.classList.add('active');
            navMenuActive[index].classList.add('active_anchor');
        } else {
            section.classList.remove('active');
            navMenuActive[index].classList.remove('active_anchor');
        }
    });
}

/**
 * @description Handles the visibility of the navigation menu. The menu bar is hidden after 5 seconds of inactivity.
 */
function handleNavMenuVisibility() {
    let menuTimeout = null;

    window.addEventListener('scroll', () => {
        const pageHeader = document.querySelector('.page__header');

        // Show the menu bar when the user scrolls.
        pageHeader.style.cssText = showElementCSS;
        // Set the active section based on the current section in the viewport.
        setActiveSection();

        // Clear any existing timeout to hide the menu bar.
        if (menuTimeout) {
            clearTimeout(menuTimeout);
        }

        // Hide the menu bar after 5 seconds of inactivity.
        menuTimeout = setTimeout(() => {
            // Show the menu bar when the user scrolls near the top of page.
            if (window.scrollY < 300) {
                pageHeader.style.cssText = showElementCSS;
            }
            // Hide the menu bar when the user scrolls down the page.
            else {
                pageHeader.style.cssText = hideElementCSS;
            }
        }, 5000);
    });
}

/**
 * @description Scrolls to the top of the page when the user clicks the button.
 */
const scrollToTop = () => {
    topButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * @description Shows / hides the scroll-to-top button when the user scrolls past section 1.
 */
const handleScrollToTopButtonVisibility = () => {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            topButton.style.cssText = showElementCSS;
        } else {
            topButton.style.cssText = hideElementCSS;
        }
    });
}

/**
 * End Main Functions
 * Begin Events
 *
*/

// Build menu
buildNavigation();
// Handles on/off visibility of the navigation menu.
handleNavMenuVisibility();
// Scroll to section on link click.
scrollToTop();
// Shows/hides the scroll to top button.
handleScrollToTopButtonVisibility();