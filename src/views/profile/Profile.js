import React, { useState, useEffect } from 'react'
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
} from '@coreui/react'

import profileApi from '../../api/endpoints/profileApi'


const Profile = () => {
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)

  const [userInfo, setUserInfo] = useState({ })

  const [editInfo, setEditInfo] = useState({ ...userInfo })

  const [password, setPassword] = useState({ current: '', new: '', confirm: '' })

  const handleChangePassword = () => {
    console.log('Contraseña actual:', password.current)
    console.log('Nueva contraseña:', password.new)
    console.log('Confirmar contraseña:', password.confirm)
    setPassword({ current: '', new: '', confirm: '' })
    setShowPasswordModal(false)
  }

  const handleEditInfo = () => {
    setUserInfo(editInfo)
    setShowEditModal(false)
  }

  useEffect(() => {
  profileApi.getProfile()
    .then(response => {
      console.log("Datos recibidos desde la API:", response.data) // Verifica lo que llega
      setUserInfo(response.data)
      setUserInfo({ ...response.data }); // Forzar actualización del estado
    })
    .catch(error => {
      console.error('Error obteniendo perfil:', error)
    })
}, [])




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
            <strong>Teléfono:</strong> {userInfo?.phone || "No disponible"}
          </div>
          <div className="mb-3">
            <strong>Email:</strong> {userInfo?.email}
          </div>
          <div className="mb-3">
            <strong>Dirección:</strong> {userInfo?.community?.address || "No disponible"}
          </div>
          <div className="mb-3">
            <strong>Comunidad:</strong> {userInfo?.community?.name || "No disponible"}
          </div>
          <div className="mb-3">
            <strong>Rol:</strong> {userInfo?.role?.name || "No disponible"}
          </div>
          <div className="d-flex justify-content-between">
            <CButton color="primary" onClick={() => setShowEditModal(true)}>
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
              value={editInfo?.first_name}
              onChange={(e) => setEditInfo({ ...editInfo, nombre: e.target.value })}
              className="mb-2"
            />
            <CFormInput
              label="Apellido"
              value={editInfo?.last_name}
              onChange={(e) => setEditInfo({ ...editInfo, apellido: e.target.value })}
              className="mb-2"
            />
            <CFormInput
              label="Teléfono"
              value={editInfo.phone}
              onChange={(e) => setEditInfo({ ...editInfo, telefono: e.target.value })}
              className="mb-2"
            />
            <CFormInput
              label="Email"
              value={editInfo.email}
              onChange={(e) => setEditInfo({ ...editInfo, email: e.target.value })}
              className="mb-2"
            />
            <CFormInput
              label="Dirección"
              value={editInfo.direccion}
              onChange={(e) => setEditInfo({ ...editInfo, direccion: e.target.value })}
              className="mb-2"
            />
            <CFormInput
              label="Comunidad"
              value={editInfo.comunidad}
              onChange={(e) => setEditInfo({ ...editInfo, comunidad: e.target.value })}
              className="mb-2"
            />
            <CFormInput
              label="Rol"
              value={editInfo.rol}
              onChange={(e) => setEditInfo({ ...editInfo, rol: e.target.value })}
              className="mb-2"
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
    </div>
  )
}

export default Profile
