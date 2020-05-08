import React, { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
// redux
import { Provider } from 'react-redux';
import store, { history } from 'app/redux';
// styles
import GlobalStyle from 'app/ui/common/GlobalStyle';
import 'react-toastify/dist/ReactToastify.css';
// ui
import { ToastContainer } from 'react-toastify';

// lazy ui
const Menu = lazy(() => import('app/ui/menu/Menu'));
const Poker = lazy(() => import('app/ui/poker/Poker'));


function App() {

  return (
    <Provider store={store}>
      <GlobalStyle />
      <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar
        pauseOnHover={false}
        pauseOnFocusLoss={false}
      />
      <ConnectedRouter history={history}>
        <Suspense fallback="loading...">
          <Switch>
            <Route component={Menu} exact path="/" />
            <Route component={Poker} exact path="/poker/:room" />
          </Switch>
        </Suspense>
      </ConnectedRouter>
    </Provider>
  );
}

export default App;
