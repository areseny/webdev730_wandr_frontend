# Wandr

Wandr is a social media platform for travelers to plan their trips and share their itineraries with friends. Upon signing up or logging in, a user can see their upcoming trips and a list of friends, with the option of opening up a chat window. User can view more of their upcomign and past trips as well as their friends' trips through the Trips page, which is accessible via the user icon in the upper-right corner.

Clicking on a specific trip takes the user to a trip show page. If this is one of the user's own trips, the page provides a map and a calendar representation of the itinerary, allowing for a clear visualization of its route and time period. In the map view, the user can see their stopping points (e.g. Beijing, Shanghai, and Hong Kong), as well as where specific activities are located (e.g. stargazing and shopping). In the calendar view, the user can see the entirety of the trip, how long they are planning to stay at each stop, and what activities are planned for each day. To alter the dates for a stop, simply drag and drop the pink blocks to the desired date. Clicking on a destination - the flag markers on the map or the pink blocks on the calendar - expands the corresponding destination card on the sidebar, exposing the activities associated with that location. User can add or edit activities there as well. To change the details to the entire trip (i.e. trip name, description, destinations, start and end dates, and ratings) user can access an edit form on the sidebar. If the user clicks into one of their friends' trips, the page would only show the map view of the itinerary, without the options to edit.

User can check out other registered users via the Friends page, also accessible via the user icon on the upper right corner. Here, the user has the option of sending, accepting, and canceling friend requests. User can also chat with existing friends or unfriend them.

## Installing

1.  Clone repository from GitHub
2.  Open terminal
3.  Navigate to the repository directory

```
cd wandr-frontend
```

4.  Run server

```
yarn start
```

## Built With

* [React.js](https://reactjs.org/) - a JavaScript library for building user interfaces
* [Redux](https://redux.js.org/) - a predictable state container for JavaScript apps.
* [React Google Maps](https://tomchentw.github.io/react-google-maps/) - a set of React components wrapped around Google Maps JavaScript API v3 instances
* [Google Maps Geolocation API](https://developers.google.com/maps/documentation/geolocation/intro) - an API that returns a location and accuracy radius based on information about cell towers and WiFi nodes that the mobile client can detect.
* [Semantic UI React](https://react.semantic-ui.com/introduction) - the React integration for Semantic UI, a CSS and Javascript framework for styling
* [JSON Web Token (JWT)](https://jwt.io/) - a self-contained way for securely transmitting information between parties as a JSON object (for user authentication)
* [bcrypt](https://github.com/codahale/bcrypt-ruby) - a Ruby gem that helps keep users' passwords secure.
* [Ruby on Rails](http://rubyonrails.org/) - a server-side web application framework (for backend API)
* [Rails Action Cable](http://edgeguides.rubyonrails.org/action_cable_overview.html) - a feature in Rails 5 that seamlessly integrates WebSockets with the rest of the application, allowing for real-time features, such as chat.

## Contributing

1.  Fork repository
2.  Create new branch for your feature

```
git checkout -b my-new-feature
```

3.  Add and commit your changes

```
git add filename
git commit -am 'add some feature'
```

4.  Push to your branch

```
git push origin my-new-feature
```

5.  Create new pull request

## Author

* Fei Hafferkamp - [Github Profile](https://github.com/feihafferkamp)
