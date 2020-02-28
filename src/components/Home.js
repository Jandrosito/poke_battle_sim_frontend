import React, {Component} from 'react'
import PickPoke from './PickPoke'
import Profile from './Profile'
import BattleContainer from './BattleContainer'
import BattleMusic from './BattleMusic'
import {Button, Form, Modal} from 'semantic-ui-react'

export default class Home extends Component {
  state = {
    conditionalRender: "",
    userId: 0,
    username: "",
    open: false,
    pokemonList: []
  }
  
  componentDidMount() {
    fetch("http://localhost:3000/pokemons")
    .then(res => res.json())
    .then(pokemons => this.setState({pokemonList: [...this.state.pokemonList, pokemons]}))
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
          <div>
            <h1>Pokemon Battle Simulator</h1>
            {this.state.conditionalRender === "" ? <Button onClick={this.renderPickPoke}>Pick Pokemon</Button> :null}
            {this.state.conditionalRender === "pickpoke" ? <PickPoke renderHome={this.renderHome} pokemonList={this.state.pokemonList} conditionalRender={this.state.conditionalRender}/> : null}
            {this.state.conditionalRender === "" ? <Button onClick={this.renderLogin}>Log In</Button> :null}
            {this.state.conditionalRender === "profile" ? <Profile pokemonList={this.state.pokemonList} userId={this.state.userId} renderHome={this.renderHome} conditionalRender={this.state.conditionalRender}/> : null}
            {this.state.conditionalRender === "" ? <Button onClick={this.renderBattle}>Randomized Battle</Button> :null}
            {this.state.conditionalRender === "battle" ? <div> <BattleMusic/> <BattleContainer conditionalRender={this.state.conditionalRender}/> </div> : null}

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
