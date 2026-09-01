import React from 'react'
import { LanguageProvider } from './contexts/LanguageContext'
import { BrowserRouter } from 'react-router-dom'
import Portfolio from './portfolio/Portfolio.jsx'
import SplashScreen from './portfolio/SplashScreen.jsx'

function App() {
  const [splashDone, setSplashDone] = React.useState(false)

  return (
    <LanguageProvider>
      <BrowserRouter>
        {!splashDone && <SplashScreen onFinish={() => setSplashDone(true)} />}
        <Portfolio />
      </BrowserRouter>
    </LanguageProvider>
  )
}

export default App
