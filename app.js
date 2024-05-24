// navbar's code
let navBtn = document.querySelector(".nav-btn");
let navbarParent = document.querySelector(".my-nav");
let hiddenNavDiv = document.querySelector(".my-nav-inner div");
let count = true;

const navBarShowHide = () => {
    let headerCtnr = document.querySelector(".header-ctnr");
    if (count) {
            hiddenNavDiv.style.transform = 'scale(1)';
            headerCtnr.style.marginTop = '20rem';
            count = false;
        }

        else{
            hiddenNavDiv.style.transform = 'scale(0)';
            headerCtnr.style.marginTop = '0rem';
            count = true;
        }
};

navbarParent.addEventListener("click" , (evt) => {
    if (evt.target.classList.contains("fa-solid")) {
        navBarShowHide();
    }
}); 