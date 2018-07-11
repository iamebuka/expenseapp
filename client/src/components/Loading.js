import React from 'react'
import "./Loading.css"



class Loading extends React.Component {
    state = {
        width: null,
        pieData: []
    }
    
    render() {
        return (
            <div>
                <div style={{margin:"calc(90vh/2) auto", width:"300px", backgroundColor: "red", textAlign:"center"}}>
                    <img src="/public/res/spalsh_screen.png" alt="App Icon showing wallet"/>
                </div>
          </div>
        )
    }
}

export default Loading;