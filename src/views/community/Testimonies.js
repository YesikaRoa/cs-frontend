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
  CBadge,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilTrash, cilPlus, cilCheck } from '@coreui/icons'
import testimoniesApi from '../../api/endpoints/testimoniesApi'
import communityApi from '../../api/endpoints/communityApi'
import AlertMessage from '../../components/ui/AlertMessage'
import formatDateTime from '../../utils/formatDateTime'
import { testimonySchema } from '../../schemas/testimonies.schema'

const initialForm = {
  name: '',
  comment: '',
  community_id: '',
}

const Testimonies = () => {
  const [testimonies, setTestimonies] = useState([])
  const [communities, setCommunities] = useState([])
  const [visible, setVisible] = useState(false)
  const [form, setForm] = useState(initialForm)
  const [isEdit, setIsEdit] = useState(false)
  const [editId, setEditId] = useState(null)
  const [alertData, setAlertData] = useState(null)
  const [deleteModal, setDeleteModal] = useState(false)
  const [testimonyToDelete, setTestimonyToDelete] = useState(null)
  const [loading, setLoading] = useState(false)
  const [formErrors, setFormErrors] = useState({})

  useEffect(() => {
    fetchTestimonies()
    fetchCommunities()
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

  const fetchCommunities = async () => {
    const { data } = await communityApi.getAllCommunities()
    setCommunities(data.data)
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
        response: { message: response?.data || 'Error al eliminar testimonio' },
        type: 'danger',
      })
      setDeleteModal(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const result = testimonySchema.safeParse(form)
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
    } catch ({ response }) {
      setAlertData({
        response: { message: response?.data || 'Error al guardar testimonio' },
        type: 'danger',
      })
    }
  }

  const handleApprove = async (testimonyId) => {
    try {
      const response = await testimoniesApi.changeTestimonyStatus(testimonyId, 'published')
      setAlertData({ response: response.data, type: 'success' })
      fetchTestimonies()
    } catch (error) {
      setAlertData({
        response: { message: error?.response?.data?.message || 'Error al aprobar el testimonio' },
        type: 'danger',
      })
    }
  }

  const getNameStatus = (status) => {
    const statuses = {
      published: ['Publicado', 'success'],
      pending_approval: ['Pendiente', 'warning'],
      draft: ['Eliminado', 'secondary'], // Funcion de Joan
    }
    return statuses[status] || ['Desconocido', 'secondary']
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
          setFormErrors({})
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
              invalid={!!formErrors.name}
              feedback={formErrors.name}
            />
            <CFormTextarea
              label="Comentario"
              name="comment"
              value={form.comment}
              onChange={handleChange}
              className="mb-2"
              invalid={!!formErrors.comment}
              feedback={formErrors.comment}
            />
            <CFormSelect
              label="Comunidad"
              name="community_id"
              value={form.community_id}
              onChange={handleChange}
              required
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
              ¿Seguro que deseas eliminar el testimonio de <strong>{testimonyToDelete.name}</strong>
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

      <CCard>
        <CCardBody>
          <CTable striped hover responsive>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>Nombre</CTableHeaderCell>
                <CTableHeaderCell>Comentario</CTableHeaderCell>
                <CTableHeaderCell>Comunidad</CTableHeaderCell>
                <CTableHeaderCell>Fecha de Creación</CTableHeaderCell>
                <CTableHeaderCell>Estado</CTableHeaderCell> 
                <CTableHeaderCell>Acciones</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {loading ? (
                <CTableRow>
                  <CTableDataCell colSpan={5} className="text-center">
                    Cargando testimonios...
                  </CTableDataCell>
                </CTableRow>
              ) : testimonies.length === 0 ? (
                <CTableRow>
                  <CTableDataCell colSpan={5} className="text-center">
                    No hay testimonios registrados.
                  </CTableDataCell>
                </CTableRow>
              ) : (
                testimonies.map((t) => (
                  <CTableRow key={t.id}>
                    <CTableDataCell>{t.name}</CTableDataCell>
                    <CTableDataCell>{t.comment}</CTableDataCell>
                    <CTableDataCell>{t.community?.name}</CTableDataCell>
                    <CTableDataCell>{formatDateTime(t.created_at)}</CTableDataCell>
                    <CTableDataCell>
                      <CBadge color={getNameStatus(t.status)?.[1]}>
                        {getNameStatus(t.status)?.[0]}
                      </CBadge>
                    </CTableDataCell>
                    <CTableDataCell>
                      <div className="d-flex">
                        <CButton
                          color="danger"
                          size="sm"
                          className="me-2"
                          onClick={() => handleDeleteClick(t)}
                        >
                          <CIcon icon={cilTrash} className="text-white" />
                        </CButton>
                        {t.status === 'pending_approval' && (
                          <CButton
                            color="success"
                            size="sm"
                            className="ms-2"
                            onClick={() => handleApprove(t.id)}
                          >
                            <CIcon icon={cilCheck} style={{ color: 'white' }} />
                          </CButton>
                        )}
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