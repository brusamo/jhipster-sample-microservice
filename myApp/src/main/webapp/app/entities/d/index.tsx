import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import D from './d';
import DDetail from './d-detail';
import DUpdate from './d-update';
import DDeleteDialog from './d-delete-dialog';

const DRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<D />} />
    <Route path="new" element={<DUpdate />} />
    <Route path=":id">
      <Route index element={<DDetail />} />
      <Route path="edit" element={<DUpdate />} />
      <Route path="delete" element={<DDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default DRoutes;
