import React, {Component} from 'react'
import '../Battle.css'
import Battle from './Battle.js'
import MenuContainer from './MenuContainer'

export default class BattleContainer extends Component {
    state = {
        battleStart: true,
        userTeam: [],
        cpuTeam: [],
        userCurrentPokemon: [],
        cpuCurrentPokemon: []
    }

    userCurrentPokemonSwitch = () => {
        
    }

    userCurrentPokemonSwitch = () => {
        
    }

    componentDidMount() {
        if (this.state.battleStart === true) {
        fetch('http://localhost:3000/pokemons')
        .then(res => res.json())
        .then(pokemons =>  {
        if (this.props.conditionalRender === "battle") {
                let i = 0
                while (i < 6) {
                    this.setState({cpuTeam: [...this.state.cpuTeam,pokemons[Math.floor((Math.random() * pokemons.length) + 0)]], 
                    userTeam: [...this.state.userTeam,pokemons[Math.floor((Math.random() * pokemons.length) + 0)]]})
                    i += 1
                }
                let cputeam = this.state.cpuTeam.map(pokemon => [{...pokemon, "battlehp": pokemon.stats[5].value}])
                let userteam = this.state.userTeam.map(pokemon => [{...pokemon, "battlehp": pokemon.stats[5].value}])
                this.setState({userCurrentPokemon: userteam[0][0], cpuCurrentPokemon: cputeam[0][0]})
        } else {
            let i = 0
            while (i < 6) {
                this.setState({cpuTeam: [...this.state.cpuTeam,pokemons[Math.floor((Math.random() * pokemons.length) + 0)]]})
                i += 1
            }
            this.state.cpuTeam.map(pokemon => [{...pokemon, "battlehp": pokemon.stats[5].value}])
            this.setState({userTeam: this.props.currentTeam})
            this.state.userTeam.map(pokemon => [{...pokemon, "battlehp": pokemon.stats[5].value}])
            this.setState({userCurrentPokemon: this.state.userTeam.first, cpuCurrentPokemon: this.state.cpuTeam.first})
        }
        })
        this.setState({battleStart: false})
    }
    }

    render() {
        console.log(this.state.cpuTeam)
        console.log(this.state.userTeam)
        console.log(this.state.userCurrentPokemon)
        console.log(this.state.cpuCurrentPokemon)
        return (
            <div className="Battle-Container">
                {this.state.battleStart === false ? <Battle userTeam={this.state.userTeam} cpuTeam={this.state.cpuTeam} userCurrentPokemon={this.state.userCurrentPokemon} cpuCurrentPokemon={this.state.cpuCurrentPokemon}/> : null}
                {this.state.battleStart === false ?<MenuContainer userTeam={this.state.userTeam} userCurrentPokemon={this.state.userCurrentPokemon} /> : null}
            </div>
        )
    }
}

