import React from 'react'
import "./Summary.css"
import "./elements.css"
import {  Pie, PieChart, Tooltip} from 'recharts'
import { Icon } from '@material-ui/core';
import moment from "moment"

class Summary extends React.Component {
    state = {
        width: null,
        pieData: [],
        totalMonthly: 0,
        totalWeekly: 0
    }
    updateDimensions = () => {

        var w = window,
            d = document,
            documentElement = d.documentElement,
            body = d.getElementsByTagName('body')[0],
            width = w.innerWidth || documentElement.clientWidth || body.clientWidth;
        width = width - 30
        this.setState({ width });
    }

    componentWillMount() {
        this.updateDimensions();
        this.generatePieData();
        this.generateMonthData()
this.generateWeeklyData()
    }
    componentDidMount() {
        window.addEventListener("resize", this.updateDimensions);
    }
    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }

    generatePieData = () => {
        var pieData = [];
        var data = {}
        console.log("SUMMARY COMPONENT", this.props.expense)
        this.props.expense.map((item, index) => {
            if (data[item.category]) {
                data[item.category] += Number(item.transvalue)
            } else {
                data[item.category] = Number(item.transvalue)
            }
        })

        for (var key in data) {
            pieData.push({ label: key, value: data[key] })
        }
        this.setState({pieData: pieData})
    }
   generateMonthData=()=>{
      var totalMonthly = 0
      this.props.expense.map((item, index) =>{
      if(moment(item.date,"YYYYMMDD").month() === moment().month()){
          
          totalMonthly+= Number(item.transvalue)
       }
      })
      this.setState({totalMonthly: totalMonthly}) 
   }

   generateWeeklyData=()=>{
    var totalWeekly = 0
    this.props.expense.map((item, index) =>{
    console.log("Week", moment(item.date,"YYYYMMDD").week(), moment().week())
    if(moment(item.date,"YYYYMMDD").week() === moment().week()){
        
        totalWeekly+= Number(item.transvalue)
     }
    })
    this.setState({totalWeekly: totalWeekly}) 
 }
   calcVAT = (value) => {
    //calculate vat function
    return (Number(value) + (0.2 * Number(value)));
  }
    render() {
        let month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        return (
            <div className="summary-card">
                <div className="item">
                    <PieChart width={300} height={250}>
                        <Tooltip active={true} />
                        <Pie data={this.state.pieData} dataKey="value" legendType="line" label={true} nameKey="label" cx="50%" cy="50%" fill="#662e91" />

                    </PieChart>
                </div>
                <div className="item">
                <label>LAST WEEK EXPENSE</label>
                <span> ${this.state.totalWeekly} </span>
                </div>
                <div className="item">
                <label>TOTAL {month[moment().month()].toUpperCase()}  EXPENSE </label>
                <span> ${this.state.totalMonthly} </span>
                </div>
                </div>
          
        )
    }
}

export default Summary;