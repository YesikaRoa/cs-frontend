import { useState, useEffect } from 'react'
import {
  CButton,
  CCol,
  CRow,
  CCard,
  CCardBody,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CModalFooter,
  CForm,
  CFormInput,
  CFormTextarea,
  CFormSelect,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilTrash, cilInfo, cilPlus } from '@coreui/icons'
import testimoniesApi from '../../api/endpoints/testimoniesApi'
import AlertMessage from '../../components/ui/AlertMessage'
import formatDateTime from '../../utils/formatDateTime'

const comunidades = [
  { id: 1, name: 'Lote G Pirineos I' },
  { id: 2, name: 'Lote H Rio zuñiga' },
  { id: 3, name: 'Libertador Cineral' },
  { id: 4, name: 'Rafael Urdaneta' },
  { id: 5, name: 'Libertador' },
]

const initialForm = {
  name: '',
  comment: '',
  community_id: '',
}

const Testimonies = () => {
  const [testimonies, setTestimonies] = useState([])
  const [visible, setVisible] = useState(false)
  const [form, setForm] = useState(initialForm)
  const [isEdit, setIsEdit] = useState(false)
  const [editId, setEditId] = useState(null)
  const [alertData, setAlertData] = useState(null)
  const [deleteModal, setDeleteModal] = useState(false)
  const [testimonyToDelete, setTestimonyToDelete] = useState(null)
  const [infoModal, setInfoModal] = useState(false)
  const [selectedTestimony, setSelectedTestimony] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchTestimonies()
  }, [])

  const fetchTestimonies = async () => {
    setLoading(true)
    try {
      const res = await testimoniesApi.getTestimonies()
      setTestimonies(res.data.data || res.data)
    } catch {
      setTestimonies([])
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({
      ...form,
      [name]: name === 'community_id' ? Number(value) : value,
    })
  }

  const handleEdit = (testimony) => {
    setForm({
      name: testimony.name,
      comment: testimony.comment,
      community_id: testimony.community?.id || testimony.community_id || '',
    })
    setEditId(testimony.id)
    setIsEdit(true)
    setVisible(true)
  }

  const handleDeleteClick = (testimony) => {
    setTestimonyToDelete(testimony)
    setDeleteModal(true)
  }

  const confirmDelete = async () => {
    if (!testimonyToDelete) return
    try {
      let response = await testimoniesApi.deleteTestimony(testimonyToDelete.id)
      setTestimonies(testimonies.filter((t) => t.id !== testimonyToDelete.id))
      setDeleteModal(false)
      setTestimonyToDelete(null)
      setAlertData({ response: response.data, type: 'success' })
    } catch ({ response }) {
      setAlertData({
        response: { message: response?.data?.message || 'Error al eliminar testimonio' },
        type: 'danger',
      })
      setDeleteModal(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      let response
      if (isEdit && editId) {
        response = await testimoniesApi.updateTestimony(editId, form)
      } else {
        response = await testimoniesApi.createTestimony(form)
      }
      setAlertData({ response: response.data, type: 'success' }) 
      fetchTestimonies()
      setVisible(false)
      setForm(initialForm)
      setIsEdit(false)
      setEditId(null)
    } catch (error) {
      setAlertData({ response: error.response?.data || { message: 'Error' }, type: 'danger' })
    }
  }

  const handleView = (testimony) => {
    setSelectedTestimony(testimony)
    setInfoModal(true)
  }

  return (
    <div className="p-4">
      <CModal
        visible={visible}
        onClose={() => {
          setVisible(false)
          setForm(initialForm)
          setIsEdit(false)
          setEditId(null)
        }}
      >
        <CModalHeader>
          <CModalTitle>{isEdit ? 'Editar Testimonio' : 'Agregar Testimonio'}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm onSubmit={handleSubmit}>
            <CFormInput
              label="Nombre"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="mb-2"
              required
            />
            <CFormTextarea
              label="Comentario"
              name="comment"
              value={form.comment}
              onChange={handleChange}
              className="mb-2"
              required
            />
            <CFormSelect
              label="Comunidad"
              name="community_id"
              value={form.community_id}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione una comunidad</option>
              {comunidades.map((comunidad) => (
                <option key={comunidad.id} value={comunidad.id}>
                  {comunidad.name}
                </option>
              ))}
            </CFormSelect>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={handleSubmit}>
            Guardar
          </CButton>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Cancelar
          </CButton>
        </CModalFooter>
      </CModal>

      <CModal visible={deleteModal} onClose={() => setDeleteModal(false)}>
        <CModalHeader>
          <CModalTitle>Confirmar eliminación</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {testimonyToDelete && (
            <p>
              ¿Seguro que deseas eliminar el testimonio de{' '}
              <strong>{testimonyToDelete.name}</strong>?
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

      <CModal visible={infoModal} onClose={() => setInfoModal(false)}>
        <CModalHeader>
          <CModalTitle>Información del Testimonio</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {selectedTestimony && (
            <ul>
              <li>
                <strong>ID:</strong> {selectedTestimony.id}
              </li>
              <li>
                <strong>Nombre:</strong> {selectedTestimony.name}
              </li>
              <li>
                <strong>Comentario:</strong> {selectedTestimony.comment}
              </li>
              <li>
                <strong>Fecha de Creación: </strong>{formatDateTime(selectedTestimony.created_at)}
              </li>
              <li>
                <strong>Comunidad:</strong> {selectedTestimony.community?.name}
              </li>
            </ul>
          )}
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setInfoModal(false)}>
            Cerrar
          </CButton>
        </CModalFooter>
      </CModal>

      <CRow>
        <CCol className="text-end mb-3">
          <CButton color="primary" onClick={() => setVisible(true)}>
            <CIcon icon={cilPlus} /> Agregar Testimonio
          </CButton>
        </CCol>
      </CRow>

      <CCard>
        <CCardBody>
          <CTable striped hover responsive>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>Nombre</CTableHeaderCell>
                <CTableHeaderCell>Comentario</CTableHeaderCell>
                <CTableHeaderCell>Comunidad</CTableHeaderCell>
                <CTableHeaderCell>Acciones</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {loading ? (
                <CTableRow>
                  <CTableDataCell colSpan={4} className="text-center">
                    Cargando testimonios...
                  </CTableDataCell>
                </CTableRow>
              ) : testimonies.length === 0 ? (
                <CTableRow>
                  <CTableDataCell colSpan={4} className="text-center">
                    No hay testimonios registrados.
                  </CTableDataCell>
                </CTableRow>
              ) : (
                testimonies.map((t) => (
                  <CTableRow key={t.id}>
                    <CTableDataCell>{t.name}</CTableDataCell>
                    <CTableDataCell>{t.comment}</CTableDataCell>
                    <CTableDataCell>{t.community?.name}</CTableDataCell>
                    <CTableDataCell>
                      <div className="d-flex">
                        <CButton
                          color="primary"
                          size="sm"
                          className="me-2"
                          onClick={() => handleEdit(t)}
                        >
                          <CIcon icon={cilPencil} className="text-white" />
                        </CButton>
                        <CButton
                          color="danger"
                          size="sm"
                          className="me-2"
                          onClick={() => handleDeleteClick(t)}
                        >
                          <CIcon icon={cilTrash} className="text-white" />
                        </CButton>
                        <CButton
                          color="info"
                          size="sm"
                          onClick={() => handleView(t)}
                        >
                          <CIcon icon={cilInfo} className="text-white" />
                        </CButton>
                      </div>
                    </CTableDataCell>
                  </CTableRow>
                ))
              )}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>

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

export default Testimonies