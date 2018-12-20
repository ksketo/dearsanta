import { $, $$ } from "./bling";

// Reference: https://stackoverflow.com/a/33928558/4619005
function copyToClipboard(text) {
    if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
        const textarea = document.createElement("textarea");

        textarea.textContent = text;
        textarea.style.position = "fixed";  // Prevent scrolling to bottom of page in MS Edge.
        document.body.appendChild(textarea);
        textarea.select();
        try {
            return document.execCommand("copy");  // Security exception may be thrown by some browsers.
        } catch (ex) {
            console.warn("Copy to clipboard failed.", ex);
            return false;
        } finally {
            document.body.removeChild(textarea);
        }
    } else if (window.clipboardData && window.clipboardData.setData) {
        // IE specific code path to prevent textarea being shown while dialog is visible.
        return clipboardData.setData("Text", text); 
    }
}

function copyUrlEventHandler(event) {
    const e = event || window.event;
    const target = e.currentTarget || e.srcElement;
    const clickedUrl = target.dataset.url;

    // Animate 'Url copied' on successful copy
    if (copyToClipboard(clickedUrl)) {
        if ($('#containerCopy').style.opacity == 0) {
            $('#containerCopy').style.opacity = 1;
    
            setTimeout(() => {
                $('#containerCopy').style.opacity = 0;
            }, 2000);
        }
    }
}

export default copyUrlEventHandler;