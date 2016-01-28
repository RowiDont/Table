class Session < ActiveRecord::Base
  validates_presence_of :user, :token

  belongs_to :user

  def self.generate_unique_token
    token = SecureRandom.urlsafe_base64(16)

    while Token.exists(token: token)
      token = SecureRandom.urlsafe_base64(16)
    end

    return token
  end

  
end
