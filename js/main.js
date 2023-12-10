/* global data */

const $assetsList = document.querySelector('.assets-list');
const $watchList = document.querySelector('.watch-list');
const $watchListIcon = document.querySelector('#watch-list-icon');
const $views = document.querySelectorAll('.view-container');
const $appLogo = document.querySelector('.app-logo');
const $searchInput = document.querySelector('.search-box');
const $assetModal = document.querySelector('.modal-container');

// Debounce function to limit the frequency of event handling
function debounce(func, delay) {
  let inDebounce;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(inDebounce);
    inDebounce = setTimeout(() => func.apply(context, args), delay);
  };
}

// Event listener for the search input
$searchInput.addEventListener(
  'keydown',
  debounce(() => {
    const searchValue = $searchInput.value.toLowerCase();
    const filteredAssets = assetsData.filter((asset) =>
      asset.name.toLowerCase().includes(searchValue),
    );

    // Clear current assets and render the filtered ones
    $assetsList.innerHTML = ''; // Clear existing assets
    filteredAssets.forEach((asset) => $assetsList.append(renderAsset(asset)));
  }, 300),
); // 300ms debounce delay

// Submit event to restore full list
$searchInput.addEventListener('submit', (e) => {
  e.preventDefault();
  $assetsList.innerHTML = '';
  assetsData.forEach((asset) => $assetsList.append(renderAsset(asset)));
});

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
  data.currencies = xhr.response.data;
  for (let i = 0; i < marketData.length; i++) {
    const price = marketData[i].quote.USD.price;
    const logo = data.logos[i].logo;
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
      id: marketData[i].id,
      logo: data.logos[i].logo,
    };
    assetsData.push(asset);
    if (Number(data.logos[i].id) === Number(data.currencies[i].id)) {
      logo.src = data.logos[i].logo;
    }
    $assetsList.append(renderAsset(asset));
    $watchList.append(renderWatchedAsset(asset));
  }
});
xhr.send();

function renderAsset(asset) {
  const $column = document.createElement('div');
  $column.setAttribute('class', 'column-third');
  $column.setAttribute('data-id', asset.id);

  const $homePageListing = document.createElement('div');
  $homePageListing.setAttribute('class', 'home-page-listing');

  const $logo = document.createElement('img');
  $logo.setAttribute('class', 'asset-logo');
  $logo.src = asset.logo;

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
  $heartIcon.setAttribute('class', 'fa-regular fa-heart white-heart');

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
  $column.setAttribute('data-id', asset.id);

  const $watchListItem = document.createElement('div');
  $watchListItem.setAttribute('class', 'watch-list-item');

  const $row = document.createElement('div');
  $row.setAttribute('class', 'watch-list-logo-container');

  const $logo = document.createElement('img');
  $logo.setAttribute('class', 'watch-list-item-logo');
  $logo.src = 'images/Bitcoin.png';

  const $watchListItemStats = document.createElement('div');
  $watchListItemStats.setAttribute('class', 'watch-list-item-stats');

  const $statsColumn1 = document.createElement('div');
  $statsColumn1.setAttribute('class', 'column');

  const $statsColumn2 = document.createElement('div');
  $statsColumn2.setAttribute('class', 'column');

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

  const $circulatingSupplyLabel = document.createElement('p');
  $column.appendChild($watchListItem);
  $watchListItem.appendChild($row);
  $row.appendChild($logo);
  $row.appendChild($watchListItemStats);
  $watchListItemStats.appendChild($statsColumn1);
  $watchListItemStats.appendChild($statsColumn2);
  $statsColumn1.appendChild($name);
  $statsColumn1.appendChild($symbol);
  $statsColumn2.appendChild($price);
  $statsColumn2.appendChild($percentChange);
  $statsColumn2.appendChild($circulatingSupply);
  $statsColumn2.appendChild($marketCap);
  $statsColumn2.appendChild($volume);

  return $column;
}
// In charge of switching views
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

$watchListIcon.addEventListener('click', handleWatchListIcon);
$appLogo.addEventListener('click', handleAppLogo);
// Switches to watch-list
function handleWatchListIcon(event) {
  viewSwap('watch-list');
}
// Switches to Home-Page
function handleAppLogo(event) {
  viewSwap('home-page');
}

// Adds Assets to the Watch-List
$assetsList.addEventListener('click', function (event) {
  const heartFav = event.target;
  const assetColumnDiv = heartFav.closest('.column-third');
  if (
    event.target.tagName === 'I' &&
    heartFav.classList.contains('white-heart')
  ) {
    heartFav.classList.add('red-heart');
    heartFav.classList.remove('white-heart');
  } else if (heartFav.classList.contains('red-heart')) {
    heartFav.classList.remove('red-heart');
    heartFav.classList.add('white-heart');
  }
  // for (let i = 0; i < data.currencies.length; i++) {
  //   if (
  //     Number(assetColumnDiv.getAttribute('data-id')) ===
  //       Number(data.currencies[i].id) &&
  //     data.favorites[i] === null
  //   ) {
  //     data.favorites.unshift(data.currencies[i]);
  //     $watchList.add;
  //   }
  // }
  // const $watchListItems = document.querySelectorAll('.watch-list-item');
  // for (let i = 0; i < data.favorites.length; i++) {
  //   const favoriteAssetId = $watchListItems[i].getAttribute('data-id');
  //   if (Number(data.favorites.id) === Number(favoriteAssetId)) {
  //     $watchListItems[i].remove();
  //     data.favorites.splice(i, 1);
  //   }
  //   data.favorites.splice(i, 1);
  //   $watchList.remove();
  //   }
  // }
});

$assetsList.addEventListener('click', function (event) {
  const assetListing = event.target;
  const assetColumnDiv = assetListing.closest('.column-third');
  if (
    event.target.className === 'home-page-listing' &&
    event.target.tagName !== 'I'
  ) {
    $assetModal.classList.remove('hidden');
  }
});

$assetModal.addEventListener('click', function (event) {
  if (event.target.className === 'modal-container') {
    $assetModal.classList.add('hidden');
  }
});
