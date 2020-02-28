import React, {Component} from 'react'
import PokeCards from './PokeCards'
import BattleContainer from './BattleContainer'
import BattleMusic from './BattleMusic'
import {Button, Grid} from 'semantic-ui-react'
import PokeTeam from './PokemonTeam'

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
                <Grid columns={6}>
                    <Grid.Row>
                         {this.state.currentTeam.map(poke => <PokeTeam PickPokeTeamRemove={this.PickPokeTeamRemove} key={poke.id} poke={poke}/>)}
                    </Grid.Row>
                </Grid>
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
        this.setState({battleRender: true})
    }

    render() {
        return (
            <React.Fragment>
                {this.state.battleRender === false ?<div>
                <Button style={{float: 'left'}} onClick={() => this.props.renderHome(this.state.currentTeamId)}>Back</Button>
                <Button onClick={this.renderBattle} style={{float: 'right'}}>Play</Button>
                <h1 style={{textAlign: 'center'}} >Team</h1>
                {this.state.renderTeam ? this.renderTeam() : null}
                {this.state.battleRender === false ? <PokeCards pokemonList={this.props.pokemonList} pickPokeTeamAdd={this.pickPokeTeamAdd} conditionalRender={this.props.conditionalRender}/> :null}
                </div> : null}
               {this.state.currentTeam.length > 0 ?<div>
                {this.state.battleRender ? <div><BattleMusic/><BattleContainer currentTeam={this.state.currentTeam}/></div> : null}
               </div> : null}
            </React.Fragment>
        )
    }
}