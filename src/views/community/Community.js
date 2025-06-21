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

  useEffect(() => {
    fetchCommunityInformation()
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

  const handleEdit = async (data) => {
    console.log('Edit data:', data)
    // try {
    //   await communityApi.updateCommunityInfo(data.id, data)
    //   fetchCommunityInformation() // Refresh data after edit
    // } catch (error) {
    //   console.error('Error updating community information:', error)
    // }
  }
  return (
    <>
      <CTabs activeItemKey={'about'}>
        <CTabList variant="tabs" className="component-space">
          <CTab itemKey="about">Nosotros</CTab>
          <CTab itemKey="testimonies">Testimonios</CTab>
          <CTab itemKey="leaders">Líderes</CTab>
          <CTab itemKey="contact">Contacto</CTab>
        </CTabList>
        <CTabContent>
          <CTabPanel itemKey="about">
            <About initialData={aboutData} />
          </CTabPanel>
          <CTabPanel itemKey="testimonies">
            <Testimonies />
          </CTabPanel>
          <CTabPanel itemKey="leaders">
            <Leaders />
          </CTabPanel>
          <CTabPanel itemKey="contact">
            <Contact initialData={contactData} handleEdit={handleEdit} />
          </CTabPanel>
        </CTabContent>
      </CTabs>
    </>
  )
}

export default Community
