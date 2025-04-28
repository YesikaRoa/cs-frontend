import React, { useState } from 'react'
import {
  CCard,
  CCardBody,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CButton,
} from '@coreui/react'
import { cilPencil, cilTrash, cilInfo, cilUserPlus } from '@coreui/icons'
import { CIcon } from '@coreui/icons-react'

const Users = () => {
  const [users] = useState([
    {
      id: 1,
      nombre: 'Diego',
      apellido: 'Altamiranda',
      telefono: '04247028764',
      email: 'diegoaltamiranda22@gmail.com',
      comunidad: 'Lote H Rio Zuniga',
      rol: 'Lider de calle',
    },
  ])

  return (
    <div className="p-3">
      <div className="d-flex justify-content-end mb-3">
        <CButton color="primary">
          <CIcon icon={cilUserPlus} /> Añadir usuario
        </CButton>
      </div>
      <CCard>
        <CCardBody>
          <CTable striped hover responsive>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>Id</CTableHeaderCell>
                <CTableHeaderCell>Nombre</CTableHeaderCell>
                <CTableHeaderCell>Apellido</CTableHeaderCell>
                <CTableHeaderCell>Teléfono</CTableHeaderCell>
                <CTableHeaderCell>Email</CTableHeaderCell>
                <CTableHeaderCell>Comunidad</CTableHeaderCell>
                <CTableHeaderCell>Rol</CTableHeaderCell>
                <CTableHeaderCell>Acciones</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {users.map((user) => (
                <CTableRow key={user.id}>
                  <CTableDataCell>{user.id}</CTableDataCell>
                  <CTableDataCell>{user.nombre}</CTableDataCell>
                  <CTableDataCell>{user.apellido}</CTableDataCell>
                  <CTableDataCell>{user.telefono}</CTableDataCell>
                  <CTableDataCell>{user.email}</CTableDataCell>
                  <CTableDataCell>{user.comunidad}</CTableDataCell>
                  <CTableDataCell>{user.rol}</CTableDataCell>
                  <CTableDataCell>
                    <div className="d-flex">
                      <CButton color="primary" size="sm" className="me-2">
                        <CIcon icon={cilPencil} className="text-white" />
                      </CButton>
                      <CButton color="danger" size="sm" className="me-2">
                        <CIcon icon={cilTrash} className="text-white" />
                      </CButton>
                      <CButton color="info" size="sm">
                        <CIcon icon={cilInfo} className="text-white"/>
                      </CButton>
                    </div>
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    </div>
  )
}

export default Users