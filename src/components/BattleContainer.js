import React, {Component} from 'react'
import '../Battle.css'
import Battle from './Battle.js'
import {Button} from 'semantic-ui-react'
import MenuContainer from './MenuContainer'

export default class BattleContainer extends Component {
    state = {
        battleStart: true,
        userTeam: [],
        cpuTeam: [],
        userCurrentPokemon: [],
        cpuCurrentPokemon: [],
        forcedPokemonChoose: false,
        renderFaint: false,
        renderWin: false
    }

    userCurrentPokemonSwitch = (pokemon) => {
        console.log(pokemon)
        this.setState({userCurrentPokemon: pokemon}, this.cpuDmgSwitch)
    }

    cpuDmgSwitch = () => {
        let cpuMove = this.state.cpuCurrentPokemon['pokemon'].moves[Math.floor((Math.random() * 4) + 0)]
                    let moveMod = 1
                    let crit = 1
                    let critChance = Math.floor((Math.random() * 100) + 0)
                    if (this.state.cpuCurrentPokemon['pokemon'].poke_type === cpuMove.type) {
                        moveMod = 1.5
                    }
                    if (critChance <= 20) {
                        crit = 1.5
                    }
                    let cpudmg = ((((2 * 1  / 5 + 2) * cpuMove.power * this.state.cpuCurrentPokemon['pokemon'].stats[2].value / this.state.userCurrentPokemon['pokemon'].stats[1].value) / 50 + 2) * moveMod) * crit
                    let realcpudmg = Math.floor(cpudmg)
                    let dummybattlehp = this.state.userCurrentPokemon['pokemon'].battlehp - realcpudmg
                    this.setState({userCurrentPokemon: {...this.state.userCurrentPokemon, pokemon: {...this.state.userCurrentPokemon.pokemon, battlehp: dummybattlehp}}})
                    if (this.state.userCurrentPokemon['pokemon'].battlehp < 1) {
                        this.userPokemonFaint(this.state.userCurrentPokemon)
                    }
    }

    componentDidMount() {
        if (this.state.battleStart === true) {
        fetch('http://localhost:3000/pokemons')
        .then(res => res.json())
        .then(pokemons =>  {
        if (this.props.conditionalRender === "battle") {
            this.battleTeamAdd(pokemons, "cpu")
            this.battleTeamAdd(pokemons, "user")
        } else {
            this.battleTeamAdd(pokemons, "cpu")
            this.setState({userTeam: this.props.currentTeam})
            this.setState({userCurrentPokemon: this.state.userTeam[0], cpuCurrentPokemon: this.state.cpuTeam[0]})
        }
        })
        .then(this.setState({battleStart: false}))  
    }
    }


