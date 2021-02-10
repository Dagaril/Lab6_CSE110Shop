// product-item.js

class ProductItem extends HTMLElement {
  constructor(isrc, titleIn, priceIn, prodId, cart) {
    super();

    let shadow = this.attachShadow({ mode: 'open' });

    let wrapper = document.createElement('li');
    wrapper.setAttribute('class', 'product');

    let img = document.createElement('img');

    img.setAttribute('src', isrc);
    img.setAttribute('alt', titleIn);
    img.setAttribute('width', 200);
    img.setAttribute('id', prodId + 'image');

    let title = document.createElement('p');
    title.setAttribute('class', 'title');
    title.textContent = titleIn;
    title.setAttribute('id', prodId + 'title');

    let price = document.createElement('p');
    price.setAttribute('class', 'price');
    price.textContent = "$"+priceIn;
    price.setAttribute('id', prodId + 'price');

    let btn = document.createElement('button');
    //btn.setAttribute('onclick', "alert('Added to Cart!')");
    //btn.textContent = "Add to Cart";
    btn.setAttribute('id', prodId + 'button');
    btn.addEventListener('click', function () { btnClicked(btn) });

    if (cart[btn.id]=="1"){
      let cartCounter = document.getElementById('cart-count');
      btn.textContent = "Remove from Cart";
      cartCounter.textContent = parseInt(cartCounter.textContent) + 1;
    } else{
      btn.textContent = "Add to Cart";
    }

    //inCartHandling();

    const style = document.createElement('style');
    style.textContent = `
.price {
color: green;
font-size: 1.8em;
font-weight: bold;
margin: 0;
}

.product {
align-items: center;
background-color: white;
border-radius: 5px;
display: grid;
grid-template-areas:
  'image'
  'title'
  'price'
  'add';
grid-template-rows: 67% 11% 11% 11%;
height: 450px;
filter: drop-shadow(0px 0px 6px rgb(0, 0, 0, 0.2));
margin: 0 30px 30px 0;
padding: 10px 20px;
width: 200px;
}

.product > button {
background-color: rgb(255, 208, 0);
border: none;
border-radius: 5px;
color: black;
justify-self: center;
max-height: 35px;
padding: 8px 20px;
transition: 0.1s ease all;
}

.product>button:hover {
background-color: rgb(255, 166, 0);
cursor: pointer;
transition: 0.1s ease all;
}

.product>img {
align-self: center;
justify-self: center;
width: 100 %;
max-height: 100%
}

.title {
font-size: 1.1em;
margin: 0;
overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;
}

.title:hover {
font-size: 1.1em;
margin: 0;
white-space: wrap;
overflow: auto;
text-overflow: unset;
}`;

    shadow.appendChild(style);
    shadow.appendChild(wrapper);
    wrapper.appendChild(img);
    wrapper.appendChild(title);
    wrapper.appendChild(price);
    wrapper.appendChild(btn);
  }
}

function btnClicked(btn) {
  let cartCounter = document.getElementById('cart-count');

  if (btn.textContent == "Add to Cart") {
    cartCounter.textContent = parseInt(cartCounter.textContent) + 1;
    btn.textContent = "Remove from Cart";
    alert('Added to Cart!');
    let currCart = JSON.parse(localStorage.getItem('Cart'));
    currCart[btn.getAttribute("id")]="1";
    localStorage.setItem('Cart',JSON.stringify(currCart));
  } 
  
  else {
    cartCounter.textContent = parseInt(cartCounter.textContent) - 1;
    btn.textContent = "Add to Cart";
    alert('Removed from Cart!')
    let currCart = JSON.parse(localStorage.getItem('Cart'));
    delete currCart[btn.getAttribute("id")];
    localStorage.setItem('Cart',JSON.stringify(currCart));
  }
}

function inCartHandling(){
  let cart=localStorage.getItem('Cart')
  if (cart!=null){
    cart = JSON.parse(cart);
    let cartCounter = document.getElementById('cart-count');
    for(let key in cart){
      let btn = this.shadowRoot.getElementById(key);
      btn.textContent = "Remove from Cart";
      cartCounter.textContent = parseInt(cartCounter.textContent) + 1;
    }
  }
}

customElements.define('product-item', ProductItem);