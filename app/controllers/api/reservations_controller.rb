class Api::ReservationsController < ApplicationController
  def index
    @results = Reservation.search_results(params[:filters])
  end

  def create
    attrs = {
      user_id: current_user.id,
      restaurant_id: reservation_params[:rest_id],
      date: reservation_params[:date],
      time_id: params[:reservation][:time][:id],
      head_count: reservation_params[:head_count]
    }

    res = Reservation.new(attrs)
    if res.save
      render json: res.to_json.target!
    else
      render json: res.errors
    end
  end

  def temp_set
    attrs = {
      user_id: User.first.id,
      restaurant_id: reservation_params[:rest_id],
      date: reservation_params[:date],
      time_id: params[:reservation][:time][:id],
      head_count: reservation_params[:head_count]
    }
    res = Reservation.new(attrs)
    session[:reservation] = res.to_json.target!
    render json: session[:reservation]
  end

  def temp_get
    render json: session[:reservation]
  end

  private
  def filter_params
    params.require(:filters).permit(:people, :time, :date, :id)
  end

  def reservation_params
    params.require(:reservation).permit(:head_count, :date, :rest_id)
  end
end
