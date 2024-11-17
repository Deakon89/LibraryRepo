const splash = document.querySelector(".splash");


document.addEventListener("DOMContentLoaded", (e) => {

    setTimeout(() => {
        splash.classList.add("fade-out");
    }, 2000);
    setTimeout(() => {
        splash.remove();
    }, 2200);
}); 

