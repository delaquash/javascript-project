const loadText = document.querySelector('.loading-text');
const bg = document.querySelector('.bg');

let load = 0;

let int = setInterval(blurring, 30);

function blurring() {
    // this is to increment the load by +1
    load ++

    // conditional statment to stop loading when it gets to 109
    if(load > 99){
        clearInterval(int)
    }
    loadText.innerText = `${load}%`
    loadText.style.opacity= scale(load, 0, 100, 1, 0)
    bg.style.filter = `blur(${scale(load, 0, 100, 30, 0)}px)`
}

function scale (number, inMin, inMax, outMin, outMax) {
    return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
} 