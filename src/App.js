import React, { useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { HomePage, ChangeUser, NewWorkspace, NewChannel, Workspace, RefreshData } from './pages';
import { setCurrentUser, setCurrentAccount, setCableApp } from './action/cache';
import { connect } from 'react-redux';
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./styles/GlobalStyles";
import { lightTheme, darkTheme } from "./styles/Themes"

const App = ({ theme, cableApp, setCableAppHandler }) => {
  useEffect(() => {  
    setCableAppHandler(cableApp);
  }, []);

  return (
      <div className="App">
        <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
          <GlobalStyles />
          <Router>
            <Switch>
              <Route path="/" component={RefreshData} exact />
              <Route path="/sigin" component={RefreshData} exact />
              <Route path="/workspaces" component={RefreshData} exact />
              <Route path="/workspaces/new" component={RefreshData} exact />
              <Route path="/workspaces/:workspaceId" component={RefreshData} exact />
              <Route path="/workspaces/:workspaceId/new" component={RefreshData} exact />
              <Route path="/workspaces/:workspaceId/:channelId" component={RefreshData} exact />
              <Route path="/change_user" component={RefreshData} exact />  
            </Switch>
            <Switch>
              <Route path="/" component={HomePage} exact />
              <Route path="/sigin" component={HomePage} exact />
              <Route path="/workspaces" component={Workspace} exact />
              <Route path="/workspaces/new" component={NewWorkspace} exact />
              <Route path="/workspaces/:workspaceId" component={Workspace} exact />
              <Route path="/workspaces/:workspaceId/new" component={NewChannel} exact />
              <Route path="/workspaces/:workspaceId/:channelId" component={Workspace} exact />
              <Route path="/change_user" component={ChangeUser} exact />  
            </Switch>
          </Router>
        </ThemeProvider>
      </div>
  );
}


function mapStateToProps({ cache }) {
  const theme = cache.theme || localStorage.getItem('theme') || 'dark';
  return { theme };
}

function dispatchToProps(dispatch) {
  return {
    setCurrentUserHandler: (user) => {
      dispatch(setCurrentUser(user));
    },
    setCurrentAccountHandler: (account) => {
      dispatch(setCurrentAccount(account));
    },
    setCableAppHandler: (cableApp) => {
      dispatch(setCableApp(cableApp));
    }
  }
}

export default connect(mapStateToProps, dispatchToProps)(App);
