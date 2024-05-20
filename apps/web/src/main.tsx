import '@elastic/eui/dist/eui_theme_light.css';

import { HashRouter, Route, Routes } from 'react-router-dom';
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { Posts } from './features/Posts';
import { Details } from './features/Details';
import { EuiProvider } from '@elastic/eui';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <EuiProvider colorMode="light">
      <HashRouter>
        <Routes>
          <Route path="/" Component={Posts}></Route>
          <Route path="/details/:id" Component={Details}></Route>
        </Routes>
      </HashRouter>
    </EuiProvider>
  </StrictMode>
);
