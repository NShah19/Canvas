Rails.application.routes.draw do
  resources :users
  resources :canvas_backend_developments
  get 'user/index'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
