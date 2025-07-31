import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import Layout from "@/components/organisms/Layout"
import Dashboard from "@/components/pages/Dashboard"
import Rooms from "@/components/pages/Rooms"
import Reservations from "@/components/pages/Reservations"
import Guests from "@/components/pages/Guests"
import Housekeeping from "@/components/pages/Housekeeping"
import Reports from "@/components/pages/Reports"

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 font-body">
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/reservations" element={<Reservations />} />
            <Route path="/guests" element={<Guests />} />
            <Route path="/housekeeping" element={<Housekeeping />} />
            <Route path="/reports" element={<Reports />} />
          </Routes>
        </Layout>
        
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          className="z-[9999]"
        />
      </div>
    </BrowserRouter>
  )
}

export default App