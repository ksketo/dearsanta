const guides = require("../public/data/gift-guides.json");

exports.getGuides = function(req, res) {
  res.render("gift-guides", {
    title: "Gift Guides",
    description: "Christmas Gift Guides",
    guides
  });
};
