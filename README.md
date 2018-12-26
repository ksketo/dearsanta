# Dear Santa

<img src="images/thumbnail.png" />

## Description
[Dear Santa](https://dearsanta.app/) is a simple Christmas wishlist that you can easily share with friends. The "Gift Guides" section gives you some inspiration for what to ask this year!

This is a simple side project I created to share wishlists between family and some close friends, so other people may find it useful too.

## Technology
I used the following technologies

### Back-end
- Express.js

### Front-end
- Pug.js
- HTML
- CSS
- Vanilla JS
- [Chota micro CSS framework](https://jenil.github.io/chota/)

### Linting
- Prettier for code formating
- Eslint for linting

### How to Run
Start services with
`docker-compose up -d`
and access the app at port 3000 and the database admin at port 8081.
You will also need to get API credentials for Twitter and Google auth.

### How to Deploy
Just install [Now](https://zeit.co/now) and deploy by running `now` in the root dir

## Contribution
Feel free to send any kind of pull request

### TODO Features
- [ ] Organize your shopping list for friends' gifts
- [ ] Add links to the items on your wishlist
- [ ] People with access to your wishlist can claim a gift
- [ ] Timeline with what other people are adding to their wishlists
- [ ] First time users take a feature tour (with something like https://github.com/shipshapecode/shepherd)
