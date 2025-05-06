import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser, cilEnvelopeClosed } from '@coreui/icons'

const defaultUser = {
  nombre: 'Diego Altamiranda',
  email: 'diegoaltamiranda22@gmail.com',
  contraseña: '1234',
}

const Login = () => {
  const [email, setEmail] = useState('')
  const [contraseña, setContraseña] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [emailRecuperacion, setEmailRecuperacion] = useState('')
  const navigate = useNavigate()

  const handleLogin = () => {
    if (email === defaultUser.email && contraseña === defaultUser.contraseña) {
      localStorage.setItem('userToken', 'tokenEjemplo')
      navigate('/dashboard')
    } else {
      alert('Correo o contraseña incorrecta. Intente nuevamente.')
    }
  }

  const handleRecuperarContraseña = () => {
    alert(`Se ha enviado un enlace de recuperación a: ${emailRecuperacion}`)
    setShowModal(false)
  }

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center align-items-center min-vh-100">
          <CCol md={6}>
            <CCard className="p-4">
              <CCardBody>
                <CForm>
                  <h1>Iniciar Sesión</h1>
                  <p className="text-body-secondary">Accede a tu cuenta</p>

                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </CInputGroup>

                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Contraseña"
                      autoComplete="current-password"
                      value={contraseña}
                      onChange={(e) => setContraseña(e.target.value)}
                    />
                  </CInputGroup>

                  <CRow>
                    <CCol xs={6}>
                      <CButton color="primary" className="px-4" onClick={handleLogin}>
                        Iniciar Sesión
                      </CButton>
                    </CCol>
                    <CCol xs={6} className="text-right">
                      <CButton color="link" className="px-0" onClick={() => setShowModal(true)}>
                        Recuperar Contraseña
                      </CButton>
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>

      <CModal visible={showModal} onClose={() => setShowModal(false)} alignment="center">
        <CModalHeader>Recuperar Contraseña</CModalHeader>
        <CModalBody>
        <p className="text-body-secondary">Te enviaremos un correo con tu nueva contraseña para que puedas acceder de nuevo al sistema</p>
          <CInputGroup className="mb-3">
            <CInputGroupText>
              <CIcon icon={cilEnvelopeClosed} />
            </CInputGroupText>
            <CFormInput
              placeholder="Ingrese su email"
              value={emailRecuperacion}
              onChange={(e) => setEmailRecuperacion(e.target.value)}
            />
          </CInputGroup>
        </CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={handleRecuperarContraseña}>
            Enviar
          </CButton>
          <CButton color="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  )
}

export default Login
