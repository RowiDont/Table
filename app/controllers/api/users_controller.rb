class Api::UsersController < ApplicationController

  def create
    @user = User.new(user_params)

    if @user.save
      sign_in!(@user)
      render "api/users/show"
    else
      render json: @user.errors, status: 401
    end
  end



  protected

  def user_params
    self.params.require(:user).permit(:email, :password, :fname, :lname)
  end
end
