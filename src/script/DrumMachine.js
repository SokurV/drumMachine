import React from "react"

export default class DrumMachineApp extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            lastPressedButton: 'click button'.toUpperCase(),
            history: []
        }
        this.padsRender = this.padsRender.bind(this)
        this.clickCallback = this.clickCallback.bind(this)
        this.keydownCallback = this.keydownCallback.bind(this)
        this.historyGenerate = this.historyGenerate.bind(this)
        this.clearHistory = this.clearHistory.bind(this)
        this.playHistory = this.playHistory.bind(this)
        this.play = this.play.bind(this)
    }

    clickCallback(event){
        event.target.classList.add('drum-pad_click')
        const audioID = event.target.textContent
        document.getElementById(audioID).play()
        setTimeout(()=>event.target.classList.remove('drum-pad_click'), 200)
        this.setState(()=>{
            return {
                lastPressedButton: event.target.id
            }
        })
        this.historyGenerate(audioID)
    }

    keydownCallback(event){
        const padName = event.code.slice(-1)
        if(['Q', 'W', 'E', 'A', 'S', 'D', 'Z', 'X', 'C'].indexOf(padName) >= 0){
            console.log(padName)
            const audio = document.getElementById(padName)
            audio.parentNode.classList.add('drum-pad_click')    
            audio.play()
            setTimeout(()=>audio.parentNode.classList.remove('drum-pad_click'), 200)
            this.setState(()=>{
                return {
                    lastPressedButton: audio.parentNode.id
                }
            })
            this.historyGenerate(padName) 
        }
    }

    historyGenerate(nameButton){
        this.setState(function(prevState){
            return {
                history: prevState['history'].concat([nameButton])
            }
        })
        let historyBox = document.querySelector('.history-box')
        let boxItem = document.createElement('div')
        boxItem.textContent = nameButton
        boxItem.classList.add('history-box__item', 'history-box__item_style')
        historyBox.append(boxItem)
    }

    async playHistory(){
        const playList = this.state.history
        if(playList.length > 0){
            for(let i = 0; i < playList.length; i++){
                let audioTrack = document.getElementById(playList[i])
                await this.play(audioTrack)
            }
        }
    }

    play(audio){
        audio.play()
        return new Promise((reject, resolve) => {
            audio.addEventListener('ended', () => {
                console.log('ended')
                resolve()
            })
    
            audio.addEventListener('error', () => {
                reject('Ошибка')
            })
        })
    }

    clearHistory(){
        this.setState(function(){
            return {
                lastPressedButton: 'click button'.toUpperCase(),
                history: []
            }
        })
        document.querySelector('.history-box').innerHTML = ''
    }

    padsRender(i){
        const padsName = ['Q', 'W', 'E', 'A', 'S', 'D', 'Z', 'X', 'C']
        const padsID = ['Heater 1', 'Heater 2', 'Heater 3', 'Heater 4', 'Clap', 'Open HH','Kick n\' Hat', 'Kick', 'Closed HH' ]
        const soundsURL = [
            'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3',
            'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3',
            'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3',
            'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3',
            'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3',
            'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3',
            'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3',
            'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3',
            'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
        ]
        let exportArr = []
        for(let i = 0; i <= 8; i++){
            exportArr.push(
                <DrumPad 
                    id={padsID[i]}
                    url={soundsURL[i]}
                    name={padsName[i]}
                    class='drum-pad drum-pad_style' 
                    key={`uniqKey_${i}`}
                    onClickFunc={this.clickCallback}
                />
            )
        }
        return exportArr
    }

    render(){
        return (
            <div 
                id="drum-machine" 
                className="container container_style" 
                tabIndex={0} 
                onKeyDown={this.keydownCallback}
            >
                <div className="drum-machine">
                    <div id='display' className='display display_style'>
                        <p>{this.state.lastPressedButton}</p>
                    </div>
                    <div className='drum-pads-container'>
                        {this.padsRender(8)}
                    </div>
                </div>
                <div className="history-box"></div>
                <button 
                    className="play-button play-button_style" 
                    onClick={this.playHistory}
                    disabled
                >
                        Кн. недоступна
                </button>
                <button 
                    className="clear-button clear-button_style" 
                    onClick={this.clearHistory}
                >
                        Clear history
                </button>
            </div>
        )
    }
}

class DrumPad extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return (
            <div 
                id={this.props.id} 
                className={this.props.class}
                onClick={this.props.onClickFunc}>
                    <audio 
                        className='clip' 
                        id={this.props.name} 
                        src={this.props.url}
                        preload='true'>
                    </audio>
                {this.props.name}
            </div>
        )
    }
}

