class Api::UtilsController < ApplicationController
  def searchbar
    PgSearch.multisearch_options = { :using => { :tsearch => {:prefix => true, :dictionary => "english"} } }
    @search_results = PgSearch
      .multisearch(params[:query])
      .order("searchable_type")
      .includes(:searchable)

    render json: @search_results
  end

  def filter_search
    cities = City.all.map { |city| city.name.downcase }
    query = filter_params[:searchTerm].downcase
    if cities.include?(query)
      city = City.find_by_name(query.titleize)
      @restaurants = city.restaurants.includes(:city).order('id')
      render "api/restaurants/index"
    else
      @results = Reservation.search_results(params[:filters])
      @restaurant = Restaurant.includes(:open_time, :close_time).find(params[:filters][:id])
      render "api/utils/restaurant_results"
    end
  end

  private
  def filter_params
    params.require(:filters).permit(:people, :time, :date, :id, :searchTerm)
  end
end
