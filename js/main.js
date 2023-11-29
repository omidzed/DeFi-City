const $assetsList = document.querySelector('.assets-list');
console.log($assetsList);
const assetsData = [];
const targetUrl = encodeURIComponent(
  'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
);
const xhr = new XMLHttpRequest();
xhr.open('GET', 'https://lfz-cors.herokuapp.com/?url=' + targetUrl);
xhr.setRequestHeader(
  'X-CMC_PRO_API_KEY',
  '44f133d8-a055-48f2-a1c2-2cdfa46723f7',
);
xhr.responseType = 'json';
xhr.addEventListener('load', function () {
  let marketData = [];
  marketData = xhr.response.data;
  for (let i = 0; i < marketData.length; i++) {
    const asset = {
      name: marketData[i].name,
      symbol: marketData[i].symbol,
      cmcRank: marketData[i].cmc_rank,
      infiniteSupply: marketData[i].infinite_supply,
    };
    assetsData.push(asset);
    $assetsList.append(renderAsset(asset));
  }
});
xhr.send();

function renderAsset(asset) {
  const $homePageListing = document.createElement('div');
  $homePageListing.setAttribute('class', 'home-page-listing');

  const $logoContainer = document.createElement('div');
  $logoContainer.setAttribute('class', 'home-page-listing');

  const $name = document.createElement('div');
  $homePageListing.setAttribute('class', 'name');

  const $price = document.createElement('div');
  $price.setAttribute('class', 'price');

  const $percentChange = document.createElement('div');
  $percentChange.setAttribute('class', 'percent-change');

  const $heartIcon = document.createElement('i');
  $heartIcon.setAttribute('class', 'home-page-heart');

  $homePageListing.appendChild($logoContainer);
  $homePageListing.appendChild($name);
  $homePageListing.appendChild($price);
  $homePageListing.appendChild($percentChange);
  $homePageListing.appendChild($heartIcon);

  return $homePageListing;
}

console.log(assetsData);

// price: marketData[i].quote,
//   oneDayChange: marketData[i].quote,

// const assets = xhr.response;

// for (let i = 0; i < users.length; i++) {
//   const user = users[i];
//   const $li = document.createElement('li');
//   $li.textContent = user.name;
//   $usersList.appendChild($li);

// This function will handle the initialization of the app.
// function initializeApp() {
//   fetchLatest().then(data => {
//     const asset = {
//       assetId: data.nextAssetId,
//       name: data.name
//     };
//   });
// }

// document.addEventListener('DOMContentLoaded', function () {
//   initializeApp();
// });

// Call this function to fetch and store data
// processAndStoreCryptoData();

// document.addEventListener('DOMContentLoaded', function (event){
//   const splashPage = document.querySelector('.splash-page');
//   const circle = document.querySelector('.circle');
//   const mainContent = document.querySelector('.main-container');

//   setTimeout(function() {
//     circle.style.transform = 'scale(50)';
//   }, 5000);

//   circle.addEventListener('transitionend', function() {
//     mainContent.classList.remove('hidden');
//     splashPage.style.display = 'none';
//   });
// });

// document.addEventListener('DOMContentLoaded', function () {
//   setTimeout(function () {
//     const splashScreen = document.getElementById('splash-screen');
//     splashScreen.style.clipPath = 'circle(100% at 50% 50%)'; // Grow the circle

//     // Optional: listen for the end of the transition
//     splashScreen.addEventListener('transitionend', function () {
//       document.getElementById('main-content').classList.remove('hidden'); // Show main content
//       splashScreen.style.display = 'none'; // Hide splash screen
//     });
//   }, 3000); // Delay for the splash screen
// });
