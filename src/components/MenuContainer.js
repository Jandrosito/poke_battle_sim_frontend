import React, {Component} from 'react'
import '../Battle.css'
import {Button} from 'semantic-ui-react'
import Moves from './Moves'
import ChoosePokemon from './ChoosePokemon'

export default class Menu extends Component {
    state = {
        renderMoves: false,
        choosePokemonRender: false
    }

    movesRender = () => {
        this.setState({renderMoves: !this.state.renderMoves})
    }

    renderChoosePokemon = () => {
        this.setState({choosePokemonRender: !this.state.choosePokemonRender})
    }

    render() {
        return (
            <div className="Menu">
            <div className="text-container">
            <p>What will {this.props.userCurrentPokemon.name} do?</p>
            </div>
            {this.state.renderMoves === false ? <div>
            <Button onClick={this.renderChoosePokemon} id="pokemon-button">Pokemon</Button>
            <Button onClick={this.movesRender} id="fight-button">Fight</Button>
            </div> : null}
            
            {this.state.renderMoves ? <Moves movesRender={this.movesRender} userCurrentPokemon={this.props.userCurrentPokemon}/> : null}
            {this.state.choosePokemonRender ? <ChoosePokemon userTeam={this.props.userTeam} renderChoosePokemon={this.renderChoosePokemon}/> : null}
            </div> 
        )
    }
}