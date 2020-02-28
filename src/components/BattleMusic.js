import React, {Component} from 'react'


export default class BattleMusic extends Component {
    constructor(props) {
        super(props);

        this.state = {
            play: true
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
        this.audio.play()
    }

    render() {
        return (
            <div>
            </div>
        );
    }
}