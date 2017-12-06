Rails.application.routes.draw do
  get '/grids/lookup/:location', to: 'grids#lookup'
  get '/grids/colorupdate/:location/:index/:color', to: 'grids#colorupdate'
  resources :grids
  # add another route here for 
  root 'grids#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  
end
