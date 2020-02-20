import React, {Component} from 'react'

export default class Profile extends Component {

    render() {
        return (
            <div>
                <button onClick={this.props.renderHome}>Logout</button>
            </div>
        )
    }
}