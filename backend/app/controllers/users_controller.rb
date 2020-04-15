class UsersController < ApplicationController

    def index
        users = User.all
        render json: users
    end

    def create
        user = User.create(username: params[:username])

        if user.valid?
            render json: user
        else
            render json: { message: 'User Invalid' }
        end
    end

    def show
        user = User.find_by(id: params[:id])

        if user
            render json: user
        else
            render json: { status: 'failure', message: 'User not found' }
        end
    end

end
