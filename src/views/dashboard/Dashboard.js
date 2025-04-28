import React, { useEffect, useRef } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import Chart from 'chart.js/auto'

const Dashboard = () => {
  const donutChart1Ref = useRef(null)
  const donutChart2Ref = useRef(null)
  const barChartRef = useRef(null)
  useEffect(() => {
    new Chart(donutChart1Ref.current, {
      type: 'doughnut',
      data: {
        labels: ['Publicaciones', 'publicaciones2', 'publicaciones3'],
        datasets: [
          {
            data: [300, 50, 100],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
          },
        ],
      },
    })

    new Chart(donutChart2Ref.current, {
      type: 'doughnut',
      data: {
        labels: ['Categoría X', 'Categoría Y', 'Categoría Z'],
        datasets: [
          {
            data: [150, 250, 200],
            backgroundColor: ['#4BC0C0', '#FF9F40', '#9966FF'],
          },
        ],
      },
    })

    new Chart(barChartRef.current, {
      type: 'bar',
      data: {
        labels: ['Enero', 'Febrero', 'Marzo'],
        datasets: [
          {
            label: 'vistas',
            data: [65, 59, 80],
            backgroundColor: ['#36A2EB', '#FF6384', '#4BC0C0'],
          },
        ],
      },
    })
  }, [])

  const publicaciones = [
    {
      fecha: '2025-04-25',
      descripcion: 'Publicación 1',
      estado: 'Activo',
      usuario: 'Usuario 1',
    },
    {
      fecha: '2025-04-26',
      descripcion: 'Publicación 2',
      estado: 'Inactivo',
      usuario: 'Usuario 2',
    },
  ]

  return (
    <div>
      <CRow>
        <CCol>
          <CCard>
            <CCardBody>
              <h4>Publicaciones</h4>
              <canvas ref={donutChart1Ref}></canvas>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol>
          <CCard>
            <CCardBody>
              <h4>Visitas</h4>
              <canvas ref={donutChart2Ref}></canvas>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>


      <CRow className="mt-4">
        <CCol>
          <CCard>
            <CCardBody>
              <h4>Alcance de redes</h4>
              <canvas ref={barChartRef}></canvas>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

    
      <CRow className="mt-4">
        <CCol>
          <CCard>
            <CCardBody>
              <h4>Últimas Publicaciones</h4>
              <CTable striped hover>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>Fecha</CTableHeaderCell>
                    <CTableHeaderCell>Descripción</CTableHeaderCell>
                    <CTableHeaderCell>Estado</CTableHeaderCell>
                    <CTableHeaderCell>Usuario</CTableHeaderCell>
                    <CTableHeaderCell>Acción</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {publicaciones.map((pub, index) => (
                    <CTableRow key={index}>
                      <CTableDataCell>{pub.fecha}</CTableDataCell>
                      <CTableDataCell>{pub.descripcion}</CTableDataCell>
                      <CTableDataCell>{pub.estado}</CTableDataCell>
                      <CTableDataCell>{pub.usuario}</CTableDataCell>
                      <CTableDataCell>
                        <CButton color="danger" size="sm" className="me-2">
                          Eliminar
                        </CButton>
                        <CButton color="primary" size="sm">
                          Ver
                        </CButton>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <CRow className="mt-4 text-center">
        <CCol>
          <CButton color="secondary">Botonrapido</CButton>
        </CCol>
        <CCol>
          <CButton color="secondary">Botonrapido2</CButton>
        </CCol>
        <CCol>
          <CButton color="secondary">Publicar</CButton>
        </CCol>
      </CRow>
    </div>
  )
}

export default Dashboard