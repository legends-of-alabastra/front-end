import React from 'react'
//music
import mainGame from '../../../assets/mainGame.wav'
//images
import soundOn from '../../../assets/subway_sound.svg'

export default class VolumeControl extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            volume_open: false,
            volume_level: 0.3,
            playing: true
        }
    }
    componentDidMount() {
        const audio = document.querySelector('audio')
        audio.volume = this.state.volume_level
    }
    volume_slider_hover_up() {
        let volume_control = document.querySelector('.volume-slider')
        volume_control.style.display = 'block'
        this.setState({volume_open: true})
    }
    volume_slider_hover_down() {
        let volume_control = document.querySelector('.volume-slider')
        volume_control.style.display = 'none'
        this.setState({volume_open: false})
    }
    adjust_volume(e) {
        let audio = document.querySelector('audio')
        this.setState({volume_level: e.target.value})
        audio.volume = this.state.volume_level
    }
    stop_music() {
        let audio = document.querySelector('audio')
        if(audio.paused === true) audio.play()
        else {
            audio.pause()
            this.setState({playing: false})
        }
    }
    render() {
        return (
            <div className='sound-view'
                onMouseEnter={() => this.volume_slider_hover_up()}
                onMouseLeave={() => this.volume_slider_hover_down()}>
                <audio loop>
                    <source src={mainGame} type='audio/wav' />
                </audio>
                <div className='sound-img' onClick={() => this.stop_music()}>
                    <img src={soundOn} alt='sound on'/>
                </div>
                <div className='volume-slider'>
                    <div className='volume-control'
                        value={this.state.volume_level}
                        onChange={e => this.adjust_volume(e)}>
                    </div>
                </div>
            </div>
        )
    }
}
