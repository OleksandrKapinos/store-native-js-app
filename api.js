//Closure
//Outer environment
function urlCreator(baseUrl) {
    //Local environment
    // After first call local value of 'url' will be baseUrl
    const url = baseUrl;
    return function (param = '') {
        //When we use this function value of 'url' will be same
        return `${url}/${param}`
    }
}

const baseUrl = urlCreator('https://fakestoreapi.com');

//Service to work with the web API
export const getGoodsAPI = (limit = 5, sortParams = {sort: 'asc', category: 'all'}) => {
    switch (sortParams.category) {
        case 'all':
            return fetch(`${baseUrl('products')}?limit=${limit}&sort=${sortParams.sort}`)
                .then(response => {
                    if (response.ok) {
                        return response.json()
                    } else {
                        throw new Error('the problem with the server response')
                    }
                })
                .catch(e => console.error('Error:', e.message));
        default:
            return fetch(`${baseUrl('products')}/category/${sortParams.category}?sort=${sortParams.sort}`)
                .then(response => {
                    if (response.ok) {
                        return response.json()
                    } else {
                        throw new Error('the problem with the server response')
                    }
                })
                .catch(e => console.error('Error:', e.message));
    }
};

//Service to work with the Local Store
export const cartService = {
    getCardList() {
        try {
            return JSON.parse(localStorage.getItem('cardsItems'))
        } catch (e) {
            console.log('Error: ', e.message);
        }
    },
    setCardList(items) {
        try {
            localStorage.setItem('cardsItems', JSON.stringify(items))
        } catch (e) {
            console.log('Error: ', e.message);
        }
    }
};
