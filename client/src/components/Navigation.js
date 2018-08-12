import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "./Navigation.css"


class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isfixed: false
        }
    }
    componentWillMount() {
        window.addEventListener("scroll", this.onScroll)
    }
    componentWillUnmount() {
        window.removeEventListener("scroll", this.onScroll);
    }

    onScroll = (e) => {
        e.persist
        console.log("scroll position", e.pageY)
        if (e.pageY > 3) {
            this.setState({
                isfixed: true
            })
        } else {
            this.setState({
                isfixed: false
            })
        }
    }
    render() {
        var cl = this.state.isfixed ? "fixed" : null
        return (
            <header className={cl}>
                <div className="flexContainer">
                    <div className="flex">
                        <div className="flexContainer">
                            <div className="flex">
                                Expense App
                         </div>
                            <div className="flex">
                                <FontAwesomeIcon icon="money-check-alt" />     Transaction
                        </div>
                            <div className="flex">
                                <FontAwesomeIcon icon="cloud-download-alt" />    Downloads
                        </div>
                        </div>
                    </div>
                    <div className="flex">

                    </div>
                </div>
            </header>


        )
    }
}

export default Navigation