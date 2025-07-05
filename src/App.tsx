import React, { useState } from 'react';
import { ChevronDownIcon, UserIcon, HomeIcon, LayoutDashboardIcon, FileTextIcon, PackageIcon, UsersIcon, SettingsIcon, HelpCircleIcon, LogOutIcon, ReceiptIcon, BarChart2Icon, ClipboardIcon, CreditCardIcon, TrendingUpIcon, CalendarIcon, DollarSignIcon, PieChartIcon } from 'lucide-react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { Estimates } from './pages/Estimates';
import { Invoices } from './pages/Invoices';
import { Products } from './pages/Products';
import { Contacts } from './pages/Contacts';
import { Banking } from './pages/Banking';
import { Dashboard } from './pages/Dashboard';
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
        <p className="mt-2 font-medium">Eric Bruyndonckx</p>
        <div className="relative w-full px-8 mt-6">
          <button className="w-full bg-white/10 py-3 px-4 rounded flex items-center justify-between">
            <span>WeCount SA</span>
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
// Composant de carte pour le Launchpad
function ModuleCard({
  title,
  description,
  icon,
  color,
  onClick
}) {
  return <div onClick={onClick} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-all cursor-pointer overflow-hidden flex flex-col h-full">
      <div className={`${color} p-6 flex justify-center`}>
        <div className="bg-white/20 rounded-full p-4 w-20 h-20 flex items-center justify-center">
          {icon}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>;
}
// Page d'accueil par défaut
function Home() {
  const navigate = useNavigate();
  return <div className="w-full max-w-[1200px] mx-auto">
      <h1 className="text-2xl font-bold mb-6">Launchpad</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <ModuleCard title="Invoicing" description="Create, send and manage invoices and estimates. Track payments and generate reports." icon={<ReceiptIcon size={32} color="white" />} color="bg-blue-500" onClick={() => navigate('/invoices')} />
        <ModuleCard title="Accounting" description="Manage your books, track expenses, and prepare financial statements." icon={<PieChartIcon size={32} color="white" />} color="bg-green-500" onClick={() => navigate('/accounting')} />
        <ModuleCard title="Banking" description="Connect your bank accounts, reconcile transactions and manage cash flow." icon={<div size={32} color="white" />} color="bg-purple-500" onClick={() => navigate('/banking')} />
      </div>
      <h2 className="text-xl font-semibold mb-4">Invoicing Tools</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div onClick={() => navigate('/invoices')} className="bg-white p-4 rounded-lg border shadow-sm hover:shadow-md transition-all cursor-pointer flex items-center">
          <div className="bg-blue-100 p-3 rounded-lg mr-3">
            <FileTextIcon size={24} className="text-blue-500" />
          </div>
          <span className="font-medium">Invoices</span>
        </div>
        <div onClick={() => navigate('/estimates')} className="bg-white p-4 rounded-lg border shadow-sm hover:shadow-md transition-all cursor-pointer flex items-center">
          <div className="bg-amber-100 p-3 rounded-lg mr-3">
            <ClipboardIcon size={24} className="text-amber-500" />
          </div>
          <span className="font-medium">Estimates</span>
        </div>
        <div onClick={() => navigate('/products')} className="bg-white p-4 rounded-lg border shadow-sm hover:shadow-md transition-all cursor-pointer flex items-center">
          <div className="bg-indigo-100 p-3 rounded-lg mr-3">
            <PackageIcon size={24} className="text-indigo-500" />
          </div>
          <span className="font-medium">Products</span>
        </div>
        <div onClick={() => navigate('/contacts')} className="bg-white p-4 rounded-lg border shadow-sm hover:shadow-md transition-all cursor-pointer flex items-center">
          <div className="bg-green-100 p-3 rounded-lg mr-3">
            <UsersIcon size={24} className="text-green-500" />
          </div>
          <span className="font-medium">Contacts</span>
        </div>
      </div>
      <h2 className="text-xl font-semibold mb-4">Accounting Tools</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border shadow-sm hover:shadow-md transition-all cursor-pointer flex items-center">
          <div className="bg-purple-100 p-3 rounded-lg mr-3">
            <BarChart2Icon size={24} className="text-purple-500" />
          </div>
          <span className="font-medium">Reports</span>
        </div>
        <div className="bg-white p-4 rounded-lg border shadow-sm hover:shadow-md transition-all cursor-pointer flex items-center">
          <div className="bg-red-100 p-3 rounded-lg mr-3">
            <DollarSignIcon size={24} className="text-red-500" />
          </div>
          <span className="font-medium">Expenses</span>
        </div>
        <div className="bg-white p-4 rounded-lg border shadow-sm hover:shadow-md transition-all cursor-pointer flex items-center">
          <div className="bg-teal-100 p-3 rounded-lg mr-3">
            <TrendingUpIcon size={24} className="text-teal-500" />
          </div>
          <span className="font-medium">Tax Planning</span>
        </div>
        <div className="bg-white p-4 rounded-lg border shadow-sm hover:shadow-md transition-all cursor-pointer flex items-center">
          <div className="bg-orange-100 p-3 rounded-lg mr-3">
            <CalendarIcon size={24} className="text-orange-500" />
          </div>
          <span className="font-medium">Fiscal Calendar</span>
        </div>
      </div>
    </div>;
}
// Composant principal avec routage
export function App() {
  return <Router>
      <div className="flex w-full min-h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 p-8">
          <div className="w-full max-w-[1200px] mx-auto">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/estimates" element={<Estimates />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/products" element={<Products />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/banking" element={<Banking />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>;
}