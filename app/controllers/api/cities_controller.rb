class Api::CitiesController < ApplicationController
  def index
    @cities = City.all
  end
end
