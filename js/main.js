document.addEventListener('DOMContentLoaded', () => {
  const splashPage = document.getElementById('splash-page');
  const circle = document.getElementById('circle');
  const mainContent = document.getElementById('main-content');

  setTimeout(() => {
    circle.style.transform = 'scale(50)';
  }, 500);

  circle.addEventListener('transitionend', () => {
    mainContent.classList.remove('hidden');
    splashPage.style.display = 'none';
  });
});
