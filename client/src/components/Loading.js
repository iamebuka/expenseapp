import React from 'react'
import "./Loading.css"
import applogo from '../res/splash.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCreditCard } from '@fortawesome/free-solid-svg-icons'



class Loading extends React.Component {
    state = {
        width: null,
        pieData: []
    }

    render() {
        return (
            <div>
                <div style={{ margin: "calc(70vh/2) auto", minWidth: "100px", fontSize: "100px", textAlign: "center" }}>
                    <FontAwesomeIcon icon={faCreditCard} />
                   <span style={{fontWeight:"700", fontSize:"40px", display:"block"}}> Expense App</span>
                </div>
            </div>
        )
    }
}

export default Loading;