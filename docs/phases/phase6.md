# Phase 5: Reminders and Garbage Collection

## Rails
### Models
* Review

### Controllers
* Api::ReviewsController (create, destroy, index, show, update)

### Views
* reviews/index.json.jbuilder

## Flux
### Views (React Components)
* ReviewIndex
  - ReviewItem

### Stores
* Reviews

### Actions
* ApiActions.receiveAllReviews
* ReviewActions.fetchAllReviews
* ReviewActions.createReview
* ReviewActions.editReview
* ReviewActions.destroyReview

### ApiUtil
* ApiUtil.fetchAllReviews
* ApiUtil.createReview
* ApiUtil.editReview
* ApiUtil.destroyReview

## Gems/Libraries
