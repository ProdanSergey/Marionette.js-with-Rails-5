class Todo < ApplicationRecord
    belongs_to :list, dependent: :destroy
end
