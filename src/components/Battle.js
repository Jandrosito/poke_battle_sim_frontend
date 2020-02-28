import React, {Component} from 'react'
import '../Battle.css'

export default class Battle extends Component {

    spritesLoaded = () => {
        if(this.props.userCurrentPokemon.sprites !== undefined) return true
        return false
    }

    hpLoaded = () => {
        if(this.props.userCurrentPokemon.stats !== undefined) return true
        return false
    }

    nameLoaded = () => {
        if(this.props.userCurrentPokemon.name !== undefined) return true
        return false
    }

    render() {
       
        return (
            <div className="Battle">
                    <div className="cpu-container">
                        <div className="cpu-status-box">
                            <h5> 
                                {this.nameLoaded() ? <p>{this.props.cpuCurrentPokemon.name}</p> : null}
                                {this.hpLoaded() ?<p>HP: {this.props.cpuCurrentPokemon.battlehp}/{this.props.cpuCurrentPokemon.stats[5].value}</p> : null}
                                {this.props.cpuTeam.length > 0 ? <img class="column" src="https://upload.wikimedia.org/wikipedia/en/3/39/Pokeball.PNG"/> : null}
                                {this.props.cpuTeam.length > 1 ? <img class="column" src="https://upload.wikimedia.org/wikipedia/en/3/39/Pokeball.PNG"/> : null}
                                {this.props.cpuTeam.length > 2 ? <img class="column" src="https://upload.wikimedia.org/wikipedia/en/3/39/Pokeball.PNG"/> : null}
                                {this.props.cpuTeam.length > 3 ? <img class="column" src="https://upload.wikimedia.org/wikipedia/en/3/39/Pokeball.PNG"/> : null}
                                {this.props.cpuTeam.length > 4 ? <img class="column" src="https://upload.wikimedia.org/wikipedia/en/3/39/Pokeball.PNG"/> : null}
                                {this.props.cpuTeam.length > 5 ? <img class="column" src="https://upload.wikimedia.org/wikipedia/en/3/39/Pokeball.PNG"/> : null}
                            </h5>
                        </div>
                        <div className="cpu-pokemon-holder">
                            {this.spritesLoaded() ? <img id="cpu-poke" src={this.props.cpuCurrentPokemon.sprites.frontimg}/> : this.nameLoaded() ? `I choose you ${this.props.cpuCurrentPokemon.name}` : null}
                        </div>
                    </div>
                    <div className="user-container">
                        <div className="user-status-box">
                            <h5> 
                                {this.nameLoaded() ? <p>{this.props.userCurrentPokemon.name}</p> : null}
                                {this.hpLoaded() ?<p>HP: {this.props.userCurrentPokemon.battlehp}/{this.props.userCurrentPokemon.stats[5].value}</p> : null}
                                {this.props.userTeam.length > 0 ? <img class="column" src="https://upload.wikimedia.org/wikipedia/en/3/39/Pokeball.PNG"/> : null}
                                {this.props.userTeam.length > 1 ? <img class="column" src="https://upload.wikimedia.org/wikipedia/en/3/39/Pokeball.PNG"/> : null}
                                {this.props.userTeam.length > 2 ? <img class="column" src="https://upload.wikimedia.org/wikipedia/en/3/39/Pokeball.PNG"/> : null}
                                {this.props.userTeam.length > 3 ? <img class="column" src="https://upload.wikimedia.org/wikipedia/en/3/39/Pokeball.PNG"/> : null}
                                {this.props.userTeam.length > 4 ? <img class="column" src="https://upload.wikimedia.org/wikipedia/en/3/39/Pokeball.PNG"/> : null}
                                {this.props.userTeam.length > 5 ? <img class="column" src="https://upload.wikimedia.org/wikipedia/en/3/39/Pokeball.PNG"/> : null}
                            </h5>
                        </div>
                        <div className="user-pokemon-holder">
                            {this.spritesLoaded() ? <img id="user-poke" src={this.props.userCurrentPokemon.sprites.backimg}/> : this.nameLoaded() ? `I choose you ${this.props.userCurrentPokemon.name}` : null}
                        </div>
                    </div>
                </div>
        )
       
    }
}