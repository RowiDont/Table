class Reservation < ActiveRecord::Base
  belongs_to :time_slot, class_name: "TimeSlot", foreign_key: :time_id, primary_key: :id
  belongs_to :restaurant
  belongs_to :user

  validates :user, presence: true
  validates :restaurant, presence: true

  validate :time_slot_is_within_restaurant_hours
  validate :date_is_within_max_advance
  validate :head_count_is_within_limit
  # validate :time_is_not_taken

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
    id = self.time_id
    limit = self.restaurant.max_people
    reservations_before = Reservation
                    .where("restaurant_id = ?", self.restaurant_id)
                    .where("time_id > ? AND time_id <= ?", id - 2, id)
                    .where(:date == self.date)

    reservations_after = Reservation
                    .where("restaurant_id = ?", self.restaurant_id)
                    .where("time_id < ? AND time_id >= ?", id + 2, id)
                    .where(:date == self.date)


    # two sets
    sum_of_reservations_before = reservations_before
                                    .inject(0) { |sum, el| sum + el.head_count} +
                                    self.head_count

    sum_of_reservations_after = reservations_after
                                    .inject(0) { |sum, el| sum + el.head_count} +
                                    self.head_count


    if sum_of_reservations_before > limit ||  sum_of_reservations_after > limit
      errors[:restaurant] = "cannot take that many people at that time."
    end
  end
  #
  # def time_is_not_taken
  #   if Reservation.where(restaurant_id: self.restaurant_id)
  #                 .where(time_id: self.time_id)
  #                 .where(date: self.date)
  #   end
  # end

  def self.search_results(filters)
    results = [];

    # :people, :time, :date, :id
    people, time, date, id = filters[:people], filters[:time].to_i, filters[:date], filters[:id]

    search_start = time.to_i - 90
    search_end = time.to_i + 90

    time = search_start
    while time <= search_end
      # debugger
      time_slot = TimeSlot.find_by_time(time)
      if time_slot
        r = Reservation.new(
          user_id: 1,
          restaurant_id: id,
          date: date,
          time_id: time_slot.id,
          head_count: people
        )

        if r.valid?
          results.push(r)
        end
      end

      time += 15
    end
    return results
  end


end

r = Reservation.new(
  user_id: 1,
  restaurant_id: 26,
  date: "2016-01-30",
  time_id: 5,
  head_count: 2
)
