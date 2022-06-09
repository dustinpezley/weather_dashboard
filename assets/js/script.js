var searchInputEl = $("#search-input");
var searchButtonEl = $("#search-button");
var searchHistoryEl = $("#search-history");

var searchHistory = [];

const apiKey = "9b25196066dfcfeea5fe587c12384426";

function getWeather(lat, lon) {
  let apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&exclude=minutely,hourly&appid="+apiKey;

  fetch(apiUrl).then(function(response) {
    if(response.ok){
      response.json().then(function(data){
        console.log(data);
      })
    }
  })
}

function getCoordinates(city) {
  let apiUrl = "http://api.openweathermap.org/geo/1.0/direct?q="+city+"&limit=1&appid="+apiKey;

  fetch(apiUrl).then(function(response){
    if(response.ok){
      response.json().then(function(city) {
        getWeather(city[0].lat, city[0].lon);
      })
    }
  })
}

function toTitleCase(str) {
  return str.replace(/(?:^|\s)\w/g, function(match){
    return match.toUpperCase();
  })
};

$(searchButtonEl).on("click",searchInputEl,function(){
  var city = toTitleCase($(searchInputEl).val().trim());

  searchHistory.push(city);
  localStorage.setItem("search",JSON.stringify(searchHistory));
  renderSearchHistory();
  getCoordinates(city);
})

function renderSearchHistory() {
  searchHistoryEl.innerHTML = "";
  for(var i=0;i<searchHistory.length;i++) {
    searchHistoryEl.prepend("<button type='submit' class='mb-3 btn rounded bg-secondary w-100 font-weight-bold'>"+searchHistory[i]+"</button>");
  }
}