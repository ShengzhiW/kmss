# Team Member Contributions
* [Sierra Gutierrez](https://github.com/sierracaitlin)<br />
   * Worked on storyboards and wireframes
   * Implemented details and added CSS on the Preparations page
   * Worked on checklist by adding all the items on firebase
   * Added early Twitter UI/animations
   * Updated overall look and feel of the app by implementing dark mode to all pages
* [Marjorie Tolentino](https://github.com/marj-nt)<br />
   * Worked on storyboards and early prototypes
   * Incorporated animations for page loading and fact transitions
   * Worked on UI feedback with hover and pointer styling for actionable
   elements
   * Worked on preparations card styling to suggest interactivity

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
11. [facts-functions.js](public/script/facts-functions.js)
      * Sets the location of the user using and gets the location based on the longitude and latitude. It can also performa a get request to get a new hurricane fact.
12. [prep-functions.js](public/script/prep-functions.js)
      * Populates the checkboxes in preparations.handlebars using the data from the firebase database. It also watches for any changes in checkbox states and will save firebase if any checkboxes are changed.
13. [pic-functions.js](public/script/pic-functions.js)
      * Changes the profile picture and loads the new profile picture back into the page. It will alsoload the profile picture upon the page's first load

## (.handlebars) Files
1. [home.handlebars](views/home.handlebars)
   * Contains the HTML elements of the Home page of the application. It contains a "Random Hurricane Fact" button that uses ajax to fetch a new fact each time the button is clicked.
2. [login.handlebars](views/login.handlebars)
   * Contains the HTML elements of the login page of the application. It will ask for the username and password to login.
3. [maps.handlebars](views/maps.handlebars)
   * Contins the HTML elements of the Weather Maps page of the application. This page will display a weather map based on the location that the suer has set.  
4. [preparations.handlebars](views/preparations.handlebars)
   * Contins the HTML elements of the Preparations page of the application. This page will display tips for preparing for the hurricane and various checklists with saved progress.  
5. [shelters.handlebars](views/shelters.handlebars)
   * Contains the HTML elements of the shelters page on the web application. It uses Google Map APIs to show the locations of shelters near your location. The data is pulled from a JSON file hosted by the Department of Homeland Security and displayed on an interactive map.
6. [trending.handlebars](views/trending.handlebars)
   * Contins the HTML elements of the Weather Maps page of the application. This page will display a live twitter feed for hurricane related feed and a official National Hurricane Center feed.  
7. [head-hc.handlebars](views/partials/head-hc.handlebars)
   * Contains the HTML elements to import various js files and stylesheets needed on every page of the applicaiton.
8. [nav-hc.handlebars](views/partials/nav-hc.handlebars)
   * Contains the HTML elements to generate a navbar on every page of the applicaiton.

## (.css) Files
1. [style.css](public/stylesheets/style.css)
   * Contains the Stylesheets adds style to each page in the application that adds various styles and animations (in addition to bootstrap and animate.css). It also imports a custom font.

# Google Slides Link
https://docs.google.com/presentation/d/122ULw1_dcJVxKD0Whk8Fj6GZPZwIVBfywunL4kfpQ4Y/edit#slide=id.p
# Demo Video
https://www.youtube.com/watch?v=efUxCbbSZAg&feature=youtu.be&fbclid=IwAR3AD5TaihjHLzw1pTwyt8lfarfyXq-gGsa0oee_MIDEpvNRfF6984-I-SI
