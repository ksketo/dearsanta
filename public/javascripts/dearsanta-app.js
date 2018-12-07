import { $, $$ } from './modules/bling';

$(".login-btn").on("click", (event) => {
    $(".social-form").style.display = "block";
});

$(".social-form").on("click", (event) => {
    if (event.target.classList.contains("social-form")) {
        $(".social-form").style.display = "none";
    }
});