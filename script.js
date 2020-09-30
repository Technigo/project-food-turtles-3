const cityID = 276; // Dallas, TX
const cuisineID = 83; // Seafood

const request = new Request(
  `https://developers.zomato.com/api/v2.1/search?entity_id=${cityID}&entity_type=city&cuisines=${cuisineID}`
);

const API_KEY = {
  headers: new Headers({
    "user-key": "4938ca8e38567e2d430997fa37e81bed",
  }),
};

const restaurantAPI = `https://developers.zomato.com/api/v2.1/search?entity_id=${cityID}&entity_type=city&cuisines=${cuisineID}`;
const restaurantArticle = document.querySelectorAll(".restaurant");


const fetchAPIContent = (key) => {
  fetch(key, API_KEY)
    .then((response) => {
      return response.json();
    })
    .then((restaurantResponse) => {        
      console.log(restaurantResponse);
      const getRestaurantInfo = generateRestaurantInfo(restaurantResponse.restaurants);
      restaurantArticle.innerHTML += getRestaurantHTML(getRestaurantInfo);
    });
}

// Default fetch
fetchAPIContent(request)

const fetchSort = (value) => {
  const requestString = request.url
  if (value === 'rating') {
    newUrl = requestString + `&sort=rating&order=desc`
    fetchAPIContent(newUrl)
  } else if (value === 'price') {
    newUrl = requestString + `&sort=cost&order=desc`
    fetchAPIContent(newUrl)
  } else {
    fetchAPIContent(requestString)
  }
  return requestString.value 
}
 
class RestaurantTemplate {
  constructor(
    restaurantImage,
    restaurantName,
    restaurantAddress,
    restaurantRating,
    restaurantUserRating,
    restaurantAverageCost
  ) {
    this.restaurantImage = restaurantImage;
    this.restaurantName = restaurantName;
    this.restaurantAddress = restaurantAddress;
    this.restaurantRating = restaurantRating;
    this.restaurantUserRating = restaurantUserRating;
    this.restaurantAverageCost = restaurantAverageCost;
  }
}

const generateRestaurantInfo = (restaurants) => {
  const filteredRestaurants = restaurants.filter(
    (item) => item.restaurant.thumb !== ""
  );
  const restaurantInfo = filteredRestaurants.map((item) => {
    return new RestaurantTemplate(
      item.restaurant.thumb,
      item.restaurant.name,
      item.restaurant.location.address,
      item.restaurant.user_rating.aggregate_rating,
      item.restaurant.user_rating.rating_text,
      item.restaurant.average_cost_for_two
    );
  });
  return restaurantInfo;
};

const getRestaurantHTML = (restaurants) => {
  restaurants.forEach((item, index) => {
    restaurantArticle[index].querySelector(".restaurant-image").src =
      item.restaurantImage;
    restaurantArticle[index].querySelector(".restaurant-name").innerText =
      item.restaurantName;
    restaurantArticle[index].querySelector(".restaurant-address").innerText =
      item.restaurantAddress;
    restaurantArticle[index].querySelector(".restaurant-rating").innerText = 
    ` ${item.restaurantRating} ${item.restaurantUserRating}`;
    restaurantArticle[index].querySelector(".restaurant-price").innerText = 
    `Average cost for two: ${item.restaurantAverageCost} $`;
  });
};