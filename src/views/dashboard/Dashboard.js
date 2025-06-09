import { useState, useEffect } from 'react'
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
import dashboardApi from '../../api/endpoints/dashboardApi'

const Dashboard = () => {
  const [users, setUsers] = useState([])
  const [postsMonth, setPostsMonth] = useState([0, 0, 0, 0])
  const [postsYear, setPostsYear] = useState([0, 0, 0, 0])
  const [postsPerMonth, setPostsPerMonth] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])

  useEffect(() => {
    dashboardApi.getDashboardData().then(res => {
      const data = res.data.data 
      setUsers(data.last_logins || [])
      setPostsMonth([
        data.posts_month?.Project || 0,
        data.posts_month?.Event || 0,
        data.posts_month?.News || 0,
        data.posts_month?.Announcement || 0,
      ])
      setPostsYear([
        data.posts_year?.Project || 0,
        data.posts_year?.Event || 0,
        data.posts_year?.News || 0,
        data.posts_year?.Announcement || 0,
      ])
      setPostsPerMonth(data.posts_per_month || [0,0,0,0,0,0,0,0,0,0,0,0])
    })
  }, [])

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
