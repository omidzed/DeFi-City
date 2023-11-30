const $assetsList = document.querySelector('.assets-list');
console.log('asset list:', $assetsList);
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
  console.log(marketData);
  for (let i = 0; i < marketData.length; i++) {
    const price = marketData[i].quote.USD.price;
    const formattedPrice = price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    const asset = {
      name: marketData[i].name,
      price: formattedPrice,
      percentChange: marketData[i].quote.USD.percent_change_24h,
      symbol: marketData[i].symbol,
    };
    assetsData.push(asset);
    $assetsList.append(renderAsset(asset));
  }
});
xhr.send();

function renderAsset(asset) {
  const $column = document.createElement('div');
  const $homePageListing = document.createElement('div');
  $homePageListing.setAttribute('class', 'home-page-listing');

  const $logoContainer = document.createElement('div');
  $logoContainer.setAttribute('class', 'logo-container');

  const $name = document.createElement('div');
  $name.setAttribute('class', 'name');
  if (asset.name.length < 15) {
    $name.textContent = asset.name;
  } else {
    $name.textContent = asset.symbol;
  }

  const $price = document.createElement('div');
  $price.setAttribute('class', 'price');
  $price.textContent = '$' + asset.price;

  const $percentChange = document.createElement('div');
  $percentChange.setAttribute('class', 'percent-change');

  $percentChange.textContent =
    '\u25B2' + '%' + asset.percentChange.toFixed(2) + '(1d)';
  if (asset.percentChange < 0) {
    $percentChange.classList.add('red');
    $percentChange.textContent =
      '\u25BC' + '%' + asset.percentChange.toFixed(2) + '(1d)';
  }

  const $heartIcon = document.createElement('i');
  $heartIcon.setAttribute('class', 'fa-regular fa-heart');
  $column.appendChild($homePageListing);
  $homePageListing.appendChild($logoContainer);
  $homePageListing.appendChild($name);
  $homePageListing.appendChild($price);
  $homePageListing.appendChild($percentChange);
  $homePageListing.appendChild($heartIcon);

  return $column;
}

console.log(assetsData);

// const $row = document.createElement('div');
// $row.setAttribute('class', 'row');

// const $columnThirdOne = document.createElement('div');
// $columnThirdOne.setAttribute('class', 'column-third');

// const $columnThirdTwo = document.createElement('div');
// $columnThirdTwo.setAttribute('class', 'column-third');

// const $columnThirdThree = document.createElement('div');
// $columnThirdThree.setAttribute('class', 'column-third');
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
