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

const profileSchema = z.object({
  first_name: z.string().min(3, 'El nombre es obligatorio y debe tener al menos 3 caracteres'),
  last_name: z.string().min(3, 'El apellido es obligatorio y debe tener al menos 3 caracteres'),
  phone: z.string().min(11, 'El teléfono es obligatorio y debe tener al menos 10 caracteres'),
  email: z.string().email('Debe ser un email válido'),
})

const Profile = () => {
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [userInfo, setUserInfo] = useState({})
  const [editInfo, setEditInfo] = useState({})
  const [password, setPassword] = useState({ current: '', new: '', confirm: '' })
  const [formErrors, setFormErrors] = useState({})
  const [alertData, setAlertData] = useState(null)

  const handleChangePassword = () => {
    setPassword({ current: '', new: '', confirm: '' })
    setShowPasswordModal(false)
  }

  const handleEditInfo = async () => {
    // Esto es para validar el zod antes de enviar los datos
    const result = profileSchema.safeParse(editInfo)
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
      setAlertData({ response: response.data, type: 'success' })
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
    <div className="d-flex justify-content-center align-items-center">
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
            <CButton color="primary" onClick={openEditModal}>
              Editar Información
            </CButton>
            <CButton color="info" className="text-white" onClick={() => setShowPasswordModal(true)}>
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
              value={password.current}
              onChange={(e) => setPassword({ ...password, current: e.target.value })}
              className="mb-3"
            />
            <CFormInput
              type="password"
              label="Nueva Contraseña"
              value={password.new}
              onChange={(e) => setPassword({ ...password, new: e.target.value })}
              className="mb-3"
            />
            <CFormInput
              type="password"
              label="Confirmar Nueva Contraseña"
              value={password.confirm}
              onChange={(e) => setPassword({ ...password, confirm: e.target.value })}
              className="mb-3"
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
