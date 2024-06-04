// navbar' code
import { navbarParent } from "./variables.js";
import { chooseQuantityOfProduct, navBarShowHide , createProductAddedNotiDivFunc} from "./functions.js";


navbarParent.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("fa-solid")) {
        navBarShowHide();
    }
});
// navbar' code end


// function of proincting data of local storage in add to cart page
let targetedDiv = document.querySelector(".add-to-cart-ctnr");
let subTotal = document.querySelector("#sub-total");
let finalTotal = document.querySelector("#final-amount");
let firstPrice = 0
let tax = 50;

import { getdata } from "./functions.js";

const printDataOfLSinAddToCart = () => {
    let dataOfLS = getdata("productDetails") || [];
    let price;
    let mainDiv;
    dataOfLS.forEach(data => {
        let { pCatagory, pImg, pName, pPrice, pQuantity, pStock } = data;


        price = pPrice * pQuantity;

        mainDiv = document.createElement("div");
        mainDiv.classList.add("container", "add-to-cart-main-div", "px-5");
        mainDiv.innerHTML = `<div class="row flex-box">
                                <div class="col-xxl-5 col-xl-5 col-lg-5 col-md-5 col-sm-5 col-5">
                                    <div class="row flex-box">
                                        <div class="col-4">
                                            <p class="product-text">${pCatagory}</p>
                                        </div>

                                        <div class="col-4 add-to-cart-img">
                                            <img src="${pImg}" class="w-100" alt="product img">
                                        </div>

                                        <div class="col-4">
                                            <p class="ctnr-1-mb-text-2">${pName}</p>
                                        </div>
                                    </div>    
                                </div>

                                <div class="col-xxl-1 col-xl-1 col-lg-1 col-md-1 col-sm-2 col-2" id="product-price">
                                    <p class="ctnr-1-mb-text-5">${price.toFixed(2)}</p>
                                </div>

                                <div class="col-xxl-5 col-xl-5 col-lg-5 col-md-5 add-to-cart-rem-btn-sec">
                                    <div class="row">
                                        <div class="col-6 mt-2">
                                            <div class="row">
                                                <div class="col-4 product-btn">
                                                    <button class="plus-btn">+</button>
                                                </div>
        
                                                <div class="col-4 product-btn">
                                                    <span class="add-to-cart-qty">${pQuantity}</span>
                                                </div>
        
                                                <div class="col-4 product-btn">
                                                    <button class="minus-btn">-</button>
                                                </div>
                                            </div>
                                        </div>
        
                                        <div class="col-6">
                                            <button class="add-to-cart-rem-btn">remove</button>
                                        </div>
                                    
                                    </div>
                                
                                </div>

                
                            </div>`;

        targetedDiv.parentNode.insertBefore(mainDiv, targetedDiv)

        firstPrice += price;
        subTotal.innerText = firstPrice.toFixed(2);
        finalTotal.innerText = parseFloat(tax) + parseFloat(firstPrice.toFixed(2));
    });
};

printDataOfLSinAddToCart();

const incAndDecThePriceFunc = (increment, targetedElem, dataOfLS) => {
    let targetedImg = targetedElem.closest(".add-to-cart-main-div").querySelector("img").src;
    let price = targetedElem.closest(".add-to-cart-main-div").querySelector("#product-price p");
    let targetedQuantity = targetedElem.closest(".add-to-cart-main-div").querySelector(".add-to-cart-qty").innerText;
    let amount;
    let amount2;

    dataOfLS.forEach(element => {
        if (element.pImg === targetedImg) {
            element.pQuantity = targetedQuantity;
            element.finalPrice = element.pPrice * element.pQuantity;
            price.innerText = element.finalPrice.toFixed(2);
            element.subTotal = parseFloat(subTotal.innerText);

            if (increment) {
                amount = parseFloat(element.subTotal) + parseFloat(element.pPrice);
                subTotal.innerText = amount.toFixed(2)
                amount2 = parseFloat(tax) + parseFloat(subTotal.innerText);
                finalTotal.innerText = amount2.toFixed(2);

                if (element.pQuantity === element.pStock) {
                    targetedElem.disabled = true;   
                    targetedElem.closest(".add-to-cart-main-div").querySelector(".minus-btn").disabled = false;
                    targetedElem.addEventListener("mouseover" , () => {
                        createProductAddedNotiDivFunc(element.pID , "not available")
                    })
                }

                else if (element.pQuantity < element.pStock) {
                    targetedElem.disabled = false;
                    targetedElem.closest(".add-to-cart-main-div").querySelector(".minus-btn").disabled = false;
                }
            }
            
            else {
                amount = parseFloat(element.subTotal) - parseFloat(element.pPrice);
                subTotal.innerText = amount.toFixed(2)
                amount2 = parseFloat(tax) + parseFloat(subTotal.innerText);
                finalTotal.innerText = amount2.toFixed(2);

                if (element.pQuantity <= '1') {
                    targetedElem.disabled = true;
                    targetedElem.closest(".add-to-cart-main-div").querySelector(".plus-btn").disabled = false;
                }

                else if (element.pQuantity < element.pStock) {
                    targetedElem.disabled = false;
                    targetedElem.closest(".add-to-cart-main-div").querySelector(".plus-btn").disabled = false;
                }
            }
        }
    });
    localStorage.setItem("productDetails", JSON.stringify(dataOfLS));
};

const removeDataFromLsFunc = (targetedElem) => {
    let targetedImg = targetedElem.closest(".add-to-cart-main-div").querySelector(".add-to-cart-img img").src;
    let dataOfLS = getdata("productDetails") || [];
    let newData = dataOfLS.filter(currElem => {
        return currElem.pImg !== targetedImg;
    });

    let newData2 = dataOfLS.find(currElem => {
        return currElem.pImg === targetedImg;
    });

    createProductAddedNotiDivFunc(newData2.pID , "been removed");

    localStorage.setItem("productDetails", JSON.stringify(newData));
    targetedElem.closest(".add-to-cart-main-div").remove();
};

document.querySelector("body").addEventListener("click", (evt) => {
    if (evt.target.classList.contains("plus-btn")) {
        let dataOfLS = getdata("productDetails") || [];
        let updatedElem = evt.target.parentElement.nextElementSibling.firstElementChild;
        let targetedImg = evt.target.closest(".add-to-cart-main-div").querySelector(".add-to-cart-img img").src;

        dataOfLS.forEach(element => {
            if (element.pImg === targetedImg) {
                chooseQuantityOfProduct(true, updatedElem, element.pStock);
                incAndDecThePriceFunc(true, evt.target, dataOfLS);
            }
        });
    }

    else if (evt.target.classList.contains("minus-btn")) {
        let dataOfLS = getdata("productDetails") || [];
        let updatedElem = evt.target.parentElement.previousElementSibling.firstElementChild;
        let targetedImg = evt.target.closest(".add-to-cart-main-div").querySelector(".add-to-cart-img img").src;

        dataOfLS.forEach(element => {
            if (element.pImg === targetedImg) {
                chooseQuantityOfProduct(false, updatedElem, element.pStock);
                incAndDecThePriceFunc(false, evt.target, dataOfLS);
            }
        });
    }

    else if (evt.target.classList.contains("add-to-cart-rem-btn")) {
        removeDataFromLsFunc(evt.target);
    }
});