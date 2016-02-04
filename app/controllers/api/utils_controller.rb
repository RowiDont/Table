class Api::UtilsController < ApplicationController
  def searchbar
    @search_results = PgSearch
      .multisearch(params[:query])
      .includes(:searchable)

    debugger
  end
end
