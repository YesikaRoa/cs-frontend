import { CButton, CCard, CCardBody, CCol, CForm, CFormInput, CFormLabel, CRow } from '@coreui/react'
import { useState, useEffect } from 'react'

const Contact = ({ initialData, handleEdit }) => {
  const [data, setData] = useState({})

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setData((prevData) => ({ ...prevData, [name]: value }))
  }

  useEffect(() => {
    setData(initialData)
  }, [initialData])
  return (
    <>
      <CRow className="mt-4">
        <CCol>
          <CCard>
            <CCardBody>
              <h5>Información de Contacto</h5>
              <CForm>
                <div className="mb-3">
                  <CFormLabel>Teléfono</CFormLabel>
                  <CFormInput
                    type="text"
                    name="PHONE_NUMBER"
                    value={data.PHONE_NUMBER}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <CFormLabel>Correo electrónico</CFormLabel>
                  <CFormInput
                    type="email"
                    name="EMAIL"
                    value={data.EMAIL}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="mb-3">
                  <CFormLabel>Dirección</CFormLabel>
                  <CFormInput
                    type="text"
                    name="LOCATION"
                    value={data.LOCATION}
                    onChange={handleInputChange}
                  />
                </div>
                <CButton color="primary" onClick={() => handleEdit(data)}>
                  Editar
                </CButton>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}
export default Contact
