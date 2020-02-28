import React, {Component} from 'react'
import PokeCards from './PokeCards'
import PokePost from './PokePost'
import PokeTeam from './PokemonTeam'
import {Button, Grid} from 'semantic-ui-react'


export default class Profile extends Component {
    state = {
        renderAllTeams: true,
        entireTeam: [],
        currentTeam: [],
        currentTeamId: 0,
        renderTeam: false
    }

    renderUserTeams() {
      return (
          <div>
        {fetch(`http://localhost:3000/users/${this.props.userId}`)
        .then(res => res.json())
        .then(userTeams => {
                userTeams['pokemon_teams'].map(team => fetch(`http://localhost:3000/pokemons_team/${team.id}`)
                .then(res => res.json())
                .then(pokemonJoiners => {
                        pokemonJoiners['pokemon_joiners'].map(joiner => fetch(`http://localhost:3000/pokemons_joiner/${joiner.id}`)
                        .then(res => res.json())
                        .then(pokemon => {
                            console.log(pokemon)
                            this.setState({renderAllTeams: false})
                        })
                    )
                })
            )
        }) 
    }</div>)
    }

    rendpoke = (pokemon) => {
        return (
            <Grid columns={6}>
                <Grid.Row>
                    <PokeTeam PickPokeTeamRemove={this.PickPokeTeamRemove} key={pokemon.id} poke={pokemon}/>
                </Grid.Row>
            </Grid>
            )
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

    renderTeam = () => {
        console.log(this.state.currentTeam)
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
            .then(actualjointable => this.setState({currentTeam: [...this.state.currentTeam, actualjointable], renderTeam: true}, console.log(actualjointable['pokemon']))
        )})
    }

    profilePokeTeamAdd = (pokemon) => {
        if (this.state.currentTeam < 1) {
            fetch('http://localhost:3000/pokemons_team', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: "application/json"
                },
                body: JSON.stringify({user_id: this.props.userId})
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
    
    render() {
        return (
            <div>

                <Button style={{float: 'left'}} onClick={this.props.renderHome}>Logout</Button>
                <Button style={{float: 'right'}}>Play</Button>
                <h1 style={{textAlign: 'center'}} >Teams</h1>
                {this.state.renderAllTeams ? this.renderUserTeams() : null}
                <PokeCards profilePokeTeamAdd={this.profilePokeTeamAdd} pokemonList={this.props.pokemonList} conditionalRender={this.props.conditionalRender}/>
            </div>
        )
    }
}