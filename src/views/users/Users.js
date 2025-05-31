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

const Users = () => {
  const [users, setUsers] = useState([])

  const [selectedUser, setSelectedUser] = useState(null)
  const [viewModal, setViewModal] = useState(false)
  const [addModal, setAddModal] = useState(false)
  const [editModal, setEditModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [userToDelete, setUserToDelete] = useState(null)
  const [userToEdit, setUserToEdit] = useState(null)
  const comunidades = [
    'Lote H Rio Zuniga',
    'Rafael Urdaneta',
    'Lote G de Pirineos I',
    'Libertador Cineral',
  ]

  const roles = ['Lider de calle', 'Jefe de comunidad']

  const [newUser, setNewUser] = useState({
    nombre: '',
    apellido: '',
    telefono: '',
    email: '',
    comunidad: '',
    rol: '',
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewUser({ ...newUser, [name]: value })
  }

  const handleAddUser = () => {
    if (
      newUser.nombre &&
      newUser.apellido &&
      newUser.telefono &&
      newUser.email &&
      newUser.comunidad &&
      newUser.rol
    ) {
      const newId = users.length ? users[users.length - 1].id + 1 : 1
      setUsers([...users, { id: newId, ...newUser }])
      setNewUser({
        nombre: '',
        apellido: '',
        telefono: '',
        email: '',
        comunidad: '',
        rol: '',
      })
      setAddModal(false)
    } else {
      alert('Por favor, complete todos los campos antes de guardar.')
    }
  }

  const handleDelete = (id) => {
    const user = users.find((u) => u.id === id)
    setUserToDelete(user)
    setDeleteModal(true)
  }

  const confirmDelete = () => {
    setUsers(users.filter((user) => user.id !== userToDelete.id))
    setDeleteModal(false)
    setUserToDelete(null)
  }

  const handleView = (user) => {
    setSelectedUser(user)
    setViewModal(true)
  }

  const handleEdit = (user) => {
    setUserToEdit(user)
    setEditModal(true)
  }

  useEffect(() => {
    userApi
      .getUsers()
      .then((res) => setUsers(res.data.data))
      .catch((err) => setError('Error al cargar usuarios'))
      .finally(() => setLoading(false))
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
                <CTableHeaderCell>Email</CTableHeaderCell>
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
                  <CTableDataCell>{user?.phone || "No disponible"} </CTableDataCell>
                  <CTableDataCell>{user.email}</CTableDataCell>
                  <CTableDataCell>{user.community.name}</CTableDataCell>
                  <CTableDataCell>{user.role.name}</CTableDataCell>
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
                <strong>Teléfono:</strong> {selectedUser.phone}
              </li>
              <li>
                <strong>Email:</strong> {selectedUser.email}
              </li>
              <li>
                <strong>Comunidad:</strong> {selectedUser.community.name}
              </li>
              <li>
                <strong>Rol:</strong> {selectedUser.role.name}
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
              name="nombre"
              value={newUser.first_name}
              onChange={handleInputChange}
              className="mb-2"
            />
            <CFormInput
              label="Apellido"
              name="apellido"
              value={newUser.last_name}
              onChange={handleInputChange}
              className="mb-2"
            />
            <CFormInput
              label="Teléfono"
              name="telefono"
              value={newUser.phone}
              onChange={handleInputChange}
              className="mb-2"
            />
            <CFormInput
              label="Email"
              name="email"
              value={newUser.email}
              onChange={handleInputChange}
              className="mb-2"
            />
            <CFormSelect
              label="Comunidad"
              name="comunidad"
              value={newUser?.community?.name}
              onChange={handleInputChange}
              className="mb-2"
            >
              <option value="">Seleccione una comunidad</option>
              {comunidades.map((comunidad, index) => (
                <option key={index} value={comunidad}>
                  {comunidad}
                </option>
              ))}
            </CFormSelect>
            <CFormSelect
              label="Rol"
              name="rnpm stol"
              value={newUser?.role?.name}
              onChange={handleInputChange}
              className="mb-2"
            >
              <option value="">Indique el rol que va a desempeñar</option>
              {roles.map((rol, index) => (
                <option key={index} value={rol}>
                  {rol}
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
                onChange={(e) => setUserToEdit({ ...userToEdit, nombre: e.target.value })}
                className="mb-2"
              />
              <CFormInput
                label="Apellido"
                value={userToEdit.last_name}
                onChange={(e) => setUserToEdit({ ...userToEdit, apellido: e.target.value })}
                className="mb-2"
              />
              <CFormInput
                label="Teléfono"
                value={userToEdit.phone}
                onChange={(e) => setUserToEdit({ ...userToEdit, telefono: e.target.value })}
                className="mb-2"
              />
              <CFormInput
                label="Email"
                value={userToEdit.email}
                onChange={(e) => setUserToEdit({ ...userToEdit, email: e.target.value })}
                className="mb-2"
              />
              <CFormSelect
                label="Comunidad"
                value={userToEdit.community.name}
                onChange={(e) => setUserToEdit({ ...userToEdit, comunidad: e.target.value })}
                className="mb-2"
              >
                <option value="">Seleccione una comunidad</option>
                {comunidades.map((comunidad, index) => (
                  <option key={index} value={comunidad}>
                    {comunidad}
                  </option>
                ))}
              </CFormSelect>
              <CFormSelect
                label="Rol"
                value={userToEdit.role.name}
                onChange={(e) => setUserToEdit({ ...userToEdit, rol: e.target.value })}
                className="mb-2"
              >
                <option value="">Indique el rol que va a desempeñar</option>
                {roles.map((rol, index) => (
                  <option key={index} value={rol}>
                    {rol}
                  </option>
                ))}
              </CFormSelect>
            </CForm>
          )}
        </CModalBody>
        <CModalFooter>
          <CButton
            color="primary"
            onClick={() => {
              if (
                userToEdit.first_name &&
                userToEdit.last_name &&
                userToEdit.phone &&
                userToEdit.email &&
                userToEdit?.community?.name &&
                userToEdit?.role?.name
              ) {
                setUsers(users.map((u) => (u.id === userToEdit.id ? userToEdit : u)))
                setEditModal(false)
              } else {
                alert('Por favor, complete todos los campos.')
              }
            }}
          >
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
    </div>
  )
}

export default Users
