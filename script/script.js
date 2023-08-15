// var MD5 = require("crypto-js/md5");
// const name = MD5(
//   1 +
//     "8321d184952db4c7060109f228b56342d84a5e7c" +
//     "a081b4482f155e13058ec86072ba6760"
// ).toString();
// console.log(name);
// return
//generating hash for api call

var response;
var favItem = [];
var getfavItem = JSON.parse(localStorage.getItem("favItem"));

favItem = getfavItem ? [...getfavItem] : [];

const fetchApiHandeler = async () => {
  let searchItem = document.getElementById("searchItem").value;

  let url = `https://gateway.marvel.com:443/v1/public/characters?name=${searchItem}&ts=1&apikey=a081b4482f155e13058ec86072ba6760&hash=a94f480241098e7daa6c040fc67673f3`;
  let body = await fetch(url);
  response = await body.json();

  if (response.code == 409) {
    document.getElementById("main").style.display = "none";
    document.getElementById("error").style.display = "block";
    document.getElementById("message").innerHTML =
      "Please enter something before search!!";
  }
  if (response.data.count) {
    const filteredData = favItem.filter(
      (item) => item.id === response.data.results[0].id
    );

    if (filteredData.length > 0) {
      document.getElementById("FavButtonLink").innerHTML = "Already Added";
      document.getElementById("FavButtonLink").disabled = true;
    } else {
      document.getElementById("FavButtonLink").innerHTML = "Add to favorites";
      document.getElementById("FavButtonLink").disabled = false;
    }
    document.getElementById("main").style.display = "block";
    document.getElementById("error").style.display = "none";
  } else {
    document.getElementById("main").style.display = "none";
    document.getElementById("error").style.display = "block";
    document.getElementById("message").innerHTML =
      "You have entered wrong name!!";
  }

  document.getElementById("img").src =
    response.data.results[0].thumbnail.path +
    "/portrait_xlarge." +
    response.data.results[0].thumbnail.extension;
  document.getElementById("title").innerHTML = response?.data?.results[0]?.name
    ? response?.data?.results[0]?.name
    : "Not Found";
  document.getElementById("discription").innerHTML = response?.data?.results[0]
    ?.description
    ? response?.data?.results[0]?.description
    : "Not Available";
  document.getElementById("urlLink").href =
    response?.data?.results[0]?.urls[0]?.url;
};

function favStorage() {
  favItem.push(response.data.results[0]);
  localStorage.setItem("favItem", JSON.stringify(favItem));
  console.log("button clicked");
  const filteredData = favItem.filter(
    (item) => item.id === response.data.results[0].id
  );

  if (filteredData.length > 0) {
    document.getElementById("FavButtonLink").innerHTML = "Already Added";
    document.getElementById("FavButtonLink").disabled = true;
  } else {
    document.getElementById("FavButtonLink").innerHTML = "Add to favorites";
    document.getElementById("FavButtonLink").disabled = false;
  }
  getFavCount();
}
function getFavCount() {
  document.getElementById("favCount").innerHTML = JSON.parse(
    localStorage.getItem("favItem")
  ).length;
}
getFavCount(); 