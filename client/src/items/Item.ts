import Phaser from 'phaser'
import { ItemType } from '../../../types/Items'

export default class Item extends Phaser.Physics.Arcade.Sprite {
  private dialogBox!: Phaser.GameObjects.Container
  private statusBox!: Phaser.GameObjects.Container
  itemType!: ItemType

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | number) {
    super(scene, x, y, texture, frame)

    this.dialogBox = this.scene.add.container().setDepth(10000)
    this.statusBox = this.scene.add.container().setDepth(10000)
  }

  setDialogBox(text: string) {
    const innerText = this.scene.add
      .text(0, 0, text)
      .setFontFamily('Arial')
      .setFontSize(12)
      .setColor('#000000')

    const dialogBoxWidth = innerText.width + 4
    const dialogBoxHeight = innerText.height + 2
    const dialogBoxX = this.x - dialogBoxWidth * 0.5
    const dialogBoxY = this.y + this.height * 0.5

    this.dialogBox.add(
      this.scene.add
        .graphics()
        .fillStyle(0xffffff, 1)
        .fillRoundedRect(dialogBoxX, dialogBoxY, dialogBoxWidth, dialogBoxHeight, 3)
        .lineStyle(1.5, 0x000000, 1)
        .strokeRoundedRect(dialogBoxX, dialogBoxY, dialogBoxWidth, dialogBoxHeight, 3)
    )
    this.dialogBox.add(innerText.setPosition(dialogBoxX + 2, dialogBoxY))
  }

  clearDialogBox() {
    this.dialogBox.removeAll(true)
  }

  // add text into status box container
  setStatusBox(text: string) {
    const innerText = this.scene.add
      .text(0, 0, text)
      .setFontFamily('Arial')
      .setFontSize(12)
      .setColor('#000000')

    const statusBoxWidth = innerText.width + 4
    const statusBoxHeight = innerText.height + 2
    const statusBoxX = this.x - statusBoxWidth * 0.5
    const statusBoxY = this.y - this.height * 0.25
    this.statusBox.add(
      this.scene.add
        .graphics()
        .fillStyle(0xffffff, 1)
        .fillRoundedRect(statusBoxX, statusBoxY, statusBoxWidth, statusBoxHeight, 3)
        .lineStyle(1.5, 0x000000, 1)
        .strokeRoundedRect(statusBoxX, statusBoxY, statusBoxWidth, statusBoxHeight, 3)
    )
    this.statusBox.add(innerText.setPosition(statusBoxX + 2, statusBoxY))
  }

  clearStatusBox() {
    this.statusBox.removeAll(true)
  }
}
