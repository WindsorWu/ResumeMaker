import { Provider } from 'jotai'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { MainPage } from './pages/MainPage'
import { PreviewPage } from './pages/PreviewPage'

function App() {
  return (
    <Provider>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/preview" element={<PreviewPage />} />
        </Routes>
      </Router>
    </Provider>
  )
}

export default App
