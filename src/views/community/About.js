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
import { aboutSectionSchema } from '../../schemas/about.schema'

const About = () => {
  const [visible, setVisible] = useState(false)
  const [editSection, setEditSection] = useState(null)
  const [info, setInfo] = useState({
    mission: { id: null, value: '' },
    vision: { id: null, value: '' },
    about: { id: null, value: '' },
  })
  const [inputValue, setInputValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [alertData, setAlertData] = useState(null)
  const [formError, setFormError] = useState('')

  useEffect(() => {
    setLoading(true)
    communityApi
      .getAllCommunityInfo()
      .then((res) => {
        const data = res.data.data
        const newInfo = { ...info }
        data.forEach((item) => {
          if (item.title === 'MISSION') newInfo['mission'] = { id: item.id, value: item.value }
          if (item.title === 'VISION') newInfo['vision'] = { id: item.id, value: item.value }
          if (item.title === 'ABOUT') newInfo['about'] = { id: item.id, value: item.value }
        })
        setInfo(newInfo)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const handleEdit = (section) => {
    setVisible(true)
    setEditSection(section)
    setInputValue(info[section]?.value || '')
    setFormError('')
  }

  const handleSave = async () => {
    setFormError('')
    try {
      aboutSectionSchema.parse({ value: inputValue })
    } catch (err) {
      if (err.errors && err.errors[0]) {
        setFormError(err.errors[0].message)
        return
      }
    }
    try {
      const section = editSection
      if (!section) return
      const title = section === 'mission' ? 'MISSION' : section === 'vision' ? 'VISION' : 'ABOUT'
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
    } catch ({ response }) {
      setAlertData({
        response: { message: response?.data || 'Error al guardar la información' },
        type: 'danger',
      })
    }
  }

  const handleName = () => {
    const sectionNames = {
      mission: 'Misión',
      vision: 'Visión',
      about: '¿Quiénes Somos?',
    }

    return sectionNames[editSection] || ''
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
          <CModalTitle id="VerticallyCenteredExample">{handleName()}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CFormTextarea
            type="text"
            placeholder="Descripción"
            value={inputValue}
            rows={5}
            onChange={(e) => setInputValue(e.target.value)}
            invalid={!!formError}
          />
          {formError && <div className="text-danger small mt-2">{formError}</div>}
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
                  <p>{info['mission'].value}</p>
                  <CButton color="primary" onClick={() => handleEdit('mission')}>
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
                  <p>{info['vision'].value}</p>
                  <CButton color="primary" onClick={() => handleEdit('vision')}>
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
                  <p>{info['about'].value}</p>
                  <CButton color="primary" onClick={() => handleEdit('about')}>
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

export default About
