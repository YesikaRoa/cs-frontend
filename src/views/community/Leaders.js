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

const Leaders = () => {
  return (
    <>
      <CRow className="mt-4">
        <CCol className="text-end mb-3">
          <CButton color="primary">Agregar Lider</CButton>
        </CCol>
      </CRow>
      <CRow>
        <CCol>
          <CTable hover striped responsive>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>Nombre</CTableHeaderCell>
                <CTableHeaderCell>Estado</CTableHeaderCell>
                <CTableHeaderCell>Responsable</CTableHeaderCell>
                <CTableHeaderCell>Acción</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              <CTableRow>
                <CTableDataCell>Juan Perez</CTableDataCell>
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

export default Leaders
