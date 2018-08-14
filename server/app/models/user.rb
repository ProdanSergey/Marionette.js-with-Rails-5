class User < ApplicationRecord
    # self.primary_key = 'user_id'
    mount_uploader :avatar, AvatarUploader
    has_one :list, dependent: :destroy
end
