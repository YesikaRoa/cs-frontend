import React, { useState } from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CRow,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
} from '@coreui/react';

const MyCommunity = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="p-4">
      <CNav variant="tabs">
        <CNavItem>
          <CNavLink active={activeTab === 0} onClick={() => setActiveTab(0)}>
            Misión y Visión
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink active={activeTab === 1} onClick={() => setActiveTab(1)}>
            ¿Quiénes Somos?
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink active={activeTab === 2} onClick={() => setActiveTab(2)}>
            Testimonios
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink active={activeTab === 3} onClick={() => setActiveTab(3)}>
            Líderes de Calle
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink active={activeTab === 4} onClick={() => setActiveTab(4)}>
            Contacto
          </CNavLink>
        </CNavItem>
      </CNav>

      <CTabContent>
        <CTabPane visible={activeTab === 0}>
          <CRow className="mt-4 justify-content-center">
            <CCol md={5}>
              <CCard>
                <CCardBody>
                  <h5>Misión</h5>
                  <p>Descripción de la misión aquí.</p>
                  <CButton color="primary">Modificar</CButton>
                </CCardBody>
              </CCard>
            </CCol>
            <CCol md={5}>
              <CCard>
                <CCardBody>
                  <h5>Visión</h5>
                  <p>Descripción de la visión aquí.</p>
                  <CButton color="primary">Modificar</CButton>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CTabPane>

        <CTabPane visible={activeTab === 1}>
          <CRow className="mt-4">
            <CCol>
              <CCard>
                <CCardBody>
                  <h5>¿Quiénes Somos?</h5>
                  <p>Descripción sobre quiénes somos.</p>
                  <CButton color="primary">Modificar</CButton>
                </CCardBody>
              </CCard>
            </CCol>
            <CCol>
              <CCard>
                <CCardBody>
                  <h5>Servicios Circuitos</h5>
                  <p>Descripción de los servicios.</p>
                  <CButton color="primary">Modificar</CButton>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CTabPane>

        <CTabPane visible={activeTab === 2}>
  <CRow className="mt-4">
    
    <CCol className="text-end mb-3">
      <CButton color="primary">Agregar Testimonio</CButton>
    </CCol>
  </CRow>
  <CRow>
   
    <CCol>
      <CTable hover striped responsive>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell>ID</CTableHeaderCell>
            <CTableHeaderCell>Testimonio</CTableHeaderCell>
            <CTableHeaderCell>Estado</CTableHeaderCell>
            <CTableHeaderCell>Responsable</CTableHeaderCell>
            <CTableHeaderCell>Acción</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          <CTableRow>
            <CTableDataCell>1</CTableDataCell>
            <CTableDataCell>Contenido del testimonio</CTableDataCell>
            <CTableDataCell>Activo</CTableDataCell>
            <CTableDataCell>Responsable 1</CTableDataCell>
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
    </CCol>
  </CRow>
</CTabPane>

      
        <CTabPane visible={activeTab === 3}>
          <CRow className="mt-4">
            {[...Array(5)].map((_, index) => (
              <CCol key={index} md={4} className="mb-4">
                <CCard>
                  <CCardBody>
                    <div className="text-center">
                      <div
                        style={{
                          width: '100%',
                          height: '150px',
                          backgroundColor: '#e9ecef',
                          borderRadius: '4px',
                        }}
                      ></div>
                      <p className="mt-3">
                        <strong>Nombre:</strong> Nombre {index + 1}
                      </p>
                      <p>
                        <strong>Comunidad:</strong> Comunidad {index + 1}
                      </p>
                      <p>
                        <strong>Estado:</strong> Estado {index + 1}
                      </p>
                      <CButton color="danger" size="sm" className="me-2">
                        Eliminar
                      </CButton>
                      <CButton color="warning" size="sm">
                        Modificar
                      </CButton>
                    </div>
                  </CCardBody>
                </CCard>
              </CCol>
            ))}
          </CRow>
        </CTabPane>

        
        <CTabPane visible={activeTab === 4}>
          <CRow className="mt-4">
            <CCol>
              <CCard>
                <CCardBody>
                  <h5>Información de Contacto</h5>
                  <CForm>
                    <div className="mb-3">
                      <CFormLabel>Info del encargado</CFormLabel>
                      <CFormInput type="text" />
                    </div>
                    <div className="mb-3">
                      <CFormLabel>Teléfono</CFormLabel>
                      <CFormInput type="text" />
                    </div>
                    <div className="mb-3">
                      <CFormLabel>Correo</CFormLabel>
                      <CFormInput type="email" />
                    </div>
                    <div className="mb-3">
                      <CFormLabel>Instagram</CFormLabel>
                      <CFormInput type="text" />
                    </div>
                    <div className="mb-3">
                      <CFormLabel>Facebook</CFormLabel>
                      <CFormInput type="text" />
                    </div>
                    <CButton color="primary">Modificar</CButton>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CTabPane>
      </CTabContent>
    </div>
  );
};

export default MyCommunity;