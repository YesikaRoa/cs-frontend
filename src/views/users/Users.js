import { useState, useEffect } from 'react'
import userApi from '../../api/endpoints/userApi'
import {
  CCard,
  CCardBody,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CForm,
  CFormInput,
  CFormSelect,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilTrash, cilInfo, cilUserPlus } from '@coreui/icons'
import { z } from 'zod'
import AlertMessage from '../../components/ui/AlertMessage'

const Users = () => {
  const [users, setUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)
  const [viewModal, setViewModal] = useState(false)
  const [addModal, setAddModal] = useState(false)
  const [editModal, setEditModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [userToDelete, setUserToDelete] = useState(null)
  const [userToEdit, setUserToEdit] = useState(null)
  const [alertData, setAlertData] = useState(null)

  const comunidades = [
    { id: 1, name: 'Rafael Urdaneta' },
    { id: 2, name: 'Libertador Cineral' },
    { id: 3, name: 'Lote H Rio Zuniga' },
    { id: 4, name: 'Libertador' },
    { id: 5, name: 'Lote G Pirineos I' },
  ]

  const roles = [
    { id: 1, name: 'Admin' },
    { id: 2, name: 'Jefe de comunidad' },
    { id: 3, name: 'Lider de calle' },
  ]

  const userSchema = z.object({
    first_name: z.string().min(3, 'El nombre es obligatorio y debe tener al menos 3 caracteres'),
    last_name: z.string().min(3, 'El apellido es obligatorio y debe tener al menos 3 caracteres'),
    phone: z.string().min(10, 'El teléfono es obligatorio y debe tener al menos 10 caracteres'),
    email: z.string().email('Debe ser un correo electrónico válido'),
    password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres').optional(),
    community_id: z.string().min(1, 'Debe seleccionar una comunidad'),
    rol_id: z.string().min(1, 'Debe seleccionar un rol'),
  })

  const [newUser, setNewUser] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    email: '',
    password: '',
    community_id: '',
    rol_id: '',
    is_active: true,
  })

  const [formErrors, setFormErrors] = useState({})

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewUser({ ...newUser, [name]: value })
  }

  const handleAddUser = async () => {
    // Esto es para validar con zod
    const result = userSchema.safeParse(newUser)
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
        ...newUser,
        community_id: Number(newUser.community_id),
        rol_id: Number(newUser.rol_id),
        is_active: true,
      }
      const response = await userApi.createUser(payload)

      setNewUser({
        first_name: '',
        last_name: '',
        phone: '',
        email: '',
        password: '',
        community_id: '',
        rol_id: '',
        is_active: true,
      })
      setAddModal(false)
      fetchData()
      setAlertData({ response: response.data, type: 'success' })
    } catch ({ response }) {
      setAlertData({ response: response.data, type: 'danger' })
    }
  }

  const handleDelete = (id) => {
    const user = users.find((u) => u.id === id)
    setUserToDelete(user)
    setDeleteModal(true)
  }

  const confirmDelete = async () => {
    if (!userToDelete) return
    try {
      const response = await userApi.deleteUser(userToDelete.id)
      setUsers(users.filter((user) => user.id !== userToDelete.id))
      setDeleteModal(false)
      setUserToDelete(null)
      setAlertData({ response: response.data, type: 'success' })
    } catch ({ response }) {
      setAlertData({ response: response.data, type: 'danger' })
    }
  }

  const handleView = (user) => {
    setSelectedUser(user)
    setViewModal(true)
  }

  const handleEdit = (user) => {
    setUserToEdit(user)
    setEditModal(true)
  }

  const handleSaveEdit = async () => {
    // Validar con zod (sin password)
    console.log(userToEdit)
    const result = userSchema.omit({ password: true }).safeParse(userToEdit)
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
        first_name: userToEdit.first_name,
        last_name: userToEdit.last_name,
        phone: userToEdit.phone,
        email: userToEdit.email,
        community_id: Number(userToEdit.community_id),
        rol_id: Number(userToEdit.rol_id),
        is_active: userToEdit.is_active ?? true,
      }
      await userApi.updateUser(userToEdit.id, payload)
      setUsers(users.map((u) => (u.id === userToEdit.id ? { ...u, ...payload } : u)))
      setEditModal(false)
      setUserToEdit(null)
      setAlertData({ type: 'success', message: 'Perfil editado correctamente' })
    } catch ({ response }) {
      setAlertData({ response: response.data, type: 'danger' })
    }
  }

  const fetchData = async () => {
    userApi
      .getUsers()
      .then((res) => setUsers(res.data.data))
      .catch(({ response }) => setAlertData({ response: response.data, type: 'danger' }))
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="p-3">
      <div className="d-flex justify-content-end mb-3">
        <CButton color="primary" onClick={() => setAddModal(true)}>
          <CIcon icon={cilUserPlus} /> Crear Usuario
        </CButton>
      </div>
      <CCard>
        <CCardBody>
          <CTable striped hover responsive>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>Nombre</CTableHeaderCell>
                <CTableHeaderCell>Apellido</CTableHeaderCell>
                <CTableHeaderCell>Teléfono</CTableHeaderCell>
                <CTableHeaderCell>Correo Electrónico</CTableHeaderCell>
                <CTableHeaderCell>Comunidad</CTableHeaderCell>
                <CTableHeaderCell>Rol</CTableHeaderCell>
                <CTableHeaderCell>Acciones</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {users.map((user) => (
                <CTableRow key={user.id}>
                  <CTableDataCell>{user.first_name}</CTableDataCell>
                  <CTableDataCell>{user.last_name}</CTableDataCell>
                  <CTableDataCell>{user?.phone || 'No disponible'} </CTableDataCell>
                  <CTableDataCell>{user.email}</CTableDataCell>
                  <CTableDataCell>
                    {comunidades.find((c) => c.id === (user.community_id || user.community?.id))
                      ?.name ||
                      user.community?.name ||
                      'No disponible'}
                  </CTableDataCell>
                  <CTableDataCell>
                    {roles.find((r) => r.id === (user.rol_id || user.role?.id))?.name ||
                      user.role?.name ||
                      'No disponible'}
                  </CTableDataCell>
                  <CTableDataCell>
                    <div className="d-flex">
                      <CButton
                        color="primary"
                        size="sm"
                        className="me-2"
                        onClick={() => handleEdit(user)}
                      >
                        <CIcon icon={cilPencil} className="text-white" />
                      </CButton>
                      <CButton
                        color="danger"
                        size="sm"
                        className="me-2"
                        onClick={() => handleDelete(user.id)}
                      >
                        <CIcon icon={cilTrash} className="text-white" />
                      </CButton>
                      <CButton color="info" size="sm" onClick={() => handleView(user)}>
                        <CIcon icon={cilInfo} className="text-white" />
                      </CButton>
                    </div>
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>

      <CModal visible={viewModal} onClose={() => setViewModal(false)}>
        <CModalHeader onClose={() => setViewModal(false)}>
          <CModalTitle>Detalles del Usuario</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {selectedUser && (
            <ul>
              <li>
                <strong>Nombre:</strong> {selectedUser.first_name}
              </li>
              <li>
                <strong>Apellido:</strong> {selectedUser.last_name}
              </li>
              <li>
                <strong>Teléfono:</strong> {selectedUser.phone || 'No disponible'}
              </li>
              <li>
                <strong>Correo Electrónico:</strong> {selectedUser.email}
              </li>
              <li>
                <strong>Comunidad:</strong>{' '}
                {comunidades.find(
                  (c) => c.id === (selectedUser.community_id || selectedUser.community?.id),
                )?.name ||
                  selectedUser.community?.name ||
                  'No disponible'}
              </li>
              <li>
                <strong>Rol:</strong>{' '}
                {roles.find((r) => r.id === (selectedUser.rol_id || selectedUser.role?.id))?.name ||
                  selectedUser.role?.name ||
                  'No disponible'}
              </li>
            </ul>
          )}
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setViewModal(false)}>
            Cerrar
          </CButton>
        </CModalFooter>
      </CModal>

      <CModal visible={addModal} onClose={() => setAddModal(false)}>
        <CModalHeader onClose={() => setAddModal(false)}>
          <CModalTitle>Añadir nuevo usuario</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <CFormInput
              label="Nombre"
              name="first_name"
              value={newUser.first_name}
              onChange={handleInputChange}
              className="mb-2"
              invalid={!!formErrors.first_name}
              feedback={formErrors.first_name}
            />
            <CFormInput
              label="Apellido"
              name="last_name"
              value={newUser.last_name}
              onChange={handleInputChange}
              className="mb-2"
              invalid={!!formErrors.last_name}
              feedback={formErrors.last_name}
            />
            <CFormInput
              label="Teléfono"
              name="phone"
              value={newUser.phone}
              onChange={handleInputChange}
              className="mb-2"
              invalid={!!formErrors.phone}
              feedback={formErrors.phone}
            />
            <CFormInput
              label="Correo Electrónico"
              name="email"
              value={newUser.email}
              onChange={handleInputChange}
              className="mb-2"
              invalid={!!formErrors.email}
              feedback={formErrors.email}
            />
            <CFormInput
              label="Contraseña"
              name="password"
              type="password"
              value={newUser.password}
              onChange={handleInputChange}
              className="mb-2"
              invalid={!!formErrors.password}
              feedback={formErrors.password}
            />
            <CFormSelect
              label="Comunidad"
              name="community_id"
              value={newUser.community_id}
              onChange={handleInputChange}
              className="mb-2"
              invalid={!!formErrors.community_id}
              feedback={formErrors.community_id}
            >
              <option value="">Seleccione una comunidad</option>
              {comunidades.map((comunidad) => (
                <option key={comunidad.id} value={comunidad.id}>
                  {comunidad.name}
                </option>
              ))}
            </CFormSelect>
            <CFormSelect
              label="Rol"
              name="rol_id"
              value={newUser.rol_id}
              onChange={handleInputChange}
              className="mb-2"
              invalid={!!formErrors.rol_id}
              feedback={formErrors.rol_id}
            >
              <option value="">Indique el rol que va a desempeñar</option>
              {roles.map((rol) => (
                <option key={rol.id} value={rol.id}>
                  {rol.name}
                </option>
              ))}
            </CFormSelect>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={handleAddUser}>
            Guardar
          </CButton>
          <CButton color="secondary" onClick={() => setAddModal(false)}>
            Cancelar
          </CButton>
        </CModalFooter>
      </CModal>

      <CModal visible={editModal} onClose={() => setEditModal(false)}>
        <CModalHeader onClose={() => setEditModal(false)}>
          <CModalTitle>Editar usuario</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {userToEdit && (
            <CForm>
              <CFormInput
                label="Nombre"
                value={userToEdit.first_name}
                onChange={(e) => setUserToEdit({ ...userToEdit, first_name: e.target.value })}
                className="mb-2"
                invalid={!!formErrors.first_name}
                feedback={formErrors.first_name}
              />
              <CFormInput
                label="Apellido"
                value={userToEdit.last_name}
                onChange={(e) => setUserToEdit({ ...userToEdit, last_name: e.target.value })}
                className="mb-2"
                invalid={!!formErrors.last_name}
                feedback={formErrors.last_name}
              />
              <CFormInput
                label="Teléfono"
                value={userToEdit.phone}
                onChange={(e) => setUserToEdit({ ...userToEdit, phone: e.target.value })}
                className="mb-2"
                invalid={!!formErrors.phone}
                feedback={formErrors.phone}
              />
              <CFormInput
                label="Correo Electrónico"
                value={userToEdit.email}
                onChange={(e) => setUserToEdit({ ...userToEdit, email: e.target.value })}
                className="mb-2"
                invalid={!!formErrors.email}
                feedback={formErrors.email}
              />
              <CFormSelect
                label="Comunidad"
                value={userToEdit.community_id || ''}
                onChange={(e) =>
                  setUserToEdit({ ...userToEdit, community_id: Number(e.target.value) })
                }
                className="mb-2"
                invalid={!!formErrors.community_id}
                feedback={formErrors.community_id}
              >
                <option value="">Seleccione una comunidad</option>
                {comunidades.map((comunidad) => (
                  <option key={comunidad.id} value={comunidad.id}>
                    {comunidad.name}
                  </option>
                ))}
              </CFormSelect>
              <CFormSelect
                label="Rol"
                value={userToEdit.rol_id || ''}
                onChange={(e) => setUserToEdit({ ...userToEdit, rol_id: Number(e.target.value) })}
                className="mb-2"
                invalid={!!formErrors.rol_id}
                feedback={formErrors.rol_id}
              >
                <option value="">Indique el rol que va a desempeñar</option>
                {roles.map((rol) => (
                  <option key={rol.id} value={rol.id}>
                    {rol.name}
                  </option>
                ))}
              </CFormSelect>
            </CForm>
          )}
        </CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={handleSaveEdit}>
            Guardar
          </CButton>
          <CButton color="secondary" onClick={() => setEditModal(false)}>
            Cancelar
          </CButton>
        </CModalFooter>
      </CModal>

      <CModal visible={deleteModal} onClose={() => setDeleteModal(false)}>
        <CModalHeader onClose={() => setDeleteModal(false)}>
          <CModalTitle>Confirmar eliminación</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {userToDelete && (
            <p>
              ¿Estás seguro de que deseas eliminar al usuario{' '}
              <strong>
                {userToDelete.first_name} {userToDelete.last_name}
              </strong>
              ?
            </p>
          )}
        </CModalBody>
        <CModalFooter>
          <CButton color="danger" onClick={confirmDelete}>
            Eliminar
          </CButton>
          <CButton color="secondary" onClick={() => setDeleteModal(false)}>
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

export default Users
