import { useState } from 'react'
import { CTabContent, CTabs, CTabList, CTab, CTabPanel } from '@coreui/react'

import About from './About'
import Testimonies from './Testimonies'
import Contact from './Contact'
import Leaders from './Leaders'

const MyCommunity = () => {
  return (
    <>
      <CTabs activeItemKey={'about'}>
        <CTabList variant="tabs" className="component-space">
          <CTab itemKey="about">Nosotros</CTab>
          <CTab itemKey="testimonies">Testimonios</CTab>
          <CTab itemKey="leaders">Líderes de Calle</CTab>
          <CTab itemKey="contact">Contacto</CTab>
        </CTabList>
        <CTabContent>
          <CTabPanel itemKey="about">
            <About />
          </CTabPanel>
          <CTabPanel itemKey="testimonies">
            <Testimonies />
          </CTabPanel>
          <CTabPanel itemKey="leaders">
            <Leaders />
          </CTabPanel>
          <CTabPanel itemKey="contact">
            <Contact />
          </CTabPanel>
        </CTabContent>
      </CTabs>
    </>
  )
}

export default MyCommunity
