import React, {Component} from 'react'
import {Grid, Button} from 'semantic-ui-react'

export default class Battle extends Component {

    render() {
        console.log(this.props.poke)
        return (
            <Grid.Column >
                <Button onClick={() => this.props.PickPokeTeamRemove(this.props.poke.id)} >Remove</Button>
                <p>{this.props.poke['pokemon'].name}</p>
                <img src={this.props.poke['pokemon'].sprites.frontimg}/>
            </Grid.Column>
        )
    }
}