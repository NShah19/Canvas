class CreateCanvasBackendDevelopments < ActiveRecord::Migration[5.1]
  def change
    create_table :canvas_backend_developments do |t|
      t.text :username
      t.text :password

      t.timestamps
    end
  end
end
