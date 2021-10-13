import React, {Component} from 'react'
import "../css/game.css"
import {w3cwebsocket as W3CWebSocket} from "websocket"

class Game extends Component{
    constructor(props){
        super(props)
        this.state = {
            player: "X",
        }
    }

    client = new W3CWebSocket('ws://127.0.0.1:8000/ws/move/'+this.props.match.params.room_name+"/");

    componentDidMount(){

        

        console.log("Waiting for connection")
        this.client.onopen = () =>{
            console.log("Connected")
        }

        this.client.onmessage = (e) => {
            const data = JSON.parse(e.data)
            const position = data.move
            const player = data.player
            document.getElementById(position).innerText = player

            if(player === "X"){
                document.getElementById(position).classList.add("green")
                document.getElementById(position).classList.remove("pink")
                this.setState({
                    player: "O"
                })
            }
            else{
                document.getElementById(position).classList.add("pink")
                document.getElementById(position).classList.remove("green")
                this.setState({
                    player: "X"
                })
            }

            this.checkForWin()
        }

        this.client.onclose = () => {
            console.log("Server closed unexpectedly!")
        }
    }

    move = (position) => {
        this.client.send(JSON.stringify({
            type: "send_move",
            move: position,
            player: this.state.player

        }))

        
    }

    checkForWin = () => {
        let position1 = document.getElementById(1).innerHTML
        let position2 = document.getElementById(2).innerHTML
        let position3 = document.getElementById(3).innerHTML
        let position4 = document.getElementById(4).innerHTML
        let position5 = document.getElementById(5).innerHTML
        let position6 = document.getElementById(6).innerHTML
        let position7 = document.getElementById(7).innerHTML
        let position8 = document.getElementById(8).innerHTML
        let position9 = document.getElementById(9).innerHTML

        if (position1 === position2 && position2 === position3 && position3 !== ""){

            document.getElementById(1).style.background = "blue"
            document.getElementById(2).style.background = "blue"
            document.getElementById(3).style.background = "blue"

            document.getElementById("main-container").style.pointerEvents = "none"
            
        }

        if (position4 === position5 && position5 === position6 && position6 !== ""){

            document.getElementById(4).style.background = "blue"
            document.getElementById(5).style.background = "blue"
            document.getElementById(6).style.background = "blue"
            
            document.getElementById("main-container").style.pointerEvents = "none"
            
        }

        if (position7 === position8 && position8 === position9 && position9 !== ""){

            document.getElementById(7).style.background = "blue"
            document.getElementById(8).style.background = "blue"
            document.getElementById(9).style.background = "blue"

            document.getElementById("main-container").style.pointerEvents = "none"
            
        }

        if (position1 === position4 && position4 === position7 && position7 !== ""){

            document.getElementById(1).style.background = "blue"
            document.getElementById(4).style.background = "blue"
            document.getElementById(7).style.background = "blue"
            
            document.getElementById("main-container").style.pointerEvents = "none"
            
        }

        if (position2 === position5 && position5 === position8 && position8 !== ""){

            document.getElementById(2).style.background = "blue"
            document.getElementById(5).style.background = "blue"
            document.getElementById(8).style.background = "blue"
            
            document.getElementById("main-container").style.pointerEvents = "none"
            
        }

        if (position3 === position6 && position6 === position9 && position9 !== ""){

            document.getElementById(3).style.background = "blue"
            document.getElementById(6).style.background = "blue"
            document.getElementById(9).style.background = "blue"
            
            document.getElementById("main-container").style.pointerEvents = "none"
            
        }

        if (position1 === position5 && position5 === position9 && position9 !== ""){

            document.getElementById(1).style.background = "blue"
            document.getElementById(5).style.background = "blue"
            document.getElementById(9).style.background = "blue"
            
            document.getElementById("main-container").style.pointerEvents = "none"
            
        }

        if (position3 === position5 && position5 === position7 && position7  !== ""){

            document.getElementById(3).style.background = "blue"
            document.getElementById(5).style.background = "blue"
            document.getElementById(7).style.background = "blue"
            
            document.getElementById("main-container").style.pointerEvents = "none"
            
        }
    }

    render(){
        let move = this.move
        return(
            <div id = "main-container">
                <h1 className = "title"><span className = "green">Tic</span><span className = "pink">Tac</span><span className = "green">Toe</span></h1>
                <table id = "board">
                    <tr>
                        <td className="cell" id="1" onClick = {()=>move(1)}></td>
                        <td className="cell" id="2" onClick = {()=>move(2)}></td>
                        <td className="cell" id="3" onClick = {()=>move(3)}></td>
                    </tr>
                    <tr>
                        <td className="cell" id="4" onClick = {()=>move(4)}></td>
                        <td className="cell" id="5" onClick = {()=>move(5)}></td>
                        <td className="cell" id="6" onClick = {()=>move(6)}></td>
                    </tr>
                    <tr>
                        <td className="cell" id="7" onClick = {()=>move(7)}></td>
                        <td className="cell" id="8" onClick = {()=>move(8)}></td>
                        <td className="cell" id="9" onClick = {()=>move(9)}></td>
                    </tr>
                </table>

                <div id = "positions"></div>

            </div>
        )
    }
}

export default Game