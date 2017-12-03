class CreateGrids < ActiveRecord::Migration[5.1]
  def change
    create_table :grids do |t|
      t.text :location
      t.text :colors, array:true, default:[]

      t.timestamps
    end
  end
end
