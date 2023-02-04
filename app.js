let basket = document.querySelector("#basket");
let basketDropdown = document.querySelector(".basket");
let booksBasket = document.querySelector(".books-basket");
let sectionBooks = document.querySelector("#main-section");
basket.addEventListener("click", (e) => {
  basketDropdown.classList.add("active-basket");
});
let labelX = document.querySelector(".fa-x");

labelX.addEventListener("click", (e) => {
  basketDropdown.classList.remove("active-basket");
});

let basketProducts = JSON.parse(localStorage.getItem("basket-products")) || [];
for (let i = 0; i < basketProducts.length; i++) {
  booksBasket.innerHTML += createCardToBasket(
    basketProducts[i].title,
    basketProducts[i].image,
    basketProducts[i].price,
    basketProducts[i].title
  );
}
function createCard(title, subtitle, price, img, id) {
  return `<div class="card h-100" style="width: 18rem;" data-id="${id}">
  <img src="${img}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${title}</h5>
    <p class="card-text">${subtitle}</p>
    <p class="card-text">${price}</p>
    <a href="#" class="btn btn-primary add">Add to basket</a>
  </div>`;
}

function createCardToBasket(title, img, price, id) {
  return `<div class="card" style="width: 18rem;" data-id="${id}">
  <img src="${img}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${title}</h5>
    <p class="card-text">${price} x <span class="count">1</span></p>
    <a href="#" class="btn btn-primary remove">Remove from Basket</a>
  </div>
</div>`;
}

async function getData() {
  let respon = await fetch("https://api.itbook.store/1.0/search/mongodb/");
  let getedData = await respon.json();
  let data = await getedData.books;
  for (let i = 0; i < data.length; i++) {
    sectionBooks.innerHTML += createCard(
      data[i].title,
      data[i].subtitle,
      data[i].price,
      data[i].image,
      data[i].title
    );
  }
  sectionBooks.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn")) {
      let card = e.target.parentElement.parentElement;
      let cardID = card.getAttribute("data-id");
      let findedCard = data.find((b) => b.title == cardID);
        basketProducts.push(findedCard);
        for (let i = 0; i < basketProducts.length; i++) {
          booksBasket.innerHTML += createCardToBasket(
            basketProducts[i].title,
            basketProducts[i].image,
            basketProducts[i].price,
            basketProducts[i].title
            );
          }
          basketDropdown.classList.add("active-basket");
        localStorage.setItem("basket-products", JSON.stringify(basketProducts));
    }
  });

  booksBasket.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn")) {
      let card = e.target.parentElement.parentElement;
      let cardID = card.getAttribute("data-id");
      card.remove();
      basketProducts = basketProducts.filter((b) => {
        return b.title !== cardID;
      });
      localStorage.setItem("basket-products", JSON.stringify(basketProducts));
    }
  });
}

getData();