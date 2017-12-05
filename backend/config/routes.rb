Rails.application.routes.draw do
  get '/grids/lookup/:locationName', to: 'grids#lookup'
  put '/grids/colorupdate/:color', to: 'grids#colorupdate'
  resources :grids
  # add another route here for 
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  
end
