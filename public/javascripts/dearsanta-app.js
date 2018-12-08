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

