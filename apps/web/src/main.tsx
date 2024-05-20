import '@elastic/eui/dist/eui_theme_light.css';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { Posts } from './features/Posts';
import { Details } from './features/Details';
import { EuiProvider } from '@elastic/eui';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <Posts />,
  },
  {
    path: '/details/:id',
    element: <Details />,
  },
]);

root.render(
  <StrictMode>
    <EuiProvider colorMode="light">
      <RouterProvider router={router} />
    </EuiProvider>
  </StrictMode>
);
