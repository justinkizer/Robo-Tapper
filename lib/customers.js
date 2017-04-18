/* global createjs */
import { BARS } from './bar.js';

export default class CustomerManager {
  constructor(stage) {
    this.customers = [];
    this.stage = stage;
  }

  createCustomers() {
    const NUMBER_OF_CUSTOMERS = Math.floor(Math.random() * 3);
    for (let i = 0; i <= NUMBER_OF_CUSTOMERS; i++) {
      this.createCustomer();
    }
  }

  createCustomer() {
    const RANDOM_SELECTOR = Math.floor(Math.random() * 3);
    const RANDOM_SPEED = ((Math.floor(Math.random() * 5) + 5) * 1750);
    const RANDOM_BAR_INDEX = Math.floor(Math.random() * 4);

    const IMAGE_PATHS = [
      'assets/customer0.png',
      'assets/customer1.png',
      'assets/customer2.png'
    ];
    const FRAME_DIMENSIONS = [{width:90, height:75}, {width:80, height:75}];

    const CUSTOMER_DATA = {
      images: [IMAGE_PATHS[RANDOM_SELECTOR]],
      frames: FRAME_DIMENSIONS[RANDOM_SELECTOR === 2 ? 0 : 1],
      animations: {
        walk:[0, 1, 'walk', 0.05],
        walkAngry:[0, 2, 'walkAngry', 0.05],
        drink:[3, 5, false, 0.05]
      }
    };

    const CUSTOMER_SPRITE_SHEET = new createjs.SpriteSheet(CUSTOMER_DATA);
    const CUSTOMER = new createjs.Sprite(CUSTOMER_SPRITE_SHEET, 'walkAngry');

    const SETTERS = [
      'speed', 'barIndex', 'x', 'y', 'scaleX', 'scaleY', 'tweens', 'scoreValue'
    ];

    const VALUES = [
      RANDOM_SPEED, RANDOM_BAR_INDEX, BARS[RANDOM_BAR_INDEX].posXLimits[0],
      BARS[RANDOM_BAR_INDEX].startPosY + 5, BARS[RANDOM_BAR_INDEX].scale,
      BARS[RANDOM_BAR_INDEX].scale, [], 50
    ];

    for (let i = 0; i < SETTERS.length; i++) {
      CUSTOMER[SETTERS[i]] = VALUES[i];
    }

    CUSTOMER.tweens.push(createjs.Tween.get(CUSTOMER, { loop: false })
      .to({ x: BARS[RANDOM_BAR_INDEX].posXLimits[1] + 30 }, RANDOM_SPEED,
      createjs.Ease.getPowInOut(1))
    );

    CUSTOMER.gotoAndPlay('walkAngry');

    this.customers.push(CUSTOMER);
    this.stage.addChild(CUSTOMER);
  }

}
