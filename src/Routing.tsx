import { Router, ReactLocation, Link, Outlet } from '@tanstack/react-location'
import UserNameForm from './components/Form'
import ModalPage from './components/ModalPage'

const location = new ReactLocation()

const Routing = () => {
  return (
    <Router
      location={location}
      routes={[
        { path: '/', element: <UserNameForm /> },
        { path: '/modal', element: <ModalPage /> },
      ]}
    >
      <header>
        <Link to="/" activeOptions={{ exact: true }}>
          Home
        </Link>
        <Link to="/modal" activeOptions={{ exact: true }}>
          Modal
        </Link>
      </header>
      <hr />
      <Outlet /> {/* Start rendering router matches */}
    </Router>
  )
}

export default Routing
