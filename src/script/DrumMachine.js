import React from "react"

export default class DrumMachineApp extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            lastPressedButton: 'function()'
        }
        this.padsRender = this.padsRender.bind(this)
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
            exportArr.push(<DrumPad 
                id={padsID[i]}
                url={soundsURL[i]}
                name={padsName[i]}
                className='drum-pad' 
                key={`uniqKey_${i}`}
                />)
        }
        return exportArr
    }

    render(){
        return (
            <div id="drum-machine" className="appContainer">
                <div id='display' className='display'>
                    <p>{this.state.lastPressedButton}</p>
                </div>
                <div className='drumPadsContainer'>
                    {this.padsRender(8)}
                </div>
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
            <div id={this.props.id}>
                <audio className='clip' id={this.props.name} src={this.props.url}></audio>
                {this.props.name}
            </div>
        )
    }
}

