const API_KEY = {
    headers: {
        "user-key": "4938ca8e38567e2d430997fa37e81bed"
    }
}

const cityID = 276; // Dallas, TX
const cuisineID = 83; // Seafood

const restaurantAPI = `https://developers.zomato.com/api/v2.1/search?entity_id=${cityID}&entity_type=city&cuisines=${cuisineID}`;
const restaurantArticle = document.querySelectorAll('.main-box');


fetch(restaurantAPI, API_KEY)
    .then((response) => {
        return response.json();
    })
    .then((restaurantResponse) => {
            const getRestaurantInfo = generateRestaurantInfo(restaurantResponse.restaurants);
            console.log(getRestaurantInfo);
            restaurantArticle.innerHTML += getRestaurantHTML(getRestaurantInfo);
            console.log(getRestaurantInfo);
    });

class RestaurantTemplate {
    constructor(restaurantImage, restaurantName, restaurantAddress, restaurantRating, restaurantAverageCost) {
        this.restaurantImage = restaurantImage;
        this.restaurantName = restaurantName;
        this.restaurantAddress = restaurantAddress;
        this.restaurantRating = restaurantRating;
        this.restaurantAverageCost = restaurantAverageCost;
    };
};

const generateRestaurantInfo = restaurants => {
    const filteredRestaurants = restaurants.filter(item => item.restaurant.photo_count > 0);
    const restaurantInfo = filteredRestaurants.map(item => {
        return new RestaurantTemplate(
            item.restaurant.thumb,
            item.restaurant.name,
            item.restaurant.location.address,
            item.restaurant.user_rating.aggregate_rating,
            item.restaurant.average_cost_for_two,
        );
    });
    return restaurantInfo;
};

const getRestaurantHTML = restaurants => {
    restaurants.forEach((item, index) => {
        restaurantArticle[index].querySelector('.restaurant-image').src = item.restaurantImage;
        restaurantArticle[index].querySelector('.restaurant-name').innerText = item.restaurantName;
        restaurantArticle[index].querySelector('.restaurant-address').innerText = item.restaurantAddress;
        restaurantArticle[index].querySelector('.restaurant-rating').innerText = ` ${item.restaurantRating}`;
        restaurantArticle[index].querySelector('.restaurant-price') = item.restaurantAverageCost;
    });
}

            // document.querySelector('.main-box').innerHTML += `
            // <div class="restaurant">
            // <img class="restaurant-image" src="${data.restaurant.thumb}"/>
            // <p class="restaurant-name">${data.restaurant.name}</p>
            // <p class="restaurant-address">Address: ${data.restaurant.location.address}</p>
            // <p class="restaurant-rating">Rating: ${data.restaurant.user_rating.aggregate_rating} ${data.restaurant.user_rating.rating_text}</p>
            // <p class="restaurant-price">Average cost for two persons: ${data.restaurant.average_cost_for_two}</p>
            // </div>`; 