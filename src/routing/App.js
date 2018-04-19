import { Route, Redirect, Router, Switch } from 'react-router';
import * as R from './routes';
import RouteError from './RouteError';
import history from './history';

import { ContextProvider } from '../context';

import Home from '../features/Home';
import Praise from '../features/Praise';

export default function App() {
  return (
    <ContextProvider>
       <Router history={history}>
         <Switch>
           <Route exact path={R.HOME} render={() => <Home />} />
           <Route exact path={R.PRAISE} render={() => <Praise />} />
           <Route render={() => <RouteError errorCode={404} />} />
         </Switch>
       </Router>
    </ContextProvider>
  );
}


