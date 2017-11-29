class CanvasBackendDevelopmentsController < ApplicationController
  before_action :set_canvas_backend_development, only: [:show, :edit, :update, :destroy]

  # GET /canvas_backend_developments
  # GET /canvas_backend_developments.json
  def index
    @canvas_backend_developments = CanvasBackendDevelopment.all
  end

  # GET /canvas_backend_developments/1
  # GET /canvas_backend_developments/1.json
  def show
  end

  # GET /canvas_backend_developments/new
  def new
    @canvas_backend_development = CanvasBackendDevelopment.new
  end

  # GET /canvas_backend_developments/1/edit
  def edit
  end

  # POST /canvas_backend_developments
  # POST /canvas_backend_developments.json
  def create
    @canvas_backend_development = CanvasBackendDevelopment.new(canvas_backend_development_params)

    respond_to do |format|
      if @canvas_backend_development.save
        format.html { redirect_to @canvas_backend_development, notice: 'Canvas backend development was successfully created.' }
        format.json { render :show, status: :created, location: @canvas_backend_development }
      else
        format.html { render :new }
        format.json { render json: @canvas_backend_development.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /canvas_backend_developments/1
  # PATCH/PUT /canvas_backend_developments/1.json
  def update
    respond_to do |format|
      if @canvas_backend_development.update(canvas_backend_development_params)
        format.html { redirect_to @canvas_backend_development, notice: 'Canvas backend development was successfully updated.' }
        format.json { render :show, status: :ok, location: @canvas_backend_development }
      else
        format.html { render :edit }
        format.json { render json: @canvas_backend_development.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /canvas_backend_developments/1
  # DELETE /canvas_backend_developments/1.json
  def destroy
    @canvas_backend_development.destroy
    respond_to do |format|
      format.html { redirect_to canvas_backend_developments_url, notice: 'Canvas backend development was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_canvas_backend_development
      @canvas_backend_development = CanvasBackendDevelopment.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def canvas_backend_development_params
      params.require(:canvas_backend_development).permit(:username, :password)
    end
end
