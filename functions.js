// navbar's code

import { hiddenNavDiv, productStock } from "./variables.js";
import { countObj } from "./objects.js";

export const navBarShowHide = () => {
  let headerCtnr = document.querySelector(".header-ctnr");
  if (!countObj.count) {
    setTimeout(() => {
      hiddenNavDiv.style.transform = 'scale(1)';
    }, 100);
    headerCtnr.style.marginTop = '20rem';
    countObj.count = true;
  }

  else {
    hiddenNavDiv.style.transform = 'scale(0)';
    setTimeout(() => {
      headerCtnr.style.marginTop = '0rem';
    }, 50);
    countObj.count = false;
  }
};

// navbar's code end

// products section's code

// function of choosing the quantity of products
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
// function of choosing the quantity of products end



// function of add to cart button
export const addToCartBtnFunc = (targetedElem) => {
  countObj.count++;
  let targetElemId = targetedElem.closest(".product-mb").getAttribute("id").split("-");
  let splitedId = targetElemId[targetElemId.length - 1]

  let productAddedNotificationdiv = document.createElement("div");
  productAddedNotificationdiv.classList.add("product-added-notification-div");
  productAddedNotificationdiv.innerText = `Product ID ${splitedId} has been added`;
  document.querySelector("body").prepend(productAddedNotificationdiv);

  productAddedNotificationdiv.style.position = 'fixed';
  productAddedNotificationdiv.style.transform = 'translateX(0)';
  productAddedNotificationdiv.style.zIndex = countObj.count;

  setTimeout(() => {
    productAddedNotificationdiv.remove();
  }, 2000);

  return productAddedNotificationdiv;
};
// function of add to cart button end


// products section's code end