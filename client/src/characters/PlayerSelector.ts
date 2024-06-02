import Phaser from 'phaser'
import MyPlayer from './MyPlayer'
import { PlayerBehavior } from '../../../types/PlayerBehavior'
import Item from '../items/Item'
import { NavKeys } from '../../../types/KeyboardState'
export default class PlayerSelector extends Phaser.GameObjects.Zone {
  selectedItem?: Item

  constructor(scene: Phaser.Scene, x: number, y: number, width: number, height: number) {
    super(scene, x, y, width, height)

    scene.physics.add.existing(this)
  }

  update(player: MyPlayer, cursors: NavKeys) {
    if (!cursors) {
      return
    }

    if (player.playerBehavior === PlayerBehavior.SITTING) {
      return
    }

    const { x, y } = player
    if (cursors.left?.isDown || cursors.A?.isDown) {
      this.setPosition(x - 32, y)
    } else if (cursors.right?.isDown || cursors.D?.isDown) {
      this.setPosition(x + 32, y)
    } else if (cursors.up?.isDown || cursors.W?.isDown) {
      this.setPosition(x, y - 32)
    } else if (cursors.down?.isDown || cursors.S?.isDown) {
      this.setPosition(x, y + 32)
    }

    if (this.selectedItem) {
      if (!this.scene.physics.overlap(this, this.selectedItem)) {
        this.selectedItem.clearDialogBox()
        this.selectedItem = undefined
      }
    }
  }
}
