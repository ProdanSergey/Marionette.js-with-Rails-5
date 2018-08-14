class TodoSerializer < ActiveModel::Serializer
  attributes :id, :list_id, :todo_text, :todo_done
end
