import React, {Component} from 'react'
import '../Battle.css'
import {Button} from 'semantic-ui-react'

export default class Menu extends Component {

    render() {
        return (
            <React.Fragment>
                {this.props.userCurrentPokemon['pokemon'].moves ? <div id="moves-container">
                <Button id="moves-back-btn" onClick={this.props.movesRender} id="moves-back-btn">Back</Button>
                <div className="moves-flex-box">
                <Button onClick={() => this.props.moveExecute(this.props.userCurrentPokemon['pokemon'].moves[0])} id="first-move-btn">{this.props.userCurrentPokemon['pokemon'].moves[0].name}</Button>
                <Button onClick={() => this.props.moveExecute(this.props.userCurrentPokemon['pokemon'].moves[1])} id="second-move-btn">{this.props.userCurrentPokemon['pokemon'].moves[1].name}</Button>
                <Button onClick={() => this.props.moveExecute(this.props.userCurrentPokemon['pokemon'].moves[2])} id="third-move-btn">{this.props.userCurrentPokemon['pokemon'].moves[2].name}</Button>
                <Button onClick={() => this.props.moveExecute(this.props.userCurrentPokemon['pokemon'].moves[3])} id="fourth-move-btn">{this.props.userCurrentPokemon['pokemon'].moves[3].name}</Button>
                </div>
                </div> : null}
            </React.Fragment>
        )
    }
}