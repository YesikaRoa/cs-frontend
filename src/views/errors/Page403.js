import { useNavigate } from 'react-router-dom'
import { CButton, CCol, CContainer, CRow } from '@coreui/react'

const Page404 = () => {
  const navigate = useNavigate()

  const handleLoginRedirect = () => {
    localStorage.removeItem('authToken')
    navigate('/login')
  }

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={6}>
            <div className="clearfix">
              <h1 className="float-start display-3 me-4">403</h1>
              <h4 className="pt-3">Oops! Estas perdido.</h4>
              <p className="text-body-secondary float-start">
                La pagina que estas intentando acceder no existe o no tienes permisos para acceder.
              </p>
            </div>
            <CButton color="primary" type="button" onClick={handleLoginRedirect}>
              Ir al login
            </CButton>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Page404
