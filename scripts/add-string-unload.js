document.removeEventListener('click', addString, true)
document.querySelector('body').classList.remove('continuous-string-active')
if(document.querySelector('.continuous-string-active-indicator')){
    document.querySelector('.continuous-string-active-indicator').remove()
}