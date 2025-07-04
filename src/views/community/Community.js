import { useState, useEffect } from 'react'
import { CTabContent, CTabs, CTabList, CTab, CTabPanel } from '@coreui/react'

import About from './About'
import Testimonies from './Testimonies'
import Contact from './Contact'
import Leaders from './Leaders'
import communityApi from '../../api/endpoints/communityApi'

const Community = () => {
  const [contactData, setContactData] = useState({
    LOCATION: '',
    PHONE_NUMBER: '',
    EMAIL: '',
  })
  const [aboutData, setAboutData] = useState({
    MISSION: '',
    VISION: '',
    ABOUT: '',
  })

  // Estado para el tab activo
  const [activeTab, setActiveTab] = useState(1)

  useEffect(() => {
    // fetchCommunityInformation()
  }, [])

  const fetchCommunityInformation = async () => {
    try {
      const { data } = await communityApi.getAllCommunityInfo()

      // Extract contact information
      const location = data.data.find((item) => item.title === 'LOCATION')?.value || ''
      const phoneNumber = data.data.find((item) => item.title === 'PHONE_NUMBER')?.value || ''
      const email = data.data.find((item) => item.title === 'EMAIL')?.value || ''
      const mission = data.data.find((item) => item.title === 'MISSION')?.value || ''
      const vision = data.data.find((item) => item.title === 'VISION')?.value || ''
      const about = data.data.find((item) => item.title === 'ABOUT')?.value || ''

      setContactData({
        LOCATION: location,
        PHONE_NUMBER: phoneNumber,
        EMAIL: email,
      })
      setAboutData({
        MISSION: mission,
        VISION: vision,
        ABOUT: about,
      })
    } catch {
      setAboutData({
        MISSION: '',
        VISION: '',
        ABOUT: '',
      })
      setContactData({
        LOCATION: '',
        PHONE_NUMBER: '',
        EMAIL: '',
      })
    }
  }

  return (
    <>
      <CTabs activeItemKey={activeTab} onActiveItemChange={setActiveTab}>
        <CTabList variant="tabs" className="component-space">
          <CTab itemKey={1} onClick={() => setActiveTab(1)}>
            Nosotros
          </CTab>
          <CTab itemKey={2} onClick={() => setActiveTab(2)}>
            Testimonios
          </CTab>
          <CTab itemKey={3} onClick={() => setActiveTab(3)}>
            Líderes
          </CTab>
          <CTab itemKey={4} onClick={() => setActiveTab(4)}>
            Contacto
          </CTab>
        </CTabList>
        <CTabContent>
          <CTabPanel itemKey={1}>
            <About initialData={aboutData} />
          </CTabPanel>
          <CTabPanel itemKey={2}>
            <Testimonies />
          </CTabPanel>
          <CTabPanel itemKey={3}>
            <Leaders />
          </CTabPanel>
          <CTabPanel itemKey={4}>
            <Contact initialData={contactData} />
          </CTabPanel>
        </CTabContent>
      </CTabs>
    </>
  )
}

export default Community
