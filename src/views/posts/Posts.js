import { useState, useEffect } from 'react'

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
import postApi from '../../api/endpoints/postApi'

const postsCategory = ['Project', 'Event', 'News', 'Announcement']

const categoryMap = {
  Project: 1,
  Event: 2,
  News: 3,
  Announcement: 4,
}

const initialForm = {
  title: '',
  content: '',
  category: postsCategory[0],
  image: '', 
}

const Posts = () => {
  const [visible, setVisible] = useState(false)
  const [posts, setPosts] = useState([])
  const [form, setForm] = useState(initialForm)
  const [isEdit, setIsEdit] = useState(false)
  const [editId, setEditId] = useState(null)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const res = await postApi.getPosts()
      setPosts(res.data.data || res.data)
    } catch {
      setPosts([])
    }
  }

  const handleChange = (e) => {
    const { id, value, type, files } = e.target
    if (type === 'file' && files.length > 0) {
      const reader = new FileReader()
      reader.onload = (ev) => {
        setForm((prev) => ({
          ...prev,
          image: ev.target.result,
          images: [{ url: ev.target.result }],
        }))
      }
      reader.readAsDataURL(files[0])
    } else {
      setForm({ ...form, [id]: value })
    }
  }

  const handleEdit = (post) => {
    setForm({
      title: post.title,
      content: post.content,
      category: post.category,
      image: post.image || '',
    })
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
    const newpost = {
      title: form.title,
      content: form.content,
      category_id: categoryMap[form.category],
      status: "pending_approval",
      images: form.images || [], // se envía como arreglo de objetos
    }
    try {
      if (isEdit && editId) {
        await postApi.updatePost(editId, newpost)
      } else {
        await postApi.createPost(newpost)
      }
      fetchPosts()
      setVisible(false)
      setForm(initialForm)
      setIsEdit(false)
      setEditId(null)
    } catch (err) {
      alert('Error al guardar publicación')
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
          <CModalTitle id="OptionalSizesExample1">Crear Publicación</CModalTitle>
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
                      <CFormSelect
                        id="category"
                        value={form.category}
                        onChange={handleChange}
                      >
                        <option value="">Seleccione una categoría</option>
                        {postsCategory.map((cat, idx) => (
                          <option key={idx} value={cat}>
                            {cat}
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
                  <CFormInput
                    type="file"
                    id="image"
                    accept="image/*"
                    onChange={handleChange}
                  />
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CModalBody>
        <CModalFooter>
          <CButton color="primary" type="submit" onClick={handleSubmit}>
            Guardar
          </CButton>
          <CButton color="secondary" onClick={() => {
            setVisible(false)
            setForm(initialForm)
            setIsEdit(false)
            setEditId(null)
          }}>
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
                      <CTableDataCell>{post.category?.name || post.category_id}</CTableDataCell>
                      <CTableDataCell>
                        <CBadge color={post.status === 'published' ? 'success' : 'warning'}>
                          {post.status === 'published' ? 'Publicado' : 'Pendiente'}
                        </CBadge>
                      </CTableDataCell>
                      <CTableDataCell>{post.user?.first_name || post.user_id}</CTableDataCell>
                      <CTableDataCell>{post.created_at}</CTableDataCell>
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
                          <CButton color="info" size="sm" onClick={() => alert(
                            `ID: ${post.id}\nTítulo: ${post.title}\nContenido: ${post.content}\nEstado: ${post.status}\nFecha creación: ${post.created_at}\nFecha actualización: ${post.updated_at}\nUsuario: ${post.user.first_name}\nComunidad: ${post.community.name}\nCategoría: ${post.category.name}`
                          )}>
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