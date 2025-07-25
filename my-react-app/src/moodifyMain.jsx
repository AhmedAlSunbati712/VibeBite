import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import Moodify from './Moodify.jsx'

createRoot(document.getElementById('root')).render(
    <StrictMode>
      <Moodify />
    </StrictMode>,
  )