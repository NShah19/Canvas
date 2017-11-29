require 'test_helper'

class CanvasBackendDevelopmentsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @canvas_backend_development = canvas_backend_developments(:one)
  end

  test "should get index" do
    get canvas_backend_developments_url
    assert_response :success
  end

  test "should get new" do
    get new_canvas_backend_development_url
    assert_response :success
  end

  test "should create canvas_backend_development" do
    assert_difference('CanvasBackendDevelopment.count') do
      post canvas_backend_developments_url, params: { canvas_backend_development: { password: @canvas_backend_development.password, username: @canvas_backend_development.username } }
    end

    assert_redirected_to canvas_backend_development_url(CanvasBackendDevelopment.last)
  end

  test "should show canvas_backend_development" do
    get canvas_backend_development_url(@canvas_backend_development)
    assert_response :success
  end

  test "should get edit" do
    get edit_canvas_backend_development_url(@canvas_backend_development)
    assert_response :success
  end

  test "should update canvas_backend_development" do
    patch canvas_backend_development_url(@canvas_backend_development), params: { canvas_backend_development: { password: @canvas_backend_development.password, username: @canvas_backend_development.username } }
    assert_redirected_to canvas_backend_development_url(@canvas_backend_development)
  end

  test "should destroy canvas_backend_development" do
    assert_difference('CanvasBackendDevelopment.count', -1) do
      delete canvas_backend_development_url(@canvas_backend_development)
    end

    assert_redirected_to canvas_backend_developments_url
  end
end
