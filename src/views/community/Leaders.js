import {
  CCard,
  CCardBody,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
} from '@coreui/react'
import { useState } from 'react'

const Leaders = () => {
  const [leaders, setLeaders] = useState([
    { id: 1, nombre: 'Joan Rios', comunidad: 'Lote G de Pirineos I', rol: 'Lider de calle' },
  ])

  return (
    <div className="p-3">
      <CCard>
        <CCardBody>
          <CTable hover striped responsive>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>Nombre</CTableHeaderCell>
                <CTableHeaderCell>Comunidad</CTableHeaderCell>
                <CTableHeaderCell>Rol</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {leaders.map((leader) => (
                <CTableRow key={leader.id}>
                  <CTableDataCell>{leader.nombre}</CTableDataCell>
                  <CTableDataCell>{leader.comunidad}</CTableDataCell>
                  <CTableDataCell>{leader.rol}</CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    </div>
  )
}

export default Leaders
