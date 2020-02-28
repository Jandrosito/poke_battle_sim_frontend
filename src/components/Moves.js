import React, {Component} from 'react'
import '../Battle.css'
import {Button} from 'semantic-ui-react'

export default class Menu extends Component {

    render() {
        return (
            <div id="moves-container">
            <Button onClick={this.props.movesRender} id="moves-back-btn">Back</Button>
            <Button id="first-move-btn">{this.props.userCurrentPokemon.moves[0].name}</Button>
            <Button id="second-move-btn">{this.props.userCurrentPokemon.moves[1].name}</Button>
            <Button id="third-move-btn">{this.props.userCurrentPokemon.moves[2].name}</Button>
            <Button id="fourth-move-btn">{this.props.userCurrentPokemon.moves[3].name}</Button>
            </div>
        )
    }
}