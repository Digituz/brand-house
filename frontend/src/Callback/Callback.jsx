import * as Auth0 from 'auth0-web';
import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import './Callback.css';

class Callback extends Component {
  render() {
    return (
      <div className="react-callback">
        <h2>Loading Profile</h2>
        <span>.</span>
      </div>
    );
  }

  componentDidMount() {
    Auth0.handleAuthCallback((err) => {
      if (err) alert(err);
      this.props.history.push('/');
    });
  }
}

export default withRouter(Callback);
