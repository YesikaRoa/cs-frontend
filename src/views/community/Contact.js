import { CButton, CCard, CCardBody, CCol, CForm, CFormInput, CFormLabel, CRow } from '@coreui/react'

const Contact = () => {
  return (
    <>
      <CRow className="mt-4">
        <CCol>
          <CCard>
            <CCardBody>
              <h5>Información de Contacto</h5>
              <CForm>
                <div className="mb-3">
                  <CFormLabel>Info del encargado</CFormLabel>
                  <CFormInput type="text" />
                </div>
                <div className="mb-3">
                  <CFormLabel>Teléfono</CFormLabel>
                  <CFormInput type="text" />
                </div>
                <div className="mb-3">
                  <CFormLabel>Correo</CFormLabel>
                  <CFormInput type="email" />
                </div>
                <div className="mb-3">
                  <CFormLabel>Instagram</CFormLabel>
                  <CFormInput type="text" />
                </div>
                <div className="mb-3">
                  <CFormLabel>Facebook</CFormLabel>
                  <CFormInput type="text" />
                </div>
                <CButton color="primary">Modificar</CButton>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}
export default Contact
