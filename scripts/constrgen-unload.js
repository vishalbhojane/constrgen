(function () {
    document.removeEventListener('click', addString, true);
    document.querySelector('body').classList.remove('constrgen--active');
    document.querySelector('.constrgen__indicator') && document.querySelector('.constrgen__indicator').remove();
    document.querySelectorAll('.constrgen__overlay, .constrgen__limitedText, .constrgen__textNode').forEach((el) => { el.classList.remove('constrgen__overlay','constrgen__limitedText','constrgen__textNode') });
    initSessionStorage();
})();