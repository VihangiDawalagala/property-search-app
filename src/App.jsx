// Main app component that sets up all the routes for the application
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import PropertyPage from './pages/PropertyPage.jsx'
import FavoritesPage from './pages/FavoritesPage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import ContactPage from './pages/ContactPage.jsx'
import { Toaster } from './components/ui/toaster'
import { ScrollToTop } from './components/ScrollToTop'

function App() {
  return (
    <>
      {/* Scrolls to top of page when user navigates to a new route */}
      <ScrollToTop />
      {/* Defines all the different pages users can visit */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/property/:id" element={<PropertyPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
      {/* Shows toast notifications to the user */}
      <Toaster />
    </>
  )
}

export default App
