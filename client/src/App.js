import React, { Component } from 'react';
import logo from './logo.svg';
import Activity from "./components/Activity"
import Summary from "./components/Summary"
import Navigation from "./components/Navigation"
import Loading from './components/Loading'
import { Button } from "@material-ui/core"
import Icon from "@material-ui/core/Icon"
import DatePicker from 'react-datepicker';
import { PieChart, Pie, Tooltip } from 'recharts'
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faPlus, faCloudDownloadAlt, faMoneyCheckAlt } from '@fortawesome/free-solid-svg-icons'

library.add(faCoffee,faPlus, faCloudDownloadAlt, faMoneyCheckAlt )

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createform: false,
      pie: [],
      date: moment(),
      transaction: "",
      realTransactionValue: 0,
      note: '',
      category: "",
      expense: [],
      rawData: [],
      pageLoad: true,
      searchText: ""

    }
  }
  handleDateChange = (date) => {
    this.setState({
      transactionDate: date
    })
  }
  handleDataChange = (e) => {
    e.persist()
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSearch = (e) => {
    let filter = this.state.rawData.filter((item) => new RegExp(e.target.value, "i").exec(item.note))
    //let filter = this.filterSearch(this.state.rawData, e.target.value)
    console.log("filtered", filter)
    let sorted = this.groupData(filter)
    let parseData = this.parseData(sorted)
    this.setState({
      searchText: e.target.value,
      expense: [...parseData]

    })
  }

  filterSearch = (arr, searchText) => {
    const rDetails = arr.filter(l => {
      return new RegExp(searchText, "i").exec(l.note)
    });

    return rDetails;
  }

  handleFormSubmit = (e) => {
    var amount = this.state.transaction;
    if (amount.toLocaleLowerCase().endsWith("eur")) {
      let end = amount.indexOf("EUR");
      let res = amount.substring(0, end);

      //convert currency via public api and add to database if value contains EUR
      this.currConverter().then((data) => {
        this.insertExpenses({
          transvalue: (res * data["EUR_GBP"].val),
          category: this.state.category,
          date: moment(this.state.date, "DD-MM-YYYY"),
          note: this.state.note
        })
          .then((data) => {
            alert("expense successfully added")
            this.loadData();
            this.resetState()
          })
          .catch(() => console.log("insert error occured"))
      })

    } else {
      //just save to database
      this.insertExpenses({
        transvalue: amount,
        category: this.state.category,
        date: this.state.date,
        note: this.state.note
      })
        .then((data) => {
          alert("expense successfully added")
          this.loadData();
          this.resetState()
        })
        .catch(() => console.log("insert error occured"))
    }






  }

  resetState = () => {
    this.setState({
      transaction: "",
      category: "",
      date: moment(),
      note: ""
    })

  }

  currConverter = async (value) => {
    //currency converter call api
    let query = await fetch("http://free.currencyconverterapi.com/api/v5/convert?q=EUR_GBP&compact=y");
    let rawdata = await query.json()
    return rawdata
  }

  getExpenses = async (value) => {
    //currency converter call api
    let query = await fetch("/api/expenses/");
    let rawdata = await query.json()
    return rawdata
  }

  insertExpenses = async (value) => {
    let query = await fetch("/api/expenses/", {
      method: "POST",
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(value)

    });
    let rawdata = await query.json()
    return rawdata
  }
  calcVAT = (value) => {
    //calculate vat function
    return (0.2 * Number(value));
  }

  groupData = (data) => {
    let sort = {}
    data.map((item, index) => {
      let date = moment(item.date).format("MMMM YYYY");
      let itemDate = moment(item.date).month();
      let itemYear = moment(item.date).year()
      let nowDiff = moment().diff(item.date, "days", true)
      console.log("day difference", nowDiff)
      let key = nowDiff < 1 ? "today" :
        nowDiff < 2 ? "yesterday" :
          (nowDiff < 7 && moment().month() === itemDate && moment().year() === itemYear) ? "earlier this week" :
            (nowDiff < 10 && moment().month() === itemDate && moment().year() === itemYear) ? "few days ago" :
              (nowDiff < 30 && moment().month() === itemDate && moment().year() === itemYear) ? "earlier this month" : date


      if (sort[key]) {
        sort[key].push(item);
      } else {
        sort[key] = [];
        sort[key].push(item);
      }
    })
    return sort;
  }

  parseData = (data) => {
    let res = [];
    for (var key in data) {
      res.push({ label: key, value: data[key] })
    }
    return res;
  }
  oncloseForm = () => {
    this.setState({ createform: false })
  }
  componentWillMount() {
    this.loadData()
  }

  loadData = () => {
    this.getExpenses().then(data => {
      let sorted = this.groupData(data)
      let parseData = this.parseData(sorted)
      this.setState({
        expense: [...parseData],
        rawData: [...data],
        pageLoad: false
      })
    })
      .catch(err => console.log("A get expense error occured!"))

  }
  render() {
    if (this.state.pageLoad) {
      return <Loading />
    }
    return (
      <div className="App">
        <Navigation />
        <div className="flex-item">
          <section>

            <Summary expense={this.state.rawData} />

          </section>
          <section >
            <div className="search-download">
              <div className="search">
                <input type="text" placeholder="search transactions" name="searchText" value={this.state.searchText} onChange={this.handleSearch} className="textboxes searchText" />
              </div>
              <div className="download">
                <button className="button">
                  <FontAwesomeIcon icon={faCloudDownloadAlt} />
                </button>
              </div>
            </div>
            {this.state.expense.map((item, index) => {
              return (
                <div>
                  <div className="group-heading"> {item.label}</div>
                  <div className="transaction-list">
                    {item.value.map((item, index) => {
                      return (

                        <div key={index + "transaction-card"} className="transaction-card">
                          <div className="item">
                            <div> {item.category}</div>

                          </div>
                          <div key={index + "item1"} className="item">
                            <div> {item.note}</div>
                            <div className="date">  {moment(item.date).format("Mo MMMM YYYY")}</div>
                          </div >
                          <div key={index + "item2"} className="item">
                            <div>€{item.transvalue} </div>
                            <div className="date">VAT: €{this.calcVAT(item.transvalue)}</div>
                          </div>
                        </div>

                      )
                    })}
                  </div>
                </div>
              )
            })}

          </section>
          <section>
            <Activity expense={this.state.rawData} />
          </section>
        </div>
        <button className="button fab" onClick={() => this.setState({ createform: true })}>
          <FontAwesomeIcon icon={faPlus} />
        </button>
        {this.state.createform && (
          <div className="overlay">
            <div className="new">
              <div>
                <label>Transaction</label>
                <input type="text" placeholder="Transaction" name="transaction" value={this.state.transaction} onChange={this.handleDataChange} className="textboxes" />
              </div>
              <div>
                <label>Date</label>
                <DatePicker
                  selected={this.state.date}
                  onChange={this.handleDateChange}
                  className="textboxes"
                />

              </div>
              <div>
                <label>Category</label>
                <input type="text" placeholder="Category" name="category" value={this.state.category} onChange={this.handleDataChange} className="textboxes" />
              </div>
              <div>
                <label>Description</label>
                <textarea placeholder="Description" name="note" onChange={this.handleDataChange} className="textboxes" value={this.state.note}></textarea>
              </div>
              <Button variant="flat" color="primary" onClick={this.handleFormSubmit}>Save Expense</Button>
              <div className="absolutely"><button onClick={this.oncloseForm}><Icon>close</Icon></button></div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default App;
