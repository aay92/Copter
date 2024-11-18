const paginate = (product) => {
  let productCount = 7;
  let currentPage = 1;

  const productConatainer = document.querySelector(".js-products-list");
  const pagination = document.querySelector(".js-pagination");
  const btnPrevPagination = document.querySelector(".js-pagination-btn-prev");
  const btnNextPagination = document.querySelector(".js-pagination-btn-next");

  const renderProduct = (product, container, numberOfProducts, page) => {
    productConatainer.innerHTML = ""; //обнуляем содержимое

    const firstProductIndex = numberOfProducts * page - numberOfProducts;
    // console.log("firstProductIndex", firstProductIndex);
    const lastProductIndex = firstProductIndex + numberOfProducts;
    // console.log("lastProductIndex", lastProductIndex);
    const productsOnPage = product.slice(firstProductIndex, lastProductIndex);
    // console.log("productsOnPage", productsOnPage);

    productsOnPage.forEach(({ id, photo, model, prices }) => {
      const li = document.createElement("li");
      li.classList.add("product", "item", "column", "aic", "js-product");
      li.innerHTML = `
      <div class="favorites js-favorites">
                            <span class="heart-lined js-heart-lined">
                                <svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m7.234 3.004c-2.652 0-5.234 1.829-5.234 5.177 0 3.725 4.345 7.727 9.303 12.54.194.189.446.283.697.283s.503-.094.697-.283c4.977-4.831 9.303-8.814 9.303-12.54 0-3.353-2.58-5.168-5.229-5.168-1.836 0-3.646.866-4.771 2.554-1.13-1.696-2.935-2.563-4.766-2.563zm0 1.5c1.99.001 3.202 1.353 4.155 2.7.14.198.368.316.611.317.243 0 .471-.117.612-.314.955-1.339 2.19-2.694 4.159-2.694 1.796 0 3.729 1.148 3.729 3.668 0 2.671-2.881 5.673-8.5 11.127-5.454-5.285-8.5-8.389-8.5-11.127 0-1.125.389-2.069 1.124-2.727.673-.604 1.625-.95 2.61-.95z" fill-rule="nonzero"></path></svg>
                            </span>
                    
                            <span class="heart-filled js-heart-filled hidden">
                                <svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12 5.72c-2.624-4.517-10-3.198-10 2.461 0 3.725 4.345 7.727 9.303 12.54.194.189.446.283.697.283s.503-.094.697-.283c4.977-4.831 9.303-8.814 9.303-12.54 0-5.678-7.396-6.944-10-2.461z" fill-rule="nonzero"></path></svg> 
                            </span>
                        </div>
                        <a href="#" id=${id} class="link column aic js-link-card">
                            <div class="product-image row jcc">
                                <img src="img/products/${photo[0]}" alt="" class="image js-image-card">   
                            </div>
                            <div class="product-description">
                                <h3 class="title js-title-card">${model}</h3> 
                            </div>  
                            <div class="product-price">
                                <span class="price js-price-card">${prices[0]}</span><span>₽</span>
                            </div>       
                        </a>
                        <button type="button" class="addCart buy-button js-buy-button">В корзину</button>
      `;
      container.append(li);
    });
  };

  const renderPagiantion = (products, numberOfProducts) => {
    const pagesCount = Math.ceil(products.length / numberOfProducts);
    console.log("pagesCount", pagesCount);

    const ul = document.querySelector(".js-pagination-list");
    for (let i = 1; i <= pagesCount; i++) {
      const li = renderBtn(i);
      ul.append(li);
    }
    pagination.classList.remove("hidden");
  };

  const renderBtn = (page) => {
    const li = document.createElement("li");
    li.classList.add("pagination-item", "row", "jcc", "aic");
    li.textContent = page;
    if (currentPage === page) {
      li.classList.add("active");
    }
    return li;
  };

  const upadatePagination = () => {
    ///Переключение страниц
    pagination.addEventListener("click", (event) => {
      //closest - проверяем есть ли класс ".pagination-item"
      if (!event.target.closest(".pagination-item")) {
        return;
      } else {
        currentPage = event.target.textContent;
        console.log("currentPage", currentPage);
        renderProduct(product, productConatainer, productCount, currentPage);
        let currentLi = document.querySelector(".pagination-item.active");
        currentLi.classList.remove("active");
        event.target.classList.add("active");
      }
    });
  };

  renderProduct(product, productConatainer, productCount, currentPage);
  renderPagiantion(product, productCount);
  upadatePagination();

  const liElement = document.querySelectorAll(".pagination-item");

  const handlePagination = (event) => {
    const currentActiveLi = document.querySelector(".pagination-item.active");
    let newActiveLi;
    if (event.target.closest(".js-pagination-btn-next")) {
      newActiveLi = currentActiveLi.nextElementSibling;
      console.log("newActiveLi", newActiveLi);
      currentPage++;
    } else {
      newActiveLi = currentActiveLi.previousElementSibling;
      console.log("newActiveLi", newActiveLi);
      currentPage--;
    }

    if (!newActiveLi && event.target.closest(".js-pagination-btn-next")) {
      newActiveLi = liElement[0];
    } else if (!newActiveLi) {
      newActiveLi = liElement[liElement.length - 1];
    }
    currentActiveLi.classList.remove("active");
    newActiveLi.classList.add("active");

    if (currentPage > liElement.length) {
      currentPage = 1;
    } else if (currentPage < 1) {
      currentPage = liElement.length;
    }
  };
  btnNextPagination.addEventListener("click", handlePagination);
  btnPrevPagination.addEventListener("click", handlePagination);
};

export { paginate };
