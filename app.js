// navbar's code
import { navBarShowHide } from "./functions.js";

import { navbarParent, productStock } from "./variables.js";

navbarParent.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("fa-solid")) {
        navBarShowHide();
    }
});

// navbar's code end

// products section's code
import { productMainDiv } from "./variables.js";
import { chooseQuantityOfProduct } from "./functions.js";
import { addToCartBtnFunc } from "./functions.js";

productMainDiv.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("plus-btn")) {
        let updatedElem = evt.target.parentElement.nextElementSibling.firstElementChild;
        let stock = evt.target.closest(".product-mb").querySelector(".product-stock").innerText.split(" ");
        chooseQuantityOfProduct(true, updatedElem, stock[stock.length - 1]);
    }

    else if (evt.target.classList.contains("minus-btn")) {
        let updatedElem = evt.target.parentElement.previousElementSibling.firstElementChild;
        chooseQuantityOfProduct(false, updatedElem, undefined);
    }

    else if (evt.target.classList.contains("add-to-cart-btn")) {
        addToCartBtnFunc();
    }
});

// products section's code end