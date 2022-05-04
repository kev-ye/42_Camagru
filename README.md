# Camagru

## Index

* [Presentation](#Presentation)
* [Todo](#Todo)
* [Tech](#Tech)

## Presentation

42 School Project  
The goal of this project is to build a web application a little more complex than the previous ones with a little less means.

## Todo

Mandatory Part:

- [ ] header + main + footer
- [ ] requirement about form (password in db not encrypted, injection sql, upload undesirable content, can modify a sql request ...)

User features:

- [x] user subscription: email + username + password(security)
- [x] user must have validated his account with url receive by email
- [x] user should be able to connect with username + password
- [x] user can reset her password with url receive by email if he forgets
- [x] user must be able to disconnect with a single click from any page on the site
- [x] user will be able to modify username, email and password, once logged in

Gallery features:

- [x] accessible without authentication
- [x] list of images sort by date creation
- [x] image must be able to allow the user comment and like them if he is authenticated
- [ ] when an image receives a new comment, the author of this image must be informed by email (This preference is enabled by default, but can be disabled in the user preferences)
- [x] list of images should be paginated, with at least 5 items per page.

Editing features:

- [x] a main section containing the preview of the user’s webcam, the list of superposable images and a button allowing to capture a picture.
- [x] a side section displaying thumbnails of all previous pictures taken.
- [x] Superposable images must be selectable and the button allowing to take the picture should be inactive (not clickable) as long as no superposable image has been selected.
- [x] creation of the final image must be done on the server side.
- [x] allow the upload of a user image instead of capturing one with the webcam.
- [x] user should be able to delete his edited images, but only his, not other users creations

Deployment:

- [ ] docker-compose

# Tech

Authorized languages:
- Server: All
- Client: HTML + CSS + Javascript

Authorized frameworks:
- Server: Limited to standard PHP library functions
- Client: CSS frameworks tolerated, as long as it does not add JavaScript

Containerization (deployment)
