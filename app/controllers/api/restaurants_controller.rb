class Api::RestaurantsController < ApplicationController
  def index
    city = City.find(params[:city_id])
    @restaurants = city.restaurants
  end

  def show
    @restaurant = Restaurant.find(params[:id])
  end

end
