class Api::UtilsController < ApplicationController
  def searchbar
    PgSearch.multisearch_options = { :using => { :tsearch => {:prefix => true, :dictionary => "english"} } }
    @search_results = PgSearch
      .multisearch(params[:query])
      .includes(:searchable)

    render json: @search_results
  end

  def filter_search
    # filters = params[:filters]
    @results = Reservation.search_results(params[:filters])
    @restaurant = Restaurant.includes(:open_time, :close_time).find(params[:filters][:id])
    render "api/utils/restaurant_results"
  end

  private
  def filter_params
    params.require(:filters).permit(:people, :time, :date, :id)
  end
end
