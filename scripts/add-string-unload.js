(function () {
    document.removeEventListener('click', addString, true);
    document.querySelector('body').classList.remove('constrgen--active');
    document.querySelector('.constrgen__indicator') && document.querySelector('.constrgen__indicator').remove();
    document.querySelectorAll('.constrgen__overlay').forEach(el => el.classList.remove('constrgen__overlay'));
    document.querySelectorAll('.constrgen__limitedText').forEach(el => el.classList.remove('constrgen__limitedText'));
    document.querySelectorAll('.constrgen__textNode').forEach(el => el.classList.remove('constrgen__textNode'));
})();