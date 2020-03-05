import React, {Component} from 'react'
import PokeCards from './PokeCards'
import BattleContainer from './BattleContainer'
import BattleMusic from './BattleMusic'
import {Button} from 'semantic-ui-react'
import PokeTeam from './PokemonTeam'
import '../Battle.css'

export default class pickPoke extends Component {
    state = {
        currentTeam: [],
        currentTeamId: 0,
        joinTableId: 0,
        renderTeam: false,
        battleRender: false
    }

    componentDidMount() {
        this.setState({renderTeam: false})
    }

    renderTeam = () => {
            return (
                <div className="pickpoke-team-container">
                    <h1 style={{float: 'left'}} >Team</h1>
                    {this.state.currentTeam.map(poke => <PokeTeam PickPokeTeamRemove={this.PickPokeTeamRemove} key={poke.id} poke={poke}/>)}
                </div>
            )
    }

    pokemonJoinCreate = (pokemon) => {
        fetch('http://localhost:3000/pokemons_joiner', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: "application/json"
            },
            body: JSON.stringify({
                pokemon_id: pokemon.id,
                pokemon_team_id:  this.state.currentTeamId
            })
        })
        .then(res => res.json())
        .then(jointable => {
            fetch(`http://localhost:3000/pokemons_joiner/${jointable.id}`)
            .then(res => res.json())
            .then(actualjointable => this.setState({currentTeam: [...this.state.currentTeam, actualjointable], renderTeam: true})
        )})
    }

    pickPokeTeamAdd = (pokemon) => {
            if (this.state.currentTeam < 1) {
                fetch('http://localhost:3000/pokemons_team', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: "application/json"
                    },
                    body: JSON.stringify({user_id: 1})
                })
                .then(res => res.json())
                .then(team => {
                    this.setState({currentTeamId: team.id}) 
                this.pokemonJoinCreate(pokemon)
            }) 
            } else if (this.state.currentTeam.length < 6) {
                this.pokemonJoinCreate(pokemon)                                    
            } else {
                window.alert("Team at max capacity")
            }
        }

    PickPokeTeamRemove = (id) => {
        fetch(`http://localhost:3000/pokemons_joiner/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                Accept: "application/json"
            }
        })
        .then(this.setState({currentTeam: this.state.currentTeam.filter(pokemon => pokemon.id !== id)}))                        
    }

    renderBattle = () => {
        if (this.state.currentTeam.length > 0) {
        this.setState({battleRender: true})
        }
    }

    render() {
        return (
            <React.Fragment>
                {this.state.battleRender === false ? <div>
                        <Button id="pick-poke-back-btn" onClick={() => this.props.renderHome(this.state.currentTeamId)}>Back</Button>
                        <Button id="pick-poke-play-btn" onClick={this.renderBattle}>Play</Button>
                        {this.state.renderTeam ? this.renderTeam() : null}
                    {this.state.battleRender === false ? <PokeCards pokemonList={this.props.pokemonList} pickPokeTeamAdd={this.pickPokeTeamAdd} conditionalRender={this.props.conditionalRender}/> :null}
                    </div> : null}
                {this.state.battleRender ? <div><BattleMusic renderHomeFromBattle={this.props.renderHomeFromBattle} currentTeam={this.state.currentTeam}/></div> : null}
            </React.Fragment>
        )
    }
}