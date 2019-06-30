import * as React from 'react';
import { render } from 'react-dom';
import { Router, Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Raven from 'raven-js';
import AppWrapper from './components/AppWrapper/AppWrapper';
import QrIndex from './components/QrIndex/QrIndex';
import { history as newHistory } from './helpers/history';

Raven.config(process.env.SENTRY_DSN as string, {
  environment: process.env.NODE_ENV,
  autoBreadcrumbs: {
    xhr: true,
    console: true,
    dom: true,
    location: true,
    sentry: true,
  },
  ignoreErrors: [
    'top.GLOBALS',
    /Failed to update a ServiceWorker/i,
  ],
  ignoreUrls: [
    /extensions\//i,
    /^chrome:\/\//i,
  ],
  captureUnhandledRejections: true,
  debug: (process.env.NODE_ENV !== 'prod'),
}).install();

const renderRoutes = () => {
  render(
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Router history={newHistory}>
        <AppWrapper>
          <Switch>
            <Route component={QrIndex} />
          </Switch>
        </AppWrapper>
      </Router>
    </BrowserRouter>,
    document.getElementById('root') as HTMLElement,
  );
};

renderRoutes();

// webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept('/', () => undefined);
}
