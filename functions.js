// navbar's code

import { hiddenNavDiv } from "./variables.js";
import { countObj } from "./objects.js";
let count = 1;

export const navBarShowHide = () => {
	let headerCtnr = document.querySelector(".header-ctnr");
	let cnFormMainSec = document.querySelector(".cn-form-main-sec");
	if (!countObj.count) {
		setTimeout(() => {
			hiddenNavDiv.style.transform = 'scale(1)';
		}, 100);

		if (headerCtnr) {
			headerCtnr.style.marginTop = '20rem';
		}
		
		else{
			cnFormMainSec.style.marginTop = '20rem';
		}
		countObj.count = true;
	}

	else {
		hiddenNavDiv.style.transform = 'scale(0)';
		setTimeout(() => {
			if (headerCtnr) {
				headerCtnr.style.marginTop = '0rem';
			}
			
			else{
				cnFormMainSec.style.marginTop = '0rem';
			}
		}, 50);
		countObj.count = false;
	}
};

// navbar's code end







// add to cart page's code start

// this function is for creating a div with some children elements on add to cart page and add the saved data on local storage inside this div
const createDivOnAddToCartPageFunc = () => {
	let mainDiv = document.createElement("div");
	mainDiv.classList.add("main-div-of-add-to-cart" , "container");
	mainDiv.innerHTML = `<div class="row">
							<div class="col-1 rough"></div>
							<div class="col-1 rough"></div>
							<div class="col-1 rough"></div>
							<div class="col-1 rough"></div>
							<div class="col-2 rough"></div>
							<div class="col-2 rough"></div>
						</div>`;

	let targetedDiv = document.querySelector(".add-to-cart-ctnr");
	console.log(targetedDiv);
};









// products section's code

// function of choosing the quantity of products
import { produtObj } from "./objects.js";

export const chooseQuantityOfProduct = (increment, updatedElem, stock) => {
	countObj.count = updatedElem.innerText;
	if (increment) {
		countObj.count++;
		if (countObj.count > stock) {
			countObj.count = stock;
		}
	} else {
		countObj.count--;
		if (countObj.count < 1) {
			countObj.count = 1;
		}
	}

	updatedElem.innerText = countObj.count;
};
// function of choosing the quantity of products end



// function for getting data from local storage
const getdata = (keyName) => {
	return JSON.parse(localStorage.getItem(keyName));
};


// this function is for creating a notification div when user will add to cart
const createProductAddedNotiDivFunc = (targetedElemID) => {
	countObj.count++;

	let productAddedNotificationdiv = document.createElement("div");
	productAddedNotificationdiv.classList.add("product-added-notification-div");
	productAddedNotificationdiv.innerText = `Product ID ${targetedElemID} has been added`;
	document.querySelector("body").prepend(productAddedNotificationdiv);

	productAddedNotificationdiv.style.position = 'fixed';
	productAddedNotificationdiv.style.transform = 'translateX(0rem)';
	productAddedNotificationdiv.style.zIndex = countObj.count;

	setTimeout(() => {
		productAddedNotificationdiv.remove();
	}, 2000);
};


// function of updated the cart button's text which is placed in the navbar
export const updateCartTextFunc = (targetedElem , createNotifyDivCallbackFunc , createMainDivInAddToCartPageCallbackFunc) => {
	let targetElemId = targetedElem.closest(".product-mb").getAttribute("id").split("-");
	let splitedId = targetElemId.at(-1);
	
	let joinedId = targetElemId.join("-");
	let cartText = document.querySelector(".cart-btn span").nextElementSibling;
	
	if (!countObj.arr.includes(joinedId)) {
		createNotifyDivCallbackFunc(splitedId);
		createMainDivInAddToCartPageCallbackFunc();
		countObj.arr.push(joinedId)
		countObj.arr = [... new Set(countObj.arr)];
		cartText.innerText = count++;
	}
	return cartText.innerText;

};

// this fucntion is for creating an object for saving data on local storage
export const createAnObjForSavingDataOnLocalStorageFunc = (targetedElem , cartText) => {
	let newProductObj = Object.assign({} , produtObj);
	newProductObj.pImg = targetedElem.closest(".product-mb").querySelector(".product-img img").src;
	newProductObj.pCatagory = targetedElem.closest(".product-mb").querySelector(".product-text").innerText;
	newProductObj.pName = targetedElem.closest(".product-mb").querySelector(".ctnr-2-text").innerText;
	newProductObj.pPrice = targetedElem.closest(".product-mb").querySelector(".ctnr-1-mb-text-2.mt-5").innerText.split("Rs")[0];
	newProductObj.pStock = targetedElem.closest(".product-mb").querySelector(".product-stock").innerText.split(" ")[3];
	newProductObj.pPlusBtn = targetedElem.closest(".product-mb").querySelector(".plus-btn");
	newProductObj.pMinusBtn = targetedElem.closest(".product-mb").querySelector(".minus-btn");
	newProductObj.pNumBtn = targetedElem.closest(".product-mb").querySelector(".num-btn");
	newProductObj.cartText = cartText;
	
	let arrForGetDataFromLocalStorage = getdata("productDetails") || [];
	
	if (!arrForGetDataFromLocalStorage.find(currElem => currElem.pImg === newProductObj.pImg)) {
		arrForGetDataFromLocalStorage.unshift(newProductObj);
	}
	
	localStorage.setItem("productDetails", JSON.stringify(arrForGetDataFromLocalStorage));
};

// function of add to cart button

export const addToCartBtnFunc = (targetedElem , updateCartTextCallbackFunc , createObjFroSavingDatacallBackFunc) => {
	let retunredUpdatedCartText = updateCartTextCallbackFunc(targetedElem , createProductAddedNotiDivFunc , createDivOnAddToCartPageFunc);
	createObjFroSavingDatacallBackFunc(targetedElem , retunredUpdatedCartText);
};
// function of add to cart button end

// products section's code end