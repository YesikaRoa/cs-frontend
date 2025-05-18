import {
  CButton,
  CCol,
  CRow,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
} from '@coreui/react'

const Testimonies = () => {
  return (
    <>
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
                <CTableHeaderCell>Testimonio</CTableHeaderCell>
                <CTableHeaderCell>Estado</CTableHeaderCell>
                <CTableHeaderCell>Responsable</CTableHeaderCell>
                <CTableHeaderCell>Acción</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              <CTableRow>
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
    </>
  )
}

export default Testimonies
