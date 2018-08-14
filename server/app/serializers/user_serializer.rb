class UserSerializer < ActiveModel::Serializer
  attributes :id, :firstName, :lastName, :avatar, :list_id
end
