class EmailValidator < ActiveModel::EachValidator
  def validate_each(record, attribute, value)
    unless value =~ /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i
      record.errors[attribute] << (options[:message] || "is not an email")
    end
  end
end

class User < ActiveRecord::Base
  validates_presence_of :password_digest, :fname, :lname
  validates :email, presence: true, email: true
  validates :password, length: { minimum: 5, allow_nil: true }

  attr_reader :password

  has_many :sessions
  has_many :reservations
  has_attached_file :avatar, default_url: 'https://s3.amazonaws.com/table-pictures/missing.jpg'
  validates_attachment_content_type :avatar, content_type: /\Aimage\/.*\Z/
  # belongs_to :city


  def self.find_by_credentials(email, password)
    user = User.find_by_email(email)
    return nil if user.uid != nil
    return nil unless user && user.valid_password?(password)
    return user
  end

  def self.find_or_create_by_auth_hash(auth_hash)
    debugger
    provider = auth_hash[:provider]
    uid = auth_hash[:uid]

    user = User.find_by(provider: provider, uid: uid)

    return user if user

    User.create(
      provider: provider,
      uid: uid,
      email: auth_hash[:info][:email],
      fname: auth_hash[:info][:first_name],
      lname: auth_hash[:info][:last_name],
      avatar: auth_hash[:extra][:raw_info][:picture],
      password: "changeme"
    )
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def valid_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

end
