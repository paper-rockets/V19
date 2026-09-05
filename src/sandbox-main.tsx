/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { StandaloneNavSandbox } from './components/Sandbox/StandaloneNavSandbox';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StandaloneNavSandbox />
  </StrictMode>
);
