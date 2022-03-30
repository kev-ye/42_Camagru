# Camagru

## Index

* [Presentation](#Presentation)
* [Todo](#Todo)
* [Tech](#Tech)

## Presentation

42 School Project  
The goal of this project is to build a web application a little more complex than the previous ones with a little less means.

## Todo

Common part:

- [ ] header + main + footer
- [ ] requirement about form (password in db not encrypted, injection sql, upload undesirable content, can modify a sql request ...)

User part:

- [ ] user subscription: email + username + password(security)
- [ ] user must have validated his account with url receive by email
- [ ] user should be able to connect with username + password
- [ ] user can reset her password with url receive by email if he forgets
- [ ] user must be able to disconnect with a single click from any page on the site
- [ ] user will be able to modify username, email and password, once logged in

Gallery part:

- [ ] accessible without authentication
- [ ] list of images sort by date creation
- [ ] image must be able to allow the user comment and like them if he is authenticated
- [ ] when an image receives a new comment, the author of this image must be informed by email (This preference is enabled by default, but can be disabled in the user preferences)
- [ ] list of images should be paginated, with at least 5 items per page.

Deployment:

- [ ] docker-compose

# Tech

Authorized languages:
- Server: All (I choose Javascript)
- Client: HTML + CSS + Javascript

Authorized frameworks:
- Server: Limited to standard PHP library functions (We can use Javascript)
- Client: CSS frameworks tolerated, as long as it does not add JavaScript

Containerization (deployment)
