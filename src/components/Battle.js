import React, {Component} from 'react'
import '../Battle.css'

export default class Battle extends Component {

    spritesLoaded = () => {
        if(this.props.userCurrentPokemon !== undefined) return true
        return false
    }

    hpLoaded = () => {
        if(this.props.userCurrentPokemon !== undefined) return true
        return false
    }

    nameLoaded = () => {
        if(this.props.userCurrentPokemon !== undefined) return true
        return false
    }

    render() {
        let userPoke = this.props.userCurrentPokemon
        let cpuPoke = this.props.cpuCurrentPokemon
        return (
            <div className="Battle">
                    {cpuPoke ? <div className="cpu-container">
                        {cpuPoke['pokemon'] ? <div>
                        <div className="cpu-status-box">
                            <h5> 
                                {this.nameLoaded() ? <p>{cpuPoke['pokemon'].name}</p> : null}
                                {this.hpLoaded() ?<p>HP: {cpuPoke['pokemon'].battlehp}/{cpuPoke['pokemon'].stats[5].value}</p> : null}
                                {this.props.cpuTeam.length > 0 ? <img alt="unloaded" className="column" src="https://upload.wikimedia.org/wikipedia/en/3/39/Pokeball.PNG"/> : null}
                                {this.props.cpuTeam.length > 1 ? <img alt="unloaded" className="column" src="https://upload.wikimedia.org/wikipedia/en/3/39/Pokeball.PNG"/> : null}
                                {this.props.cpuTeam.length > 2 ? <img alt="unloaded" className="column" src="https://upload.wikimedia.org/wikipedia/en/3/39/Pokeball.PNG"/> : null}
                                {this.props.cpuTeam.length > 3 ? <img alt="unloaded" className="column" src="https://upload.wikimedia.org/wikipedia/en/3/39/Pokeball.PNG"/> : null}
                                {this.props.cpuTeam.length > 4 ? <img alt="unloaded" className="column" src="https://upload.wikimedia.org/wikipedia/en/3/39/Pokeball.PNG"/> : null}
                                {this.props.cpuTeam.length > 5 ? <img alt="unloaded" className="column" src="https://upload.wikimedia.org/wikipedia/en/3/39/Pokeball.PNG"/> : null}
                            </h5>
                        </div>
                        <div className="cpu-pokemon-holder">
                            {this.spritesLoaded() ? <img id="cpu-poke" alt="img" src={cpuPoke['pokemon'].sprites.frontimg}/> : this.nameLoaded() ? `I choose you ${cpuPoke['pokemon'].name}` : null}
                        </div>
                        </div> :null}
                    </div> : null}

                     {userPoke['pokemon'] ? <div className="user-container">
                        <div className="user-status-box">
                            <h5> 
                                {this.nameLoaded() ? <p>{userPoke['pokemon'].name}</p> : null}
                                {this.hpLoaded() ?<p>HP: {userPoke['pokemon'].battlehp}/{userPoke['pokemon'].stats[5].value}</p> : null}
                                {this.props.userTeam.length > 0 ? <img alt="unloaded" className="column" src="https://upload.wikimedia.org/wikipedia/en/3/39/Pokeball.PNG"/> : null}
                                {this.props.userTeam.length > 1 ? <img alt="unloaded" className="column" src="https://upload.wikimedia.org/wikipedia/en/3/39/Pokeball.PNG"/> : null}
                                {this.props.userTeam.length > 2 ? <img alt="unloaded" className="column" src="https://upload.wikimedia.org/wikipedia/en/3/39/Pokeball.PNG"/> : null}
                                {this.props.userTeam.length > 3 ? <img alt="unloaded" className="column" src="https://upload.wikimedia.org/wikipedia/en/3/39/Pokeball.PNG"/> : null}
                                {this.props.userTeam.length > 4 ? <img alt="unloaded" className="column" src="https://upload.wikimedia.org/wikipedia/en/3/39/Pokeball.PNG"/> : null}
                                {this.props.userTeam.length > 5 ? <img alt="unloaded" className="column" src="https://upload.wikimedia.org/wikipedia/en/3/39/Pokeball.PNG"/> : null}
                            </h5>
                        </div>
                        <div className="user-pokemon-holder">
                            {this.spritesLoaded() ? <img id="user-poke" alt="img" src={userPoke['pokemon'].sprites.backimg}/> : this.nameLoaded() ? `I choose you ${userPoke['pokemon'].name}` : null}
                        </div> 
                </div> :null}
            </div>
        )
       
    }
}