class Restaurant < ActiveRecord::Base
  include PgSearch

  has_one :city, through: :postalcode
  belongs_to :postalcode, foreign_key: "postal_code", primary_key: "code"
  belongs_to :open_time, class_name: "TimeSlot", foreign_key: :open_time_id, primary_key: :id
  belongs_to :close_time, class_name: "TimeSlot", foreign_key: :close_time_id, primary_key: :id
  has_many :reservations

  has_attached_file :thumb, default_url: "http://placehold.it/350x350"
  validates_attachment_content_type :thumb, content_type: /\Aimage\/.*\Z/


  # TODO: step 1: search by name and city and collect head count, date, time
  # =>    step 2: use that search result to actually search restaurants

  multisearchable against: :name



  def max_date
    advance = self.max_advance
    return Time.now + advance.days
  end

end
