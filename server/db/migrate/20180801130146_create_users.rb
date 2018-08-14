class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.text :firstName
      t.text :lastName
      t.integer :list_id
    end
  end
end
