import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import B from './b';
import BDetail from './b-detail';
import BUpdate from './b-update';
import BDeleteDialog from './b-delete-dialog';

const BRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<B />} />
    <Route path="new" element={<BUpdate />} />
    <Route path=":id">
      <Route index element={<BDetail />} />
      <Route path="edit" element={<BUpdate />} />
      <Route path="delete" element={<BDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default BRoutes;
