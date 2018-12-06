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
  }

  static getDataByYear(year) {
    return fetch(`/events?year=${year}`)
      .then(res => res.json())
      .then(result => {

      });
  }

  onTypeChange(type) {
    this.setState({ type });
  }

  onInputChange(event) {

  }

  render() {
    const { mode, events } = this.state;

    return (
      <div>
        <div id="searchUI">
          <button type="button" className="searchEle" onClick={this.onTypeChange.bind(this, YEAR)}>Year</button>
          <button type="button" className="searchEle" onClick={this.onTypeChange.bind(this, DESCRIPTION)}>Description</button>
          <input type="text" placeholder={ mode ? 'Search by text...' : 'Search by year...' } onChange={this.onInputChange} />
        </div>
        <div id="eventList">
          { events.length > 0
            ? (
              <ul>
                events.map(obj => (
                  <li>
                    <p>{obj.date}</p>
                    <p>{obj.description}</p>
                  </li>
                )
              </ul>
            ): <h3>Historical events will show up here!</h3>  
          }
        </div>
      </div>
    );
  }
}
