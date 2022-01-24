const header = document.querySelector("header");
const main = document.querySelector("main");
const sections = document.querySelectorAll("section");

let offset = 0;
main.addEventListener("scroll", () => {
    header.classList.toggle("sticky", main.scrollTop > 100);
})

const observer = new IntersectionObserver(entries => {
    entries.forEach(enrty => {
        enrty.target.classList.toggle("show", enrty.isIntersecting);
    })
})

sections.forEach(section => {
    observer.observe(section);
})

const workSlider = document.querySelector(".work-slider");
const sliderDisplay = document.querySelector(".slider-display")
const workDisplay = document.querySelectorAll(".work-display");
const arrayWork = [...workDisplay];

workDisplay[0].classList.add("data-active");
workDisplay[1].classList.add("data-next");
workDisplay[workDisplay.length - 1].classList.add("data-prev");

let changeSlide = offset => {
    const activeData = sliderDisplay.querySelector(".work-display.data-active");
    const prevData = sliderDisplay.querySelector(".work-display.data-prev");
    const nextData = sliderDisplay.querySelector(".work-display.data-next");

    let newIndex = arrayWork.indexOf(activeData) + offset;
    if (newIndex >= arrayWork.length) newIndex = 0;
    if (newIndex < 0) newIndex = arrayWork.length - 1;

    let prevIndex = newIndex - 1;
    if (prevIndex < 0) prevIndex = arrayWork.length - 1;
    
    let nextIndex = newIndex + 1;
    if (nextIndex >= arrayWork.length) nextIndex = 0;

    arrayWork[newIndex].classList.add("data-active");
    activeData.classList.remove("data-active");

    arrayWork[nextIndex].classList.add("data-next");
    nextData.classList.remove("data-next");

    arrayWork[prevIndex].classList.add("data-prev");
    prevData.classList.remove("data-prev");
}

let playSlider;
let repeater = () => {
    playSlider = setInterval(() => {

        changeSlide(1);
    }, 5000)
}
repeater();

const buttons = workSlider.querySelectorAll("button");
buttons.forEach(button => {
    button.addEventListener("click", () => {
        clearInterval(playSlider);
        const offset = button.className === "next" ? 1 : -1;

        changeSlide(offset);

        repeater();
    })
})

const toggler = document.querySelector(".toggler");
const nav = header.querySelector("nav");
const links = nav.querySelectorAll("a");

toggler.addEventListener("click", () => {
    toggler.checked === true ? nav.classList.add("showed") : nav.classList.remove("showed");
})

links.forEach(link => {
    link.addEventListener("click", () => {
        toggler.checked = false;
        nav.classList.remove("showed");
    })
})