import { useState, useEffect } from 'react'
import communityApi from '../../api/endpoints/communityApi'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CFormInput,
  CRow,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from '@coreui/react'

const MyCommunity = () => {
  const [visible, setVisible] = useState(false)
  const [editSection, setEditSection] = useState(null) 
  const [info, setInfo] = useState({
    Misión: { id: null, value: '' },
    Visión: { id: null, value: '' },
    'Quiénes Somos': { id: null, value: '' },
  })
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    communityApi.getAllCommunityInfo().then(res => {
      const data = res.data
      const newInfo = { ...info }
      data.forEach(item => {
        if (newInfo[item.title] !== undefined) {
          newInfo[item.title] = { id: item.id, value: item.value }
        }
      })
      setInfo(newInfo)
    })
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
      if (info[section].id) {
        
        await communityApi.updateCommunityInfo(info[section].id, {
          title: section,
          value: inputValue,
        })
      } else {
        
        const res = await communityApi.createCommunityInfo({
          title: section,
          value: inputValue,
        })
        info[section].id = res.data.id
      }
      setInfo({
        ...info,
        [section]: { ...info[section], value: inputValue },
      })
      setVisible(false)
    } catch (err) {
      alert('Error al guardar: ' + (err.response?.data?.message || err.message))
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
          <CFormInput
            type="text"
            placeholder="Descripción"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
          />
        </CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={handleSave}>Guardar</CButton>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Cerrar
          </CButton>
        </CModalFooter>
      </CModal>
      <CRow className="justify-content-center">
        <CCol md={12} className="component-space">
          <CCard>
            <CCardBody>
              <h5>Misión</h5>
              <p>{info['Misión'].value}</p>
              <CButton color="primary" onClick={() => handleEdit('Misión')}>
                Editar
              </CButton>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol md={12} className="component-space">
          <CCard>
            <CCardBody>
              <h5>Visión</h5>
              <p>{info['Visión'].value}</p>
              <CButton color="primary" onClick={() => handleEdit('Visión')}>
                Editar
              </CButton>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol md={12} className="component-space">
          <CCard>
            <CCardBody>
              <h5>¿Quiénes Somos?</h5>
              <p>{info['Quiénes Somos'].value}</p>
              <CButton color="primary" onClick={() => handleEdit('Quiénes Somos')}>
                Editar
              </CButton>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default MyCommunity
