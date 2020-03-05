import React, {Component} from 'react'
import {Card} from 'semantic-ui-react'
import PokeCard from './PokeCard'
import '../Battle.css'

export default class PickPoke extends Component {
    state = {
        pokeCardOpen: false
    }

    renderIndepthCard = () => {
        this.setState({
            pokeCardOpen: !this.state.pokeCardOpen
        })
    }
    

    render() {
        let pokemonList = this.props.pokemonList
        return (
            <div className="poke-cards-div-container">
                <Card.Group className="poke-cards-group-container">
                    {pokemonList[0].map(pokemon => <PokeCard profilePokeTeamAdd={this.props.profilePokeTeamAdd} pickPokeTeamAdd={this.props.pickPokeTeamAdd} conditionalRender={this.props.conditionalRender} pokemon={pokemon} renderIndepthCard={this.renderIndepthCard} key={pokemon.id} />)}
                </Card.Group>
            </div>
        )             
    }
}