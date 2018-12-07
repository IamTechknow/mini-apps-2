import React from 'react';
import ReactDOM from 'react-dom';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      
    };
  }

  render() {
    const { name } = this.state;

    if(!name) {
      return (
        <div>
          <label htmlFor="name">
            Enter your name:
            <input type="text" id="name" onChange={ (event) => { this.name = event.target.value; } } />
          </label>
          <button type="button" onClick={ () => { this.setState({ name: this.name }); } }>Play!</button>
        </div>
      );
    }

    return (
      <div>
        
      </div>
    );
  }
}
