import React, {Component} from 'react'
import Phaser from 'phaser'
import { IonPhaser } from '@ion-phaser/react'
import PickPoke from './PickPoke'
import Profile from './Profile'
import Battle from './Battle'

export default class Home extends Component {
  state = {
    conditionalRender: ""
  }
  
  renderHome = () => {
    this.setState({
      conditionalRender: ""
    })
  }

  renderPickPoke = () => {
    this.setState({
      conditionalRender: "pickpoke"
    })
  }

  renderProfile = () => {
    this.setState({
      conditionalRender: "profile"
    })
  }

  renderBattle = () => {
    this.setState({
      conditionalRender: "battle"
    })
  }

  render() {
      return (
          <div>
            <h1>Pokemon Battle Simulator</h1>
            {this.state.conditionalRender === "" ? <button onClick={this.renderPickPoke}>Pick Pokemon</button> :null}
            {this.state.conditionalRender === "pickpoke" ? <PickPoke /> : null}
            {this.state.conditionalRender === "" ? <button onClick={this.renderProfile}>Log In</button> :null}
            {this.state.conditionalRender === "profile" ? <Profile renderHome={this.renderHome}/> : null}
            {this.state.conditionalRender === "" ? <button onClick={this.renderBattle}>Randomized Battle</button> :null}
            {this.state.conditionalRender === "battle" ? <Battle /> : null}
          </div>
      )
  }
}

// state = {
//     initialize: false,
//     game: {
//       width: "100%",
//       height: "100%",
//       type: Phaser.AUTO,
//       scene: {}
//     }
//   }
//   render() {
//     const { initialize, game } = this.state
//     return (
//       <IonPhaser game={game} initialize={initialize} />
//     )
//   }

