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
  CCol,
  CRow,
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
import { cilPencil, cilTrash, cilUserPlus, cilInfo } from '@coreui/icons'
import { useState } from 'react'

const Leaders = () => {
  const [leaders, setLeaders] = useState([
    { id: 1, nombre: 'Joan Rios', comunidad: 'Lote G de Pirineos I', rol: 'Lider de calle' },
  ])
  const [addModal, setAddModal] = useState(false)
  const [editModal, setEditModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [viewModal, setViewModal] = useState(false)
  const [leaderToEdit, setLeaderToEdit] = useState(null)
  const [leaderToDelete, setLeaderToDelete] = useState(null)
  const [selectedLeader, setSelectedLeader] = useState(null)
  const [newLeader, setNewLeader] = useState({ nombre: '', comunidad: '', rol: '' })

  const comunidades = [
    'Lote H Rio Zuniga',
    'Rafael Urdaneta',
    'Lote G de Pirineos I',
    'Libertador Cineral',
  ]
  const roles = ['Lider de calle', 'Jefe de comunidad']

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewLeader({ ...newLeader, [name]: value })
  }

  return (
    <div className="p-3">
      <div className="d-flex justify-content-end mb-3">
        <CButton color="primary" onClick={() => setAddModal(true)}>
          <CIcon icon={cilUserPlus} /> Agregar Líder
        </CButton>
      </div>
      <CCard>
        <CCardBody>
          <CTable hover striped responsive>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>Nombre</CTableHeaderCell>
                <CTableHeaderCell>Comunidad</CTableHeaderCell>
                <CTableHeaderCell>Rol</CTableHeaderCell>
                <CTableHeaderCell>Acciones</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {leaders.map((leader) => (
                <CTableRow key={leader.id}>
                  <CTableDataCell>{leader.nombre}</CTableDataCell>
                  <CTableDataCell>{leader.comunidad}</CTableDataCell>
                  <CTableDataCell>{leader.rol}</CTableDataCell>
                  <CTableDataCell>
                    <div className="d-flex">
                      <CButton
                        color="primary"
                        size="sm"
                        className="me-2"
                        onClick={() => { setLeaderToEdit(leader); setEditModal(true) }}
                      >
                        <CIcon icon={cilPencil} className="text-white" />
                      </CButton>
                      <CButton
                        color="danger"
                        size="sm"
                        className="me-2"
                        onClick={() => { setLeaderToDelete(leader); setDeleteModal(true) }}
                      >
                        <CIcon icon={cilTrash} className="text-white" />
                      </CButton>
                      <CButton
                        color="info"
                        size="sm"
                        onClick={() => { setSelectedLeader(leader); setViewModal(true) }}
                      >
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

      <CModal visible={addModal} onClose={() => setAddModal(false)}>
        <CModalHeader onClose={() => setAddModal(false)}>
          <CModalTitle>Añadir nuevo líder</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <CFormInput
              label="Nombre"
              name="nombre"
              value={newLeader.nombre}
              onChange={handleInputChange}
              className="mb-2"
            />
            <CFormSelect
              label="Comunidad"
              name="comunidad"
              value={newLeader.comunidad}
              onChange={handleInputChange}
              className="mb-2"
            >
              <option value="">Seleccione una comunidad</option>
              {comunidades.map((comunidad, index) => (
                <option key={index} value={comunidad}>{comunidad}</option>
              ))}
            </CFormSelect>
            <CFormSelect
              label="Rol"
              name="rol"
              value={newLeader.rol}
              onChange={handleInputChange}
              className="mb-2"
            >
              <option value="">Indique el rol que va a desempeñar</option>
              {roles.map((rol, index) => (
                <option key={index} value={rol}>{rol}</option>
              ))}
            </CFormSelect>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={() => {
            if (newLeader.nombre && newLeader.estado && newLeader.responsable) {
              const newId = leaders.length ? leaders[leaders.length - 1].id + 1 : 1
              setLeaders([...leaders, { id: newId, ...newLeader }])
              setNewLeader({ nombre: '', comunidad: '', rol: '' })
              setAddModal(false)
            }
          }}>
            Guardar
          </CButton>
          <CButton color="secondary" onClick={() => setAddModal(false)}>
            Cancelar
          </CButton>
        </CModalFooter>
      </CModal>

      <CModal visible={editModal} onClose={() => setEditModal(false)}>
        <CModalHeader onClose={() => setEditModal(false)}>
          <CModalTitle>Editar líder</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {leaderToEdit && (
            <CForm>
              <CFormInput
                label="Nombre"
                value={leaderToEdit.nombre}
                onChange={(e) => setLeaderToEdit({ ...leaderToEdit, nombre: e.target.value })}
                className="mb-2"
              />
              <CFormSelect
                label="Comunidad"
                value={leaderToEdit.comunidad || ''}
                onChange={(e) => setLeaderToEdit({ ...leaderToEdit, comunidad: e.target.value })}
                className="mb-2"
              >
                <option value="">Seleccione una comunidad</option>
                {comunidades.map((comunidad, index) => (
                  <option key={index} value={comunidad}>{comunidad}</option>
                ))}
              </CFormSelect>
              <CFormSelect
                label="Rol"
                value={leaderToEdit.rol || ''}
                onChange={(e) => setLeaderToEdit({ ...leaderToEdit, rol: e.target.value })}
                className="mb-2"
              >
                <option value="">Indique el rol que va a desempeñar</option>
                {roles.map((rol, index) => (
                  <option key={index} value={rol}>{rol}</option>
                ))}
              </CFormSelect>
            </CForm>
          )}
        </CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={() => {
            if (leaderToEdit.nombre && leaderToEdit.estado && leaderToEdit.responsable) {
              setLeaders(leaders.map((l) => (l.id === leaderToEdit.id ? leaderToEdit : l)))
              setEditModal(false)
            }
          }}>
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
          {leaderToDelete && (
            <p>
              ¿Estás seguro de que deseas eliminar al líder{' '}
              <strong>{leaderToDelete.nombre}</strong>?
            </p>
          )}
        </CModalBody>
        <CModalFooter>
          <CButton color="danger" onClick={() => {
            setLeaders(leaders.filter((l) => l.id !== leaderToDelete.id))
            setDeleteModal(false)
            setLeaderToDelete(null)
          }}>
            Eliminar
          </CButton>
          <CButton color="secondary" onClick={() => setDeleteModal(false)}>
            Cancelar
          </CButton>
        </CModalFooter>
      </CModal>

      <CModal visible={viewModal} onClose={() => setViewModal(false)}>
        <CModalHeader onClose={() => setViewModal(false)}>
          <CModalTitle>Detalles del Líder</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {selectedLeader && (
            <ul>
              <li>
                <strong>Nombre:</strong> {selectedLeader.nombre}
              </li>
              <li>
                <strong>Estado:</strong> {selectedLeader.estado}
              </li>
              <li>
                <strong>Responsable:</strong> {selectedLeader.responsable}
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
    </div>
  )
}

export default Leaders
