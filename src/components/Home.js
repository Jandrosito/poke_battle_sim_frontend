import React, {Component} from 'react'
import PickPoke from './PickPoke'
import Profile from './Profile'
import BattleContainer from './BattleContainer'
import BattleMusic from './BattleMusic'
import {Button, Form, Modal} from 'semantic-ui-react'
import '../Battle.css'

export default class Home extends Component {
  state = {
    conditionalRender: "",
    userId: 0,
    username: "",
    open: false,
    pokemonList: [],
  }
  
  renderHomeFromBattle = () => {
    this.setState({conditionalRender: ""})
  }

  componentDidMount() {
    fetch("http://localhost:3000/pokemons")
    .then(res => res.json())
    .then(pokemons => {
      this.setState({pokemonList: [...this.state.pokemonList, pokemons]}, () => console.log(this.state.pokemonList))
    })
  }

  renderHome = (id = null) => {
    if (id === null) {
    this.setState({
      conditionalRender: ""
    })
    } else {
      this.setState({
        conditionalRender: ""
      })
      // fetch(`http://localhost:3000/pokemons_team/${id}`, {
      //   method: 'DELETE'
      // })
    }
  }

  renderLogin = () => {
    this.setState({
      open: !this.state.open
    })
  }

  renderBattle = () => {
    this.setState({
      conditionalRender: "battle"
    })
  }

  renderPickPoke = () => {
    this.setState({
      conditionalRender: "pickpoke"
    })
  }

  handleChange = e => {
    const {name, value} = e.target
        this.setState({
            [name]: value
        })
  }

  loginHandleSubmit = () => {
    fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            Accept: "application/json"
        },
        body: JSON.stringify({
            username: this.state.username
        })
    })
    .then(res => res.json())
    .then(user => this.setState({userId: user.id, loginState: false, open: false,conditionalRender: "profile"}))
  }

  render() {
      return (
          <div className="ultimate-div">
            <div className="app-title">
            <h1 style={{fontSize: '3em'}}>Pokemon Battle Simulator</h1>
            </div>

            {this.state.conditionalRender === "" ? <img className="home-pokeball-img" alt="pokeball img" src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/016cd9a5-7bee-44c1-b903-9a4867cfd9ea/d86arcl-620505e1-e917-4538-8c76-7c1b5e8e7562.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzAxNmNkOWE1LTdiZWUtNDRjMS1iOTAzLTlhNDg2N2NmZDllYVwvZDg2YXJjbC02MjA1MDVlMS1lOTE3LTQ1MzgtOGM3Ni03YzFiNWU4ZTc1NjIucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.05mfLiYT4itVXv_Qk6dkNbVoZi1go1SlecarxJZypvQ"/> : null}
            <div className="home-btn-flex">
            {this.state.conditionalRender === "" ? <Button id="pick-poke-btn" onClick={this.renderPickPoke}>Pick Pokemon</Button> :null}
            {this.state.conditionalRender === "pickpoke" ? <PickPoke renderHomeFromBattle={this.renderHomeFromBattle} renderHome={this.renderHome} pokemonList={this.state.pokemonList} conditionalRender={this.state.conditionalRender}/> : null}
            {/* {this.state.conditionalRender === "" ? <Button onClick={this.renderLogin}>Log In</Button> :null} */}
            {this.state.conditionalRender === "profile" ? <Profile pokemonList={this.state.pokemonList} userId={this.state.userId} renderHome={this.renderHome} conditionalRender={this.state.conditionalRender}/> : null}
            {this.state.conditionalRender === "" ? <Button id="rand-battle-btn" onClick={this.renderBattle}>Randomized Battle</Button> :null}
            {this.state.conditionalRender === "battle" ? <div> <BattleMusic renderHomeFromBattle={this.renderHomeFromBattle} conditionalRender={this.state.conditionalRender}/> </div> : null}
            </div>

            <Modal size = 'tiny' closeIcon onClose = {this.renderLogin} open = {this.state.open}>
            <Modal.Content>
            <Modal.Header>Log In/Sign up</Modal.Header>
            <Form onSubmit={() => this.loginHandleSubmit()}>
              <Form.Input onChange = {event => this.handleChange(event)} label = 'Username' placeholder='Username' name = "username" value = {this.state.username}/>
              <Button type='submit' value="Submit">Submit</Button>
            </Form>
          </Modal.Content>
          </Modal>
          </div>
      )
  }
}
