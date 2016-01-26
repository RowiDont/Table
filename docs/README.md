# Table

[Heroku link][heroku] **RP:** Heroku setup in progress

[heroku]: http://table-clone.herokuapp.com/

## Minimum Viable Product:

Table is a web application clone of the restaurant booking service OpenTable using Ruby on Rails and React.js. Table allows users to:

- [ ] Browse available restaurants.
- [ ] Search for restaurants by cuisine, location, or name.
- [ ] Create an account
- [ ] Log in/log out
- [ ] Add restaurants to their favorite
- [ ] See available slots at restaurants
- [ ] Begin a reservation before logging in
- [ ] Make a reservation after logging in
- [ ] Edit or cancel a reservation
- [ ] Review a restaurant


## Design Docs
* [View Wireframes][view]
* [DB schema][schema]

[view]: ./docs/views.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: Restaurant Model, JSON API (1.5 day)

Phase 1 is focused on setting up the Restaurant model and its corresponding
JSON. This will cover the server side functionality for the first half of
*Table*'s content, as described in the MVP.

[Details][phase-one]

### Phase 2: Flux Architecture and Restaurant Search (2.5 days)

In Phase 2, the apps front end structure will be set up using Flux, React, and
the React Router. A Restaurant store will be implemented, after which `Index`
and `IndexItem` react views will be created. In this phase, restaurants can still
only be viewed. After the index is completed, the search function will be
implemented to allow for search based on location (neighborhood), cuisine, and
restaurant name. Actions to live filter the results will also be added, and
included in the index. The main styling of the app will take place at this
point, using CSS and responsive design.

[Details][phase-two]

### Phase 3: User Authorization (0.5 days)

Phase 3 will implement user Authorization through Facebook and Google, as well
as standard user creation/authentication. Full sign up and sign in views will
be created, including proper CSS.

[Details][phase-three]


## Phase 4: Reservation model and JSON API (2 days)

Phase 4 will focus on creating the Rails model for reservations. The main points
will be optimization of the reservation availability search, and a big focus
on validating reservations. In a production app, the possibility of two users
submitting conflicting reservations is an unavoidable situation. Resolution and
error messaging on the Rails side for this scenario will be handled in this
phase.

[Details][phase-four]

## Phase 5: Combine Reservation search with Restaurant search (2.5 days)

The first part of Phase 5 will focus on starting a reservation on a restaurant
page using a basic reservation search. This will require a reservation search
store, and reservation index. The restaurant-index search bar will take the
currently selected location (SF/NYC) into account when searching. Additionally,
the filters must be adapted to work with reservation searches.

[Details][phase-five]

## Phase 6: Create the reviews model, JSON api, and react components (1 day)

In this phase I will add a form component that will be available to a user
after they have dined at a restaurant. This will require a join table to see
if a user has eaten there or not. Then I will make the form react components.

[Details][phase-six]

### Bonus Features (TBD)
- [ ] Create a restaurant
- [ ] Create a menu view
- [ ] Pagination / infinite scroll for Restaurant Index
- [ ] Reservations for groups over 4

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
[phase-six]: ./docs/phases/phase6.md
