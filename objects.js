// navbar's object
export let countObj = {
	count: false,
	arr: [],
};

// product'sobject
import { productImg, productCatogry, productMinusBtn, productName, productNumBtn, productPlusBtn, productPrice, productAddToCartBtn } from "./variables.js";

let splitedPrice = "0";
if (productPrice) {
    splitedPrice = productPrice.innerText.split("Rs");
}

export const produtObj = {
    pImg: productImg ? productImg.src : "",
    pCatagory: productCatogry ? productCatogry.innerText : "",
    pMinusBtn: productMinusBtn ? productMinusBtn.innerText : "",
    pName: productName ? productName.innerText : "",
    pNumBtn: productNumBtn ? productNumBtn.innerText : "",
    pPlusBtn: productPlusBtn ? productPlusBtn.innerText : "",
    pPrice: splitedPrice[0],
};
