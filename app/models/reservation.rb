class Reservation < ActiveRecord::Base
  belongs_to :time_slot, class_name: "TimeSlot", foreign_key: :time_id, primary_key: :id
  belongs_to :restaurant
  belongs_to :user

  validates :user, presence: true
  validates :restaurant, presence: true

  validate :time_is_not_past
  validate :date_is_within_max_advance
  validate :time_slot_is_within_restaurant_hours
  validate :head_count_is_within_limit

  def time_is_not_past
    time_now = Time.zone.now()
    date = self.date
    time_then = date.in_time_zone('EST') + self.time_slot.time.minutes
    
    puts "Time_then: #{time_then}"
    puts "Time_now: #{time_now}"
    if time_then < time_now
      errors[:Time] = "is unfortunately linear"
    end

  end

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
                    .where("time_id > ? AND time_id <= ?", id - 3, id)
                    .where(:date == self.date)

    reservations_after = Reservation
                    .where("restaurant_id = ?", self.restaurant_id)
                    .where("time_id < ? AND time_id >= ?", id + 3, id)
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

  def to_json
    Jbuilder.new do |reservation|
      reservation.name restaurant.name
      reservation.user_id user_id
      reservation.rest_id restaurant_id
      reservation.date date
      reservation.head_count head_count
      reservation.time time_slot.to_jbuilder
      reservation.image_url restaurant.thumb.url
    end
  end

  def self.search_results(filters)

    results = [];

    # :people, :time, :date, :id
    people, time, date, id = filters[:people], filters[:time].to_i, filters[:date], filters[:id]

    search_start = time.to_i - 90
    search_end = time.to_i + 90

    time = TimeSlot.where('time >= ? AND time <= ?', search_start, search_end)

    time.each do |time|
      time_slot = time

      r = Reservation.test_reservation(1, id, date, time_slot.id, people)
      r.valid? ? results.push(r) : nil
    end

    return filter(results, filters[:time])
  end

  def self.test_reservation(user_id, restaurant_id, date, time_id, people)
    r = Reservation.new(
      user_id: User.first.id,
      restaurant_id: restaurant_id,
      date: date,
      time_id: time_id,
      head_count: people
    )
    return r
  end

  def self.filter(results, search_time)
    time = search_time.to_i
    diffs = results.map do |res|
      [(res.time_slot.time - time).abs, res]
    end
    diffs.sort!
    selected = diffs.slice(0,5)
    selected = selected.map { |arr| arr[1] }
    selected.sort! { |x, y| x.time_slot.time <=> y.time_slot.time }

    return selected
  end

end
