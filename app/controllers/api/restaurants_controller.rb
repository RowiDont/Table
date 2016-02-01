class Api::RestaurantsController < ApplicationController
  def index
    # TODO: order by id or filter
    city = City.find(params[:city_id])
    @restaurants = city.restaurants
  end

  def show
    @restaurant = Restaurant.includes(:open_time, :close_time).find(params[:id])
  end

end
