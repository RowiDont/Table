class Api::UsersController < ApplicationController

  before_action :ensure_user_logged_in, only: [:show, :update]
  def create
    @user = User.new(user_params)

    if @user.save
      sign_in!(@user)
      render "api/users/show"
    else
      render json: @user.errors, status: 401
    end
  end

  def show
    @user = User.find(current_user.id)
    @reservations = @user.reservations.includes(:restaurant).order('date').order('time_id')
    render :index
  end

  def update
    @user = current_user
    @user.update(user_params)
    @reservations = @user.reservations.includes(:restaurant).order('date').order('time_id')
    render :index
  end

  protected

  def user_params
    self.params.require(:user).permit(:email, :password, :fname, :lname, :avatar)
  end
end
