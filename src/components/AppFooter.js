import React from 'react'
import { CFooter, CLink } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter className="px-4">
      <div>
        <span className="ms-1">&copy; Administración Los Libertadores 2025</span>
      </div>
      <div className="ms-auto">
        <CLink href="https://cs-websitee.netlify.app/" target="_blank" rel="noopener noreferrer">
          Accede al sitio web
        </CLink>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
