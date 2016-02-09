class Api::UtilsController < ApplicationController
  def searchbar
    PgSearch.multisearch_options = { :using => { :tsearch => {:prefix => true, :dictionary => "english"} } }
    @search_results = PgSearch
      .multisearch(params[:query])
      .reorder("searchable_type ASC")
      .includes(:searchable)

    render json: @search_results
  end

  def filter_search
    # PgSearch.multisearch_options = { :using => { :tsearch => {:prefix => false} } }
    cities = City.all.map { |city| city.name.downcase }
    query = filter_params[:searchTermHidden].downcase
    # debugger
    if cities.include?(query)
      city = City.find_by_name(query.titleize)
      @restaurants = city.restaurants.includes(:city).order('id')
      render "api/restaurants/index"
    elsif PgSearch.multisearch(filter_params[:searchTerm]) == []
      render :nothing => true, :status => 400
    else
      @results = Reservation.search_results(params[:filters])
      @restaurant = Restaurant.includes(:open_time, :close_time).find(params[:filters][:id])
      render "api/utils/restaurant_results"
    end
  end

  private
  def filter_params
    params.require(:filters).permit(:people, :time, :date, :id, :searchTerm, :searchClass, :searchOptions, :clicked, :type, :searchTermHidden)
  end
end
