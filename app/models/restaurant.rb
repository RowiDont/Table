class Restaurant < ActiveRecord::Base
  include PgSearch

  has_one :city, through: :postalcode
  belongs_to :postalcode, foreign_key: "postal_code", primary_key: "code"
  belongs_to :open_time, class_name: "TimeSlot", foreign_key: :open_time_id, primary_key: :id
  belongs_to :close_time, class_name: "TimeSlot", foreign_key: :close_time_id, primary_key: :id
  has_many :reservations

  has_attached_file :thumb, default_url: "http://placehold.it/350x350"
  validates_attachment_content_type :thumb, content_type: /\Aimage\/.*\Z/

  pg_search_scope :search_by_name,
                   against: :name,
                   using: :trigram

  pg_search_scope :search_by_city,
                  associated_against: { :city => :name },
                  using: :trigram


  def max_date
    advance = self.max_advance
    return Time.now + advance.days
  end

  # TODO: Add validations for when admins create restaurants
end
