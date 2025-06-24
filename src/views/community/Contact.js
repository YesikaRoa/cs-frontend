import { CButton, CCard, CCardBody, CCol, CForm, CFormInput, CFormLabel, CRow } from '@coreui/react'
import { useState, useEffect } from 'react'
import communityApi from '../../api/endpoints/communityApi'
import AlertMessage from '../../components/ui/AlertMessage'

const Contact = ({ initialData, handleEdit }) => {
  const [data, setData] = useState({})
  const [initialValues, setInitialValues] = useState({})
  const [loading, setLoading] = useState(true)
  const [alertData, setAlertData] = useState(null)
  const [saving, setSaving] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setData((prevData) => ({ ...prevData, [name]: value }))
  }

  useEffect(() => {
    setLoading(true)
    communityApi
      .getAllCommunityInfo()
      .then((res) => {
        const dataArr = res.data.data
        const newData = {}
        dataArr.forEach((item) => {
          newData[item.title] = item.value
        })
        setData(newData)
        setInitialValues(newData)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [initialData])

  const handleEditClick = async () => {
    setSaving(true)
    const changedFields = {}
    for (const key of ['PHONE_NUMBER', 'EMAIL', 'LOCATION']) {
      if (data[key] !== initialValues[key]) {
        changedFields[key] = data[key]
      }
    }
    if (Object.keys(changedFields).length === 0) {
      setAlertData({ response: { message: 'No hay cambios para guardar.' }, type: 'info' })
      setSaving(false)
      return
    }
    try {
      for (const key of Object.keys(changedFields)) {
        const response = await communityApi.updateCommunityInfo(key, {
          title: key,
          value: changedFields[key],
        })
        setAlertData({ response: response.data, type: 'success' })
        setInitialValues((prev) => ({ ...prev, [key]: changedFields[key] }))
      }
    } catch ({ response }) {
      setAlertData({
        response: { message: response?.data || 'Error al guardar la información' },
        type: 'danger',
      })
    }
    setSaving(false)
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
                      disabled={saving}
                    />
                  </div>
                  <div className="mb-3">
                    <CFormLabel>Correo electrónico</CFormLabel>
                    <CFormInput
                      type="email"
                      name="EMAIL"
                      value={data.EMAIL || ''}
                      onChange={handleInputChange}
                      disabled={saving}
                    />
                  </div>
                  <div className="mb-3">
                    <CFormLabel>Dirección</CFormLabel>
                    <CFormInput
                      type="text"
                      name="LOCATION"
                      value={data.LOCATION || ''}
                      onChange={handleInputChange}
                      disabled={saving}
                    />
                  </div>
                  <CButton color="primary" onClick={handleEditClick} disabled={saving}>
                    {saving ? 'Guardando...' : 'Editar'}
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
