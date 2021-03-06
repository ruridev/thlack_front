import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { HomePage, ChangeUserPage, WorkspacePage, RefreshData } from './pages';
import { connect } from 'react-redux';
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./styles/GlobalStyles";
import { lightTheme, darkTheme } from "./styles/Themes"

const App = ({ currentTheme }) => {
  return (
      <div className="App">
        <ThemeProvider theme={currentTheme === 'light' ? lightTheme : darkTheme}>
          <GlobalStyles />
          <RefreshData />
          <Router>
            <Switch>
              <Route path="/sigin" component={HomePage} exact />
              <Route path="/change_user" component={ChangeUserPage} exact />  
              <Route path="/workspaces" component={WorkspacePage} exact />
              <Route path="/workspaces/:workspaceId" component={WorkspacePage} exact />
              <Route path="/workspaces/:workspaceId/:channelId" component={WorkspacePage} exact />
              <Route path="/users/:userId" component={WorkspacePage} exact />
              <Route path="/" component={HomePage}/>
            </Switch>
          </Router>
        </ThemeProvider>
      </div>
  );
}

function mapStateToProps({ cache: { theme } }) {
  const currentTheme = theme || localStorage.getItem('theme') || 'light';
  return { currentTheme };
}

export default connect(mapStateToProps, null)(App);
