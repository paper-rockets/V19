/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrushGallerySandbox } from './components/Sandbox/BrushGallerySandbox';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrushGallerySandbox />
  </StrictMode>
);
