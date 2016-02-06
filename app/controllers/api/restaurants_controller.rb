class Api::RestaurantsController < ApplicationController
  def index
    @city = City.find(params[:city_id])
    page = params[:page]
    @restaurants = @city.restaurants.order('id').page(page).per(10)
  end

  def show
    @restaurant = Restaurant.includes(:open_time, :close_time).find(params[:id])
  end

end
