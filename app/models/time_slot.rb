class TimeSlot < ActiveRecord::Base
  def time_string
    hours = self.time / 60
    minutes = self.time % 60
    string = ""
    string << ((hours < 10) ?  "0#{hours}" : hours.to_s)
    string << ":"
    string << ((minutes < 10) ? "0#{minutes}" : minutes.to_s)

    return string
  end

  def to_jbuilder
    Jbuilder.new do |time_slot|
      time_slot.(self, :id, :time)
    end
  end
end
