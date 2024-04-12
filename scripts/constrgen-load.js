function addContinuousStringIndicator() {
    const body = document.querySelector('body');

    const indicator = document.createElement('span');
    indicator.innerText = "constrgen";
    indicator.classList.add('constrgen__indicator');

    body.appendChild(indicator);
}

function addOverlayIndicator() {
    const overlays = document.querySelectorAll('a');

    overlays.forEach(el => {
        if (el.className.split(/[-|_| ]/g).map(el => el.toLowerCase()).filter(el => el != "").includes("overlay") || (el.download == "" && getComputedStyle(el).zIndex > 1)) {
            if ((el.innerText.trim() === "")) {
                el.classList.add("constrgen__overlay");
            }
        }
    });
}

function getConstrgenKey() {
    return `constrgen__site_${getDomainName()}`;
}

function getDomainName() {
    const splitedUrl = window.location.href.split('.')[0].split('//');
    return splitedUrl[splitedUrl.length - 1];
}

function getSessionStorageValue(key) {
    return JSON.parse(sessionStorage.getItem(key));
}

function storeSessionStorageValue(key, value) {
    sessionStorage.setItem(key, JSON.stringify(value));
}

function removeSessionStorageValue(key) {
    sessionStorage.removeItem(key);
}

function hasSwappedNodes() {
    const swappedNodes = document.querySelectorAll('[data-constrgentextnodekey]');
    return swappedNodes.length > 0;
}

function initSessionStorage() {
    if (hasSwappedNodes()) {
        return;
    }
    removeSessionStorageValue(getConstrgenKey());
}

function restoreText(el, textNodeIndex) {
    const key = getConstrgenKey();
    const storedObj = getSessionStorageValue(key);
    const text = storedObj[`constrgentextnodekey_${textNodeIndex}`];
    el.textContent = text;
    delete storedObj[`constrgentextnodekey_${textNodeIndex}`];
    let currentCount = storedObj.swappednodes;
    storedObj.swappednodes = --currentCount;
    storeSessionStorageValue(key, storedObj);
    el.removeAttribute('data-constrgentextnodekey');
}

function storetextNodeDataLocally(el) {
    const key = getConstrgenKey();
    let obj = getSessionStorageValue(key);

    if (!obj) {
        obj = { swappednodes: 0 };
        storeSessionStorageValue(key, obj);
    }

    let newIndex = obj.swappednodes;
    obj.swappednodes = ++newIndex;
    obj[`constrgentextnodekey_${obj.swappednodes}`] = el.textContent;
    el.dataset.constrgentextnodekey = obj.swappednodes;
    storeSessionStorageValue(key, obj);
}

async function deepText(node) {
    var A = [];
    if (node) {
        node = node.firstChild;
        while (node != null) {
            if (node.nodeType === 3 && node.nodeValue.trim() !== "") {
                A[A.length] = await node;
                await node.parentNode.classList.add('constrgen__textNode');

                const parentNodeStyles = getComputedStyle(node.parentNode);
                const isLimitedHeight = (parentNodeStyles.maxHeight !== "none") || (parentNodeStyles.webkitLineClamp !== "none")

                if (isLimitedHeight) {
                    await node.parentNode.classList.add('constrgen__limitedText');
                }
            }
            else {
                A = A.concat(deepText(node));
            }
            node = await node.nextSibling;
        }
    }
    return A;
}

async function addString(event) {
    let targetElement = event.target;
    let targetChildrens = await targetElement.childElementCount;
    let constinuousString = "";

    event.preventDefault();

    if (targetElement.classList.contains('constrgen__indicator')) {
        return;
    }

    function generateWg() {
        for (let i = 0; i < 100; i++) {
            constinuousString += "Wg()";
        }
    }

    generateWg();

    function addStringInNode(el) {
        el.textContent = constinuousString;
    }

    function handleTextNodeState(el) {
        if (!(el instanceof HTMLElement)) {
            const dataConsternoundo = el.parentElement.dataset.constrgennoundo;

            if (dataConsternoundo) {
                return;
            }

            const confirmation = window.confirm('Text mixed with HTML elements is detected. Original state cannot be restored, continue?');

            if (confirmation) {
                addStringInNode(el);
                el.parentElement.dataset.constrgennoundo = 1;
            }
            return;
        }

        const textNodeIndex = el.dataset.constrgentextnodekey;

        if (textNodeIndex) {
            restoreText(el, textNodeIndex);
            return;
        }

        storetextNodeDataLocally(el);
        addStringInNode(el);
    }

    if (targetElement instanceof HTMLAnchorElement) {

        // For ad overlay
        if (targetElement.classList.contains('constrgen__overlay')) {
            targetElement.remove();
        }
    }

    if (targetChildrens === 0 && targetElement.textContent) {
        handleTextNodeState(targetElement);
    }

    if (targetChildrens > 0) {
        let executeOnce = true;
        targetElement.childNodes.forEach(element => {
            if (element.nodeType == Node.TEXT_NODE && !!element.nodeValue.trim() && executeOnce) {
                handleTextNodeState(element);
                executeOnce = false;
            }
        });
    }

    // Cannot undo on inputs
    if ((targetElement instanceof HTMLInputElement) || targetElement instanceof HTMLTextAreaElement) {
        const confirmation = window.confirm('Current value cannot be restored, continue?');
        if (confirmation) {
            targetElement.value = constinuousString;
        }
    }
}

// Init plugin class
document.querySelector('body').classList.add('constrgen--active');

// Mnet FB ads overlay remove
document.querySelectorAll('#pg-ovrl-ldr').forEach(el => el.remove());
// Mnet FB ads overlay remove : end

document.addEventListener('click', addString, true);

deepText(document.querySelector('body'));
addContinuousStringIndicator();
addOverlayIndicator();
initSessionStorage();