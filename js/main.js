import products from "./products.js";
import { renderProductCards } from "./modules/productCards.js";
import { paginate } from "./modules/pagination.js";
import { openCart, closeCart } from "./modules/cartPopup.js";
import { cartData } from "./modules/cartData.js";
import { renderInitialProduct } from "./modules/renderInitialProduct.js";
import { showMoreProducts } from "./modules/showMoreProductts.js";
import { productsFilter } from "./modules/productsFilter.js";

window.addEventListener("DOMContentLoaded", () => {
  const productContainer = document.querySelector(".js-products-list");
  let firstProductIndex = 0;
  let lastProductIndex = 8; //Количество продуктов до нажатия на кнопку показать ещё
  // renderProductCards(products, productContainer);
  // paginate(products);

  openCart();
  closeCart();
  cartData();
  renderInitialProduct(
    products,
    productContainer,
    firstProductIndex,
    lastProductIndex
  );
  showMoreProducts(
    products,
    productContainer,
    firstProductIndex,
    lastProductIndex
  );

  productsFilter(products, productContainer);
});
