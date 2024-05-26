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
import { productMinusBtn, productNumBtn, productPlusBtn } from "./variables.js";

export const chooseQuantityOfProduct = (increment) => {
  if (increment) {
    countObj.count++;
    if (countObj.count > productStock.innerText) {
      countObj.count = productStock.innerText;
    }
  } else {
    countObj.count--;
    if (countObj.count < 1) {
      countObj.count = 1;
    }
  }
  productNumBtn.innerText = countObj.count;
};
// products section's code end