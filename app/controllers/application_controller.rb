class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  helper_method :current_user

  def current_user
    return nil if self.session[:session_token].nil?
    current_user ||= Session.find_by(session_token: self.session[:session_token])
    if current_user
      @current_user = current_user.user
    else
      nil
    end
  end

  def sign_in!(user)
    @current_user = user
    # debugger
    session = Session.create(user_id: user.id,
                             session_token: Session.generate_unique_token)

    self.session[:session_token] = session.session_token
  end

  def sign_out!
    token = self.session[:session_token]
    Session.find_by(session_token: token).destroy
    self.session[:session_token] = nil
  end

  def ensure_user_logged_in
    unless current_user
      render json: ["Nope."]
    end
  end

end
