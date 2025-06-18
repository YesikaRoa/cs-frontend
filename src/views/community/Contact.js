import { CButton, CCard, CCardBody, CCol, CForm, CFormInput, CFormLabel, CRow } from '@coreui/react'
import { useState, useEffect } from 'react'
import communityApi from '../../api/endpoints/communityApi'
import AlertMessage from '../../components/ui/AlertMessage'

const Contact = ({ initialData, handleEdit }) => {
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(true)
  const [errorModal, setErrorModal] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [alertData, setAlertData] = useState(null)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setData((prevData) => ({ ...prevData, [name]: value }))
  }

  useEffect(() => {
    setLoading(true)
    communityApi.getAllCommunityInfo().then(res => {
      const data = res.data.data
      const newData = {}
      data.forEach(item => {
        newData[item.title] = item.value
      })
      setData(newData)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [initialData])

  const handleEditClick = async (updatedData) => {
    setLoading(true)
    try {
      for (const key of ['PHONE_NUMBER', 'EMAIL', 'LOCATION']) {
        if (updatedData[key] !== undefined) {
          const response = await communityApi.updateCommunityInfo(key, {
            title: key,
            value: updatedData[key],
          })
          setAlertData({ response: response.data, type: 'success' })
        }
      }
    } catch (err) {
      let msg = err.response?.data?.message || err.message
      if (Array.isArray(msg)) {
        msg = msg.join(' ')
      }
      setAlertData({ response: { message: msg }, type: 'danger' })
    }
    setLoading(false)
  }

  return (
    <>
      <CRow className="mt-4">
        <CCol>
          <CCard>
            <CCardBody>
              <h5>Información de Contacto</h5>
              {loading ? (
                <div style={{ textAlign: 'center', padding: '2rem' }}>Cargando contenido...</div>
              ) : (
                <CForm>
                  <div className="mb-3">
                    <CFormLabel>Teléfono</CFormLabel>
                    <CFormInput
                      type="text"
                      name="PHONE_NUMBER"
                      value={data.PHONE_NUMBER || ''}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <CFormLabel>Correo electrónico</CFormLabel>
                    <CFormInput
                      type="email"
                      name="EMAIL"
                      value={data.EMAIL || ''}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <CFormLabel>Dirección</CFormLabel>
                    <CFormInput
                      type="text"
                      name="LOCATION"
                      value={data.LOCATION || ''}
                      onChange={handleInputChange}
                    />
                  </div>
                  <CButton color="primary" onClick={() => handleEditClick(data)}>
                    Editar
                  </CButton>
                </CForm>
              )}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      {alertData && (
        <AlertMessage
          response={alertData.response}
          type={alertData.type}
          onClose={() => setAlertData(null)}
        />
      )}
    </>
  )
}
export default Contact
