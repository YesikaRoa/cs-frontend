import {
  CCard,
  CCardBody,
  CCardTitle,
  CCardText,
  CCol,
  CRow,
  CContainer,
  CSpinner,
} from '@coreui/react'
import { useEffect, useState } from 'react'
import userApi from '../../api/endpoints/userApi'

const Leaders = () => {
  const [leadersByComunidad, setLeadersByComunidad] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    userApi.getUsers().then(res => {
      const allowedRoles = ['Community_Leader', 'Street_Leader']
      const roleMap = {
        'Community_Leader': 'Líder de comunidad',
        'Street_Leader': 'Líder de calle',
      }
      
      const leaders = (res.data.data || []).filter(user => allowedRoles.includes(user.role?.name))
    
      const grouped = {}
      leaders.forEach(leader => {
        const comunidad = leader.community?.name || 'Sin comunidad'
        if (!grouped[comunidad]) grouped[comunidad] = []
        grouped[comunidad].push({ ...leader, roleNameEs: roleMap[leader.role?.name] || leader.role?.name })
      })
      setLeadersByComunidad(grouped)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  return (
    <div className="p-3">
      <CContainer fluid>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <CSpinner color="primary" /> Cargando líderes...
          </div>
        ) : (
          Object.keys(leadersByComunidad).length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>No hay líderes para mostrar.</div>
          ) : (
            Object.entries(leadersByComunidad).map(([comunidad, leaders]) => (
              <div key={comunidad} style={{ marginBottom: '2rem' }}>
                <h5 style={{ marginBottom: '1rem' }}>{comunidad}</h5>
                <CRow xs={{ cols: 1 }} md={{ cols: 2 }} lg={{ cols: 3 }} className="g-4">
                  {leaders.map((leader) => (
                    <CCol key={leader.id}>
                      <CCard className="h-100">
                        <CCardBody>
                          <CCardTitle>{leader.first_name} {leader.last_name}</CCardTitle>
                          <CCardText>
                            <strong>Rol:</strong> {leader.roleNameEs}
                          </CCardText>
                        </CCardBody>
                      </CCard>
                    </CCol>
                  ))}
                </CRow>
              </div>
            ))
          )
        )}
      </CContainer>
    </div>
  )
}

export default Leaders
