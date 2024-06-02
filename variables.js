// navbar's variables
export let navBtn = document.querySelector(".nav-btn");
export let navbarParent = document.querySelector(".my-nav");
export let hiddenNavDiv = document.querySelector(".my-nav-inner div");
// navbar's variables end




// products section's variables
export let productMainDiv = document.querySelector(".products-sec");
export let productCatogry = document.querySelector("#product-catogry");
export let productImg = document.querySelector(".product-img img");
export let productName = document.querySelector("#laptop");
export let productPlusBtn = document.querySelector(".plus-btn");
export let productNumBtn = document.querySelector(".num-btn");
export let productMinusBtn = document.querySelector(".minus-btn");
export let productAddToCartBtn = document.querySelector(".add-to-cart-btn");
export let productStock = document.querySelector("#laptop-stock span");
export let productPrice = document.querySelector("#laptop-price");

export let productStocks = document.querySelectorAll(".product-stock span");
productStocks.forEach(productStock => {
    productStock.innerText = Math.floor(Math.random() * 100);
});
// products section's variables end


// add to cart page variables
export let targetedDiv = document.querySelector(".add-to-cart-ctnr");