import { renderInitialProduct } from "./renderInitialProduct.js";

const showMoreProducts = (
  products,
  productContainer,
  firstProductIndex,
  lastProductIndex
) => {
  const btnShowMore = document.querySelector(".js-btn-show-more");
  let productsIncrement = 4;
  //Если дошли ло конца списка в продуктами то скрыть кнопку
  const hiddenButtonShowMore = () => {
    if (lastProductIndex >= products.length) {
      btnShowMore.classList.add("hidden");
    }
  };
  btnShowMore.addEventListener("click", () => {
    firstProductIndex = lastProductIndex;
    lastProductIndex += productsIncrement;
    renderInitialProduct(
      products,
      productContainer,
      firstProductIndex,
      lastProductIndex
    );
    //Пролистывание до конца страница
    btnShowMore.scrollIntoView({
      behavior: "smooth",
    });
    hiddenButtonShowMore();
  });
  hiddenButtonShowMore(); //Скрываем кнопку при загрузки страницы если елементов больше длины массива
};

export { showMoreProducts };
