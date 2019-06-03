# Team Member Contributions
* [Sierra Gutierrez](https://github.com/sierracaitlin)<br />

* [Marjorie Tolentino](https://github.com/marj-nt)<br />

* [Shengzhi Wang](https://github.com/ShengzhiW)<br />
    * Implemented firebase to serve random facts with firebase with ajax.
    * Added database support to the checklist to save user progress. Progress will be populated each time the page loads 
    * Implmented Twitter UI/animations with live refreshes.

* [Kenny Luc](https://github.com/kennyyluc)<br />
    * Added Twitter API functionality that pulls live tweets from twitter containing informaiton about hurricanes.
    * Added Google Map APIs functionality to pull real world data about emergency shelter locations publicly accessibly to everyone. This is then displayed on a map with its location and telephone number.

# Code Functionality 
## (.js) Files
1. [app.js](app.js)
      * This file is what is run to start our application. It connects our Firebase database, our Twitter API, and node package modules that is used in our handlebar files. Additionally, it connects our pages together so that they can be navigated from the navigation bar. This file also processes the get and post requested needed to perform ajax actions. 
2. [home.js](routes/home.js)
      * renders the home.handlebars page when the home page is requested by app.js
3. [login.js](routes/login.js)
      * renders the login.handlebars page when the login page is requested by app.js
4. [maps.js](routes/maps.js)
      * renders the maps.handlebars page when the hurricane maps page is requested by app.js
5. [preparations.js](routes/preparations.js)
      * renders the preparations.handlebars page when the preparations page is requested by app.js
6. [shelters.js](routes/shelters.js)
      * renders the shelters.handlebars page when the shelters page is requested by app.js
7. [trending.js](routes/trending.js)
      * renders the trending.handlebars page when the trending page is requested by app.js
8. [map-functions.js](public/script/map-functions.js)
      * Configures the shelter map using the the coordinates set by the user to display a google map overlaid with nearby shelter locations.
9. [twitter-functions.js](public/script/twitter-functions.js)
      * Reqests fresh tweets automatically at time intervals to reload into the page with animation.
10. *config.js
      * Contains Google and Twitter API keys that is used in App.js. This file is ignored from github for security purposes. If you'd like the Twitter API keys that were used, please contact Kenny Luc.


## (.handlebars) Files
1. [home.handlebars](views/home.handlebars)
2. [login.handlebars](views/login.handlebars)
3. [maps.handlebars](views/maps.handlebars)
4. [preparations.handlebars](views/preparations.handlebars)
5. [shelters.handlebars](views/shelters.handlebars)
    * Contains the HTML elements of the shelters page on the web application. It uses Google Map APIs to show the locations of shelters near your location. The data is pulled from a JSON file hosted by the Department of Homeland Security and displayed on an interactive map.
6. [trending.handlebars](views/trending.handlebars)
7. [head-hc.handlebars](views/partials/head-hc.handlebars)
8. [nav-hc.handlebars](views/partials/nav-hc.handlebars)

## (.css) Files
1. [animate.css](public/stylesheets/animate.css)
2. [style.css](public/stylesheets/style.css)

# Google Slides Link

# Demo Video
