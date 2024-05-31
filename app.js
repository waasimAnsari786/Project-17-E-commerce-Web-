// localStorage.removeItem("productDetails")
// navbar's code
import { navBarShowHide } from "./functions.js";
import { navbarParent, productStock } from "./variables.js";

if (navbarParent) {
	navbarParent.addEventListener("click", (evt) => {
		if (evt.target.classList.contains("fa-solid")) {
			navBarShowHide();
		}
	});
}


// navbar's code end









// products section's code
import { productMainDiv } from "./variables.js";
import { chooseQuantityOfProduct } from "./functions.js";
import { addToCartBtnFunc , createNotfyDivAndSaveDataOnLS , createAnObjForSavingDataOnLocalStorageFunc } from "./functions.js";

if (productMainDiv) {
	productMainDiv.addEventListener("click", (evt) => {
		if (evt.target.classList.contains("plus-btn")) {
			let updatedElem = evt.target.parentElement.nextElementSibling.firstElementChild;
			let stock = evt.target.closest(".product-mb").querySelector(".product-stock").innerText.split(" ");
			chooseQuantityOfProduct(true, updatedElem, stock.at(-1));
		}
	
		else if (evt.target.classList.contains("minus-btn")) {
			let updatedElem = evt.target.parentElement.previousElementSibling.firstElementChild;
			chooseQuantityOfProduct(false, updatedElem, undefined);
		}
	
		else if (evt.target.classList.contains("add-to-cart-btn") || evt.target.classList.contains("fa-cart-shopping") || evt.target.innerText.toLowerCase() === 'add to cart') {
			addToCartBtnFunc(evt.target, createNotfyDivAndSaveDataOnLS , createAnObjForSavingDataOnLocalStorageFunc);
		}
	});
}


// products section's code end