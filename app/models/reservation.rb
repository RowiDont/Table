class Reservation < ActiveRecord::Base
  belongs_to :time_slot, class_name: "TimeSlot", foreign_key: :time_id, primary_key: :id
  belongs_to :restaurant
  belongs_to :user

  validates :user, presence: true
  validates :restaurant, presence: true

  validate :time_slot_is_within_restaurant_hours
  validate :date_is_within_max_advance
  validate :head_count_is_within_limit

  def time_slot_is_within_restaurant_hours
    id = self.time_slot.id
    opens, closes = self.restaurant.open_time.id, self.restaurant.close_time.id
    if id < opens || id > closes
      errors[:restaurant] = "is not open"
    end
  end

  def date_is_within_max_advance
    advance = self.restaurant.max_advance
    max_date = Time.now + advance.days
    if self.date > max_date
      errors[:date] = "past the restaurant's maximum advance date"
    end
  end

  def head_count_is_within_limit
    id = self.time_slot.id
    limit = self.restaurant.max_people
    reservations = Reservation
                    .where("time_id > ?", id - 3)
                    .where("time_id < ?", id + 3)
                    .where(:date == self.date)
    sum_of_reservations = reservations.inject(0) { |sum, el| sum + el.head_count}

    if sum_of_reservations + self.head_count > limit
      errors[:restaurant] = "cannot take that many people at that time."
    end
  end

  def self.search_results(restaurant, date, time, people)
    debugger
    r1 = Reservation.new(user_id: 1,
                         restaurant_id: restaurant,
                         date: date,
                         time_id: time,
                         head_count: people)
  end
end
