import { $, $$ } from './modules/bling';
import axios from 'axios';
import dompurify from 'dompurify';

$(".login-btn") && $(".login-btn").on("click", (event) => {
    $(".social-form").style.display = "block";
});

$(".social-form").on("click", (event) => {
    if (event.target.classList.contains("social-form")) {
        $(".social-form").style.display = "none";
    }
});

function wishlistResultsHTML(wishes) {
    return wishes.map(wish => {
      return `<li>${wish}</li>`;
    }).join('');
  }

$(".add-item").addEventListener("keyup", (event) => {
    event.preventDefault();

    if (event.key === "Enter") {
        axios
            .post("/api/wishlist/add", {
                item: dompurify.sanitize(event.target.value)
            })
            .then(res => {
                if (res.data.length) {
                    $(".card__body").innerHTML = wishlistResultsHTML(res.data);
                    $(".add-item").value = "";
                    return;
                }
            })
            .catch(console.error);
    }
});

$("#copyUrl").on("click", (event) => {
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
});

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
