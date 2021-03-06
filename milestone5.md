# How a user from our target population would use our app

Mark (user) and his family have just moved to Florida from California. He has no knowledge of hurricane preparedness when his next door neighbor shows him Hurrycane, an app that informs people in hurricane prone areas about preparedness and safety. He and his wife open the web app while at the store and use the checklist in the Preparations tab to stock up on their essentials in case of an emergency. There is information on what food to stock as well as other essentials such as tools and items for their baby and dog. As they fill their shopping cart with the essentials, they are able to check off and keep track of everything they have acquired. Once they are home, they start to plan for what's to come and examine the Shelters tab. They notice that it gives them information on nearby shelters and they keep note of that. On the Trending tab, the couple can be informed on the latest news regarding hurricanes, so they can be sure that they are up to date. Even though they just recently moved, they can be as prepared as anyone else who has lived in Florida for years.

# Screenshots of latest UI skeleton webpages

### Login Page
![Image of Login Page](https://raw.githubusercontent.com/ShengzhiW/kmss/master/milestone5/0.png)

### Home Page
![Image of Home Page](https://raw.githubusercontent.com/ShengzhiW/kmss/master/milestone5/1.png)

### Preparations Page
![Image of Preparations Page](https://raw.githubusercontent.com/ShengzhiW/kmss/master/milestone5/2.png)

### Hurricane Map Page
![Image of Hurricane Map Page](https://raw.githubusercontent.com/ShengzhiW/kmss/master/milestone5/3.png)

### Trending Page
![Image of Trending Page](https://raw.githubusercontent.com/ShengzhiW/kmss/master/milestone5/4.png)
### Shelters Page
![Image 1 of Shelters Page](https://raw.githubusercontent.com/ShengzhiW/kmss/master/milestone5/5.png)
![Image 2 of Shelters Page](https://raw.githubusercontent.com/ShengzhiW/kmss/master/milestone5/6.png)

# How UI Skeleton has improved

We have changed all of the pages to reflect a dark mode. This matches the home page's dark theme and helps the rest of the important information stand out. We added a Shelters page that now gives information on nearby shelters available based on the user's location. Our Preparations page now contains more information regarding the checklist. It saves the user's input regarding what they have and have not checked. We also improved the overall look of each card, removing the white border and adding curved edges, in order to separate each section more clearly. We added some loading animation to some pages to show feedback to users. Clicking on "Set My Location" now prompts you with a loading button. Incoming tweets in the Trending page now have an incoming animation, to show users that it is live information.

# Screenshots of how data is displayed/visualized
![Image of Data Visualization](https://raw.githubusercontent.com/ShengzhiW/kmss/master/milestone5/7.png)

# How data display/visualization was implemented

That data we used was all public shelter stations throughout the US. First, we pull the user's longitude and latitude and send that data to Google's API Geocoding to reverse the longitude and latitude's
information to grab the state of the current user. Then we use Google's API Maps Javascript to render a map at the user's location. Based on the user's state, we parse through the JSON data set of all
shelter locations and only displays the ones in the same state.

# Ambitious data display/visualization ideas

One of our goals is to allow the user to save shelter locations on our shelters page. This will allow users to more easily plan their route in a case of an emergency. Additionally, we also plan to
display designated evacuation/freeway routes meant to direct traffic inland in case of an emergency.  This would be accessed via Data.gov 's primary and secondary routes from state to state.  For easier navigation we would want to visualize this data on one of the existing maps rather than a separate screen and have a button to filter/toggle between shelters and routes, or both.  Ideally, we would want the default data to pertain to the user's current location, but we would have a "view all routes" feature.
The data would be visualized on the map as a highlighted path, while making obvious a major freeway the user should take.
