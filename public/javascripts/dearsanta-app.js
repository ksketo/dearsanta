import { $, $$ } from "./modules/bling";
import { deleteWishlistItem, addWishlistItem } from "./modules/wishlist";
import copyUrlEventHandler from "./modules/copyUrl";

/**
 * Login form event handlers
 */

$$(".login-btn") && $$(".login-btn").on("click", (event) => {
    $(".social-form").style.display = "block";
});

$(".social-form").on("click", (event) => {
    if (event.target.classList.contains("social-form")) {
        $(".social-form").style.display = "none";
    }
});

/**
 * Wishlist event handlers
 */

$(".add-item").addEventListener("keyup", addWishlistItem);
$$(".delete").on("click", deleteWishlistItem);

/**
 * Copy url event handlers
 */

$("#copyUrl").on("click", copyUrlEventHandler);
