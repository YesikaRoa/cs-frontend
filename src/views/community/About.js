import { useState, useEffect } from 'react'
import communityApi from '../../api/endpoints/communityApi'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CFormTextarea,
  CRow,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from '@coreui/react'
import AlertMessage from '../../components/ui/AlertMessage'

const MyCommunity = () => {
  const [visible, setVisible] = useState(false)
  const [editSection, setEditSection] = useState(null)
  const [info, setInfo] = useState({
    Misión: { id: null, value: '' },
    Visión: { id: null, value: '' },
    'Quiénes Somos': { id: null, value: '' },
  })
  const [inputValue, setInputValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [alertData, setAlertData] = useState(null)

  useEffect(() => {
    setLoading(true)
    communityApi
      .getAllCommunityInfo()
      .then((res) => {
        const data = res.data.data
        const newInfo = { ...info }
        data.forEach((item) => {
          if (item.title === 'MISSION') newInfo['Misión'] = { id: item.id, value: item.value }
          if (item.title === 'VISION') newInfo['Visión'] = { id: item.id, value: item.value }
          if (item.title === 'ABOUT') newInfo['Quiénes Somos'] = { id: item.id, value: item.value }
        })
        setInfo(newInfo)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const handleEdit = (section) => {
    setEditSection(section)
    setInputValue(info[section]?.value || '')
    setVisible(true)
  }

  const handleSave = async () => {
    try {
      const section = editSection
      if (!section) return
      const title = section === 'Misión' ? 'MISSION' : section === 'Visión' ? 'VISION' : 'ABOUT'
      const response = await communityApi.updateCommunityInfo(title, {
        title,
        value: inputValue,
      })
      setInfo({
        ...info,
        [section]: { ...info[section], value: inputValue },
      })
      setVisible(false)
      setAlertData({ response: response.data, type: 'success' })
    } catch (err) {
      let msg = err.response?.data?.message || err.message
      if (Array.isArray(msg)) {
        msg = msg.join(' ')
      }
      setAlertData({ response: { message: msg }, type: 'danger' })
    }
  }

  return (
    <>
      <CModal
        alignment="center"
        visible={visible}
        onClose={() => setVisible(false)}
        aria-labelledby="VerticallyCenteredExample"
      >
        <CModalHeader>
          <CModalTitle id="VerticallyCenteredExample">{editSection}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CFormTextarea
            type="text"
            placeholder="Descripción"
            value={inputValue}
            rows={5}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={handleSave}>
            Guardar
          </CButton>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Cerrar
          </CButton>
        </CModalFooter>
      </CModal>
      {alertData && (
        <AlertMessage
          response={alertData.response}
          type={alertData.type}
          onClose={() => setAlertData(null)}
        />
      )}
      <CRow className="justify-content-center">
        <CCol md={12} className="component-space">
          <CCard>
            <CCardBody>
              <h5>Misión</h5>
              {loading ? (
                <p>Cargando contenido...</p>
              ) : (
                <>
                  <p>{info['Misión'].value}</p>
                  <CButton color="primary" onClick={() => handleEdit('Misión')}>
                    Editar
                  </CButton>
                </>
              )}
            </CCardBody>
          </CCard>
        </CCol>
        <CCol md={12} className="component-space">
          <CCard>
            <CCardBody>
              <h5>Visión</h5>
              {loading ? (
                <p>Cargando contenido...</p>
              ) : (
                <>
                  <p>{info['Visión'].value}</p>
                  <CButton color="primary" onClick={() => handleEdit('Visión')}>
                    Editar
                  </CButton>
                </>
              )}
            </CCardBody>
          </CCard>
        </CCol>
        <CCol md={12} className="component-space">
          <CCard>
            <CCardBody>
              <h5>¿Quiénes Somos?</h5>
              {loading ? (
                <p>Cargando contenido...</p>
              ) : (
                <>
                  <p>{info['Quiénes Somos'].value}</p>
                  <CButton color="primary" onClick={() => handleEdit('Quiénes Somos')}>
                    Editar
                  </CButton>
                </>
              )}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default MyCommunity
