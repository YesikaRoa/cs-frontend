import React, { useState } from 'react';

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
} from '@coreui/react';

const Publications = () => {
  const [visible, setVisible] = useState(false)
  console.log('Publications component rendered');
  return (
    <div className="p-4">
      <CModal
        size="xl"
        visible={visible}
        onClose={() => setVisible(false)}
        aria-labelledby="OptionalSizesExample1"
      >
        <CModalHeader>
          <CModalTitle id="OptionalSizesExample1">Extra large modal</CModalTitle>
        </CModalHeader>
        <CModalBody>
    <CRow>
      <CCol md={6}>
        <CCard>
          <CCardBody>
            <h3>Subir Imagen</h3>
            <CFormLabel htmlFor="imageUpload">Seleccione una imagen</CFormLabel>
            <CFormInput type="file" id="imageUpload" accept="image/*" />
          </CCardBody>
        </CCard>
      </CCol>

      <CCol md={6}>
        <CCard>
          <CCardBody>
            <h3>Formulario</h3>
            <CForm>
              <div className="mb-3">
                <CFormLabel htmlFor="title">Título</CFormLabel>
                <CFormInput
                  type="text"
                  id="title"
                  placeholder="Ingrese el título"
                />
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
                <CFormLabel htmlFor="tags">Etiquetas</CFormLabel>
                <CFormSelect id="tags" multiple>
                  <option value="Etiqueta1">Etiqueta 1</option>
                  <option value="Etiqueta2">Etiqueta 2</option>
                  <option value="Etiqueta3">Etiqueta 3</option>
                </CFormSelect>
              </div>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
        </CModalBody>
        <CModalFooter>
                  <CButton color="secondary" onClick={() => setVisible(false)}>
                    cerrar
                  </CButton>
                  <CButton color="primary">Guardar cambios</CButton>
                </CModalFooter>
      </CModal>
      <CRow>
        <CCol className="text-end">
          <CButton color="primary" className="mb-3" onClick={() => setVisible(!visible)}>
            Nueva Publicación
          </CButton>
        </CCol>
      </CRow>
      <CRow>
        <CCol>
          <h3 className="text-center">Publicaciones</h3>
        </CCol>
      </CRow>
      <CRow>
        <CCol>
          <CCard>
            <CCardBody>
              <CForm className="d-flex gap-3 align-items-end">
                <div>
                  <CFormLabel htmlFor="date">Fecha</CFormLabel>
                  <CFormInput type="date" id="date" />
                </div>
                <div>
                  <CFormLabel htmlFor="tag">Etiqueta</CFormLabel>
                  <CFormSelect id="tag">
                    <option value="">Seleccione...</option>
                    <option value="etiqueta1">Etiqueta 1</option>
                    <option value="etiqueta2">Etiqueta 2</option>
                  </CFormSelect>
                </div>
                <div>
                  <CFormLabel htmlFor="keyword">Palabra clave</CFormLabel>
                  <CFormInput type="text" id="keyword" />
                </div>
                <CButton color="primary">Buscar</CButton>
                <CButton color="secondary">Resetear</CButton>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CRow className="mt-4">
        <CCol>
          <CCard>
            <CCardBody>
              <CTable hover striped responsive>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>ID</CTableHeaderCell>
                    <CTableHeaderCell>Descripción</CTableHeaderCell>
                    <CTableHeaderCell>Estado</CTableHeaderCell>
                    <CTableHeaderCell>Publicador</CTableHeaderCell>
                    <CTableHeaderCell>Fecha</CTableHeaderCell>
                    <CTableHeaderCell>Acción</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  <CTableRow>
                    <CTableDataCell>1</CTableDataCell>
                    <CTableDataCell>Primera publicación</CTableDataCell>
                    <CTableDataCell>Activo</CTableDataCell>
                    <CTableDataCell>Usuario1</CTableDataCell>
                    <CTableDataCell>2025-04-27</CTableDataCell>
                    <CTableDataCell>
                      <CButton color="danger" size="sm" className="me-2">
                        Eliminar
                      </CButton>
                      <CButton color="warning" size="sm">
                        Modificar
                      </CButton>
                    </CTableDataCell>
                  </CTableRow>
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </div>
  );
};

export default Publications;
