Rails.application.routes.draw do
  resources :lists
  resources :users
  resources :todos
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
