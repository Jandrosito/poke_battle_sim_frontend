import React, {Component} from 'react'
import Phaser from 'phaser'
import { IonPhaser } from '@ion-phaser/react'

export default class Home extends Component {
    state = {
        initialize: false,
        game: {
          width: "100%",
          height: "100%",
          type: Phaser.AUTO,
          scene: {}
        }
      }
      render() {
        const { initialize, game } = this.state
        return (
          <IonPhaser game={game} initialize={initialize} />
        )
      }
}



        // state = {
    
        // }
    
        // render() {
        //     return (
        //         <h1>hi</h1>
        //     )
        // }