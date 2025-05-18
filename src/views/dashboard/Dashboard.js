import { useState } from 'react'
import {
  CCard,
  CCardBody,
  CRow,
  CCol,
  CTable,
  CTableHead,
  CTableBody,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
} from '@coreui/react'
import { CChartDoughnut, CChartBar } from '@coreui/react-chartjs'

const Dashboard = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      first_name: 'Diego',
      last_name: 'Altamiranda',
      community: 'Lote H Rio Zuniga',
      rol: 'Lider de calle',
      last_login: '2025-05-10',
    },

    {
      id: 2,
      first_name: 'Yesika',
      last_name: 'Roa',
      community: 'Lote H Rio Zuniga',
      rol: 'Jefe de comunidad',
      last_login: '2025-05-10',
    },
  ])

  const postsMonth = [12, 8, 5, 3] // Proyecto, Evento, Noticia, Anuncio
  const postsYear = [120, 80, 50, 30]
  const postsPerMonth = [10, 12, 8, 15, 20, 18, 22, 25, 19, 17, 14, 13]

  return (
    <div>
      <CRow className="component-space">
        <CCol md={6}>
          <CCard>
            <CCardBody>
              <h5>Publicaciones del mes</h5>
              <CChartDoughnut
                data={{
                  labels: ['Proyecto', 'Evento', 'Noticia', 'Anuncio'],
                  datasets: [
                    {
                      data: postsMonth,
                      backgroundColor: ['#36A2EB', '#FFCE56', '#FF6384', '#4BC0C0'],
                    },
                  ],
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
        <CCol md={6}>
          <CCard>
            <CCardBody>
              <h5>Publicaciones del año</h5>
              <CChartDoughnut
                data={{
                  labels: ['Proyecto', 'Evento', 'Noticia', 'Anuncio'],
                  datasets: [
                    {
                      data: postsYear,
                      backgroundColor: ['#36A2EB', '#FFCE56', '#FF6384', '#4BC0C0'],
                    },
                  ],
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CRow className="component-space">
        <CCol md={12}>
          <CCard>
            <CCardBody>
              <h5>Últimos 5 login</h5>
              <CTable striped hover responsive>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>Nombre</CTableHeaderCell>
                    <CTableHeaderCell>Apellido</CTableHeaderCell>
                    <CTableHeaderCell>Comunidad</CTableHeaderCell>
                    <CTableHeaderCell>Último acceso</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {users.map((user) => (
                    <CTableRow key={user.id}>
                      <CTableDataCell>{user.first_name}</CTableDataCell>
                      <CTableDataCell>{user.last_name}</CTableDataCell>
                      <CTableDataCell>{user.community}</CTableDataCell>
                      <CTableDataCell>{user.last_login}</CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CRow className="component-space">
        <CCol>
          <CCard>
            <CCardBody>
              <h5>Publicaciones por mes en el año</h5>
              <CChartBar
                data={{
                  labels: [
                    'Enero',
                    'Febrero',
                    'Marzo',
                    'Abril',
                    'Mayo',
                    'Junio',
                    'Julio',
                    'Agosto',
                    'Septiembre',
                    'Octubre',
                    'Noviembre',
                    'Diciembre',
                  ],
                  datasets: [
                    {
                      label: 'Publicaciones',
                      backgroundColor: '#36A2EB',
                      data: postsPerMonth,
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  plugins: {
                    legend: { display: false },
                  },
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </div>
  )
}

export default Dashboard
