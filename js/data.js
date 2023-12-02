/* exported data */

let data = {
  view: 'home-page',
  watchListAssets: [],
  editing: null,
  nextAssetId: 1,
};

window.addEventListener('beforeunload', function (event) {
  const assetsJSON = JSON.stringify(data);
  localStorage.setItem('javascript-local-storage', assetsJSON);
});

const previousAssetsJSON = localStorage.getItem('javascript-local-storage');
if (previousAssetsJSON !== null) {
  data = JSON.parse(previousAssetsJSON);
}
