Rails.application.routes.draw do
  resources :videos, only: [:create, :index, :show, :destroy]
  resources :users, only: [:create, :index, :show]

  resources :videos, only: [:show] do
    resources :comments, only: [:index, :show, :create, :destroy]
  end

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
