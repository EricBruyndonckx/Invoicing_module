import React, { useState } from 'react';
import { ChevronDownIcon, UserIcon, HomeIcon, LayoutDashboardIcon, FileTextIcon, PackageIcon, UsersIcon, SettingsIcon, HelpCircleIcon, LogOutIcon } from 'lucide-react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Estimates } from './pages/Estimates';
import { Invoices } from './pages/Invoices';
import { Products } from './pages/Products';
// Composant Sidebar séparé pour la réutilisation
function Sidebar() {
  const location = useLocation();
  return <div className="w-[310px] bg-blue-500 text-white flex flex-col">
      <div className="p-8">
        <h1 className="text-2xl font-bold">
          WeCount<span className="text-red-500">*</span>
        </h1>
      </div>
      <div className="flex flex-col items-center mt-4">
        <div className="bg-white/20 rounded-full p-4">
          <UserIcon size={32} />
        </div>
        <p className="mt-2 font-medium">Eric Test</p>
        <div className="relative w-full px-8 mt-6">
          <button className="w-full bg-white/10 py-3 px-4 rounded flex items-center justify-between">
            <span>Create Agency SA</span>
            <ChevronDownIcon size={16} />
          </button>
        </div>
      </div>
      <nav className="mt-8 flex-1">
        <ul className="space-y-1">
          <li>
            <Link to="/" className={`flex items-center px-8 py-3 hover:bg-white/10 ${location.pathname === '/' ? 'bg-white/20' : ''}`}>
              <HomeIcon size={20} className="mr-3" />
              <span>Launchpad</span>
            </Link>
          </li>
          <li>
            <Link to="/dashboard" className={`flex items-center px-8 py-3 hover:bg-white/10 ${location.pathname === '/dashboard' ? 'bg-white/20' : ''}`}>
              <LayoutDashboardIcon size={20} className="mr-3" />
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to="/estimates" className={`flex items-center px-8 py-3 hover:bg-white/10 ${location.pathname === '/estimates' ? 'bg-white/20' : ''}`}>
              <FileTextIcon size={20} className="mr-3" />
              <span>Estimates</span>
            </Link>
          </li>
          <li>
            <Link to="/invoices" className={`flex items-center px-8 py-3 hover:bg-white/10 ${location.pathname === '/invoices' ? 'bg-white/20' : ''}`}>
              <FileTextIcon size={20} className="mr-3" />
              <span>Invoices</span>
            </Link>
          </li>
          <li>
            <Link to="/products" className={`flex items-center px-8 py-3 hover:bg-white/10 ${location.pathname === '/products' ? 'bg-white/20' : ''}`}>
              <PackageIcon size={20} className="mr-3" />
              <span>Product items</span>
            </Link>
          </li>
          <li>
            <Link to="/contacts" className={`flex items-center px-8 py-3 hover:bg-white/10 ${location.pathname === '/contacts' ? 'bg-white/20' : ''}`}>
              <UsersIcon size={20} className="mr-3" />
              <span>Contacts</span>
            </Link>
          </li>
          <li>
            <Link to="/banking" className={`flex items-center px-8 py-3 hover:bg-white/10 ${location.pathname === '/banking' ? 'bg-white/20' : ''}`}>
              <div size={20} className="mr-3" />
              <span>Banking</span>
            </Link>
          </li>
          <li>
            <Link to="/settings" className={`flex items-center px-8 py-3 hover:bg-white/10 ${location.pathname === '/settings' ? 'bg-white/20' : ''}`}>
              <SettingsIcon size={20} className="mr-3" />
              <span>Settings</span>
            </Link>
          </li>
          <li>
            <Link to="/help" className={`flex items-center px-8 py-3 hover:bg-white/10 ${location.pathname === '/help' ? 'bg-white/20' : ''}`}>
              <HelpCircleIcon size={20} className="mr-3" />
              <span>Help</span>
            </Link>
          </li>
        </ul>
      </nav>
      <div className="mt-auto mb-8">
        <a href="#" className="flex items-center px-8 py-3 hover:bg-white/10">
          <LogOutIcon size={20} className="mr-3" />
          <span>Logout</span>
        </a>
      </div>
    </div>;
}
// Page d'accueil par défaut
function Home() {
  return <div className="max-w-[1200px]">
      <h1 className="text-2xl font-bold mb-6">Launchpad</h1>
      <div className="bg-white p-8 rounded-md shadow-sm border">
        <h2 className="text-xl font-semibold mb-4">Welcome to WeCount</h2>
        <p className="mb-4">
          Select an option from the sidebar to get started.
        </p>
      </div>
    </div>;
}
// Composant principal avec routage
export function App() {
  return <Router>
      <div className="flex w-full min-h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 p-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/estimates" element={<Estimates />} />
            <Route path="/invoices" element={<Invoices />} />
            <Route path="/products" element={<Products />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </div>
      </div>
    </Router>;
}