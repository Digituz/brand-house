import * as Auth0 from 'auth0-web';
import React, { Component } from 'react';
import {Route, withRouter} from 'react-router-dom';
import './App.css';
import * as Components from '@digituz/react-components';
import Callback from './Callback/Callback';
import LandingPage from './LandingPage/LandingPage';
import Projects from './Projects/Projects';
import Project from './Projects/Project';

class App extends Component {
  constructor(props) {
    super(props);
    Auth0.configure({
      domain: 'digituz-corp.auth0.com',
      audience: 'https://brand-house.digituz.com.br',
      clientID: '86fnC4Rb8NsAB4feVuAyS44WDRvB5KbP',
      redirectUri: `${window.location.origin}/callback`,
      responseType: 'token id_token',
      scope: 'openid profile'
    });
  }

  go(url) {
    this.props.history.push(url);
  }

  signIn = Auth0.signIn;

  signOut = () => {
    Auth0.signOut({
      returnTo: `${window.location.origin}`,
      clientID: '86fnC4Rb8NsAB4feVuAyS44WDRvB5KbP',
    })
  };

  guardedRoute(url) {
    if (Auth0.isAuthenticated()) return this.go(url);
    Components.NotificationManager.warning('Sign in first, please.');
  }

  render() {
    const divStyle = {
      display: 'grid',
      gridTemplateColumns: '45px 1fr auto',
    };

    const submenus = [{
      title: 'Menu',
      items: [
        { title: 'Overview', color: 'gray', onClick: () => { this.guardedRoute('/') } },
        { title: 'Board', color: '#e6665b', onClick: () => { this.guardedRoute('/board') } },
        { title: 'Projects', color: '#66ad66', onClick: () => { this.guardedRoute('/projects') } },
        { title: 'Teams', color: '#5e5eff', onClick: () => { this.guardedRoute('/teams') } },
        { title: 'Configuration', color: 'gray', onClick: () => { this.guardedRoute('/configuration') } }
      ]
    }];

    return (
      <Components.Panel>
        <Components.PanelHeader>
          <div style={divStyle}>
            <Components.VerticalMenu submenus={submenus} />
            <h1 onClick={() => { this.go('/') }}>BH Licensing</h1>
            <div className="horizontal-menu">
              <Components.If condition={!Auth0.isAuthenticated()}>
                <Components.Button onClick={this.signIn} text="Sign In" />
              </Components.If>
              <Components.If condition={Auth0.isAuthenticated()}>
                <Components.Button onClick={this.signOut} text="Sign Out" />
              </Components.If>
            </div>
          </div>
        </Components.PanelHeader>
        <Components.PanelBody>
          <Route exact path="/" render={() => (
            <LandingPage toggleModal={this.toggleModal}/>
          )} />
          <Route path="/callback" component={Callback} />
          <Route exact path="/projects" component={Projects} />
          <Route path="/projects/:id" component={Project} />
        </Components.PanelBody>
        <Components.NotificationContainer />
      </Components.Panel>
    );
  }
}

export default withRouter(App);
