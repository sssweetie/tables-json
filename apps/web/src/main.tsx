import '@elastic/eui/dist/eui_theme_light.css';

import { HashRouter, Route, Routes } from 'react-router-dom';
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { Posts } from './pages/Posts';
import { EuiProvider } from '@elastic/eui';
import { Details } from './pages/Details';
import { NotFound } from './pages/NotFound';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <EuiProvider colorMode="light">
      <HashRouter>
        <Routes>
          <Route path="/" Component={Posts} />
          <Route path="/details/:id" Component={Details} />
          <Route path="*" Component={NotFound} />
        </Routes>
      </HashRouter>
    </EuiProvider>
  </StrictMode>
);
