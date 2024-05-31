// navbar's code

import { hiddenNavDiv , navbarParent } from "./variables.js";
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
export const getdata = (keyName) => {
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


// fucntion for create a notification div when user will add any product and this function will also save data on local storage
export const createNotfyDivAndSaveDataOnLS = (targetedElem , createNotifyDivCallbackFunc , createMainDivInAddToCartPageCallbackFunc) => {
	let targetElemId = targetedElem.closest(".product-mb").getAttribute("id").split("-");
	let splitedId = targetElemId.at(-1);
	
	let joinedId = targetElemId.join("-");
	
	if (!countObj.arr.includes(joinedId)) {
		createNotifyDivCallbackFunc(splitedId);
		countObj.arr.push(joinedId)
		countObj.arr = [... new Set(countObj.arr)];
	}
};

// function of updated the cart button's text which is placed in the navbar
const updateCartTextFuncForAC = () => {
	let dataOfLS = getdata("productDetails") || [];
	let cartText = document.querySelector(".cart-btn span").nextElementSibling;
	cartText.innerText = dataOfLS.length;
};

updateCartTextFuncForAC();

// this fucntion is for creating an object for saving data on local storage
export const createAnObjForSavingDataOnLocalStorageFunc = (targetedElem) => {
	let newProductObj = Object.assign({} , produtObj);
	newProductObj.pImg = targetedElem.closest(".product-mb").querySelector(".product-img img").src;
	newProductObj.pCatagory = targetedElem.closest(".product-mb").querySelector(".product-text").innerText;
	newProductObj.pName = targetedElem.closest(".product-mb").querySelector(".ctnr-2-text").innerText;
	newProductObj.pPrice = targetedElem.closest(".product-mb").querySelector(".ctnr-1-mb-text-2.mt-5").innerText.split("Rs")[0];
	newProductObj.pStock = targetedElem.closest(".product-mb").querySelector(".product-stock").innerText.split(" ")[3];
	newProductObj.pQuantity = targetedElem.closest(".product-mb").querySelector(".num-btn").innerText;
	
	let arrForGetDataFromLocalStorage = getdata("productDetails") || [];
	
	if (!arrForGetDataFromLocalStorage.find(currElem => currElem.pImg === newProductObj.pImg)) {
		arrForGetDataFromLocalStorage.unshift(newProductObj);
	}
	
	localStorage.setItem("productDetails", JSON.stringify(arrForGetDataFromLocalStorage));
};

// function of add to cart button

export const addToCartBtnFunc = (targetedElem , createNotifyDivCallbackFunc , createObjFroSavingDatacallBackFunc) => {
	let retunredUpdatedCount = createNotifyDivCallbackFunc(targetedElem , createProductAddedNotiDivFunc);
	createObjFroSavingDatacallBackFunc(targetedElem , retunredUpdatedCount);
	updateCartTextFuncForAC();
};
// function of add to cart button end

// products section's code end