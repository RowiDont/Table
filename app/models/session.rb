class Session < ActiveRecord::Base
  validates_presence_of :user, :session_token

  belongs_to :user

  def self.generate_unique_token
    token = SecureRandom.urlsafe_base64(16)

    while Session.exists?(session_token: token)
      token = SecureRandom.urlsafe_base64(16)
    end

    return token
  end


end
