require 'test_helper'

class TodosControllerTest < ActionDispatch::IntegrationTest
  setup do
    @todo = todos(:one)
  end

  test "should get index" do
    get todos_url, as: :json
    assert_response :success
  end

  test "should create todo" do
    assert_difference('Todo.count') do
      post todos_url, params: { todo: { list_id: @todo.list_id, todo_done: @todo.todo_done, todo_id: @todo.todo_id, todo_text: @todo.todo_text } }, as: :json
    end

    assert_response 201
  end

  test "should show todo" do
    get todo_url(@todo), as: :json
    assert_response :success
  end

  test "should update todo" do
    patch todo_url(@todo), params: { todo: { list_id: @todo.list_id, todo_done: @todo.todo_done, todo_id: @todo.todo_id, todo_text: @todo.todo_text } }, as: :json
    assert_response 200
  end

  test "should destroy todo" do
    assert_difference('Todo.count', -1) do
      delete todo_url(@todo), as: :json
    end

    assert_response 204
  end
end
