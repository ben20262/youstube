class VideosController < ApplicationController

    def index
        videos = Video.all
        render json: videos, include: :user
    end

    def show
        video = Video.find_by(id: params[:id])
        if video
            render json: video, include: :user
        else
            render json: { status: 'failure', message: 'Video not found' }
        end
    end

    def create
        video = Video.create(title: params[:title], url_path: params[:url_path], user_id: params[:user_id])

        if video.valid?
            render json: video, include: :user
        else
            render json: video.errors
        end
    end

    def destroy
        video = Video.find_by(id: params[:id])
        if video
            Video.destroy(params[:id])
            render json: { message: 'Video deleted.' }
        else
            render json: { status: 'failure', message: 'Video not found' }
        end
        
    end

end
