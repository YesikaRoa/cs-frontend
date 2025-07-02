import { useState, useEffect } from 'react'
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
import AlertMessage from '../../components/ui/AlertMessage'
import userApi from '../../api/endpoints/userApi'
import communityApi from '../../api/endpoints/communityApi'
import { createUserSchema, updateUserSchema } from '../../schemas/users.schema.js'
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'
import './users.css'

const Users = () => {
  const [users, setUsers] = useState([])
  const [communities, setCommunities] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)
  const [viewModal, setViewModal] = useState(false)
  const [addModal, setAddModal] = useState(false)
  const [editModal, setEditModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [userToDelete, setUserToDelete] = useState(null)
  const [userToEdit, setUserToEdit] = useState(null)
  const [alertData, setAlertData] = useState(null)
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)

  const roles = [
    { id: 1, name: 'Admin' },
    { id: 2, name: 'Jefe de comunidad' },
    { id: 3, name: 'Lider de calle' },
  ]

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

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    setImageFile(file)
    if (file) {
      setImagePreview(URL.createObjectURL(file))
    } else {
      setImagePreview(null)
    }
  }

  const handleAddUser = async () => {
    // Esto es para validar con zod
    const result = createUserSchema.safeParse(newUser)
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
      Object.entries(newUser).forEach(([key, value]) => {
        if (key === 'community_id' || key === 'rol_id') {
          formData.append(key, Number(value))
        } else {
          formData.append(key, value)
        }
      })
      if (imageFile) {
        formData.append('image', imageFile)
      }
      const { data } = await userApi.createUser(formData)
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
      setImageFile(null)
      setImagePreview(null)
      setAddModal(false)
      fetchData()
      setAlertData({ response: data, type: 'success' }) // ALERTA DE SUCCESS
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
      const { data } = await userApi.deleteUser(userToDelete.id)
      setUsers(users.filter((user) => user.id !== userToDelete.id))
      setDeleteModal(false)
      setUserToDelete(null)
      setAlertData({ response: data, type: 'success' })
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
    // Solo usa la validación de Zod
    const result = updateUserSchema.omit({ password: true }).safeParse(userToEdit)
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
      Object.entries(userToEdit).forEach(([key, value]) => {
        if (key === 'community_id' || key === 'rol_id') {
          formData.append(key, Number(value))
        } else {
          formData.append(key, value)
        }
      })
      if (imageFile) {
        formData.append('image', imageFile)
      }
      const { data } = await userApi.updateUser(userToEdit.id, formData)

      // --- ACTUALIZA LOCALSTORAGE SI ES EL USUARIO LOGGEADO ---
      const userInfoLocal = JSON.parse(localStorage.getItem('userInfo') || '{}')
      if (String(userInfoLocal.id) === String(userToEdit.id)) {
        const updatedUserInfo = {
          ...userInfoLocal, // Mantén los datos actuales
          ...userToEdit, // Aplica los cambios editados (nombre, email, etc.)
          url_image: data.data?.url_image || userInfoLocal.url_image, // Actualiza imagen si viene nueva
        }

        localStorage.setItem('userInfo', JSON.stringify(updatedUserInfo))
        window.dispatchEvent(new Event('userInfoUpdated'))
      }
      // --------------------------------------------------------

      fetchData()
      setEditModal(false)
      setUserToEdit(null)
      setImageFile(null)
      setImagePreview(null)
      setAlertData({ response: data, type: 'success' }) // ALERTA DE SUCCESS
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

  const fetchCommunities = async () => {
    const { data } = await communityApi.getAllCommunities()
    setCommunities(data.data)
  }

  useEffect(() => {
    fetchData()
    fetchCommunities()
  }, [])

  const exportToExcel = () => {
    const data = users.map((user) => ({
      Nombre: user.first_name,
      Apellido: user.last_name,
      Teléfono: user.phone,
      Email: user.email,
      Comunidad:
        communities.find((c) => c.id === (user.community_id || user.community?.id))?.name ||
        user.community?.name ||
        'No disponible',
      Rol:
        roles.find((r) => r.id === (user.rol_id || user.role?.id))?.name ||
        user.role?.name ||
        'No disponible',
    }))
    const worksheet = XLSX.utils.json_to_sheet(data)

    // Esto es para ajustar el ancho de las columnas
    const cols = Object.keys(data[0]).map((key) => ({
      wch:
        Math.max(key.length, ...data.map((row) => (row[key] ? row[key].toString().length : 0))) + 2,
    }))
    worksheet['!cols'] = cols

    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Usuarios')
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' })
    saveAs(blob, 'UsuariosRegistrados.xlsx')
  }

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
                    {communities.find((c) => c.id === (user.community_id || user.community?.id))
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
      <div className="d-flex justify-content-center my-3">
        <CButton className="excel-gradient-btn text-white" onClick={exportToExcel}>
          Exportar a Excel
        </CButton>
      </div>

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
                {communities.find(
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
              <li>
                <strong>Imagen del usuario:</strong>
                {selectedUser?.url_image ? (
                  <div className="user-image-container">
                    <img
                      src={selectedUser.url_image}
                      alt="Imagen de usuario"
                      className="user-image"
                    />
                  </div>
                ) : (
                  ' No disponible'
                )}
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

      <CModal
        visible={addModal}
        onClose={() => {
          setAddModal(false)
          setFormErrors({})
          setImageFile(null)
          setImagePreview(null)
        }}
      >
        <CModalHeader
          onClose={() => {
            setAddModal(false)
            setFormErrors({})
            setImageFile(null)
            setImagePreview(null)
          }}
        >
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
              {communities.map((comunidad) => (
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
            <CFormInput
              type="file"
              label="Imagen"
              name="url_image"
              accept="image/*"
              onChange={handleImageChange}
              className="mb-2"
            />
            {imagePreview && (
              <div className="user-image-container">
                <img src={imagePreview} alt="preview" className="preview-image" />
              </div>
            )}
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

      <CModal
        visible={editModal}
        onClose={() => {
          setEditModal(false)
          setFormErrors({})
          setImageFile(null)
          setImagePreview(null)
        }}
      >
        <CModalHeader
          onClose={() => {
            setEditModal(false)
            setFormErrors({})
            setImageFile(null)
            setImagePreview(null)
          }}
        >
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
                {communities.map((comunidad) => (
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
