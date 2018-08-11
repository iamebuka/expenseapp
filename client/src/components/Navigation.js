import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';



class Navigation extends React.Component {
   
    render() {
         return (
            <div>
                <AppBar position="static" style={{backgroundColor:"rgb(32, 32, 32)" }}>
                    <Toolbar>
                        <Typography variant="title" color="inherit">
                            Expense
                        </Typography>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

export default Navigation