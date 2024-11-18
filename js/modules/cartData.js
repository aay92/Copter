const cartData = () => {
  const cart = document.querySelector(".js-cart");
  const productList = document.querySelector(".js-products-list");
  const cardList = document.querySelector(".js-cart-list");
  const cartOrder = document.querySelector(".js-cart-empty-container");
  const cartEmpty = document.querySelector(".js-cart-order-container");
  const formator = new Intl.NumberFormat("ru");
  const productInfo = {};

  const updateCartItemClick = () => {
    cart.addEventListener("click", (event) => {
      if (event.target.matches(".js-minus .js-plus")) {
        console.log(1111111);
        ///Делигарование событий
        return;
      }
      console.log(22222222);
      ///Делигарование событий

      let currentItem, minusBtn;

      if (
        event.target.matches(".js-minus") ||
        event.target.matches(".js-plus")
      ) {
        const counter = event.target.closest(".js-counter");

        currentItem = counter.querySelector(".js-current-items");
        minusBtn = counter.querySelector(".js-minus");
      }
      if (event.target.matches(".js-plus")) {
        currentItem.textContent = ++currentItem.textContent;
        minusBtn.removeAttribute("disabled");
        calculateTotalCartValue();
      }

      if (event.target.matches(".js-minus")) {
        if (parseInt(currentItem.textContent) > 2) {
          currentItem.textContent = --currentItem.textContent;
        } else {
          currentItem.textContent = --currentItem.textContent;
          minusBtn.setAttribute("disabled", true);
        }
        calculateTotalCartValue();
      }
    });
  };
  updateCartItemClick();

  const addProductToCart = () => {
    productList.addEventListener("click", (event) => {
      if (!event.target.classList.contains("js-buy-button")) {
        ///Если клик был не по кнопке то выполнять код мы не будем
        return;
      }

      if (event.target.classList.contains("js-buy-button")) {
        const product = event.target.closest(".js-product");
        ///closest - ищет блидайший род эелемент с классом ".js-product"

        const imageCard = product.querySelector(".js-image-card");
        const modelCard = product.querySelector(".js-title-card");
        const priceCard = product.querySelector(".js-price-card");
        const linkCard = product.querySelector(".js-link-card");

        productInfo.id = linkCard.getAttribute("id");
        productInfo.model = modelCard.textContent;
        productInfo.price = priceCard.textContent;
        productInfo.photo = imageCard.src;
        // console.log("productInfo", productInfo);
        const productInCart = cardList.querySelector(`#${productInfo.id}`);

        if (productInCart) {
          const currentItemProduct =
            productInCart.querySelector(".js-current-items");
          const minusBtn = productInCart.querySelector(".js-minus");
          currentItemProduct.textContent =
            parseInt(currentItemProduct.textContent) + 1;
          minusBtn.removeAttribute("disabled");
          // minusBtn.classList.remove("disabled"); - если у нас оформлено на классах
        } else {
          renderProductInCard();
        }
        toggleCartStatus();
        calculateTotalCartValue();
      }
    });
  };
  addProductToCart();

  const renderProductInCard = () => {
    const li = document.createElement("li");
    li.classList.add("cart-item", "column", "js-cart-item");

    li.innerHTML = `
                                <span class="close"></span>
                                <div class="cartline row jcfs aic" id="${productInfo.id}">
                                    <div class="cart-image-container">
                                        <img src="${productInfo.photo}" alt="" class="cart-img">
                                    </div>
                                    <div class="column">
                                        <div class="cart-model row jcfs aic">
                                           ${productInfo.model}
                                        </div>
                                        <div class="row jcsb aic">
                                            <div class="counter row jcc aic js-counter">
                                                <button type="button" class="minus control row jcc aic js-minus" disabled>-</button>
                                                <div class="current-items row jcc aic js-current-items">1</div>
                                                <button type="button" class="plus control row jcc aic js-plus">+</button>
                                            </div>
                                            <div class="row jcc aic">
                                                <span class="cart-price  row jcfe  js-cart-price" data-price="${productInfo.price}">
                                                ${productInfo.price}
                                                </span>
                                                <span class="rouble">₽</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

    `;
    cardList.append(li);
  };

  const removeProductFromCart = () => {
    cardList.addEventListener("click", (event) => {
      if (!event.target.classList.contains("js-remove")) {
        return;
      }
      if (event.target.classList.contains("js-remove")) {
        const cartItem = event.target.closest(".js-cart-item");
        cartItem.remove();
        toggleCartStatus();
        calculateTotalCartValue();
      }
    });
  };
  removeProductFromCart();

  const toggleCartStatus = () => {
    if (!cart.querySelector(".js-cart-item")) {
      cartOrder.classList.remove("hidden");
      cartEmpty.classList.add("hidden");
    } else {
      cartOrder.classList.add("hidden");
      cartEmpty.classList.remove("hidden");
    }
  };
  toggleCartStatus();

  const calculateTotalCartValue = () => {
    const cartItems = document.querySelectorAll(".js-cart-item");
    const cartTotalPrice = document.querySelector(".js-cart-total-price");

    let totalCrtValue = 0;

    cartItems.forEach((item) => {
      //Штуки
      const itemCount = item.querySelector(".js-current-items");
      console.log("itemCount", itemCount);

      //Стоимоть
      const itemPrice = item.querySelector(".js-cart-price");
      console.log("itemPrice", itemPrice);

      // const itemTotalPriace =
      //   parseInt(itemCount.textContent) *
      //   parseInt(itemPrice.textContent.split(" ").join(""));
      //split(" ")- разделяем масив пробелом .join("")-склеиваем массив в один элемент

      const itemTotalPriace =
        parseInt(itemCount.textContent) *
        parseInt(itemPrice.dataset.price.split(" ").join(""));
      //Используем dataset для точного подщоета каждого элемента в корзине
      console.log("itemTotalPriace", itemTotalPriace);

      itemPrice.textContent = formator.format(itemTotalPriace);

      totalCrtValue += itemTotalPriace;
    });
    cartTotalPrice.textContent = formator.format(totalCrtValue);
  };
  calculateTotalCartValue();
};

export { cartData };
