import React, {Component} from 'react'
import '../Battle.css'
import {Button} from 'semantic-ui-react'
import Moves from './Moves'
import PickChoosePokemon from './PickChoosePokemon'
import ForcedPickChoosePokemon from './ForcedPickChoosePokemon'

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

    choosePokemon = (pokemon, forcedChange) => { 
        console.log(pokemon)
        if (this.props.userCurrentPokemon.id !== pokemon.id && forcedChange === false) {
            console.log("yuh")
        this.setState({choosePokemonRender: !this.state.choosePokemonRender})
        this.props.userCurrentPokemonSwitch(pokemon)
        } else if (this.props.userCurrentPokemon.id !== pokemon.id && forcedChange === true) {   
        this.forcedPokemonChangeBaby(pokemon)
        console.log("meep")
        }
    }

    forcedPokemonChangeBaby = (pokemon) => {
        console.log("ok")
        this.setState({renderMoves: false, choosePokemonRender: false})
        this.props.forcedPokemonChooseChange(pokemon)
    }

    render() {
        return (
            <React.Fragment>
            {this.props.forcedPokemonChoose === false ? <div>
            {this.props.userCurrentPokemon['pokemon'] ? <div className="Menu">
            {this.state.choosePokemonRender === false ? <div>
            <div className="text-container">
            {this.props.userCurrentPokemon ? <p>What will {this.props.userCurrentPokemon['pokemon'].name} do?</p> : null}
            </div>
            {this.state.renderMoves === false ? <div>
            <Button onClick={this.renderChoosePokemon} id="pokemon-button">Pokemon</Button>
            <Button onClick={this.movesRender} id="fight-button">Fight</Button>
            </div> : null} 
            </div> : null}
            
            {this.state.renderMoves ? <Moves moveExecute={this.props.moveExecute} movesRender={this.movesRender} userCurrentPokemon={this.props.userCurrentPokemon}/> : null}
            {this.state.choosePokemonRender ? <PickChoosePokemon forcedPokemonChoose={this.props.forcedPokemonChoose} userTeam={this.props.userTeam} choosePokemon={this.choosePokemon} renderChoosePokemon={this.renderChoosePokemon}/> : null}
            </div> : null }
            </div> : null}
            {this.props.forcedPokemonChoose ? <div className="Menu"><ForcedPickChoosePokemon forcedPokemonChooseChange={this.props.forcedPokemonChooseChange} userTeam={this.props.userTeam} choosePokemon={this.choosePokemon} renderChoosePokemon={this.renderChoosePokemon}/></div> :null}
            </React.Fragment>
        )
    }
}