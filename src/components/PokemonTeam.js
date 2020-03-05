import React, {Component} from 'react'
import '../Battle.css'

export default class Battle extends Component {

    render() {
        return (
            <div className="pick-pokemon-team-card" onClick={() => this.props.PickPokeTeamRemove(this.props.poke.id)}>
                <p>{this.props.poke['pokemon'].name}</p>
                <img alt={this.props.poke['pokemon'] + "photo"} src={this.props.poke['pokemon'].sprites.frontimg}/>
                </div>
        )
    }
}