import React, {Component} from 'react'
import {Button} from 'semantic-ui-react'
import '../Battle.css'

export default class ChoosePokemon extends Component {

    render() {
        let team = this.props.userTeam

        const teamJsx = team.map(item => ( 
            <div className="poke-choose-card" onClick={() => this.props.choosePokemon(item, false)}>
                <p>{item.pokemon.name}</p>
                <img alt={item.pokemon.name + "Photo"} src={item.pokemon.sprites.frontimg}/>
                <p>Current HP: {item.pokemon.battlehp}</p>
             </div>
            )
         )

        return (
            <div style={{height: '100%'}}>
                {this.props.forcedPokemonChoose === false ? <Button id="pick-choose-poke-back-btn" onClick={this.props.renderChoosePokemon} >Back</Button> : null}
                <div className="choose-pokemon-team-container">
                {teamJsx}
                </div>
            </div>
        )
    }
}