import React, { useState } from 'react'
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

const Profile = () => {
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)

  const [userInfo, setUserInfo] = useState({
    nombre: 'Diego Altamiranda',
    telefono: '04247028764',
    email: 'diegoaltamiranda22@gmail.com',
    direccion: 'Calle 1, Lote H',
    comunidad: 'Lote H Rio Zuniga',
    rol: 'Lider de calle',
  })

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

  return (
    <div className="d-flex justify-content-center align-items-center">
      <CCard style={{ width: '60%', maxWidth: '800px' }}>
        <CCardHeader>
          <h5>Información Personal</h5>
        </CCardHeader>
        <CCardBody>
          <div className="mb-3">
            <strong>Nombre:</strong> {userInfo.nombre}
          </div>
          <div className="mb-3">
            <strong>Teléfono:</strong> {userInfo.telefono}
          </div>
          <div className="mb-3">
            <strong>Email:</strong> {userInfo.email}
          </div>
          <div className="mb-3">
            <strong>Dirección:</strong> {userInfo.direccion}
          </div>
          <div className="mb-3">
            <strong>Comunidad:</strong> {userInfo.comunidad}
          </div>
          <div className="mb-3">
            <strong>Rol:</strong> {userInfo.rol}
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
              value={editInfo.nombre}
              onChange={(e) => setEditInfo({ ...editInfo, nombre: e.target.value })}
              className="mb-2"
            />
            <CFormInput
              label="Teléfono"
              value={editInfo.telefono}
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
