import { $, $$ } from "./modules/bling";
import { deleteWishlistItem, addWishlistItem } from "./modules/wishlist";
import copyUrlEventHandler from "./modules/copyUrl";

/**
 * Login form event handlers
 */

$$(".login-btn") && $$(".login-btn").on("click", (event) => {
    if ($(".loginBox").style.display === "none") {
        $(".loginBox").style.display = "block";
        $(".loginBox").classList.add("animated", "bounceIn", "faster");
    } else if ($(".loginBox").style.display === "block") {
        $(".loginBox").classList.remove("bounceIn");
        $(".loginBox").classList.add("animated", "bounceOut", "faster");
        setTimeout(() => {
            $(".loginBox").classList.remove("bounceOut");
            $(".loginBox").style.display = "none";
        }, 1000);
    }
});

/**
 * Wishlist event handlers
 */

$(".add-item") && $(".add-item").addEventListener("keyup", addWishlistItem);
$$(".delete") && $$(".delete").on("click", deleteWishlistItem);

/**
 * Copy url event handlers
 */

$("#copyUrl") && $("#copyUrl").on("click", copyUrlEventHandler);
