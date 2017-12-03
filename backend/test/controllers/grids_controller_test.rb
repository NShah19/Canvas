require 'test_helper'

class GridsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @grid = grids(:one)
  end

  test "should get index" do
    get grids_url
    assert_response :success
  end

  test "should get new" do
    get new_grid_url
    assert_response :success
  end

  test "should create grid" do
    assert_difference('Grid.count') do
      post grids_url, params: { grid: { colors[]: @grid.colors[], location: @grid.location } }
    end

    assert_redirected_to grid_url(Grid.last)
  end

  test "should show grid" do
    get grid_url(@grid)
    assert_response :success
  end

  test "should get edit" do
    get edit_grid_url(@grid)
    assert_response :success
  end

  test "should update grid" do
    patch grid_url(@grid), params: { grid: { colors[]: @grid.colors[], location: @grid.location } }
    assert_redirected_to grid_url(@grid)
  end

  test "should destroy grid" do
    assert_difference('Grid.count', -1) do
      delete grid_url(@grid)
    end

    assert_redirected_to grids_url
  end
end
