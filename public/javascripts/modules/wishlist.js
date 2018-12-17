import axios from 'axios';
import dompurify from 'dompurify';
import { $, $$ } from "./bling";

function wishlistResultsHTML(wishes) {
    return wishes.map(wish => {
      return `<li>${wish} <i class="delete fas fa-times" data-value="${wish}"></i></li>`;
    }).join('');
}

function deleteWishlistItem(event) {
    event.preventDefault();

    axios
        .post("/api/wishlist/remove", {
            item: dompurify.sanitize(event.target.dataset.value)
        })
        .then(res => {
            if (res.data.length) {
                $(".card__body").innerHTML = wishlistResultsHTML(res.data);

                const classname = document.getElementsByClassName("delete");
                for (var i = 0; i < classname.length; i++) {
                    classname[i].addEventListener('click', deleteWishlistItem);
                }
            } else {
                $(".card__body").innerHTML = "<p class='warning'> Your wishlist is empty!</p>";
            }
        })
        .catch(console.error);
}

function addWishlistItem(event) {
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

                    var classname = document.getElementsByClassName("delete");
                    for (var i = 0; i < classname.length; i++) {
                        classname[i].addEventListener('click', deleteWishlistItem);
                    }
                }
            })
            .catch(console.error);
    }
}

export { deleteWishlistItem, addWishlistItem };