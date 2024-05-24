// navbar's code
let navBtn = document.querySelector(".nav-btn");
let navbarParent = document.querySelector(".my-nav");
let hiddenNavDiv = document.querySelector(".my-nav-inner div");
let count = true;

navbarParent.addEventListener("click" , (evt) => {
    if (evt.target.classList.contains("fa-solid")) {
        if (count) {
            hiddenNavDiv.style.transform = 'scale(1)';
            count = false;
        }

        else{
            hiddenNavDiv.style.transform = 'scale(0)';
            count = true;
        }
    }
}); 