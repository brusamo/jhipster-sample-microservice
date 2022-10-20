import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import A from './a';
import ADetail from './a-detail';
import AUpdate from './a-update';
import ADeleteDialog from './a-delete-dialog';

const ARoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<A />} />
    <Route path="new" element={<AUpdate />} />
    <Route path=":id">
      <Route index element={<ADetail />} />
      <Route path="edit" element={<AUpdate />} />
      <Route path="delete" element={<ADeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default ARoutes;
