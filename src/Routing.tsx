import { Router, ReactLocation, Link, Outlet } from '@tanstack/react-location'
import UserNameForm from './components/Form'
import ModalPage from './components/ModalPage'
import SelectorPage from './components/SelectorPage'
import FileUploadPage from './components/FileUploadPage'
import styled from 'styled-components'

const location = new ReactLocation()

const Header = styled.header`
  display: flex;
  justify-content: center;
  gap: 12px;
`

const Routing = () => {
  return (
    <Router
      location={location}
      routes={[
        { path: '/', element: <UserNameForm /> },
        { path: '/modal', element: <ModalPage /> },
        { path: '/selector', element: <SelectorPage /> },
        { path: '/file', element: <FileUploadPage /> },
      ]}
    >
      <Header>
        <Link to="/" activeOptions={{ exact: true }}>
          Home
        </Link>
        <Link to="/modal" activeOptions={{ exact: true }}>
          Modal
        </Link>
        <Link to="/selector" activeOptions={{ exact: true }}>
          Selector
        </Link>
        <Link to="/file" activeOptions={{ exact: true }}>
          file
        </Link>
      </Header>
      <hr />
      <Outlet /> {/* Start rendering router matches */}
    </Router>
  )
}

export default Routing
