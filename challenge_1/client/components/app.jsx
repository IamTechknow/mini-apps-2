import React from 'react';
import ReactDOM from 'react-dom';

const YEAR = 0, DESCRIPTION = 1;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: YEAR,
      events: [],
    }

    this.onTypeChange = this.onTypeChange.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onSearchClicked = this.onSearchClicked.bind(this);
    this.query = '';
  }

  static getDataByDate(date) {
    return fetch(`/events?date=${date}`)
      .then(res => res.json());
  }

  static getDataByText(text) {
    return fetch(`/events?q=${text}`)
      .then(res => res.json());
  }

  onTypeChange(mode) {
    this.setState({ mode });
  }

  onInputChange(event) {
    this.query = event.target.value;
  }

  onSearchClicked() {
    const { mode } = this.state;
    let promise = mode === DESCRIPTION ?
      App.getDataByText(this.query) : App.getDataByDate(this.query);

    promise
      .then(events => {
        this.setState({
          events
        });
      });
  }

  render() {
    const { mode, events } = this.state;

    return (
      <div>
        <div id="searchUI">
          <button type="button" className="searchEle" onClick={this.onTypeChange.bind(this, YEAR)}>Year</button>
          <button type="button" className="searchEle" onClick={this.onTypeChange.bind(this, DESCRIPTION)}>Description</button>
          <input type="text" className="searchEle" placeholder={ mode ? 'Search by text...' : 'Search by year...' } onChange={this.onInputChange} />
          <button type="button" onClick={this.onSearchClicked}>Search</button>
        </div>
        <div id="eventList">
          { events.length > 0
            ? (
              <ul>
                {events.map(obj => (
                  <li className="eventItem">
                    <p>{obj.date}</p>
                    <p>{obj.description}</p>
                  </li>
                ))}
              </ul>
            ): <h3>Historical events will show up here!</h3>
          }
        </div>
      </div>
    );
  }
}
