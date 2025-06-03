import { useState, useEffect } from 'react'
import postApi from '../../api/endpoints/postApi'
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
import { cilPencil, cilTrash, cilInfo, cilUserPlus } from '@coreui/icons'

const initialForm = {
  id: null,
  title: '',
  content: '',
  status: 'draft',
  category_id: '',
  user_id: '',
  community_id: '',
  images: [],
}

const Posts = () => {
  const [visible, setVisible] = useState(false)
  const [posts, setPosts] = useState([])
  const [form, setForm] = useState(initialForm)
  const [isEdit, setIsEdit] = useState(false)
  const [selectedPost, setSelectedPost] = useState(null)
  const postsCategory = ['Project', 'Event', 'News', 'Announcement']

  const fetchPosts = () => {
    postApi.getPosts()
      .then((res) => {
        setPosts(res.data.data || res.data)
      })
      .catch((err) => {
        console.error('Error al cargar publicaciones:', err)
      })
  }

  useEffect(() => {
    fetchPosts()
  }, [])


  const handleChange = (e) => {
    const { id, value, type, files } = e.target
    if (type === 'file') {
      setForm({ ...form, [id]: Array.from(files) })
    } else {
      setForm({ ...form, [id]: value })
    }
  }


  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const formData = new FormData()
      formData.append('title', form.title)
      formData.append('content', form.content)
      formData.append('status', form.status)
      formData.append('user_id', Number(form.user_id))
      formData.append('community_id', Number(form.community_id))
      formData.append('category_id', Number(form.category_id))
      if (form.images && form.images.length > 0) {
        form.images.forEach((img) => {
          formData.append('images', img)
        })
      }
      if (isEdit) {
        await postApi.updatePost(form.id, formData)
      } else {
        await postApi.createPost(formData)
      }
      fetchPosts()
      setVisible(false)
      setForm(initialForm)
      setIsEdit(false)
    } catch (err) {
      console.error('Error al guardar publicación:', err.response ? err.response.data : err)
      alert('Error al guardar publicación: ' + (err.response?.data?.message || err.message))
    }
  }


  const handleEdit = (post) => {
    setForm({
      id: post.id,
      title: post.title,
      content: post.content,
      status: post.status,
      category_id: post.category_id,
      user_id: post.user_id,
      community_id: post.community_id,
    })
    setIsEdit(true)
    setVisible(true)
  }


  const handleDelete = async (id) => {
    if (window.confirm('¿Seguro que deseas eliminar esta publicación?')) {
      try {
        await postApi.deletePost(id)
        fetchPosts()
      } catch (err) {
        console.error('Error al eliminar publicación:', err)
      }
    }
  }

  const handleView = async (post) => {
    try {
      const res = await postApi.getPostById(post.id)
      setSelectedPost(res.data)
      alert(`Título: ${res.data.title}\nContenido: ${res.data.content}`)
    } catch (err) {
      console.error('Error al obtener publicación:', err)
    }
  }


  const handleOpenCreate = () => {
    setForm(initialForm)
    setIsEdit(false)
    setVisible(true)
  }

  return (
    <div className="p-4">
      <CModal
        size="xl"
        visible={visible}
        onClose={() => setVisible(false)}
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
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <CFormLabel htmlFor="content">Contenido</CFormLabel>
                      <CFormTextarea
                        id="content"
                        rows="4"
                        placeholder="Ingrese el contenido"
                        value={form.content}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <CFormLabel htmlFor="category_id">Categoria (ID)</CFormLabel>
                      <CFormInput
                        type="number"
                        id="category_id"
                        placeholder="Ingrese el ID de la categoría"
                        value={form.category_id}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <CFormLabel htmlFor="user_id">Usuario (ID)</CFormLabel>
                      <CFormInput
                        type="number"
                        id="user_id"
                        placeholder="Ingrese el ID del usuario"
                        value={form.user_id}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <CFormLabel htmlFor="community_id">Comunidad (ID)</CFormLabel>
                      <CFormInput
                        type="number"
                        id="community_id"
                        placeholder="Ingrese el ID de la comunidad"
                        value={form.community_id}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <CFormLabel htmlFor="status">Estado</CFormLabel>
                      <CFormSelect
                        id="status"
                        value={form.status}
                        onChange={handleChange}
                        required
                      >
                        <option value="draft">Borrador</option>
                        <option value="published">Publicado</option>
                      </CFormSelect>
                    </div>
                    <CButton color="primary" type="submit">
                      {isEdit ? 'Actualizar' : 'Guardar'}
                    </CButton>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCol>
            <CCol md={6}>
              <CCard>
                <CCardBody>
                  <h3>Subir Imagen</h3>
                  <CFormLabel htmlFor="imageUpload">Seleccione una imagen</CFormLabel>
                  <CFormInput
                    type="file"
                    id="images"
                    accept="image/*"
                    multiple
                    onChange={handleChange}
                  />
                  <small className="text-muted">* Implementación de imagen opcional</small>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Cerrar
          </CButton>
        </CModalFooter>
      </CModal>
      <CRow>
        <CCol>
          <h3>Publicaciones</h3>
        </CCol>
        <CCol className="text-end">
          <CButton color="primary" onClick={handleOpenCreate}>
            <CIcon icon={cilUserPlus} /> Crear Publicación
          </CButton>
        </CCol>
      </CRow>
      <CRow className="mt-4">
        <CCol>
          <CCard>
            <CCardBody>
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
                      <CTableDataCell>{post.category.name}</CTableDataCell>
                      <CTableDataCell>
                        <CBadge color={post.status === 'published' ? 'success' : 'warning'}>
                          {post.status === 'published' ? 'Publicado' : 'Borrador'}
                        </CBadge>
                      </CTableDataCell>
                      <CTableDataCell>{post.user.first_name}</CTableDataCell>
                      <CTableDataCell>{new Date(post.created_at).toLocaleDateString()}</CTableDataCell>
                      <CTableDataCell>
                        <div className="d-flex">
                          <CButton
                            color="primary"
                            size="sm"
                            className="me-2"
                            onClick={() => handleEdit(post)}
                          >
                            <CIcon icon={cilPencil} className="text-white" />
                          </CButton>
                          <CButton
                            color="danger"
                            size="sm"
                            className="me-2"
                            onClick={() => handleDelete(post.id)}
                          >
                            <CIcon icon={cilTrash} className="text-white" />
                          </CButton>
                          <CButton color="info" size="sm" onClick={() => handleView(post)}>
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
        </CCol>
      </CRow>
    </div>
  )
}

export default Posts
