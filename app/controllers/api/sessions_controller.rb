class Api::SessionsController < ApplicationController

  def show
    if current_user
      @user = current_user
      @reservations = @user.reservations.includes(:restaurant).order('date').order('time_id')
      render "api/users/index"
    else
      render json: {}
    end
  end

  def create
    @user = User.find_by_credentials(
      params[:email],
      params[:password]
    )

    if @user.nil?
      render json: ["Wrong email/password combo!"], status: 401
    else
      sign_in!(@user)
      render "api/users/index"
    end
  end

  def destroy
    sign_out!
    render json: ["Successfully Logged Out"], status: 200
  end


end
