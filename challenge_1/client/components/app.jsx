import React from 'react';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';

const YEAR = 0, DESCRIPTION = 1, ITEMS_PER_PAGE = 10;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: YEAR,
      events: [],
      offset: 0 // Number of items to offset, divide by items per page to get page number
    }

    this.onTypeChange = this.onTypeChange.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onSearchClicked = this.onSearchClicked.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.query = '';
  }

  static getDataByDate(date, offset, limit) {
    return fetch(`/events?date=${date}&_page=${Math.floor(offset / limit)}&_limit=${limit}`)
      .then(res => res.json());
  }

  static getDataByText(text, offset, limit) {
    return fetch(`/events?q=${text}&_page=${Math.floor(offset / limit)}&_limit=${limit}`)
      .then(res => res.json());
  }

  // Page clicked, load relevant data
  handlePageClick(data) {
    let selected = data.selected;
    let offset = Math.ceil(selected * ITEMS_PER_PAGE);

    this.setState({offset}, () => {
      let promise = mode === DESCRIPTION ?
        App.getDataByText(this.query, offset) : App.getDataByDate(this.query, offset, ITEMS_PER_PAGE);

      promise
        .then(events => {
          this.setState({
            events
          });
        });
    });
  }

  onTypeChange(mode) {
    this.setState({ mode });
  }

  onInputChange(event) {
    this.query = event.target.value;
    if(!this.query) {
      this.setState({ events: [], pageCount: 0 });
    }
  }

  onSearchClicked() {
    const { mode, offset } = this.state;

    if (this.query) {
      let promise = mode === DESCRIPTION ?
        App.getDataByText(this.query, offset, ITEMS_PER_PAGE) : App.getDataByDate(this.query, offset, ITEMS_PER_PAGE);

      promise
        .then(events => {
          this.setState({
            events
          });
        });
    }
  }

  render() {
    const { mode, events, offset } = this.state;

    return (
      <div>
        <div id="searchUI">
          <button type="button" className="searchEle" onClick={this.onTypeChange.bind(this, YEAR)}>Search By Year</button>
          <button type="button" className="searchEle" onClick={this.onTypeChange.bind(this, DESCRIPTION)}>Search By Description</button>
          <input type="text" className="searchEle" placeholder={ mode ? 'Search by text...' : 'Search by year...' } onChange={this.onInputChange} />
          <button type="button" onClick={this.onSearchClicked}>Search</button>
        </div>
        <div id="eventList">
          { events.length > 0
            ? (
              <div>
                <ul>
                  {events.map(obj => (
                    <li className="eventItem">
                      <p>{obj.date}</p>
                      <p>{obj.description}</p>
                    </li>
                  ))}
                </ul>
                <div id="react-paginate">
                  <ReactPaginate previousLabel={"previous"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={Math.floor(offset / ITEMS_PER_PAGE)}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"} />
                 </div>
              </div>
            ): <h3>Historical events will show up here!</h3>
          }
        </div>
      </div>
    );
  }
}
