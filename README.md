# Table
A clone of OpenTable's web platform for restaurant search and reservations. Built in Ruby on Rails and React.js.

### Live link

http://www.getTable.top (running on Heroku)

### How to use the app
The app starts the user off with a choice of what city they are looking to dine in. After choosing a city, the user is given a choice of restaurants in that city, with price information on the right hand side of the page.

Once on a restaurant page, the user selects from a number of filters to find an open table. Every restaurant has a max number of diners it will accept from Table, so you won't be able to book if the time you chose has too many people booked already. To handle this, the user is provided with 5 options within 90 minutes of the provided search time.

After selecting a reservation option, the user has one more chance to cancel before they submit. After submittal, the reservation will be available to view in the users profile page, accessable from the header at the tip of the page.
