import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import { Provider } from 'react-redux'
import store from './store/store'
import Sidebar from './layout/Sidebar'
import ErrorBoundary from './components/error/ErrorBoundary'
import { Toaster } from "@/components/ui/toaster"


createRoot(document.getElementById('root')!).render(

  <StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />

            <Route path="/" element={<Sidebar />}>
              <Route path="admin" element={<Home />} />
            </Route>

          </Routes>

        </BrowserRouter>
      </Provider>
      <Toaster />

    </ErrorBoundary>
  </StrictMode>,
)
