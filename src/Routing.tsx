import { Router, ReactLocation, Link, Outlet } from '@tanstack/react-location'
import styled from 'styled-components'
import UserNameForm from './components/Form'
import ModalPage from './components/ModalPage'
import SelectorPage from './components/SelectorPage'
import FileUploadPage from './components/FileUploadPage'
import Fetcher from './components/Fetcher'
import GridPage from './components/grid'
import AnimationPage from './components/animation'

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
        { path: '/data_fetch', element: <Fetcher /> },
        { path: '/grid', element: <GridPage /> },
        { path: '/animation', element: <AnimationPage /> },
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
        <Link to="/data_fetch" activeOptions={{ exact: true }}>
          Fetcher
        </Link>
        <Link to="/grid" activeOptions={{ exact: true }}>
          Grid
        </Link>
        <Link to="/animation" activeOptions={{ exact: true }}>
          Animation
        </Link>
      </Header>
      <hr />
      <Outlet />
    </Router>
  )
}

export default Routing
