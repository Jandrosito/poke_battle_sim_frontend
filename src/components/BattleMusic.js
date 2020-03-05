import React, {Component} from 'react'
import BattleContainer from './BattleContainer.js'

export default class BattleMusic extends Component {
    constructor(props) {
        super(props);

        this.state = {
            play: false,
        };

        this.url = "https://vgmdownloads.com/soundtracks/pokemon-diamond-and-pearl-super-music-collection/kbqajyde/1-20%20Battle%21%20Trainer.mp3";
        this.audio = new Audio(this.url);
        this.audio.addEventListener('ended', function () {
            this.currentTime = 13;
            this.play();
          }, false);
        this.togglePlay = this.togglePlay.bind(this);
    }

    componentDidMount() {
        this.togglePlay()
    }

    togglePlay() {
        this.setState({
            play: !this.state.play
        }, () => this.state.play ? this.audio.play() : this.audio.pause());

        
    }

    render() {
        return (
            <div>
                <BattleContainer pause={this.togglePlay}  currentTeam={this.props.currentTeam} renderHomeFromBattle={this.props.renderHomeFromBattle} conditionalRender={this.props.conditionalRender}/>
            </div>
        );
    }
}