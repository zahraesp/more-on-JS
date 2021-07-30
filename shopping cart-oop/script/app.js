class Product {
  constructor(title, image, price) {
    this.title = title;
    this.imageUrl = image;
    this.price = price;
  }
}

class ShoppingCart {
  items = [];

  set cartItems(value) {
    this.items = value;
    this.totalOutput.innerHTML = `<h2>Total: \$${this.totalAmount.toFixed(
      2
    )}</h2>`;
  }

  get totalAmount() {
      let sum;
      let counter;
     sum = this.items.reduce(
      (prevValue, curItem) => prevValue + curItem.price,
      0
    );
    counter = this.items.reduce(
        (prevValue, curItem) => prevValue + 1,
        0
      );
      console.log(counter)

    return sum;
  }

  addProduct(product) {
    const updatedItems = [...this.items];
    updatedItems.push(product);
    this.cartItems = updatedItems;
  }

  render() {
    const cartEl = document.createElement("section");
    cartEl.innerHTML = `
        <h2>Total: \$${0}</h2>
      `;
    cartEl.className = "cart";
    this.totalOutput = cartEl.querySelector("h2");
    return cartEl;
  }
}

class ProductItem {
  constructor(product) {
    this.product = product;
  }

  addToCart() {
    App.addProductToCart(this.product);
  }

  render() {
    const productElement = document.createElement("li");
    productElement.className = "product-item";
    productElement.innerHTML = `
          <div>
            <img src="${this.product.imageUrl}" alt="${this.product.title}" >
            <div class="product-item__content">
              <h2>${this.product.title}</h2>
              <h3>\$${this.product.price}</h3>
              <button>Add to Cart</button>
            </div>
          </div>
        `;
    const addCartButton = productElement.querySelector("button");
    addCartButton.addEventListener("click", this.addToCart.bind(this));
    return productElement;
  }
}

class ProductList {
  products = [
    new Product(
      "A Chair",
      "https://www.kmart.com.au/wcsstore/Kmart/images/ncatalog/sz/1/42877011-1-sz.jpg",
      69.89
    ),
    new Product(
      "A Drawer",
      "https://www.kmart.com.au/wcsstore/Kmart/images/ncatalog/sz/3/42902843-1-sz.jpg",
      54
    ),
  ];

  constructor() {}

  render() {
    const productList = document.createElement("ul");
    productList.className = "product-list";
    for (const product of this.products) {
      const productItem = new ProductItem(product);
      const productElement = productItem.render();
      productList.append(productElement);
    }
    return productList;
  }
}

class Shop {
  render() {
    const renderHook = document.getElementById("app");

    this.cart = new ShoppingCart();
    console.log(this.cart);
    const cartEl = this.cart.render();
    const productList = new ProductList();
    const prodListEl = productList.render();

    renderHook.append(cartEl);
    renderHook.append(prodListEl);
  }
}

class App {
  static cart;

  static init() {
    const shop = new Shop();
    shop.render();
    this.cart = shop.cart;
    console.log(shop.cart);
  }

  static addProductToCart(product) {
    this.cart.addProduct(product);
  }
}

App.init();
