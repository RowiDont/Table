class Api::ReservationsController < ApplicationController
  def index
    @results = Reservation.search_results(params[:filters])
  end

  private
  def filter_params
    params.require(:filters).permit(:people, :time, :date, :id)
  end
end
