import { $, $$ } from "./modules/bling";
import { deleteWishlistItem, addWishlistItem } from "./modules/wishlist";
import copyUrlEventHandler from "./modules/copyUrl";
import unwrap from "./modules/wrap";

/**
 * Login form event handlers
 */

if ($$(".login-btn")) {
  $$(".login-btn").on("click", () => {
    if ($(".loginBox").style.opacity === "0") {
      $(".loginBox").style.opacity = "1";
      $(".loginBox").classList.add("animated", "bounceIn", "faster");
    } else if ($(".loginBox").style.opacity === "1") {
      $(".loginBox").classList.remove("bounceIn");
      $(".loginBox").classList.add("animated", "bounceOut", "faster");
      setTimeout(() => {
        $(".loginBox").classList.remove("bounceOut");
        $(".loginBox").style.opacity = "0";
      }, 1000);
    }
  });
}

/**
 * Wishlist event handlers
 */

if ($(".add-item")) {
  $(".add-item").addEventListener("keyup", addWishlistItem);
}
if ($("#add-item-btn")) {
  $("#add-item-btn").on("click", addWishlistItem);
}
if ($$(".delete")) {
  $$(".delete").on("click", deleteWishlistItem);
}

/**
 * Copy url event handlers
 */

if ($("#copyUrl")) {
  $("#copyUrl").on("click", copyUrlEventHandler);
}

/**
 * Gift wrap event handlers
 */

if ($$(".gift")) {
  $$(".gift").on("click", unwrap);
}
