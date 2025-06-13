import { useState, useEffect } from 'react'
import { getUserRoleFromToken } from '../../utils/auth'

import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CForm,
  CRow,
  CFormLabel,
  CFormInput,
  CFormSelect,
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
  CFormTextarea,
  CBadge,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilTrash, cilInfo, cilUserPlus, cilCheck } from '@coreui/icons'
import postApi from '../../api/endpoints/postApi'
import formatDateTime from '../../utils/formatDateTime'
import AlertMessage from '../../components/ui/AlertMessage'

const initialForm = {
  title: '',
  content: '',
  category: '',
  image: '',
}

const getCategoryNameById = (id) => {
  const categories = {
    Proyecto: 1,
    Evento: 2,
    Noticia: 3,
    Anuncio: 4,
  }
  return Object.keys(categories).find((key) => categories[key] === id) || ''
}

const Posts = () => {
  const [visible, setVisible] = useState(false)
  const [posts, setPosts] = useState([])
  const [postsCategories, setPostsCategories] = useState([])
  const [form, setForm] = useState(initialForm)
  const [isEdit, setIsEdit] = useState(false)
  const [editId, setEditId] = useState(null)
  const [alertData, setAlertData] = useState(null)
  const [approveModal, setApproveModal] = useState(false)
  const [approveMessage, setApproveMessage] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [loadingPosts, setLoadingPosts] = useState(false)
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const userRole = getUserRoleFromToken()

  useEffect(() => {
    fetchPosts()
    fetchPostsCategories()
  }, [])

  const fetchPosts = async () => {
    setLoadingPosts(true)
    try {
      const res = await postApi.getPosts()
      setPosts(res.data.data || res.data)
    } catch {
      setPosts([])
    } finally {
      setLoadingPosts(false)
    }
  }

  const fetchPostsCategories = async () => {
    try {
      const res = await postApi.getPostCategories()
      setPostsCategories(res.data.data || res.data)
    } catch {
      setPostsCategories([])
    }
  }

  const handleChange = (e) => {
    const { id, value, type, files } = e.target
    if (type === 'file' && files.length > 0) {
      const file = files[0]
      setImageFile(file)
      if (file) {
        setImagePreview(URL.createObjectURL(file))
      } else {
        setImagePreview(null)
      }
    } else {
      setForm({ ...form, [id]: value })
    }
  }

  const handleEdit = (post) => {
    let images = []
    if (Array.isArray(post.images) && post.images.length > 0) {
      images = post.images.map((img) => (typeof img === 'string' ? { url: img } : img))
    } else if (post.image) {
      images = [{ url: post.image }]
    }
    setForm({
      title: post.title,
      content: post.content,
      category: post.category?.id,
      images,
    })
    if (images.length > 0 && images[0].url) {
      setImagePreview(images[0].url)
      setImageFile(null)
    } else {
      setImagePreview(null)
      setImageFile(null)
    }
    setEditId(post.id)
    setIsEdit(true)
    setVisible(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm('¿Seguro que deseas eliminar esta publicación?')) {
      await postApi.deletePost(id)
      fetchPosts()
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSaving(true)
    const formData = new FormData()
    if (imageFile) {
      formData.append('images', imageFile)
    }
    formData.append('title', form.title)
    formData.append('content', form.content)
    formData.append('category_id', Number(form.category))

    try {
      let response
      if (isEdit && editId) {
        response = await postApi.updatePost(editId, formData, true)
      } else {
        response = await postApi.createPost(formData, true)
      }
      setAlertData({ response: response.data, type: 'success' })
      fetchPosts()
      setVisible(false)
      setForm(initialForm)
      setImageFile(null)
      setImagePreview(null)
      setIsEdit(false)
      setEditId(null)
    } catch ({ response }) {
      setAlertData({ response: response.data, type: 'danger' })
    } finally {
      setIsSaving(false)
    }
  }

  const handleApprove = async (postId) => {
    try {
      const response = await postApi.changePostStatus(postId, 'approved')
      setApproveMessage('La publicación a sido aprobada')
      setApproveModal(true)
      fetchPosts()
    } catch (error) {
      setApproveMessage('Error al aprobar la publicación')
      setApproveModal(true)
    }
  }

  return (
    <div className="p-4">
      <CModal
        size="xl"
        visible={visible}
        onClose={() => {
          setVisible(false)
          setForm(initialForm)
          setIsEdit(false)
          setEditId(null)
        }}
        aria-labelledby="OptionalSizesExample1"
      >
        <CModalHeader>
          <CModalTitle id="OptionalSizesExample1">
            {isEdit ? 'Editar Publicación' : 'Crear Publicación'}
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CRow>
            <CCol md={6}>
              <CCard>
                <CCardBody>
                  <h3>Formulario</h3>
                  <CForm onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <CFormLabel htmlFor="title">Título</CFormLabel>
                      <CFormInput
                        type="text"
                        id="title"
                        placeholder="Ingrese el título"
                        value={form.title}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="mb-3">
                      <CFormLabel htmlFor="description">Descripción</CFormLabel>
                      <CFormTextarea
                        id="content"
                        rows="4"
                        placeholder="Ingrese una descripción"
                        value={form.content}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="mb-3">
                      <CFormLabel htmlFor="category">Categoria</CFormLabel>
                      <CFormSelect id="category" value={form.category} onChange={handleChange}>
                        <option value="">Seleccione una categoría</option>
                        {postsCategories.map((cat) => (
                          <option key={cat.id} value={cat.id}>
                            {cat.name}
                          </option>
                        ))}
                      </CFormSelect>
                    </div>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCol>
            <CCol md={6}>
              <CCard>
                <CCardBody>
                  <h3>Subir Imagen</h3>
                  <CFormLabel htmlFor="imageUpload">Seleccione una imagen</CFormLabel>
                  <CFormInput type="file" id="image" accept="image/*" onChange={handleChange} />
                  {imagePreview && (
                    <div style={{ marginTop: 10 }}>
                      <img
                        src={imagePreview}
                        alt="preview"
                        style={{ maxWidth: 350, maxHeight: 350, borderRadius: 8 }}
                      />
                    </div>
                  )}
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CModalBody>
        <CModalFooter>
          <CButton color="primary" type="submit" onClick={handleSubmit} disabled={isSaving}>
            {isSaving ? 'Guardando...' : 'Guardar'}
          </CButton>
          <CButton
            color="secondary"
            onClick={() => {
              setVisible(false)
              setForm(initialForm)
              setIsEdit(false)
              setEditId(null)
            }}
            disabled={isSaving}
          >
            Cerrar
          </CButton>
        </CModalFooter>
      </CModal>
      <CModal visible={approveModal} onClose={() => setApproveModal(false)}>
        <CModalHeader onClose={() => setApproveModal(false)}>
          <CModalTitle>Aprobar publicación</CModalTitle>
        </CModalHeader>
        <CModalBody>{approveMessage}</CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={() => setApproveModal(false)}>
            Cerrar
          </CButton>
        </CModalFooter>
      </CModal>
      <CRow>
        <CCol>
          <h3>Publicaciones</h3>
        </CCol>
        <CCol className="text-end">
          <CButton color="primary" onClick={() => setVisible(!visible)}>
            <CIcon icon={cilUserPlus} /> Crear Publicación
          </CButton>
        </CCol>
      </CRow>
      <CRow></CRow>
      <CRow className="mt-4">
        <CCol>
          <CCard>
            <CCardBody>
              {loadingPosts ? (
                <div style={{ textAlign: 'center', padding: '2rem' }}>
                  <span>Cargando publicaciones...</span>
                </div>
              ) : (
                <CTable hover striped responsive>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell>Título</CTableHeaderCell>
                      <CTableHeaderCell>Categoria</CTableHeaderCell>
                      <CTableHeaderCell>Estado</CTableHeaderCell>
                      <CTableHeaderCell>Publicado por</CTableHeaderCell>
                      <CTableHeaderCell>Fecha</CTableHeaderCell>
                      <CTableHeaderCell>Acción</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {posts.map((post) => (
                      <CTableRow key={post.id}>
                        <CTableDataCell>{post.title}</CTableDataCell>
                        <CTableDataCell>{getCategoryNameById(post.category?.id)}</CTableDataCell>
                        <CTableDataCell>
                          <CBadge color={post.status === 'published' ? 'success' : 'warning'}>
                            {post.status === 'published' ? 'Publicado' : 'Pendiente'}
                          </CBadge>
                        </CTableDataCell>
                        <CTableDataCell>{post.user?.first_name || post.user_id}</CTableDataCell>
                        <CTableDataCell>{formatDateTime(post.created_at)}</CTableDataCell>
                        <CTableDataCell>
                          <div className="d-flex">
                            <CButton
                              color="primary"
                              size="sm"
                              className="me-2"
                              title="Editar publicación"
                              onClick={() => handleEdit(post)}
                            >
                              <CIcon icon={cilPencil} className="text-white" />
                            </CButton>
                            <CButton
                              color="danger"
                              size="sm"
                              className="me-2"
                              title="Eliminar publicación"
                              onClick={() => handleDelete(post.id)}
                            >
                              <CIcon icon={cilTrash} className="text-white" />
                            </CButton>
                            <CButton
                              color="info"
                              size="sm"
                              title="Ver información de la publicación"
                              onClick={() =>
                                alert(
                                  `ID: ${post.id}\nTítulo: ${post.title}\nContenido: ${post.content}\nEstado: ${post.status}\nFecha creación: ${post.created_at}\nFecha actualización: ${post.updated_at}\nUsuario: ${post.user_id}\nComunidad: ${post.community_id}\nCategoría: ${post.category_id}`,
                                )
                              }
                            >
                              <CIcon icon={cilInfo} className="text-white" />
                            </CButton>
                            {['Admin', 'Community_Leader'].includes(userRole) &&
                              post.status !== 'published' && (
                                <CButton
                                  color="success"
                                  size="sm"
                                  className="ms-2"
                                  title="Aprobar publicación"
                                  onClick={() => handleApprove(post.id)}
                                >
                                  <CIcon icon={cilCheck} style={{ color: 'white' }} />
                                </CButton>
                              )}
                          </div>
                        </CTableDataCell>
                      </CTableRow>
                    ))}
                  </CTableBody>
                </CTable>
              )}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
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

export default Posts
