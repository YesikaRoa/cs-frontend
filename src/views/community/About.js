import { useState } from 'react'

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

  return (
    <>
      <CModal
        alignment="center"
        visible={visible}
        onClose={() => setVisible(false)}
        aria-labelledby="VerticallyCenteredExample"
      >
        <CModalHeader>
          <CModalTitle id="VerticallyCenteredExample">Misión</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CFormInput type="text" placeholder="Descripcion" />
        </CModalBody>
        <CModalFooter>
          <CButton color="primary">Guardar</CButton>
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
              <p>
                Fomentar un espacio inclusivo, colaborativo y participativo donde las personas
                puedan compartir conocimientos, apoyarse mutuamente y construir relaciones
                significativas que impulsen el crecimiento individual y colectivo.
              </p>
              <CButton color="primary" onClick={() => setVisible(!visible)}>
                Editar
              </CButton>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol md={12} className="component-space">
          <CCard>
            <CCardBody>
              <h5>Visión</h5>
              <p>
                Ser una comunidad referente por su impacto positivo, donde la diversidad de ideas,
                la cooperación y el compromiso social transformen vidas y contribuyan al desarrollo
                sostenible de la sociedad.
              </p>
              <CButton color="primary">Editar</CButton>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol md={12} className="component-space">
          <CCard>
            <CCardBody>
              <h5>¿Quiénes Somos?</h5>
              <p>
                Somos una comunidad diversa y comprometida, unida por el deseo de compartir
                conocimientos, experiencias y valores que promuevan el crecimiento personal y
                colectivo. Nos impulsa la colaboración, el respeto y la participación activa de cada
                miembro. Creemos en el poder de las conexiones humanas, en la construcción de
                espacios seguros e inclusivos, y en la transformación positiva a través del diálogo,
                el aprendizaje y la acción conjunta. Aquí, cada voz cuenta, cada idea suma y cada
                persona importa.
              </p>
              <CButton color="primary">Editar</CButton>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default MyCommunity
