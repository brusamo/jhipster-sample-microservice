import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import C from './c';
import CDetail from './c-detail';
import CUpdate from './c-update';
import CDeleteDialog from './c-delete-dialog';

const CRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<C />} />
    <Route path="new" element={<CUpdate />} />
    <Route path=":id">
      <Route index element={<CDetail />} />
      <Route path="edit" element={<CUpdate />} />
      <Route path="delete" element={<CDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default CRoutes;
