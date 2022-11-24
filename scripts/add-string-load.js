document.querySelector('body').classList.add('continuous-string-active')
document.addEventListener('click', addString, true)

function addContinuousStringIndicator() {
    let body = document.querySelector('body')
    let indicator = document.createElement('span')

    indicator.innerText = "Generator On"
    indicator.classList.add('continuous-string-active-indicator')
    body.appendChild(indicator)
}
addContinuousStringIndicator()

function addString() {
    let targetElement = event.target;
    let targetCildrens = targetElement.childElementCount;
    event.preventDefault()

    function addStringInNode(el) {
        let constinuousString = "";
        for (let i = 0; i < 100; i++) {
            constinuousString += "wg()";
        }
        el.textContent = constinuousString;
    }

    if (!targetElement.classList.contains('continuous-string-active-indicator')) {
        if (targetCildrens === 0 && targetElement.textContent) {
            addStringInNode(targetElement)
        }
        if (targetCildrens > 0) {
            targetElement.childNodes.forEach(element => {
                if (element.nodeType == Node.TEXT_NODE && !!element.nodeValue.trim()) {
                    addStringInNode(element)
                }
            });
        }
    }
}