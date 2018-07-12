import React from 'react'
import "./Loading.css"
import applogo from '../res/splash.png'



class Loading extends React.Component {
    state = {
        width: null,
        pieData: []
    }
    
    render() {
        return (
            <div>
                <div style={{margin:"calc(90vh/2) auto", width:"300px",  textAlign:"center"}}>
                    <img style={{width: "250px"}} src={applogo} alt="App Icon showing wallet"/>
                </div>
          </div>
        )
    }
}

export default Loading;