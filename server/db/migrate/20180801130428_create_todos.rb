class CreateTodos < ActiveRecord::Migration[5.2]
  def change
    create_table :todos do |t|
      t.integer :list_id
      t.text :todo_text
      t.boolean :todo_done
    end
  end
end
