import React, {Component} from 'react'
import "../css/game.css"
import {w3cwebsocket as W3CWebSocket} from "websocket"
import Axios from "axios"

class Game extends Component{
    constructor(props){
        super(props)
    }

    client = new W3CWebSocket('ws://127.0.0.1:8000/ws/move/game/');

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
            }
            else{
                document.getElementById(position).classList.add("pink")
                document.getElementById(position).classList.remove("green")
            }
        }

        this.client.onclose = () => {
            console.log("Server closed unexpectedly!")
        }
    }

    move = (position) => {
        Axios.post(`http://127.0.0.1:8000/move/`, 
        {
                move : position,
                player : "X"
        }, 
        {
            headers: {
                "Content-Type": 'application/json'
            }
        }
        )
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