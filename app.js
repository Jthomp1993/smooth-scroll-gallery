let current = 0;
let target = 0;
let ease = 0.1;

let windowWidth, containerHeight, imageHeight, skewDiff;

let container = document.querySelector('.container');
let images = Array.from(document.querySelectorAll('.img__wrap'));
console.log(images);

images.forEach((image, index) => {
    image.style.backgroundImage = `url(./images/${index + 1}.jpg)`;
});

function lerp(start, end, t) {
    return start * (1 - t) + end * t;
}
 
function setTransform(el, transform) {
    el.style.transform = transform;
}

function setUpAnimation() {
    windowWidth = window.innerWidth;
    containerHeight = container.getBoundingClientRect().height;
    imageHeight = containerHeight / (windowWidth > 768 ? images.length / 2 : images.length);

    document.body.style.height = `${containerHeight}px`;

    smoothScroll();
}

function smoothScroll() {
    current = lerp(current, target, ease);
    current = parseFloat(current.toFixed(2));
    target = window.scrollY;
    skewDiff = (current - target) * .015;

    setTransform(container, `translateY(${-current}px) skewY(${skewDiff}deg)`);
    updateImages();
    requestAnimationFrame(smoothScroll);
}

function updateImages() {
    let ratio = current / imageHeight;
    let intersectionRatioIndex, intersectionRatioValue;

    images.forEach((image, index) => {
        intersectionRatioIndex = windowWidth > 768 ? parseInt(index / 2) : index;
        intersectionRatioValue = ratio - intersectionRatioIndex;
        setTransform(image, `translateY(${intersectionRatioValue * 75}px)`);
    })
}

setUpAnimation();
