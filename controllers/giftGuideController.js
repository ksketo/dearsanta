exports.getGuides = function(req, res, next) {
  const guides = require("../public/data/gift-guides.json");

  res.render('gift-guides', {
    title: 'Gift Guides',
    description: "Christmas Gift Guides",
    guides
  });
}