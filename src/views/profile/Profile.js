import { useState, useEffect } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CButton,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CForm,
  CFormInput,
  CModalTitle,
  CContainer,
  CRow,
  CCol,
} from '@coreui/react'
import AlertMessage from '../../components/ui/AlertMessage'

import profileApi from '../../api/endpoints/profileApi'
import { getRoleNameByKey } from '../../utils/roles'
import { updateProfileSchema, changePasswordSchema } from '../../schemas/profile.schema'
import './profile.css'
import CIcon from '@coreui/icons-react'
import { cilHttps, cilPencil } from '@coreui/icons'
import defaultProfile from '../../assets/images/image-default.png'

const Profile = () => {
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [userInfo, setUserInfo] = useState({})
  const [editInfo, setEditInfo] = useState({})
  const [password, setPassword] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  })
  const [formErrors, setFormErrors] = useState({})
  const [alertData, setAlertData] = useState(null)
  const [loadingUser, setLoadingUser] = useState(true)
  const [showWarning, setShowWarning] = useState(false)
  const [showWrongPassword, setShowWrongPassword] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)

  const handleChangePassword = async () => {
    const result = changePasswordSchema.safeParse(password)
    if (!result.success) {
      const errors = {}
      result.error.errors.forEach((err) => {
        errors[err.path[0]] = err.message
      })
      setFormErrors(errors)
      return
    }
    if (password.newPassword !== password.confirmNewPassword) {
      setFormErrors({ confirmNewPassword: 'Las contraseñas no coinciden.' })
      return
    }
    setFormErrors({})
    try {
      await profileApi.changePassword({
        currentPassword: password.currentPassword,
        newPassword: password.newPassword,
      })
      setShowPasswordModal(false)
      setPassword({ currentPassword: '', newPassword: '', confirmNewPassword: '' })
      setSuccessMessage('Contraseña actualizada correctamente')
    } catch (error) {
      if (
        error?.response?.status === 401 ||
        error?.response?.data?.message?.toLowerCase().includes('actual') ||
        error?.response?.data?.message?.toLowerCase().includes('credenciales')
      ) {
        setShowWrongPassword(true)
      } else {
        setShowWarning(true)
      }
      console.error('Error cambiando contraseña:', error?.response?.data || error)
    }
  }

  const handleEditInfo = async () => {
    // Validación con zod antes de enviar los datos
    const result = updateProfileSchema.safeParse(editInfo)
    if (!result.success) {
      const errors = {}
      result.error.errors.forEach((err) => {
        errors[err.path[0]] = err.message
      })
      setFormErrors(errors)
      return
    }
    setFormErrors({})
    try {
      const formData = new FormData()
      Object.entries(editInfo).forEach(([key, value]) => {
        formData.append(key, value)
      })
      if (imageFile) {
        formData.append('image', imageFile)
      }
      const response = await profileApi.editProfile(formData)
      const { data } = await profileApi.getProfile()
      setUserInfo(data)
      localStorage.setItem('userInfo', JSON.stringify(data))
      window.dispatchEvent(new Event('userInfoUpdated'))

      setShowEditModal(false)
      setAlertData({ response: response.data, type: 'success' }) // Ahora sí funciona esto
      setImageFile(null)
      setImagePreview(null)
    } catch ({ response }) {
      setAlertData({ response: response.data, type: 'danger' })
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    setImageFile(file)
    if (file) {
      setImagePreview(URL.createObjectURL(file))
    } else {
      setImagePreview(null)
    }
  }

  useEffect(() => {
    profileApi
      .getProfile()
      .then((response) => {
        // Esto es para obtener la imagen del localstorage
        const userInfoLocal = localStorage.getItem('userInfo')
        let url_image = null
        if (userInfoLocal) {
          const parsed = JSON.parse(userInfoLocal)
          url_image = parsed.url_image
        }
        setUserInfo({
          ...response.data,
          url_image: url_image || defaultProfile,
        })
      })
      .catch(() => {
        const userInfoLocal = localStorage.getItem('userInfo')
        if (userInfoLocal) {
          setUserInfo(JSON.parse(userInfoLocal))
        }
      })
      .finally(() => setLoadingUser(false))
  }, [])

  const openEditModal = () => {
    setEditInfo({
      first_name: userInfo.first_name || '',
      last_name: userInfo.last_name || '',
      phone: userInfo.phone || '',
      email: userInfo.email || '',
    })
    setFormErrors({})
    setShowEditModal(true)
  }

  return (
    <div className="d-flex justify-content-center align-items-center flex-column">
      {successMessage && (
        <div
          className="alert alert-success text-center w-100"
          role="alert"
          style={{ maxWidth: 600 }}
        >
          {successMessage}
        </div>
      )}
      <CContainer>
        <CRow className="justify-content-center component-space">
          <CCol xs={12} md={6}>
            <CCard>
              <CCardHeader>
                <h5 className="text-center w-100">Información Personal</h5>
              </CCardHeader>
              <CCardBody>
                <div className="d-flex justify-content-center mb-4">
                  <div className="profile-image-circle">
                    <img
                      src={userInfo?.url_image || defaultProfile}
                      alt="Imagen de perfil"
                      className="profile-image-inside-circle"
                    />
                  </div>
                </div>
                <div className="text-center mb-4">
                  <div className="mb-2">
                    <strong>Nombre:</strong> {userInfo?.first_name}
                  </div>
                  <div className="mb-2">
                    <strong>Apellido:</strong> {userInfo?.last_name}
                  </div>
                  <div className="mb-2">
                    <strong>Teléfono:</strong> {userInfo?.phone || 'No disponible'}
                  </div>
                  <div className="mb-2">
                    <strong>Email:</strong> {userInfo?.email}
                  </div>
                  <div className="mb-2">
                    <strong>Comunidad:</strong> {userInfo?.community?.name}
                  </div>
                  <div className="mb-2">
                    <strong>Rol:</strong> {getRoleNameByKey(userInfo?.role?.name)}
                  </div>
                </div>
                <div className="d-flex justify-content-center gap-3">
                  <CButton color="primary" onClick={openEditModal} disabled={loadingUser}>
                    <CIcon icon={cilPencil} /> Editar Información
                  </CButton>
                  <CButton
                    color="info"
                    className="text-white"
                    onClick={() => setShowPasswordModal(true)}
                    disabled={loadingUser}
                  >
                    <CIcon icon={cilHttps} className="me-2" />
                    Cambiar Contraseña
                  </CButton>
                </div>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>

      <CModal visible={showPasswordModal} onClose={() => setShowPasswordModal(false)}>
        <CModalHeader>Cambiar Contraseña</CModalHeader>
        <CModalBody>
          <CForm>
            <CFormInput
              type="password"
              label="Contraseña Actual"
              value={password.currentPassword}
              onChange={(e) => setPassword({ ...password, currentPassword: e.target.value })}
              className="mb-3"
              invalid={!!formErrors.currentPassword}
              feedback={formErrors.currentPassword}
            />
            <CFormInput
              type="password"
              label="Nueva Contraseña"
              value={password.newPassword}
              onChange={(e) => setPassword({ ...password, newPassword: e.target.value })}
              className="mb-3"
              invalid={!!formErrors.newPassword}
              feedback={formErrors.newPassword}
            />
            <CFormInput
              type="password"
              label="Confirmar Nueva Contraseña"
              value={password.confirmNewPassword}
              onChange={(e) => setPassword({ ...password, confirmNewPassword: e.target.value })}
              className="mb-3"
              invalid={!!formErrors.confirmNewPassword}
              feedback={formErrors.confirmNewPassword}
            />
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={handleChangePassword}>
            Guardar
          </CButton>
          <CButton color="secondary" onClick={() => setShowPasswordModal(false)}>
            Cancelar
          </CButton>
        </CModalFooter>
      </CModal>

      <CModal
        visible={showEditModal}
        onClose={() => {
          setShowEditModal(false)
          setFormErrors({})
          setImageFile(null)
          setImagePreview(null)
        }}
      >
        <CModalHeader>Editar Información Personal</CModalHeader>
        <CModalBody>
          <CForm>
            <CFormInput
              label="Nombre"
              value={editInfo.first_name || ''}
              onChange={(e) => setEditInfo({ ...editInfo, first_name: e.target.value })}
              className="mb-2"
              invalid={!!formErrors.first_name}
              feedback={formErrors.first_name}
            />
            <CFormInput
              label="Apellido"
              value={editInfo.last_name || ''}
              onChange={(e) => setEditInfo({ ...editInfo, last_name: e.target.value })}
              className="mb-2"
              invalid={!!formErrors.last_name}
              feedback={formErrors.last_name}
            />
            <CFormInput
              label="Teléfono"
              value={editInfo.phone || ''}
              onChange={(e) => setEditInfo({ ...editInfo, phone: e.target.value })}
              className="mb-2"
              invalid={!!formErrors.phone}
              feedback={formErrors.phone}
            />
            <CFormInput
              label="Email"
              value={editInfo.email || ''}
              onChange={(e) => setEditInfo({ ...editInfo, email: e.target.value })}
              className="mb-2"
              invalid={!!formErrors.email}
              feedback={formErrors.email}
            />
            <CFormInput
              type="file"
              label="Imagen"
              name="url_image"
              accept="image/*"
              onChange={handleImageChange}
              className="mb-2"
            />
            {(imagePreview || userInfo?.url_image) && (
              <div className="mb-3 user-image-container">
                <img
                  src={imagePreview || userInfo.url_image}
                  alt="preview"
                  className="preview-image"
                />
              </div>
            )}
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={handleEditInfo}>
            Guardar
          </CButton>
          <CButton color="secondary" onClick={() => setShowEditModal(false)}>
            Cancelar
          </CButton>
        </CModalFooter>
      </CModal>

      <CModal
        visible={showWrongPassword}
        onClose={() => setShowWrongPassword(false)}
        backdrop="static"
        alignment="center"
        className="modal-dark-backdrop"
      >
        <CModalHeader>
          <CModalTitle>Contraseña incorrecta</CModalTitle>
        </CModalHeader>
        <CModalBody>La contraseña ingresada es incorrecta</CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={() => setShowWrongPassword(false)}>
            Aceptar
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

export default Profile
