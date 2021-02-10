// Script.js

window.addEventListener('DOMContentLoaded', () => {
  fetchProds();
  handleProds();

});

async function fetchProds() {

  if (localStorage.getItem('Products') == null) {
    let response = await fetch('https://fakestoreapi.com/products');
    let respText = await response.text();
    localStorage.setItem('Products', respText);
  }

}

function handleProds(){

  let items = localStorage.getItem('Products');
  items = JSON.parse(items);

  let list = document.getElementById('product-list');

  let cart=localStorage.getItem('Cart');
  if (cart==null){
    localStorage.setItem('Cart',"{}");
    cart = "{}"
  }
  cart=JSON.parse(cart);
  for (let key in items) {
    let item = items[key];
    let product = new ProductItem(item.image, item.title, item.price, item.id, cart);

    list.append(product);
  }





}



