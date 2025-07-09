import { useState } from 'react'
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
import authApi from '../../api/endpoints/authApi'
import AlertMessage from '../../components/ui/AlertMessage'
import '../../scss/login.scss'

const Login = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setContraseña] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [recoverEmail, setEmailRecuperacion] = useState('')
  const [alertData, setAlertData] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleLogin = () => {
    setLoading(true)
    localStorage.removeItem('authToken')

    authApi
      .login({ email: email.trim(), password: password.trim() })
      .then(() => {
        navigate('/dashboard')
      })
      .catch(({ response }) => {
        setAlertData({ response: response.data, type: 'danger' })
      })
      .finally(() => setLoading(false))
  }

  const handleRecoverPassword = () => {
    alert(`Se ha enviado un enlace de recuperación a: ${recoverEmail}`)
    setShowModal(false)
  }

  return (
    <div className="animated-login-container bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <div className="background-animation">
        <div className="floating-shapes">
          {[...Array(6)].map((_, i) => (
            <div key={i} className={`shape shape-${i + 1}`} />
          ))}
        </div>
        <div className="animated-waves">
          <div className="wave wave-1" />
          <div className="wave wave-2" />
          <div className="wave wave-3" />
        </div>
        <div className="particles">
          {[...Array(20)].map((_, i) => (
            <div key={i} className={`particle particle-${i + 1}`} />
          ))}
        </div>
      </div>

      <CContainer>
        <CRow className="justify-content-center align-items-center min-vh-100">
          <CCol md={6}>
            <CCard className="animated-card p-4">
              <CCardBody>
                <CForm
                  onSubmit={(e) => {
                    e.preventDefault()
                    if (!loading && email && password) {
                      handleLogin()
                    }
                  }}
                >
                  <h1 className="animated-title">Iniciar Sesión</h1>
                  <p className="animated-subtitle text-body-first">Accede a tu cuenta</p>

                  <CInputGroup className="animated-input-group mb-3">
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

                  <CInputGroup className="animated-input-group mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Contraseña"
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => setContraseña(e.target.value)}
                    />
                  </CInputGroup>

                  <CRow>
                    <CCol xs={12} sm={12} md={6}>
                      <CButton
                        type="submit"
                        className={`animated-button-primary px-4 ${loading ? 'loading-button' : ''} w-100 w-md-auto`}
                        disabled={loading || !email || !password}
                      >
                        {loading ? 'Cargando...' : 'Iniciar Sesión'}
                      </CButton>
                    </CCol>
                    <CCol xs={12} sm={12} md={6} className="text-right">
                      <CButton
                        className="animated-button-secondary px-0 float-end w-100 w-md-auto mt-2 mt-md-0"
                        onClick={() => setShowModal(true)}
                      >
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

      <CModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        alignment="center"
        className="animated-modal"
      >
        <CModalHeader>Recuperar Contraseña</CModalHeader>
        <CModalBody>
          <p className="text-body-secondary">
            Te enviaremos un correo con tu nueva contraseña para que puedas acceder de nuevo al
            sistema
          </p>
          <CInputGroup className="animated-input-group mb-3">
            <CInputGroupText>
              <CIcon icon={cilEnvelopeClosed} />
            </CInputGroupText>
            <CFormInput
              placeholder="Ingrese su email"
              value={recoverEmail}
              onChange={(e) => setEmailRecuperacion(e.target.value)}
            />
          </CInputGroup>
        </CModalBody>
        <CModalFooter>
          <CButton className="animated-button-primary" onClick={handleRecoverPassword}>
            Enviar
          </CButton>
          <CButton className="animated-button-secondary" onClick={() => setShowModal(false)}>
            Cancelar
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
    </div>
  )
}

export default Login
