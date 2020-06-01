//Creates the text typing effect | lines 2-59
let TypeRole = (textElement, words, wait = 3000) => {
    this.textElement = textElement;
    this.words = words;
    this.text = "";
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    type();
    this.isDeleting = false;
}

let type = () => {
    const index = this.wordIndex % this.words.length;
    const fullText = this.words[index];

    if (this.isDeleting) {
        this.text = fullText.substring(0, this.text.length - 1)
    } else {
        this.text = fullText.substring(0, this.text.length + 1)
    }

    this.textElement.innerHTML = `<span class="text">${this.text}</span>`;

    let typeSpeed = 150;

    if (this.isDeleting) {
        typeSpeed /= 2;
    }

    if (!this.isDeleting && this.text === fullText) {
        typeSpeed = this.wait;

        this.isDeleting = true;
    } else if (this.isDeleting && this.text === "") {
        this.isDeleting = false;
        this.wordIndex++;
        typeSpeed = 500;
    }

    setTimeout(() => type(), typeSpeed);
}

document.addEventListener("DOMContentLoaded", init); // initializes typing text effect, side navigation, and internal links in the header

function init() {
    const textElement = document.getElementsByClassName("typed-text")[0];
    const words = JSON.parse(textElement.getAttribute("data-words"));
    const wait = textElement.getAttribute("data-wait");
    let sideNav = document.getElementsByClassName("side-nav")[0];
    let internalLinks = document.getElementsByClassName("internal-links")[0];
    sideNav.style.width = "25px";
    if (window.matchMedia('(min-width: 1260px)').matches) {
        internalLinks.style.opacity = "1";
        internalLinks.style.top = "50%";
    } else if (window.matchMedia('(max-width: 1260px)').matches) {
        internalLinks.style.top = "0%";
    }
    TypeRole(textElement, words, wait);
} //end typing text effect



//testimonial UI | lines 64-79
let testimonialButton = document.getElementsByClassName("testimonial-button");
let testimonialCard = document.getElementsByClassName("testimonial-card");
let isActive = false;
for (let i = 0; i < testimonialButton.length; i++) {
    testimonialButton[i].addEventListener("click", function() {
        for (let j = 0; j < testimonialButton.length; j++) {
            testimonialButton[j].classList.remove("active");
            testimonialCard[j].style.opacity = "0";
        }
        isActive = true;
        if (isActive) {
            testimonialButton[i].classList.add("active");
            testimonialCard[i].style.opacity = "100%";
        }
    })
} //end testimonial UI

//smooth scrolls links just in case browser doesn't support CSS smooth-scroll behavior | lines 82-103
const links = document.getElementsByTagName("A");
for (let i = 0; i < links.length; i++) {
    links[i].onclick = scrollToAnchors;
}

function scrollToAnchors(respond = null) {
    const distanceToTop = el => Math.floor(el.getBoundingClientRect().top);
    var targetID = (respond) ? respond.getAttribute('href') : this.getAttribute('href');
    const targetAnchor = document.querySelector(targetID);
    if (!targetAnchor) return;
    const originalTop = distanceToTop(targetAnchor);
    window.scrollBy({ top: originalTop, left: 0, behavior: 'smooth' });
    const checkIfDone = setInterval(function() {
        const atBottom = window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 2;
        if (distanceToTop(targetAnchor) === 0 || atBottom) {
            targetAnchor.tabIndex = '-1';
            targetAnchor.focus();
            window.history.pushState('', '', targetID);
            clearInterval(checkIfDone);
        }
    }, 100);
} //end smooth scroll

//begin mobile navigation and menu | lines 106-134
let hamburgerNav = document.getElementsByClassName("hamburger-nav")[0];
let hamburgerMenu = document.getElementsByClassName("hamburger-menu")[0];
let dissolveClass = document.getElementsByClassName("dissolve");
document.addEventListener("click", function(e) {
    if (e.target.closest(".hamburger-nav")) {
        return;
    } else if (hamburgerNav.classList.contains("close-hamburger-nav")) {
        for (let i = 0; i < dissolveClass.length; i++) {
            dissolveClass[i].style.transition = "opacity 125ms ease";
        }
        hamburgerNav.classList.remove("close-hamburger-nav");
        hamburgerMenu.classList.remove("hamburger-menu-visible");
    }
});
hamburgerNav.addEventListener("click", function() {
    if (hamburgerNav.classList.contains("close-hamburger-nav")) {
        for (let i = 0; i < dissolveClass.length; i++) {
            dissolveClass[i].style.transition = "opacity 125ms ease";
        }
        hamburgerNav.classList.remove("close-hamburger-nav");
        hamburgerMenu.classList.remove("hamburger-menu-visible");
    } else {
        for (let i = 0; i < dissolveClass.length; i++) {
            dissolveClass[i].style.transition = "opacity 500ms 250ms ease";
        }
        hamburgerNav.classList.add("close-hamburger-nav");
        hamburgerMenu.classList.add("hamburger-menu-visible");
    }
}); //end mobile nav and menu

//show description of works when clicked, mostly for mobile | lines 136-146
let workBoxContainer = document.getElementsByClassName("box");
for (let i = 0; i < workBoxContainer.length; i++) {
    workBoxContainer[i].addEventListener("click", function() {
        if (workBoxContainer[i].classList.contains("box-active")) {
            workBoxContainer[i].classList.remove("box-active");
        } else {
            workBoxContainer[i].classList.add("box-active");
        }
    });
}

//dynamically insert the copyright date so i don't have to manually change it
let yearClass = document.getElementsByClassName("year")[0];
let date = new Date();
let year = date.getFullYear();
yearClass.innerHTML = year;

function hasTouch() {
    return 'ontouchstart' in document.documentElement ||
        navigator.maxTouchPoints > 0 ||
        navigator.msMaxTouchPoints > 0;
}

if (hasTouch()) { // remove all the :hover stylesheets
    try { // prevent exception on browsers not supporting DOM styleSheets properly
        for (var si in document.styleSheets) {
            var styleSheet = document.styleSheets[si];
            if (!styleSheet.rules) continue;

            for (var ri = styleSheet.rules.length - 1; ri >= 0; ri--) {
                if (!styleSheet.rules[ri].selectorText) continue;

                if (styleSheet.rules[ri].selectorText.match(':hover')) {
                    styleSheet.deleteRule(ri);
                }
            }
        }
    } catch (ex) {}
}