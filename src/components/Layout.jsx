import React from 'react'
import { Outlet } from 'react-router-dom'
import AppBar from './AppBar'

const Layout = () => {
  return (
    <div className="min-h-screen gradient-bg">
      <AppBar />
      <main className="pt-16">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout