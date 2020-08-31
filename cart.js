import {cartService} from "./api.js";

const container = document.querySelector('.container');
const buttonOpenCart = document.querySelector('.button-open-cart');


class Cart {
    constructor() {
        this.cartList = cartService.getCardList() || [];
        this.createCartHTML();
    }

    createCartHTML = () => {
        const cartContainer = document.createElement('div');
        cartContainer.classList.add('cart-container');
        const cartBody = document.createElement('div');
        cartBody.classList.add('cart-body');
        const cartHeader = document.createElement('div');
        cartHeader.classList.add('cart-header');
        const cartTitle = document.createElement('h2');
        cartTitle.innerHTML = 'Cart';
        const cartContent = document.createElement('div');
        cartContent.classList.add('cart-content');
        const closeCartButton = document.createElement('p');
        closeCartButton.classList.add('close');
        const cartSum = document.createElement('p');
        cartSum.classList.add('cart-sum');

        cartContainer.style.display = 'none';

        this.renderCartContent(cartContent, cartSum);


        container.appendChild(cartContainer);
        cartContainer.appendChild(cartBody);
        cartBody.appendChild(cartHeader);
        cartBody.appendChild(cartContent);
        cartHeader.appendChild(cartTitle);
        cartHeader.appendChild(cartSum);
        cartHeader.appendChild(closeCartButton);


        closeCartButton.addEventListener('click', this.closeCart);
    };

    renderCartContent = (cartContent) => {
        cartContent.innerHTML = '';
        this.cartList.forEach(item => createCardItemElement(item, cartContent));
        // this.renderCartSum();
    };

    addItemToCart = (newItem) => {
        let isNewItem = true;
        if (this.cartList.length !== 0) {
            for (let item of this.cartList) {
                if (item.goods.id === newItem.id) {
                    item.count++;
                    isNewItem = false;
                    let cartContainer = document.querySelector('.cart-content');
                    this.renderCartContent(cartContainer);
                }
            }
        }
        if (isNewItem) {
            const newGoods = {goods: newItem, count: 1};
            this.cartList.push(newGoods);
            let container = document.querySelector('.cart-content');
            createCardItemElement(newGoods, container);
        }
        // this.renderCartSum();
        cartService.setCardList(this.cartList);
    };

    removeItemFromCart = (currentItemId) => {
        this.cartList = this.cartList.filter(item => item.goods.id !== currentItemId);
        cartService.setCardList(this.cartList);
        let currentItem = document.querySelector(`.cart-item-box-${currentItemId}`);
        // this.renderCartSum();
        currentItem.innerHTML = '';
    };

    renderCartSum = () => {
        const cartSum = document.querySelector('.cart-sum');
        let sum = this.cartList.reduce((sum, current) => {
            return sum + current.count * current.goods.price;
        }, 0);
        cartSum.innerHTML = `Sum: ${sum}$`
    };

    showCart = () => {
        let cardContainer = document.querySelector('.cart-container');
        cardContainer.style.display = 'block';
    };

    closeCart = () => {
        let cardContainer = document.querySelector('.cart-container');
        cardContainer.style.display = 'none';
    }

}


function createCardItemElement({goods, count}, container) {
    let cartItemBox = document.createElement('div');
    cartItemBox.classList.add('cart-item-box');
    cartItemBox.classList.add(`cart-item-box-${goods.id}`);
    let image = document.createElement('img');
    image.src = goods.image;
    image.alt = goods.title;
    image.classList.add('cart-image');
    let title = document.createElement('p');
    title.innerHTML = goods.title;
    title.classList.add('cart-title');
    let category = document.createElement('p');
    category.innerHTML = goods.category;
    category.classList.add('cart-category');
    let price = document.createElement('h3');
    price.classList.add('cart-price');
    price.innerHTML = `$${goods.price}`;
    let countElement = document.createElement('h3');
    countElement.classList.add('cart-count');
    countElement.innerHTML = `Quantity: ${count}`;
    let removeButton = document.createElement('p');
    removeButton.classList.add('card-close');
    removeButton.classList.add('close');

    const removeThisElement = () => {
        myCart.removeItemFromCart(goods.id);
    };

    removeButton.addEventListener('click', removeThisElement);

    container.appendChild(cartItemBox);
    cartItemBox.appendChild(image);
    cartItemBox.appendChild(title);
    cartItemBox.appendChild(category);
    cartItemBox.appendChild(price);
    cartItemBox.appendChild(countElement);
    cartItemBox.appendChild(removeButton);
}

export const myCart = new Cart();

buttonOpenCart.addEventListener('click', myCart.showCart);

