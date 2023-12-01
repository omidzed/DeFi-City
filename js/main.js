const $assetsList = document.querySelector('.assets-list');
const $watchList = document.querySelector('watch-list');
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
  for (let i = 0; i < marketData.length - 1; i++) {
    // getIndividalCurrency(marketData[i].id);
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
  $column.setAttribute('class', 'column-third');

  const $homePageListing = document.createElement('div');
  $homePageListing.setAttribute('class', 'home-page-listing');

  const $logo = document.createElement('img');
  $logo.setAttribute('class', 'asset-logo');
  $logo.src = 'images/Bitcoin.png';

  const $name = document.createElement('div');
  $name.setAttribute('class', 'name');
  if (asset.name.length < 20) {
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
  $homePageListing.appendChild($logo);
  $homePageListing.appendChild($name);
  $homePageListing.appendChild($price);
  $homePageListing.appendChild($percentChange);
  $homePageListing.appendChild($heartIcon);

  return $column;
}

function renderWatchedAsset(asset) {
  const $column = document.createElement('div');
  $column.setAttribute('class', 'column-third');

  const $watchListItem = document.createElement('div');
  $watchListItem.setAttribute('class', 'watch-list-item');

  const $logo = document.createElement('img');
  $logo.setAttribute('class', 'asset-logo');
  $logo.src = 'images/Bitcoin.png';

  const $name = document.createElement('div');
  $name.setAttribute('class', 'name');

  const $symbol = document.createElement('div');
  $symbol.setAttribute('class', 'symbol');

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

  const $cmcRank = document.createElement('div');
  $cmcRank.setAttribute('class', 'cmc-rank');

  const $cmcLogo = document.createElement('img');
  $cmcLogo.setAttribute('class', 'asset-logo');
  $cmcLogo.src = 'images/Coinmarketcap_svg_logo.svg';

  $column.appendChild($homePageListing);
  $homePageListing.appendChild($logo);
  $homePageListing.appendChild($name);
  $homePageListing.appendChild($price);
  $homePageListing.appendChild($percentChange);
  $homePageListing.appendChild($heartIcon);

  return $column;
}
console.log(assetsData);

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

// function getIndividalCurrency(id) {
//   // const targetUrl =
//   //   'https://pro-api.coinmarketcap.com/v1/exchange/info?id=74';
//   const targetUrl =
//     `https://pro-api.coinmarketcap.com/v2/cryptocurrency/info?id=${id}`;
//   const xhr = new XMLHttpRequest();
//   xhr.open('GET', 'https://lfz-cors.herokuapp.com/?url=' + targetUrl);
//   xhr.setRequestHeader(
//     'X-CMC_PRO_API_KEY',
//     '44f133d8-a055-48f2-a1c2-2cdfa46723f7',
//   );
//   xhr.responseType = 'json';
//   xhr.addEventListener('load', function () {
//     let marketData = [];
//     marketData = xhr.response;
//     console.log('logos log:', marketData);
//   });
//   xhr.send();
// }
