import React from 'react'
import "./Activity.css"
import "./elements.css"
import { LineChart, XAxis, Tooltip, CartesianGrid, Line } from 'recharts'
import { Icon } from '@material-ui/core';
import moment from 'moment'

class Activity extends React.Component {
    state = {
        width: null,
        pieData: []
    }
    updateDimensions = () => {

        var w = window,
            d = document,
            documentElement = d.documentElement,
            body = d.getElementsByTagName('body')[0],
            width = w.innerWidth || documentElement.clientWidth || body.clientWidth;
        width = 0.69 * width;
        this.setState({ width });
    }

    componentWillMount() {
        this.updateDimensions();
        this.generatePieData()
    }
    componentDidMount() {
        window.addEventListener("resize", this.updateDimensions);
    }
    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }

    calcVAT = (value) => {
        //calculate vat function
        return (Number(value) + (0.2 * Number(value)));
    }

    generatePieData = () => {
        var pieData = [];
        var data = {}
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        months.map((month, monthindex) => {
            this.props.expense.map((item, index) => {
                if (data[month]) {
                    if (month === months[moment(item.date, "YYYYMMDD").month()]) {
                        data[month] += Number(item.transvalue)
                    }
                } else {
                    if (month === months[moment(item.date, "YYYYMMDD").month()]) {
                        data[month] = Number(item.transvalue)
                    }else{
                        data[month] = 0
                    }
                }

               

            })


        })
        console.log("DATA", data)
        for (var key in data) {
            pieData.push({ label: key, value: data[key] })
        }
        this.setState({ pieData: pieData })
    }

    render() {

        return (
            <div>
                Activity
                <LineChart
                    width={this.state.width}
                    height={270}
                    data={this.state.pieData}
                    margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                >
                    <XAxis dataKey="label" />
                    <Tooltip />
                    <CartesianGrid vertical={false} horizontal={false} stroke="#f5f5f5" />
                    <Line type="monotone" dataKey="value" stroke="rgb(51, 183, 188)" yAxisId={0} />

                </LineChart>

            </div>
        )
    }
}

export default Activity;