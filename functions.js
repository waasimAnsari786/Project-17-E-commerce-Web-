// navbar's code

import { hiddenNavDiv, navbarParent, productStocks } from "./variables.js";
import { countObj } from "./objects.js";
let count = 1;

export const navBarShowHide = () => {
	if (!countObj.count) {
		setTimeout(() => {
			hiddenNavDiv.style.transform = 'scale(1)';
		}, 100);
		navbarParent.style.marginBottom = '20rem';
		countObj.count = true;
	}

	else {
		hiddenNavDiv.style.transform = 'scale(0)';
		setTimeout(() => {
			navbarParent.style.marginBottom = '0rem';
		}, 50);
		countObj.count = false;
	}
};

// navbar's code end















// products section's code

// function of choosing the quantity of products

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
export const getdata = (keyName) => {
	return JSON.parse(localStorage.getItem(keyName));
};


// this function is for creating a notification div when user will add to cart
export const createProductAddedNotiDivFunc = (targetedElemID , msg) => {
	countObj.count++;

	let productAddedNotificationdiv = document.createElement("div");
	productAddedNotificationdiv.classList.add("product-added-notification-div");
	productAddedNotificationdiv.innerText = `Product ID ${targetedElemID} has ${msg}`;
	document.querySelector("body").prepend(productAddedNotificationdiv);

	productAddedNotificationdiv.style.position = 'fixed';
	productAddedNotificationdiv.style.zIndex = countObj.count;
	productAddedNotificationdiv.classList.add("product-added-notify-ani");

	setTimeout(() => {
		productAddedNotificationdiv.remove();
	}, 2000);
};

// function of updated the cart button's text which is placed in the navbar
const updateCartTextFuncForAC = () => {
	let dataOfLS = getdata("productDetails") || [];
	let cartText = document.querySelector(".cart-btn span").nextElementSibling;
	cartText.innerText = dataOfLS.length;
};

updateCartTextFuncForAC();

// this fucntion is for creating an object for saving data on local storage
export const createAnObjForSavingDataOnLocalStorageFunc = (targetedElem, creteNotifyDivCallbackFunc) => {
	let targetedID = targetedElem.closest(".product-mb").getAttribute("id").split("-").at(-1);
	let targetedQuantity = targetedElem.closest(".product-mb").querySelector(".num-btn").innerText;
	let targetedStock = targetedElem.closest(".product-mb").querySelector(".product-stock span");
	let newProductObj = {};
	newProductObj.pImg = targetedElem.closest(".product-mb").querySelector(".product-img img").src;
	newProductObj.pCatagory = targetedElem.closest(".product-mb").querySelector(".product-text").innerText;
	newProductObj.pName = targetedElem.closest(".product-mb").querySelector(".ctnr-2-text").innerText;
	newProductObj.pPrice = targetedElem.closest(".product-mb").querySelector(".ctnr-1-mb-text-2.mt-5").innerText.split("Rs")[0];
	newProductObj.pQuantity = targetedQuantity;
	newProductObj.pStock = targetedStock.innerText;
	newProductObj.pFinalStock = newProductObj.pStock - newProductObj.pQuantity;
	newProductObj.pID = targetedID;

	let arrForGetDataFromLocalStorage = getdata("productDetails") || [];

	if (!arrForGetDataFromLocalStorage.find(currElem => currElem.pImg === newProductObj.pImg)) {
		arrForGetDataFromLocalStorage.unshift(newProductObj);
		creteNotifyDivCallbackFunc(targetedID , "been added");
	}

	let matchingElem = arrForGetDataFromLocalStorage.find((currElem) => {
		return currElem.pImg === newProductObj.pImg;
	});

	if (matchingElem.pQuantity !== targetedQuantity) {
		matchingElem.pQuantity = targetedQuantity;
		matchingElem.pFinalStock = matchingElem.pStock - matchingElem.pQuantity;
		if (!arrForGetDataFromLocalStorage.find(currElem => currElem.pImg === newProductObj.pImg)) {
			arrForGetDataFromLocalStorage.unshift(newProductObj);
		}
	}

	targetedStock.innerText = matchingElem.pFinalStock
	localStorage.setItem("productDetails", JSON.stringify(arrForGetDataFromLocalStorage));
};

// function of add to cart button

export const addToCartBtnFunc = (targetedElem, createObjFroSavingDatacallBackFunc) => {
	createObjFroSavingDatacallBackFunc(targetedElem, createProductAddedNotiDivFunc);
	updateCartTextFuncForAC();
};

// function of add to cart button end


// function to notify user that the product he wants to buy, it's not available
export const notifyAboutStockFunc = (targetedElem) => {
	let targetedStock = targetedElem.closest(".product-mb").querySelector(".product-stock span");
	let targetedIncBtn = targetedElem.closest(".product-mb").querySelector(".plus-btn");
	let targetedAddToCartBtn = targetedElem.closest(".product-mb").querySelector(".add-to-cart-btn");
	let targetedID = targetedElem.closest(".product-mb").getAttribute("id").split("-").at(-1);

	if (targetedStock.innerText === '0') {
		targetedIncBtn.disabled = true;
		targetedAddToCartBtn.disabled = true;
		createProductAddedNotiDivFunc(targetedID , "not available");
	}

	else if (targetedStock.innerText > '0') {
		targetedIncBtn.disabled = false;
		targetedAddToCartBtn.disabled = false;
	}

	else{
		targetedStock.innerText = '0';
	}
};


// fnction to set the produts's stocks on local storage when page will refresh
const printLSDataFunc = () => {
	let arrOfLSData = getdata("productDetails") || [];
	let productCards = document.querySelectorAll(".product-mb");

	arrOfLSData.forEach(outerElement => {
		productCards.forEach(innerElement => {
			if (outerElement.pImg === innerElement.querySelector(".product-img img").src) {
				outerElement.pStock = innerElement.querySelector(".product-stock span").innerText;
				innerElement.querySelector(".num-btn").innerText = outerElement.pQuantity;
			}
		});
	});

	localStorage.setItem("productDetails" , JSON.stringify(arrOfLSData));
};

printLSDataFunc();

// products section's code end