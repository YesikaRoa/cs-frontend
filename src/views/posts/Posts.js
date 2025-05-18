import { useState } from 'react'

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

const Posts = () => {
  const [visible, setVisible] = useState(false)
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: 'Título 1',
      category: 'Project',
      status: 'published',
      publisher: 'Usuario 1',
      date: '2023-10-01',
    },
    {
      id: 2,
      title: 'Título 2',
      category: 'Event',
      status: 'pending_approval',
      publisher: 'Usuario 2',
      date: '2023-10-02',
    },
    {
      id: 3,
      title: 'Título 3',
      category: 'News',
      status: 'published',
      publisher: 'Usuario 3',
      date: '2023-10-03',
    },
  ])
  const postsCategory = ['Project', 'Event', 'News', 'Announcement']

  return (
    <div className="p-4">
      <CModal
        size="xl"
        visible={visible}
        onClose={() => setVisible(false)}
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
                  <CForm>
                    <div className="mb-3">
                      <CFormLabel htmlFor="title">Título</CFormLabel>
                      <CFormInput type="text" id="title" placeholder="Ingrese el título" />
                    </div>

                    <div className="mb-3">
                      <CFormLabel htmlFor="description">Descripción</CFormLabel>
                      <CFormTextarea
                        id="description"
                        rows="4"
                        placeholder="Ingrese una descripción"
                      />
                    </div>

                    <div className="mb-3">
                      <CFormLabel htmlFor="category">Categoria</CFormLabel>
                      <CFormSelect id="category">
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
                  <CFormInput type="file" id="imageUpload" accept="image/*" />
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CModalBody>
        <CModalFooter>
          <CButton color="primary">Guardar</CButton>
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
                      <CTableDataCell>{post.category}</CTableDataCell>
                      <CTableDataCell>
                        <CBadge color={post.status === 'published' ? 'success' : 'warning'}>
                          {post.status === 'published' ? 'Publicado' : 'Pendiente'}
                        </CBadge>
                      </CTableDataCell>
                      <CTableDataCell>{post.publisher}</CTableDataCell>
                      <CTableDataCell>{post.date}</CTableDataCell>
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
