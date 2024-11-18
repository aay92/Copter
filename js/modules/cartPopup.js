const cart = document.querySelector(".js-cart");
const overlay = document.querySelector(".js-overlay");
const openCartButton = document.querySelector(".js-cart-btn");
const closeCartElement = document.querySelectorAll(".js-close-cart");

//Убираем сдвик боди приоткрытие модального окна
const getScrollBarWidht = () => {
  let div = document.createElement("div");
  div.style.width = "100px";
  div.style.height = "100px";
  div.style.overflowY = "scroll";
  div.style.visibility = "hidden";
  document.body.append(div);
  let scrollBarWidht = div.offsetWidth - div.clientWidth;
  div.remove();
  return scrollBarWidht;
};

const scroll = getScrollBarWidht();

const toggleCart = (isActive) => {
  document.body.overflow = isActive ? "hidden" : "";
  document.body.marginRight = isActive ? `${scroll}px` : `0px`;
  cart.classList.toggle("active", isActive);
  overlay.classList.toggle("active", isActive);
};
const openCart = () => {
  openCartButton.addEventListener("click", () => {
    toggleCart(true);
    // document.body.style.overflow = "hidden";
    // document.body.style.marginRight = `${scroll}px`;
    // cart.classList.add("active");
    // overlay.classList.add("acitve");
  });
};
const closeCart = () => {
  closeCartElement.forEach((item) => {
    item.addEventListener("click", () => {
      toggleCart(false);
      // document.body.style.overflow = "";
      // document.body.style.marginRight = `0px`;
      // cart.classList.remove("active");
      // overlay.classList.remove("acitve");
    });
  });
};
export { openCart, closeCart };
