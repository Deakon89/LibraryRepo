     
document.addEventListener("DOMContentLoaded", (e) => {
    const splash = document.querySelector(".splash");
    setTimeout(() => {
        splash.classList.add("fade-out");
    }, 2000);
    setTimeout(() => {
        splash.remove();
    }, 2200);
}); 
