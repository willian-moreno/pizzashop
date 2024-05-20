import { Outlet } from 'react-router-dom'

export function AuthLayout() {
  return (
    <>
      <header>Header</header>
      <Outlet />
      <footer>Footer</footer>
    </>
  )
}
