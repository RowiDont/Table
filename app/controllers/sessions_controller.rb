class SessionsController < ApplicationController

  def new
  end

  def create
    email = params[:user][:email]
    password = params[:user][:password]

    user = User.find_by_credentials(email, password)

    if user
      sign_in(user)
      redirect_to root_url
    else
      flash.now[:errors] = ["Invalid username or password"]
      render :new
      # render :json => { errors: "Incorrect email or password" }, status: 422
    end
  end

  def destroy
    sign_out
    redirect_to root_url
  end
end
