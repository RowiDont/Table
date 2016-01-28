class UsersController < ApplicationController
  def new
  end
  
  def create
    @user = User.new(user_params)

    if @user.save
      sign_in(@user)
      redirec_to root_url
      # render :signed_in
    else
      flash.now[:errors] = @user.errors.full_messages
      render :new
      # render :json => { errors: @model.errors.full_messages }, status: 422
    end

  end


  private

  def user_params
    params.require(:user).permit(:email, :fname, :lname, :password, :city_id)
end
