// navbar's code
import { navBarShowHide } from "./functions.js";

import { navbarParent, productStock } from "./variables.js";

navbarParent.addEventListener("click" , (evt) => {
    if (evt.target.classList.contains("fa-solid")) {
        navBarShowHide();
    }
}); 

// navbar's code end

// products section's code
import { productMainDiv } from "./variables.js";
import { chooseQuantityOfProduct } from "./functions.js";
// import { chooseQuantityOfProduct2 } from "./functions.js";

let couter = 1;
productMainDiv.addEventListener("click", (evt) => {
    console.log(evt.target);
    if (evt.target.classList.contains("plus-btn")) {
        chooseQuantityOfProduct(true);
    } else if (evt.target.classList.contains("minus-btn")) {
        chooseQuantityOfProduct(false);
    }
});


// products section's code end