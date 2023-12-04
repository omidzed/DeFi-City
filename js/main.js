/* global data */

const $assetsList = document.querySelector('.assets-list');
const $watchList = document.querySelector('.watch-list');
const $heartIcon = document.createElement('i');
const $mainContainer = document.querySelector('.main-container');
const views = $mainContainer.querySelectorAll('.view-container');
console.log('views', views);

$heartIcon.setAttribute('class', 'fa-regular fa-heart');

console.log('asset list:', $assetsList);
console.log('watch-list:', $watchList);
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
  console.log('marketdata', marketData);
  for (let i = 0; i < marketData.length - 1; i++) {
    const price = marketData[i].quote.USD.price;
    const formattedPrice = price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    const formatter = new Intl.NumberFormat('en-US', {
      notation: 'compact',
      compactDisplay: 'long',
    });
    marketCap = formatter.format(marketData[i].quote.USD.market_cap);
    volume = formatter.format(marketData[i].quote.USD.volume_24h);
    circulatingSupply = formatter.format(marketData[i].circulating_supply);

    const asset = {
      name: marketData[i].name,
      price: formattedPrice,
      symbol: marketData[i].symbol,
      percentChange: marketData[i].quote.USD.percent_change_24h,
      volume: volume,
      marketCap: marketCap,
      circulatingSupply: circulatingSupply,
    };
    assetsData.push(asset);
    $assetsList.append(renderAsset(asset));
    $watchList.append(renderWatchedAsset(asset));
  }
});
xhr.send();
console.log('assetsData', assetsData);
function renderAsset(asset) {
  const $column = document.createElement('div');
  $column.setAttribute('class', 'column-third');

  const $homePageListing = document.createElement('div');
  $homePageListing.setAttribute('class', 'home-page-listing');
  $homePageListing.setAttribute('data-asset-id', data.nextAssetId);

  const $logo = document.createElement('img');
  $logo.setAttribute('class', 'asset-logo');
  $logo.src = 'images/Bitcoin.png';

  const $name = document.createElement('div');
  $name.setAttribute('class', 'name');
  if (asset.name.length < 14) {
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

  const $row = document.createElement('div');
  $row.setAttribute('class', 'row');

  const $logo = document.createElement('img');
  $logo.setAttribute('class', 'watch-list-item-logo');
  $logo.src = 'images/Bitcoin.png';

  const $watchListItemStats = document.createElement('div');
  $watchListItemStats.setAttribute('class', 'watch-list-item-stats');

  const $topRow = document.createElement('div');
  $topRow.setAttribute('class', 'top-row');

  $topRowsec1 = document.createElement('div');
  $topRowsec1.setAttribute('class', 'top-row-section1');

  $topRowsec2 = document.createElement('div');
  $topRowsec2.setAttribute('class', 'top-row-section2');

  const $name = document.createElement('div');
  $name.setAttribute('class', 'name');
  $name.textContent = `${asset.name} (${asset.symbol})`;

  const $symbol = document.createElement('div');
  $symbol.setAttribute('class', 'symbol');
  $symbol.textContent = ``;

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

  const $statsDiv1 = document.createElement('div');
  $statsDiv1.setAttribute('class', 'stats-div1');
  const $circulatingSupply = document.createElement('div');
  $circulatingSupply.setAttribute('class', 'circulating-supply');
  $circulatingSupply.textContent =
    'Circulating Supply: ' + asset.circulatingSupply;

  const $statsDiv2 = document.createElement('div');
  $statsDiv2.setAttribute('class', 'stats-div2');
  const $marketCap = document.createElement('div');
  $marketCap.setAttribute('class', 'market-cap');
  $marketCap.textContent = '$' + asset.marketCap;

  const $statsDiv3 = document.createElement('div');
  $statsDiv3.setAttribute('class', 'stats-div3');
  const $volume = document.createElement('div');
  $volume.setAttribute('class', 'volume');
  $volume.textContent = '$' + asset.volume;

  $column.appendChild($watchListItem);
  $watchListItem.appendChild($row);
  $row.appendChild($logo);
  $row.appendChild($watchListItemStats);
  $watchListItemStats.appendChild($topRow);
  $topRow.appendChild($topRowsec1);
  $topRowsec1.appendChild($name);
  $topRowsec1.appendChild($symbol);
  $topRow.appendChild($topRowsec2);
  $topRowsec2.appendChild($price);
  $topRowsec2.appendChild($percentChange);
  $watchListItemStats.appendChild($statsDiv1);
  $statsDiv1.appendChild($circulatingSupply);
  $watchListItemStats.appendChild($statsDiv2);
  $statsDiv2.appendChild($marketCap);
  $watchListItemStats.appendChild($statsDiv3);
  $statsDiv3.appendChild($volume);

  return $column;
}

function viewSwap(targetView) {
  for (let i = 0; i < $views.length; i++) {
    if ($views[i].getAttribute('data-view') === targetView) {
      $views[i].classList.remove('hidden');
    } else {
      $views[i].classList.add('hidden');
    }
  }
  data.view = targetView;
}

const $heartIcons = document.querySelectorAll('i');

$assetsList.addEventListener('click', function (event) {
  if (event.target.tagName === 'I') {
    event.target.classList.add('red-heart');
    //  const $columnThird = event.target.closest('.fa-regular');
    const columnThird = event.target.closest('.home-page-listing');
  }
});

// const watchListAsset = {
//   assetId: data.nextAssetId,
//   name: $listItem.$name.textContent,
//   price: $listItem.$price.textContent,
// };
// }
// data.watchListAssets.unshift(asset);
// data.nextAssetId++;
// $assetsList.prepend(renderAsset(asset));
//$column.getAttribute()

// function heartIconHandler(event)

// document.addEventListener('DOMContentLoaded', function (event) {
//   const splashPage = document.querySelector('.splash-page');
//   const circle = document.querySelector('.circle');
//   const mainContent = document.querySelector('.container');
//   const $assets = data.watchListAssets;

//   for (let i = 0; i < $assets.length; i++) {
//     const asset = renderAsset($assets[i]);
//     $assetsList.appendChild(asset);
//   }
//   viewSwap(data.view);

//   // Delay for the splash screen
//   setTimeout(function (event) {
//     circle.style.transform = 'scale(50)';
//   }, 5000);

//   circle.addEventListener('transitionend', function (event) {
//     mainContent.classList.remove('hidden');
//     splashPage.style.display = 'none';
//   });
//   setTimeout(function () {
//     const splashScreen = document.getElementById('splash-screen');
//     splashScreen.style.clipPath = 'circle(100% at 50% 50%)'; // Grow the circle

//     // listen for the end of the transition
//     splashScreen.addEventListener('transitionend', function () {
//       document.getElementsByTagName('main').classList.remove('hidden'); // Show main content
//       splashScreen.style.display = 'none'; // Hide splash screen
//     });
//   }, 3000);
// });
//  if (data.editing === null) {
//   data.entries.unshift(entry);
//   data.nextEntryId++;
//   $photoPreview.src = 'images/placeholder-image-square.jpg';
//   $entriesList.prepend(renderEntry(entry));
//   $entryForm.reset();

//   viewSwap('entries');
//   toggleNoEntries();
// } else {
//   entry.entryId = data.editing.entryId;
//   const $listItems = document.querySelectorAll('li');
//   for (let i = 0; i < $listItems.length; i++) {
//     const dataEntryId = $listItems[i].getAttribute('data-entry-id');
//     if (Number(dataEntryId) === data.editing.entryId) {
//       data.entries[i] = entry;
//       $listItems[i].replaceWith(renderEntry(entry));
//     }
//   }
//   data.editing = null;
//   $H2element.textContent = 'New Entry';
//   $photoPreview.src = 'images/placeholder-image-square.jpg';
//   $entryForm.reset();
//   viewSwap('entries');
