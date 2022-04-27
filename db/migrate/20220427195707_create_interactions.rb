class CreateInteractions < ActiveRecord::Migration[6.1]
  def change
    create_table :interactions do |t|
      t.references :user, null: false, foreign_key: true
      t.references :profile, null: false, foreign_key: true
      t.boolean :user_like
      t.boolean :profile_like
      t.boolean :swiped_status

      t.timestamps
    end
  end
end
