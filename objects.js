// navbar's object
export let countObj = {
    count : true,
};

// product's object
import { productImg , productCatogry , productMinusBtn , productName , productNumBtn , productPlusBtn , productPrice } from "./variables.js";

export let splitedPrice = productPrice.innerText.split("Rs");

export const produtObj = {
    pImg : productImg.src,
    pCatagory : productCatogry.innerText,
    pMinusBtn : productMinusBtn.innerText,
    pName : productName.innerText,
    pNumBtn : productNumBtn.innerText,
    pPlusBtn : productPlusBtn.innerText,
    pPrice : splitedPrice[0],
};