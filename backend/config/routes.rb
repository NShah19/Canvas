Rails.application.routes.draw do
  resources :grids
  # add another route here for 
  root 'grids#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
