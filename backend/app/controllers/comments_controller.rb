class CommentsController < ApplicationController

    def index
        video = Video.find_by(id: params[:video_id])
        if video
            render json: video.comments, include: [:user]
        else
            render json: { message: 'Video not found' }
        end
    end

    def show
        video = Video.find_by(idL params[:video_id])
        comment = Comment.find_by(id: params[:id])
        if comment
            render json: comment, include: [:user]
        else
            render json: { status: 'failure', message: 'Comment not found' }
        end
    end

    def create
        comment = Comment.create(content: params[:content], user_id: params[:user_id], video_id: params[:video_id])
        if comment.valid?
            render json: comment, include: [:user]
        else
            render json: { status: 'failure', message: 'Comment invalid' }
        end
    end

    def destroy
        comment = Comment.find_by(id: params[:id])
        if comment
            Comment.destroy(params[:id])
            render json: { message: 'Comment deleted.' }
        else
            render json: { status: 'failure', message: 'Comment not found' }
        end
    end

end
