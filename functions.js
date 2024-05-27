// navbar's code

import { hiddenNavDiv, productStock } from "./variables.js";
import { countObj } from "./objects.js";

export const navBarShowHide = () => {
  let headerCtnr = document.querySelector(".header-ctnr");
  if (countObj.count) {
    setTimeout(() => {
      hiddenNavDiv.style.transform = 'scale(1)';
    }, 100);
    headerCtnr.style.marginTop = '20rem';
    countObj.count = false;
  }

  else {
    hiddenNavDiv.style.transform = 'scale(0)';
    setTimeout(() => {
      headerCtnr.style.marginTop = '0rem';
    }, 50);
    countObj.count = true;
  }
};

// navbar's code end

// products section's code
import { productMinusBtn , productNumBtn , productPlusBtn } from "./variables.js";

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
  return updatedElem.innerText = countObj.count;
};

export const addToCartBtnFunc = () => {
  let productAddedNotificationdiv = document.createElement("div");
  productAddedNotificationdiv.classList.add("product-added-notification-div");
  productAddedNotificationdiv.innerText = 'Product ID 1 has been added'
  document.querySelector("body").prepend(productAddedNotificationdiv);

  productAddedNotificationdiv.style.position = 'fixed';
  productAddedNotificationdiv.style.transform = 'translateX(0)';
  productAddedNotificationdiv.style.transition = '0.5s';

  return productAddedNotificationdiv;
};
// products section's code end