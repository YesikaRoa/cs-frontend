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
} from '@coreui/react'
import AlertMessage from '../../components/ui/AlertMessage'

import profileApi from '../../api/endpoints/profileApi'
import { getRoleNameByKey } from '../../utils/roles'
import { z } from 'zod'

const updateProfileSchema = z.object({
  first_name: z.string()
    .min(3, 'El nombre es obligatorio y debe tener al menos 3 caracteres')
    .max(50, 'El nombre no puede exceder 50 caracteres'),
  last_name: z.string()
    .min(3, 'El apellido es obligatorio y debe tener al menos 3 caracteres')
    .max(50, 'El apellido no puede exceder 50 caracteres'),
  phone: z.string()
    .max(20, 'El teléfono no puede tener más de 15 caracteres')
    .optional(),
  email: z.string()
    .email('El correo debe ser válido'),
})

const changePasswordSchema = z.object({
  currentPassword: z.string()
    .min(6, 'La contraseña actual es obligatoria y debe tener al menos 6 caracteres'),
  newPassword: z.string()
    .min(6, 'La nueva contraseña debe tener al menos 6 caracteres'),
  confirmNewPassword: z.string()
    .min(6, 'La confirmación debe tener al menos 6 caracteres'),
})

const Profile = () => {
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [userInfo, setUserInfo] = useState({})
  const [editInfo, setEditInfo] = useState({})
  const [password, setPassword] = useState({ currentPassword: '', newPassword: '', confirmNewPassword: '' })
  const [formErrors, setFormErrors] = useState({})
  const [alertData, setAlertData] = useState(null)
  const [showSuccess, setShowSuccess] = useState(false)
  const [loadingUser, setLoadingUser] = useState(true)
  const [showWarning, setShowWarning] = useState(false)
  const [showWrongPassword, setShowWrongPassword] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

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
      setShowSuccess(true)
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
      const payload = {
        first_name: editInfo.first_name,
        last_name: editInfo.last_name,
        email: editInfo.email,
        phone: editInfo.phone,
      }
      const response = await profileApi.editProfile(payload)
      setUserInfo((prev) => ({
        ...prev,
        first_name: editInfo.first_name,
        last_name: editInfo.last_name,
        email: editInfo.email,
        phone: editInfo.phone,
      }))
      setShowEditModal(false)
      setSuccessMessage('Perfil editado correctamente')
      setShowSuccess(true)
    } catch ({ response }) {
      setAlertData({ response: response.data, type: 'danger' })
    }
  }

  useEffect(() => {
    profileApi
      .getProfile()
      .then((response) => {
        setUserInfo(response.data)
      })
      .catch(({ response }) => {
        setAlertData({ response: response.data, type: 'danger' })
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
        <div className="alert alert-success text-center w-100" role="alert" style={{ maxWidth: 600 }}>
          {successMessage}
        </div>
      )}
      <CCard style={{ width: '60%', maxWidth: '800px' }}>
        <CCardHeader>
          <h5>Información Personal</h5>
        </CCardHeader>
        <CCardBody>
          <div className="mb-3">
            <strong>Nombre:</strong> {userInfo?.first_name}
          </div>
          <div className="mb-3">
            <strong>Apellido:</strong> {userInfo?.last_name}
          </div>
          <div className="mb-3">
            <strong>Teléfono:</strong> {userInfo?.phone || 'No disponible'}
          </div>
          <div className="mb-3">
            <strong>Email:</strong> {userInfo?.email}
          </div>
          <div className="mb-3">
            <strong>Dirección:</strong> {userInfo?.community?.address || 'No disponible'}
          </div>
          <div className="mb-3">
            <strong>Comunidad:</strong> {userInfo?.community?.name}
          </div>
          <div className="mb-3">
            <strong>Rol:</strong> {getRoleNameByKey(userInfo?.role?.name)}
          </div>
          <div className="d-flex justify-content-between">
            <CButton
              color="primary"
              onClick={openEditModal}
              disabled={loadingUser}
            >
              Editar Información
            </CButton>
            <CButton
              color="info"
              className="text-white"
              onClick={() => setShowPasswordModal(true)}
              disabled={loadingUser}
            >
              Cambiar Contraseña
            </CButton>
          </div>
        </CCardBody>
      </CCard>

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

      <CModal visible={showEditModal} onClose={() => setShowEditModal(false)}>
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
        <CModalBody>
          La contraseña ingresada es incorrecta
        </CModalBody>
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