class Api::RestaurantsController < ApplicationController
  def index
    city = City.find(params[:city_id])
    @restaurants = city.restaurants
  end

  def show
    @restaurant = Restaurant.includes(:open_time, :close_time).find(params[:id])
  end

end
