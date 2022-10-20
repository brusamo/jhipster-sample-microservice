import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import { ReducersMapObject, combineReducers } from '@reduxjs/toolkit';

import getStore from 'app/config/store';

import entitiesReducers from './reducers';

import D from './d';
import A from './a';
import C from './c';
import B from './b';
/* jhipster-needle-add-route-import - JHipster will add routes here */

export default () => {
  const store = getStore();
  store.injectReducer('myapp', combineReducers(entitiesReducers as ReducersMapObject));
  return (
    <div>
      <ErrorBoundaryRoutes>
        {/* prettier-ignore */}
        <Route path="d/*" element={<D />} />
        <Route path="a/*" element={<A />} />
        <Route path="c/*" element={<C />} />
        <Route path="b/*" element={<B />} />
        {/* jhipster-needle-add-route-path - JHipster will add routes here */}
      </ErrorBoundaryRoutes>
    </div>
  );
};