    cpuPokemonJoinCreate = (pokemon, id) => {
        fetch('http://localhost:3000/pokemons_joiner', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: "application/json"
            },
            body: JSON.stringify({
                pokemon_id: pokemon.id,
                pokemon_team_id: id
            })
        })
        .then(res => res.json())
        .then(jointable => {
            fetch(`http://localhost:3000/pokemons_joiner/${jointable.id}`)
            .then(res => res.json())
            .then(actualjointable => {
                this.setState({cpuTeam: [...this.state.cpuTeam, actualjointable]})
                this.setState({cpuCurrentPokemon: this.state.cpuTeam[0]})
            }
        )})
    }


    userPokemonJoinCreate = (pokemon, id) => {
        fetch('http://localhost:3000/pokemons_joiner', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: "application/json"
            },
            body: JSON.stringify({
                pokemon_id: pokemon.id,
                pokemon_team_id: id
            })
        })
        .then(res => res.json())
        .then(jointable => {
            fetch(`http://localhost:3000/pokemons_joiner/${jointable.id}`)
            .then(res => res.json())
            .then(actualjointable => {
                this.setState({userTeam: [...this.state.userTeam, actualjointable]})
                this.setState({userCurrentPokemon: this.state.userTeam[0]})

            }
        )})
    }


    battleTeamAdd = (pokemons, who) => {
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
                let teamId = team.id
                if (who === "cpu") {
                let i = 0
                while (i < 6) {
                    this.cpuPokemonJoinCreate(pokemons[Math.floor((Math.random() * pokemons.length) + 0)], teamId)
                    i += 1
                }
            } else if (who === "user") {
                
                let i = 0
                while (i < 6) {
                    this.userPokemonJoinCreate(pokemons[Math.floor((Math.random() * pokemons.length) + 0)], teamId)
                    i += 1
                }
            }
        }) 
    }



    moveExecute = (move) => {
        if (move.move_type === 'special') {
            if (this.state.userCurrentPokemon['pokemon'].stats[0].value >= this.state.cpuCurrentPokemon['pokemon'].stats[0].value) {
                let moveMod = 1
                let crit = 1
                let critChance = Math.floor((Math.random() * 100) + 0)
                if (this.state.userCurrentPokemon['pokemon'].poke_type === move.type) {
                    moveMod = 1.5
                }
                if (critChance <= 20) {
                    crit = 1.5
                }
                let dmg = ((((2 * 1  / 5 + 2) * move.power * this.state.userCurrentPokemon['pokemon'].stats[2].value / this.state.cpuCurrentPokemon['pokemon'].stats[1].value) / 50 + 2) * moveMod) * crit
                let realdmg = Math.floor(dmg)    
                let dummybattlehp = this.state.cpuCurrentPokemon['pokemon'].battlehp - realdmg
                this.setState({cpuCurrentPokemon: {...this.state.cpuCurrentPokemon, pokemon: { ...this.state.cpuCurrentPokemon.pokemon, battlehp: dummybattlehp}}})
                if (this.state.cpuCurrentPokemon['pokemon'].battlehp < 1) {
                    this.cpuPokemonFaint(this.state.cpuCurrentPokemon)
                } else {
                    let cpuMove = this.state.cpuCurrentPokemon['pokemon'].moves[Math.floor((Math.random() * 4) + 0)]
                    let moveMod = 1
                    let crit = 1
                    let critChance = Math.floor((Math.random() * 100) + 0)
                    if (this.state.cpuCurrentPokemon['pokemon'].poke_type === cpuMove.type) {
                        moveMod = 1.5
                    }
                    if (critChance <= 20) {
                        crit = 1.5
                    }
                    let cpudmg = ((((2 * 1  / 5 + 2) * cpuMove.power * this.state.cpuCurrentPokemon['pokemon'].stats[2].value / this.state.userCurrentPokemon['pokemon'].stats[1].value) / 50 + 2) * moveMod) * crit
                    let realcpudmg = Math.floor(cpudmg)
                    let dummybattlehp = this.state.userCurrentPokemon['pokemon'].battlehp - realcpudmg
                    this.setState({userCurrentPokemon: {...this.state.userCurrentPokemon, pokemon: {...this.state.userCurrentPokemon.pokemon, battlehp: dummybattlehp}}})
                    if (this.state.userCurrentPokemon['pokemon'].battlehp < 1) {
                        this.userPokemonFaint(this.state.userCurrentPokemon)
                    }
                }
            } else if (this.state.userCurrentPokemon['pokemon'].stats[0].value <= this.state.cpuCurrentPokemon['pokemon'].stats[0].value) {
                let cpuMove = this.state.cpuCurrentPokemon['pokemon'].moves[Math.floor((Math.random() * 4) + 0)]
                    let moveMod = 1
                    let crit = 1
                    let critChance = Math.floor((Math.random() * 100) + 0)
                    if (this.state.cpuCurrentPokemon['pokemon'].poke_type === cpuMove.type) {
                        moveMod = 1.5
                    }
                    if (critChance <= 20) {
                        crit = 1.5
                    }
                let cpudmg = ((((2 * 1  / 5 + 2) * cpuMove.power * this.state.cpuCurrentPokemon['pokemon'].stats[2].value / this.state.userCurrentPokemon['pokemon'].stats[1].value) / 50 + 2) * moveMod) * crit
                let realcpudmg = Math.floor(cpudmg)
                let dummybattlehp = this.state.userCurrentPokemon['pokemon'].battlehp - realcpudmg
                this.setState({userCurrentPokemon: {...this.state.userCurrentPokemon, pokemon: {...this.state.userCurrentPokemon.pokemon, battlehp: dummybattlehp}}})
                if (this.state.userCurrentPokemon['pokemon'].battlehp < 1) {
                    this.userPokemonFaint(this.state.userCurrentPokemon)
                } else {
                    let moveMod = 1
                    let crit = 1
                    let critChance = Math.floor((Math.random() * 100) + 0)
                    if (this.state.userCurrentPokemon['pokemon'].poke_type === move.type) {
                        moveMod = 1.5
                    }
                    if (critChance <= 20) {
                        crit = 1.5
                    }
                    let dmg = ((((2 * 1  / 5 + 2) * move.power * this.state.userCurrentPokemon['pokemon'].stats[2].value / this.state.cpuCurrentPokemon['pokemon'].stats[1].value) / 50 + 2) * moveMod) * crit
                    let realdmg = Math.floor(dmg)
                    let dummybattlehp = this.state.cpuCurrentPokemon['pokemon'].battlehp - realdmg
                    this.setState({cpuCurrentPokemon: {...this.state.cpuCurrentPokemon, pokemon: { ...this.state.cpuCurrentPokemon.pokemon, battlehp: dummybattlehp}}})
                    if (this.state.cpuCurrentPokemon['pokemon'].battlehp < 1) {
                        this.cpuPokemonFaint(this.state.cpuCurrentPokemon)
                    }
                }
            }
        } else if (move.move_type === 'physical') {
            if (this.state.userCurrentPokemon['pokemon'].stats[0].value >= this.state.cpuCurrentPokemon['pokemon'].stats[0].value) {
                let moveMod = 1
                let crit = 1
                let critChance = Math.floor((Math.random() * 100) + 0)
                if (this.state.userCurrentPokemon['pokemon'].poke_type === move.type) {
                    moveMod = 1.5
                }
                if (critChance <= 20) {
                    crit = 1.5
                }
                let dmg = ((((2 * 1  / 5 + 2) * move.power * this.state.userCurrentPokemon['pokemon'].stats[4].value / this.state.cpuCurrentPokemon['pokemon'].stats[3].value) / 50 + 2) * moveMod) * crit
                let realdmg = Math.floor(dmg)
                let dummybattlehp = this.state.cpuCurrentPokemon['pokemon'].battlehp - realdmg
                this.setState({cpuCurrentPokemon: {...this.state.cpuCurrentPokemon, pokemon: { ...this.state.cpuCurrentPokemon.pokemon, battlehp: dummybattlehp}}})
                if (this.state.cpuCurrentPokemon['pokemon'].battlehp < 1) {
                    this.cpuPokemonFaint(this.state.cpuCurrentPokemon)
                } else {
                    let cpuMove = this.state.cpuCurrentPokemon['pokemon'].moves[Math.floor((Math.random() * 4) + 0)]
                    let moveMod = 1
                    let crit = 1
                    let critChance = Math.floor((Math.random() * 100) + 0)
                    if (this.state.cpuCurrentPokemon['pokemon'].poke_type === cpuMove.type) {
                        moveMod = 1.5
                    }
                    if (critChance <= 20) {
                        crit = 1.5
                    }
                    let cpudmg = ((((2 * 1  / 5 + 2) * cpuMove.power * this.state.cpuCurrentPokemon['pokemon'].stats[4].value / this.state.userCurrentPokemon['pokemon'].stats[3].value) / 50 + 2) * moveMod) * crit
                    let realcpudmg = Math.floor(cpudmg)
                    let dummybattlehp = this.state.userCurrentPokemon['pokemon'].battlehp - realcpudmg
                    this.setState({userCurrentPokemon: {...this.state.userCurrentPokemon, pokemon: {...this.state.userCurrentPokemon.pokemon, battlehp: dummybattlehp}}})
                    if (this.state.userCurrentPokemon['pokemon'].battlehp < 1) {
                        this.userPokemonFaint(this.state.userCurrentPokemon)
                    }
                }
            } else if (this.state.userCurrentPokemon['pokemon'].stats[0].value <= this.state.cpuCurrentPokemon['pokemon'].stats[0].value) {
                let cpuMove = this.state.cpuCurrentPokemon['pokemon'].moves[Math.floor((Math.random() * 4) + 0)]
                let moveMod = 1
                    let crit = 1
                    let critChance = Math.floor((Math.random() * 100) + 0)
                    if (this.state.cpuCurrentPokemon['pokemon'].poke_type === cpuMove.type) {
                        moveMod = 1.5
                    }
                    if (critChance <= 20) {
                        crit = 1.5
                    }
                let cpudmg = ((((2 * 1  / 5 + 2) * cpuMove.power * this.state.cpuCurrentPokemon['pokemon'].stats[4].value / this.state.userCurrentPokemon['pokemon'].stats[3].value) / 50 + 2) * moveMod) * crit
                let realcpudmg = Math.floor(cpudmg)
                let dummybattlehp = this.state.userCurrentPokemon['pokemon'].battlehp - realcpudmg
                this.setState({userCurrentPokemon: {...this.state.userCurrentPokemon, pokemon: {...this.state.userCurrentPokemon.pokemon, battlehp: dummybattlehp}}})
                if (this.state.userCurrentPokemon['pokemon'].battlehp < 1) {
                    this.userPokemonFaint(this.state.userCurrentPokemon)
                } else {
                    let moveMod = 1
                    let crit = 1
                    let critChance = Math.floor((Math.random() * 100) + 0)
                    if (this.state.userCurrentPokemon['pokemon'].poke_type === move.type) {
                        moveMod = 1.5
                    }
                    if (critChance <= 20) {
                        crit = 1.5
                    }
                    let dmg = ((((2 * 1  / 5 + 2) * move.power * this.state.userCurrentPokemon['pokemon'].stats[4].value / this.state.cpuCurrentPokemon['pokemon'].stats[3].value) / 50 + 2) * moveMod) * crit
                    let realdmg = Math.floor(dmg)
                    let dummybattlehp = this.state.cpuCurrentPokemon['pokemon'].battlehp - realdmg
                    this.setState({cpuCurrentPokemon: {...this.state.cpuCurrentPokemon, pokemon: { ...this.state.cpuCurrentPokemon.pokemon, battlehp: dummybattlehp}}})
                    if (this.state.cpuCurrentPokemon['pokemon'].battlehp < 1) {
                        this.cpuPokemonFaint(this.state.cpuCurrentPokemon)
                    }
                }
            }
        } else if (move.move_type === 'status') {
            if (this.state.userCurrentPokemon['pokemon'].stats[0].value >= this.state.cpuCurrentPokemon['pokemon'].stats[0].value) {
                let moveMod = 1
                let crit = 1
                let critChance = Math.floor((Math.random() * 100) + 0)
                if (this.state.userCurrentPokemon['pokemon'].poke_type === move.type) {
                    moveMod = 1.5
                }
                if (critChance <= 20) {
                    crit = 1.5
                }
                let dmg = ((((2 * 1  / 5 + 2) * 50 * this.state.userCurrentPokemon['pokemon'].stats[4].value / this.state.cpuCurrentPokemon['pokemon'].stats[3].value) / 50 + 2) * moveMod) * crit
                let realdmg = Math.floor(dmg)
                let dummybattlehp = this.state.cpuCurrentPokemon['pokemon'].battlehp - realdmg
                this.setState({cpuCurrentPokemon: {...this.state.cpuCurrentPokemon, pokemon: { ...this.state.cpuCurrentPokemon.pokemon, battlehp: dummybattlehp}}})
                if (this.state.cpuCurrentPokemon['pokemon'].battlehp < 1) {
                    this.cpuPokemonFaint(this.state.cpuCurrentPokemon)
                } else {
                    let cpuMove = this.state.cpuCurrentPokemon['pokemon'].moves[Math.floor((Math.random() * 4) + 0)]
                    let moveMod = 1
                    let crit = 1
                    let critChance = Math.floor((Math.random() * 100) + 0)
                    if (this.state.cpuCurrentPokemon['pokemon'].poke_type === cpuMove.type) {
                        moveMod = 1.5
                    }
                    if (critChance <= 20) {
                        crit = 1.5
                    }
                    let cpudmg = ((((2 * 1  / 5 + 2) * cpuMove.power * this.state.cpuCurrentPokemon['pokemon'].stats[4].value / this.state.userCurrentPokemon['pokemon'].stats[3].value) / 50 + 2) * moveMod) * crit
                    let realcpudmg = Math.floor(cpudmg)
                    let dummybattlehp = this.state.userCurrentPokemon['pokemon'].battlehp - realcpudmg
                    this.setState({userCurrentPokemon: {...this.state.userCurrentPokemon, pokemon: {...this.state.userCurrentPokemon.pokemon, battlehp: dummybattlehp}}})
                    if (this.state.userCurrentPokemon['pokemon'].battlehp < 1) {
                        this.userPokemonFaint(this.state.userCurrentPokemon)
                    }
                }
            } else {
                let cpuMove = this.state.cpuCurrentPokemon['pokemon'].moves[Math.floor((Math.random() * 4) + 0)]
                let moveMod = 1
                    let crit = 1
                    let critChance = Math.floor((Math.random() * 100) + 0)
                    if (this.state.cpuCurrentPokemon['pokemon'].poke_type === cpuMove.type) {
                        moveMod = 1.5
                    }
                    if (critChance <= 20) {
                        crit = 1.5
                    }
                let cpudmg = ((((2 * 1  / 5 + 2) * cpuMove.power * this.state.cpuCurrentPokemon['pokemon'].stats[4].value / this.state.userCurrentPokemon['pokemon'].stats[3].value) / 50 + 2) * moveMod) * crit
                let realcpudmg = Math.floor(cpudmg)
                let dummybattlehp = this.state.userCurrentPokemon['pokemon'].battlehp - realcpudmg
                this.setState({userCurrentPokemon: {...this.state.userCurrentPokemon, pokemon: {...this.state.userCurrentPokemon.pokemon, battlehp: dummybattlehp}}})
                if (this.state.userCurrentPokemon['pokemon'].battlehp < 1) {
                    this.userPokemonFaint(this.state.userCurrentPokemon)
                } else {
                    let moveMod = 1
                    let crit = 1
                    let critChance = Math.floor((Math.random() * 100) + 0)
                    if (this.state.userCurrentPokemon['pokemon'].poke_type === move.type) {
                        moveMod = 1.5
                    }
                    if (critChance <= 20) {
                        crit = 1.5
                    }
                    let dmg = ((((2 * 1  / 5 + 2) * 50 * this.state.userCurrentPokemon['pokemon'].stats[4].value / this.state.cpuCurrentPokemon['pokemon'].stats[3].value) / 50 + 2) * moveMod) * crit
                    let realdmg = Math.floor(dmg)
                    let dummybattlehp = this.state.cpuCurrentPokemon['pokemon'].battlehp - realdmg
                    this.setState({cpuCurrentPokemon: {...this.state.cpuCurrentPokemon, pokemon: { ...this.state.cpuCurrentPokemon.pokemon, battlehp: dummybattlehp}}})
                    if (this.state.cpuCurrentPokemon['pokemon'].battlehp < 1) {
                        this.cpuPokemonFaint(this.state.cpuCurrentPokemon)
                    }
                }
            }
        }
        console.log(this.state.cpuTeam)
    }

    userPokemonFaint = (userTeam) => {
        if (userTeam.length > 0) {
            this.setState({forcedPokemonChoose: true})
        } else if (userTeam.length < 1) {
            this.results("lost")
        }
    }

    cpuPokemonFaint = (cpuTeam) => {
        if (cpuTeam.length > 0) {
            this.setState({cpuCurrentPokemon: cpuTeam[Math.floor((Math.random() * cpuTeam.length) + 0)]})
        } else if (cpuTeam.length < 1) {
            this.results("Win")
        }
    }

    results = (result) => {
        if (result === "lost") {
            this.setState({renderWin: "loss"})
            this.props.pause()
        } else if (result === "Win") {
            this.setState({renderWin: "win"})
            this.props.pause()
        }
    }

    forcedPokemonChooseChange = (pokemon) => {
        this.setState({forcedPokemonChoose: false, userCurrentPokemon: pokemon}, () => console.log(this.state.userCurrentPokemon))
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.userCurrentPokemon && this.state.cpuCurrentPokemon) {
            if (this.state.userCurrentPokemon['pokemon'] && this.state.cpuCurrentPokemon['pokemon']) {
                if (prevState.userCurrentPokemon !== this.state.userCurrentPokemon) {
                    let bhp = this.state.userCurrentPokemon['pokemon'].battlehp
                    let newUserPokeArray = this.state.userTeam.map(poke => poke.id === this.state.userCurrentPokemon.id ? {...poke, pokemon: {...poke.pokemon, battlehp: bhp}} : poke)
                    this.setState({userTeam: newUserPokeArray})
                    if (this.state.userCurrentPokemon['pokemon'].battlehp < 1) {
                        let userTeamVar = this.state.userTeam.filter(poke => poke.id !== this.state.userCurrentPokemon.id)
                        this.setState({userTeam: this.state.userTeam.filter(poke => poke.id !== this.state.userCurrentPokemon.id)})
                        this.userPokemonFaint(userTeamVar)
                    }
                }
                if (prevState.cpuCurrentPokemon !== this.state.cpuCurrentPokemon) {
                    let bhp = this.state.cpuCurrentPokemon['pokemon'].battlehp
                    let newCpuPokeArray = this.state.cpuTeam.map(poke => poke.id === this.state.cpuCurrentPokemon.id ? {...poke, pokemon: {...poke.pokemon, battlehp: bhp}} : poke)
                    this.setState({cpuTeam: newCpuPokeArray})
                    if (this.state.cpuCurrentPokemon['pokemon'].battlehp < 1) {
                        let cpuTeamVar = this.state.cpuTeam.filter(poke => poke.id !== this.state.cpuCurrentPokemon.id)
                        this.setState({cpuTeam: this.state.cpuTeam.filter(poke => poke.id !== this.state.cpuCurrentPokemon.id)})
                        this.cpuPokemonFaint(cpuTeamVar)
                    }
                }

            }
        }
    }

    render() {
        console.log(this.state.userTeam)
        return (
            <React.Fragment>
            {this.state.renderWin === false ? <div>
            {this.state.userTeam.length > 1 && this.state.userCurrentPokemon !== [] && this.state.cpuCurrentPokemon !== [] ? <div className="Battle-Container">
                {this.state.battleStart === false ? <Battle userTeam={this.state.userTeam} cpuTeam={this.state.cpuTeam} userCurrentPokemon={this.state.userCurrentPokemon} cpuCurrentPokemon={this.state.cpuCurrentPokemon}/> : null}
                {this.state.battleStart === false ? <MenuContainer forcedPokemonChooseChange={this.forcedPokemonChooseChange} forcedPokemonChoose={this.state.forcedPokemonChoose} moveExecute={this.moveExecute} userCurrentPokemonSwitch={this.userCurrentPokemonSwitch} userTeam={this.state.userTeam} userCurrentPokemon={this.state.userCurrentPokemon} /> : null}
            </div> : null}
            </div> : null}
            <div>
            {this.state.renderWin === "win" ? <div><h1>You Won!</h1> <Button onClick={() => this.props.renderHomeFromBattle()}>Back to Home page</Button> </div> : null} 
            {this.state.renderWin === "loss" ? <div><h1>You Lost!</h1> <Button onClick={() => this.props.renderHomeFromBattle()}>Back to Home page</Button> </div> : null}
            </div>
            </React.Fragment>
        )
    }
}

