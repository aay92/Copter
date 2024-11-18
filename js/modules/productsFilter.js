import { renderProductCards } from "./productCards.js";

const productsFilter = (products, productContainer) => {
  const seriesFilterE1 = document.querySelector(".js-filter-series");
  const seriesFilterItemsE1 = document.querySelectorAll(".js-series-item");
  const btnShowMore = document.querySelector(".js-btn-show-more");

  const inputSearch = document.querySelector(".js-input-search");
  const priceFilterSelect = document.querySelector(".js-filter-price-select");
  const priceInputs = document.querySelectorAll(".js-filter-price-input");
  //priceInputs - массив из 2х инпутов
  let currentSeriesFilter = null;
  let currentPriceFilterSelect = "default";
  let currentPriceFilterInputs = { min: 0, max: Infinity };

  const filterProductsToSeries = (
    filterSeries,
    filterInputSearch,
    priceRange
  ) => {
    let filterProducts = products.filter((product) => {
      if (filterSeries && product.series !== filterSeries) {
        return false;
      }
      if (
        filterInputSearch &&
        !product.model.toLowerCase().includes(filterInputSearch.toLowerCase())
        ///includes - проверяет есть введеные обьекты filterInputSearch в product.model
      ) {
        return false;
      }
      const price = parseInt(product.prices[0].replace(/\s/g, ""), 10);
      if (price < priceRange.min || price > priceRange.max) {
        return false;
      }
      return true;
    });

    // if (currentPriceFilterSelect === "asc") {
    //   filterProducts.sort((a, b) => a.prices[0] - b.prices[0]);
    // } else if (currentPriceFilterSelect === "desc") {
    //   filterProducts.sort((a, b) => b.prices[0] - a.prices[0]);
    // }
    //Теперь нужно преобразовать в число
    if (currentPriceFilterSelect === "asc") {
      filterProducts.sort((a, b) => {
        //.replace(/\s/g, "") удаляем все символы и ппробелы,
        // 10 - это десятичная система исчисления
        const pricesA = parseInt(a.prices[0].replace(/\s/g, ""), 10);
        const pricesB = parseInt(b.prices[0].replace(/\s/g, ""), 10);
        return pricesA - pricesB;
      });
    } else if (currentPriceFilterSelect === "desc") {
      filterProducts.sort((a, b) => {
        const pricesA = parseInt(a.prices[0].replace(/\s/g, ""), 10);
        const pricesB = parseInt(b.prices[0].replace(/\s/g, ""), 10);
        return pricesB - pricesA;
      });
    }
    return filterProducts;
  };

  const applyFiltres = () => {
    const filtredProducts = filterProductsToSeries(
      currentSeriesFilter,
      inputSearch.value,
      currentPriceFilterInputs
    );
    renderProductCards(filtredProducts, productContainer);
    btnShowMore.classList.add("hidden");
  };

  const handelSearchInput = () => {
    inputSearch.addEventListener("input", applyFiltres);
  };

  const handleSeriesFilterClick = () => {
    seriesFilterE1.addEventListener("click", (event) => {
      if (!event.target.matches(".js-series-item")) {
        //Если клик не по элименту ".js-series-item"
        return;
      }

      seriesFilterItemsE1.forEach((item) => {
        item.classList.remove("active");
      });
      event.target.classList.add("active");

      ///Если не содержит атрибут "all"
      if (event.target.dataset.value !== "all") {
        currentSeriesFilter = event.target.dataset.value;
        console.log("currentSeriesFilter", currentSeriesFilter);
      } else {
        currentSeriesFilter = null;
      }

      //   const filtredProducts = filterProductsToSeries(currentSeriesFilter);
      //   renderProductCards(filtredProducts, productContainer);
      //   btnShowMore.classList.add("hidden");
      applyFiltres();
    });
  };

  const handlePriceFilterChange = () => {
    priceFilterSelect.addEventListener("change", () => {
      currentPriceFilterSelect = priceFilterSelect.value;
      applyFiltres();
    });
  };
  const handlePriceInputChange = () => {
    const minPrice = parseInt(priceInputs[0].value, 10) || 0;
    const maxPrice = parseInt(priceInputs[1].value, 10) || Infinity;
    currentPriceFilterInputs = { min: minPrice, max: maxPrice };
    applyFiltres();
  };

  priceInputs.forEach((input) => {
    input.addEventListener("input", handlePriceInputChange);
  });

  handleSeriesFilterClick();
  handelSearchInput();
  handlePriceFilterChange();
};

export { productsFilter };
