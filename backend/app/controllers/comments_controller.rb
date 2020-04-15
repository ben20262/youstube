class CommentsController < ApplicationController

    def index
        comments = Comment.all
        render json: comments
    end

    def show
        comment = Comment.find_by(id: params[:id])
        if comment
            render json: comment
        else
            render json: { status: 'failure', message: 'Comment not found' }
        end
    end

    def create
        comment = Comment.create(params)
        if comment.valid?
            render json: comment
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
