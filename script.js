const bars = document.querySelectorAll('.bar');
const amtOnHover = document.querySelectorAll('.amount-on-hover');
let mediaQuery = window.matchMedia('(min-width: 576px)');
const today = new Date();
const amtArray = new Array();
let value = 0;

window.addEventListener('load', makeGraph());
window.addEventListener('load', () => {
    amtOnHover.forEach(element => element.style.visibility = 'hidden');
});

bars.forEach(bar => {
    bar.addEventListener('mouseover', () => {
        removeHoverElement();
        const id = bar.textContent;
        let element = document.getElementById(id);
        id == 0 ? value = amtArray[6] : value = amtArray[id - 1];
        element.innerHTML = `$${value}`;
        element.style.visibility = 'visible';
        removeLastElement(element);
    });
});

function removeLastElement(element) {
    bars.forEach(bar => {
        bar.addEventListener('mouseleave', () => { element.style.visibility = 'hidden' });
    });
}

function removeHoverElement() {
    amtOnHover.forEach(element => element.style.visibility = 'hidden');
}

async function makeGraph() {
    const result = await fetch('./data.json');
    const data = await result.json();

    let i = 0;
    bars.forEach(bar => {
        let amt = data[i].amount;
        let height = 0;
        if (mediaQuery.matches)
            height = `${amt * 2.5}px`;
        else
            height = `${amt * 3}px`;
        bar.style.height = height;
        amtArray[i] = amt;
        i++;

        if (today.getDay() == i) {
            bar.classList.add('active');
        }
    });
}