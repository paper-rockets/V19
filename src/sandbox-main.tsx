/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { CurrentGizmoSandbox } from './components/Sandbox/CurrentGizmoSandbox';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CurrentGizmoSandbox />
  </StrictMode>
);
