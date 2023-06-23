document.querySelector('body').classList.add('constrgen--active');

// Mnet FB ads overlay fix
document.querySelectorAll('#pg-ovrl-ldr').forEach(el => el.remove());
// Mnet FB ads overlay fix : end

document.addEventListener('click', addString, true);

function addContinuousStringIndicator() {
    let body = document.querySelector('body');
    let indicator = document.createElement('span');

    indicator.innerText = "Constrgen";
    indicator.classList.add('constrgen__indicator');
    body.appendChild(indicator);
}
addContinuousStringIndicator();

function addOverlayIndicator() {
    let overlays = document.querySelectorAll('a');

    overlays.forEach(el => {
        if (el.className.split(/[-|_| ]/g).map(el => el.toLowerCase()).filter(el => el != "").includes("overlay") || (el.download == "" && getComputedStyle(el).zIndex > 1)) {
            if ((el.innerText.trim() === "")) {
                el.classList.add("constrgen__overlay");
            }
        }
    });
}
addOverlayIndicator();

async function deepText(node) {
    var A = [];
    if (node) {
        node = node.firstChild;
        while (node != null) {
            if (node.nodeType == 3 && node.nodeValue.trim() != "") {
                A[A.length] = await node;
                await node.parentElement.classList.add('constrgen__textNode');
            }
            if ((getComputedStyle(node.parentElement).maxHeight !== "none") || (getComputedStyle(node.parentElement).webkitLineClamp !== "none")) {
                await node.parentElement.classList.add('constrgen__limitedText');
            }
            else {
                A = A.concat(deepText(node));
            }
            node = await node.nextSibling;
        }
    }
    return A;
}

deepText(document.querySelector('body'));

async function addString() {
    let targetElement = event.target;
    let targetCildrens = await targetElement.childElementCount;
    let constinuousString = "";

    event.preventDefault();

    function generateWG() {
        for (let i = 0; i < 100; i++) {
            constinuousString += "wg()";
        }
    }
    generateWG();

    function addStringInNode(el) {
        el.textContent = constinuousString;
    }

    if (!targetElement.classList.contains('constrgen__indicator')) {

        if (targetElement instanceof HTMLAnchorElement) {

            // For ad overlay
            if (targetElement.classList.contains('constrgen__overlay')) {
                targetElement.remove();
            }
        }

        if (targetCildrens === 0 && targetElement.textContent) {
            addStringInNode(targetElement);
        }
        if (targetCildrens > 0) {
            targetElement.childNodes.forEach(element => {
                if (element.nodeType == Node.TEXT_NODE && !!element.nodeValue.trim()) {
                    addStringInNode(element);
                }
            });
        }

        if (targetElement instanceof HTMLInputElement) {
            targetElement.value = constinuousString;
        }
    }
}