const API_KEY = {
    headers: {
        "user-key": "4938ca8e38567e2d430997fa37e81bed"
    }
}

const cityID = 276; // Dallas, TX
const cuisineID = 83; // Seafood

const restaurantAPI = `https://developers.zomato.com/api/v2.1/search?entity_id=${cityID}&entity_type=city&cuisines=${cuisineID}`;


fetch(restaurantAPI, API_KEY)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        data.restaurants.forEach((data) => {
            console.log(data.restaurant);
            document.querySelector('.main-box').innerHTML += `
            <div class="restaurant">
            <img class="restaurant-image" src="${data.restaurant.thumb}"/>
            <p class="restaurant-name">${data.restaurant.name}</p>
            <p class="restaurant-address">Address: ${data.restaurant.location.address}</p>
            <p class="restaurant-rating">Rating: ${data.restaurant.user_rating.aggregate_rating} ${data.restaurant.user_rating.rating_text}</p>
            <p class="restaurant-price">Average cost for two persons: ${data.restaurant.average_cost_for_two}</p>
            </div>`; 
        })
    });

