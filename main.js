import {getGoodsAPI} from './api.js';
import {myCart} from "./cart.js";




const items = document.querySelector('.items');
const addMoreButton = document.querySelector('.button-add_more');
const sortBar = document.querySelector('.sort-bar');
const categoryBar = document.querySelector('.category-bar');

class Card {
    constructor(name, id) {
        this.createCard(name, id);
    }

    createCard(name, id) {
        let cardBox = document.createElement('div');
        cardBox.classList.add('card');
        cardBox.classList.add(`card-${id}`);

        let cardTitle = document.createElement('h2');
        cardTitle.classList.add('card-title');
        cardTitle.innerHTML = name;

        items.appendChild(cardBox);
        cardBox.appendChild(cardTitle);
    }
}

class GoodsCard extends Card {
    constructor(goods) {
        super(goods.title, goods.id);
        this.createGoodsCard(goods);
    }

    createGoodsCard(goods) {
        let cardBox = document.querySelector(`.card-${goods.id}`);

        let imageContainer = document.createElement('div');
        imageContainer.classList.add('photo');
        let image = document.createElement('img');
        image.src = goods.image;
        image.alt = goods.title;


        let infoBox = document.createElement('div');
        infoBox.classList.add('info-box');

        let category = document.createElement('h4');
        category.innerHTML = goods.category;
        let price = document.createElement('h1');
        price.classList.add('card-price');
        price.innerHTML = `$${goods.price}`;
        let description = document.createElement('p');
        description.innerHTML = goods.description;
        let addToCartButton = document.createElement('button');
        addToCartButton.innerHTML = 'Add to Cart';



        cardBox.appendChild(imageContainer);
        imageContainer.appendChild(image);
        cardBox.appendChild(infoBox);

        infoBox.appendChild(category);
        infoBox.appendChild(price);
        infoBox.appendChild(description);
        infoBox.appendChild(addToCartButton);


        const addGoodsToCart = () => {
            myCart.addItemToCart(goods);
        };
        addToCartButton.addEventListener('click', addGoodsToCart);
    }
}


// Closure
//Outer environment
function makeCounter() {
    //Local environment
    let count = 0;
    return function () {
        count = count + 5;
        return count;
    }
}
let getGoodsQuantity = makeCounter();

//Closure
//Outer environment
function createErrorBlock(){
    //Local environment
    let errorBox = document.createElement('div');
    errorBox.classList.add('error-box');
    let errorImage = document.createElement('img');
    errorImage.src = './images/error-message.png';
    errorImage.alt = 'sad rabbit';
    errorImage.classList.add('error-img');
    let errorMessage = document.createElement('h3');
    errorMessage.classList.add('error-message');

    return function(message){
        // message - data from outer environment
        errorMessage.innerHTML = message;
        items.appendChild(errorBox);
        errorBox.appendChild(errorImage);
        errorBox.appendChild(errorMessage);

        sortBar.disabled = true;
        categoryBar.disabled = true;
        addMoreButton.disabled = true;
    }
}
const errorBlock = createErrorBlock();

//Function creator
function SortParams(sort, category) {
    this.sort = sort;
    this.category = category;
}

function getGoods(quantity) {
    const sortParams = new SortParams(sortBar.value, categoryBar.value);
    return getGoodsAPI(quantity, sortParams)
        .then(arr => arr.slice(-5).forEach(
            item => new GoodsCard(item)
        )).catch(e => {
            let errorMessage = 'Sorry ... We can\'t receive the goods. Check your internet connection';
            errorBlock(errorMessage);
        })
}



function getMoreGoods() {
    let quantity = getGoodsQuantity();
    if (quantity <= 20) {
        getGoods(quantity);
    } else {
        addMoreButton.disabled = true;
    }
}

function getSortingGoods() {
    items.innerHTML = '';
    addMoreButton.disabled = !(categoryBar.value === 'all');
    getGoods();
}

sortBar.addEventListener('change', getSortingGoods);
categoryBar.addEventListener('change', getSortingGoods);
addMoreButton.addEventListener('click', getMoreGoods);


getMoreGoods();
