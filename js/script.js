//! Selectors
const modal = document.querySelector('.modal');
const btnDark = document.querySelector(".btn_dark");
const close = document.querySelector('.modal__close');

//! Switching tab selectors
const tabheaderItem = document.querySelectorAll(".tabheader__item");
const tabContent = document.querySelectorAll(".tabcontent");
const tabheaderContainer = document.querySelector(".tabheader__items");

//! Image slider selectors
const prevBtn = document.querySelector(".offer__slider-prev");
const nextBtn = document.querySelector(".offer__slider-next");
const slides = document.querySelectorAll(".offer__slide");
let current = document.querySelector("#current");
let total = document.querySelector("#total");


//! Open and Close Modal Section
// Open Modal function (inline)
const openModal = () => {
    modal.style.display = 'block';
};

// Close modal with close button
close.addEventListener('click', function () {
    modal.style.display = 'none';
});

// Close modal when click anywhere in window
window.onclick = function (e) {
    console.log(e.target)
    if (e.target === modal) {
        modal.style.display = "none";
    }
};

// Open Modal 2
btnDark.addEventListener("click", () => {
    modal.style.display = "block";
});

// Open modal at the end of the page
window.addEventListener("scroll", () => {
    if (window.innerHeight + window.pageYOffset >= document.body.scrollHeight) {
        modal.style.display = "block";
    }
});


//! Switching tab hide and show function
function hideContent() {
    tabContent.forEach((content) => {
        content.classList.add("hide");
        content.classList.remove("show", "fade");
    });

    tabheaderItem.forEach((tab) => {
        tab.classList.remove("tabheader__item_active");
    });
}


function showContent(i = 0) {
    tabContent[i].classList.add("show", "fade");
    tabContent[i].classList.remove("hide");
    tabheaderItem[i].classList.add("tabheader__item_active");
}

hideContent();
showContent();

tabheaderContainer.addEventListener("click", (e) => {
    const target = e.target;
    if (target) {
        tabheaderItem.forEach((tab, i) => {
            if (tab === target) {
                hideContent();
                showContent(i);
            }
        });
    }
});


//! Image Slider Section
let numberOfSlides = slides.length;
let slideNumber = 0;


function show(n) {
    if (n >= numberOfSlides) {
        slideNumber = 0;
    }

    slides.forEach((el) => {
        el.classList.add("fade", "hide");
        el.classList.remove("show");
    });

    slides[slideNumber].classList.add("show");
    slides[slideNumber].classList.remove("hide");

    current.textContent = `0${slideNumber + 1}`;
    total.textContent = `0${numberOfSlides}`;
}

show(slideNumber);

nextBtn.addEventListener("click", () => {
    show((slideNumber += 1));
});

prevBtn.addEventListener("click", () => {
    if (slideNumber === 0) {
        show((slideNumber += numberOfSlides - 1));
    } else {
        show((slideNumber += -1));
    }
});


//! Calorie Calculation

const genderCLick = Array.from(document.querySelector("#gender").children);

const activityClick = Array.from(
    document.querySelector(".calculating__choose_big").children
);

genderCLick.forEach((el) => {
    el.addEventListener("click", addClassActive);

    function addClassActive() {
        genderCLick.forEach((e) => {
            e.classList.remove("calculating__choose-item_active");
        });

        el.classList.add("calculating__choose-item_active");
    }
});

activityClick.forEach((el) => {
    el.addEventListener("click", addClassActive);

    function addClassActive() {
        activityClick.forEach((e) => {
            e.classList.remove("calculating__choose-item_active");
        });

        el.classList.add("calculating__choose-item_active");
    }
});

// Calculator
const inputs = document.querySelectorAll(".calculating__choose_medium input"),
    gender = document.querySelector("#gender"),
    activity = document.querySelector(".calculating__choose_big"),
    result = document.querySelector(".calculating__result");


inputs.forEach((el) => el.addEventListener("input", calculateCalories));

gender.addEventListener("click", function (e) {
    let target = e.target;
    if (target.classList.contains("calculating__choose-item")) {
        calculateCalories();
    }
});

activity.addEventListener("click", function (e) {
    let target = e.target;
    if (target.classList.contains("calculating__choose-item")) {
        calculateCalories();
    }
});

function calculateCalories() {
    let height, weight, age;

    const activeGender = gender.querySelector(".calculating__choose-item_active");
    const activeActivity = activity.querySelector(
        ".calculating__choose-item_active"
    ).dataset.ratio;

    inputs.forEach((el) => {
        if (el.getAttribute("id") === "height") height = el.value;
        if (el.getAttribute("id") === "weight") weight = el.value;
        if (el.getAttribute("id") === "age") age = el.value;
    });

    if (!height || !weight || !age) {
        result.textContent = "-";
    } else {
        if (activeGender.getAttribute("id") === "female") {
            result.textContent = parseInt(
                655.1 + 9.563 * weight + 1.85 * height - 4.676 * age * activeActivity
            );
        } else {
            result.textContent = parseInt(
                66.47 + 13.75 * weight + 5.003 * height - 6.755 * age * activeActivity
            );
        }
    }
}