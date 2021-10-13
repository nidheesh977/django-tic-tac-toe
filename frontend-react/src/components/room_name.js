import React , {Component} from 'react'
import "../css/room_name.css"

class RoomName extends Component{
    constructor(props){
        super(props)
        this.state = {
            room_name : ""
        }
    }

    changeHandler = (e) => {
        this.setState({
            room_name : e.target.value
        })
        console.log(e.target.value)
    }

    enterRoom = (e) => {
        e.preventDefault()
        window.location.href = "/game/"+this.state.room_name;
    }

    render(){
        let changeHandler = this.changeHandler
        let enterRoom = this.enterRoom
        return(
            <div id = "main-container">
                <form>
                    <label>
                        <h3>Room : <input type = "text" required placeholder = "Enter room name" onChange = {changeHandler} /></h3>
                    </label>
                    <button type = "submit" onClick = {enterRoom}>Enter</button>
                </form>
            </div>
        )
    }
}

export default RoomName