// navbar' code
import { navbarParent } from "./variables.js";
import { chooseQuantityOfProduct, navBarShowHide } from "./functions.js";


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
        mainDiv.classList.add("container", "add-to-cart-main-div");
        mainDiv.innerHTML = `<div class="row flex-box">
                                <div class="col-5">
                                    <div class="row flex-box">
                                        <div class="col-4">
                                            <p class="product-text">${pCatagory}</p>
                                        </div>

                                        <div class="col-4">
                                            <img src="${pImg}" class="w-100" alt="product img">
                                        </div>

                                        <div class="col-4">
                                            <p class="ctnr-1-mb-text-2">${pName}</p>
                                        </div>
                                    </div>    
                                </div>

                                <div class="col-1" id="product-price">
                                    <p class="ctnr-1-mb-text-5">${price.toFixed(2)}</p>
                                </div>

                                <div class="col-5">
                                    <div class="row">
                                        <div class="col-6 mt-2">
                                            <div class="row">
                                                <div class="col-4 product-btn">
                                                    <button class="plus-btn">+</button>
                                                </div>
        
                                                <div class="col-4 product-btn">
                                                    <span>${pQuantity}</span>
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

const incAndDecThePriceFunc = (targetedElem, returnedCount) => {
    let dataOfLS = getdata("productDetails") || [];
    let targetedImg = targetedElem.closest(".add-to-cart-main-div").querySelector("img").src;
    let price = targetedElem.closest(".add-to-cart-main-div").querySelector("#product-price p");

    // dataOfLS.forEach(data => {
    //     let { pImg, pPrice } = data;

    //     if (targetedImg === pImg) {
    //         let amount =  pPrice * returnedCount;
    //         price.innerText = amount.toFixed(2);
    //         pPrice = price.innerText;
    //     }
    // });

    
};

document.querySelector("body").addEventListener("click", (evt) => {
    if (evt.target.classList.contains("plus-btn")) {
        let updatedElem = evt.target.parentElement.nextElementSibling.firstElementChild;
        let returnedCount = chooseQuantityOfProduct(true, updatedElem, undefined);
        incAndDecThePriceFunc(evt.target, returnedCount);
    }

    else if (evt.target.classList.contains("minus-btn")) {
        let updatedElem = evt.target.parentElement.previousElementSibling.firstElementChild;
        chooseQuantityOfProduct(false, updatedElem, undefined);
    }
});