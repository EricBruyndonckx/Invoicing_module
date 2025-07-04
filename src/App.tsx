import React, { useState } from 'react';
import { SearchIcon, ChevronDownIcon, FileSpreadsheetIcon, UserIcon, HomeIcon, LayoutDashboardIcon, FileTextIcon, PackageIcon, UsersIcon, SettingsIcon, HelpCircleIcon, LogOutIcon, CalendarIcon, XIcon, PencilIcon, CopyIcon, TrashIcon } from 'lucide-react';
export function App() {
  const [showFilters, setShowFilters] = useState(false);
  return <div className="flex w-full min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-[310px] bg-blue-500 text-white flex flex-col">
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
              <a href="#" className="flex items-center px-8 py-3 hover:bg-white/10">
                <HomeIcon size={20} className="mr-3" />
                <span>Launchpad</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center px-8 py-3 hover:bg-white/10">
                <LayoutDashboardIcon size={20} className="mr-3" />
                <span>Dashboard</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center px-8 py-3 hover:bg-white/10">
                <FileTextIcon size={20} className="mr-3" />
                <span>Estimates</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center px-8 py-3 bg-white/20">
                <FileTextIcon size={20} className="mr-3" />
                <span>Invoices</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center px-8 py-3 hover:bg-white/10">
                <PackageIcon size={20} className="mr-3" />
                <span>Product items</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center px-8 py-3 hover:bg-white/10">
                <UsersIcon size={20} className="mr-3" />
                <span>Contacts</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center px-8 py-3 hover:bg-white/10">
                <div size={20} className="mr-3" />
                <span>Banking</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center px-8 py-3 hover:bg-white/10">
                <SettingsIcon size={20} className="mr-3" />
                <span>Settings</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center px-8 py-3 hover:bg-white/10">
                <HelpCircleIcon size={20} className="mr-3" />
                <span>Help</span>
              </a>
            </li>
          </ul>
        </nav>
        <div className="mt-auto mb-8">
          <a href="#" className="flex items-center px-8 py-3 hover:bg-white/10">
            <LogOutIcon size={20} className="mr-3" />
            <span>Logout</span>
          </a>
        </div>
      </div>
      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="max-w-[1200px]">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Invoices</h1>
            {/* Affichage des totaux multi-devises */}
            <div className="bg-blue-50 border border-blue-200 rounded-md px-4 py-2 font-medium text-blue-800 flex items-center">
              <span className="mr-2">Total:</span>
              <div className="flex space-x-3">
                <span className="font-bold">6 124.10 CHF</span>
                <div className="h-5 w-px bg-blue-300"></div>
                <span className="font-bold">2 487.35 EUR</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <input type="text" placeholder="Search the invoices" className="py-2 pl-4 pr-10 border rounded-md w-[300px]" />
                <SearchIcon className="absolute right-3 top-2.5 text-gray-400" size={18} />
                <button className="absolute right-10 top-2.5 text-gray-400" onClick={() => setShowFilters(!showFilters)}>
                  <ChevronDownIcon size={18} />
                </button>
              </div>
              <button className="bg-blue-500 text-white py-2 px-6 rounded-md">
                Create invoice
              </button>
            </div>
          </div>
          {/* Panneau de filtres avancés */}
          {showFilters && <div className="bg-white p-6 rounded-md shadow-md border mb-4 relative">
              <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-600" onClick={() => setShowFilters(false)}>
                <XIcon size={18} />
              </button>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status:
                  </label>
                  <select className="w-full border rounded-md px-3 py-2">
                    <option>All statuses</option>
                    <option>Draft</option>
                    <option>Sent</option>
                    <option>Overdue</option>
                    <option>Paid</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Customer:
                  </label>
                  <input type="text" placeholder="Customer name" className="w-full border rounded-md px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date range:
                  </label>
                  <div className="flex items-center border rounded-md px-3 py-2">
                    <input type="text" placeholder="Start date" className="flex-1 outline-none" />
                    <span className="mx-2">—</span>
                    <input type="text" placeholder="End date" className="flex-1 outline-none" />
                    <CalendarIcon size={18} className="ml-2 text-gray-400" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Currency:
                  </label>
                  <select className="w-full border rounded-md px-3 py-2">
                    <option>ALL</option>
                    <option>CHF</option>
                    <option>EUR</option>
                    <option>USD</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Value:
                  </label>
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 relative">
                      <input type="text" placeholder="min" className="w-full border rounded-md pl-3 pr-8 py-2" />
                      <ChevronDownIcon size={16} className="absolute right-3 top-3 text-gray-400" />
                    </div>
                    <span>—</span>
                    <div className="flex-1 relative">
                      <input type="text" placeholder="max" className="w-full border rounded-md pl-3 pr-8 py-2" />
                      <ChevronDownIcon size={16} className="absolute right-3 top-3 text-gray-400" />
                    </div>
                  </div>
                </div>
                <div className="flex items-end">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                    Clear
                  </button>
                </div>
              </div>
            </div>}
          {/* Filters and Export Row */}
          <div className="flex justify-between items-center mb-4 bg-white p-3 rounded-md shadow-sm border">
            <div className="flex items-center gap-3">
              <span className="font-medium">Filters:</span>
              <select className="border rounded px-2 py-1 text-sm">
                <option>All statuses</option>
              </select>
              <select className="border rounded px-2 py-1 text-sm">
                <option>All dates</option>
              </select>
              <select className="border rounded px-2 py-1 text-sm">
                <option>All customers</option>
              </select>
            </div>
            {/* Bouton d'export Excel avec libellé */}
            <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600 border px-3 py-1.5 rounded">
              <FileSpreadsheetIcon size={18} />
              <span>Export Excel</span>
            </button>
          </div>
          {/* Table */}
          <div className="bg-white rounded-md shadow-sm border overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4 font-medium">
                    <div className="flex items-center">
                      Status
                      <ChevronDownIcon size={16} className="ml-1" />
                    </div>
                  </th>
                  <th className="text-left p-4 font-medium">
                    <div className="flex items-center">
                      Date
                      <ChevronDownIcon size={16} className="ml-1" />
                    </div>
                  </th>
                  <th className="text-left p-4 font-medium">
                    <div className="flex items-center">
                      Number
                      <ChevronDownIcon size={16} className="ml-1" />
                    </div>
                  </th>
                  <th className="text-left p-4 font-medium">
                    <div className="flex items-center">
                      Customer
                      <ChevronDownIcon size={16} className="ml-1" />
                    </div>
                  </th>
                  <th className="text-left p-4 font-medium">
                    <div className="flex items-center">
                      Amount due
                      <ChevronDownIcon size={16} className="ml-1" />
                    </div>
                  </th>
                  <th className="text-left p-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-gray-50">
                  <td className="p-4">
                    <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-md text-sm">
                      Draft
                    </span>
                  </td>
                  <td className="p-4">2025-07-04</td>
                  <td className="p-4">1019</td>
                  <td className="p-4"></td>
                  <td className="p-4">0 CHF</td>
                  <td className="p-4">
                    <div className="flex space-x-2">
                      <button className="text-gray-400 hover:text-blue-500" title="Edit">
                        <PencilIcon size={16} />
                      </button>
                      <button className="text-gray-400 hover:text-blue-500" title="Duplicate">
                        <CopyIcon size={16} />
                      </button>
                      <button className="text-gray-400 hover:text-red-500" title="Delete">
                        <TrashIcon size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="p-4">
                    <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-md text-sm">
                      Draft
                    </span>
                  </td>
                  <td className="p-4">2025-05-23</td>
                  <td className="p-4">1018</td>
                  <td className="p-4">WeCount SA</td>
                  <td className="p-4">94.05 CHF</td>
                  <td className="p-4">
                    <div className="flex space-x-2">
                      <button className="text-gray-400 hover:text-blue-500" title="Edit">
                        <PencilIcon size={16} />
                      </button>
                      <button className="text-gray-400 hover:text-blue-500" title="Duplicate">
                        <CopyIcon size={16} />
                      </button>
                      <button className="text-gray-400 hover:text-red-500" title="Delete">
                        <TrashIcon size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="p-4">
                    <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-md text-sm">
                      Draft
                    </span>
                  </td>
                  <td className="p-4">2025-05-23</td>
                  <td className="p-4">1017</td>
                  <td className="p-4">WeCount SA</td>
                  <td className="p-4">94.05 CHF</td>
                  <td className="p-4">
                    <div className="flex space-x-2">
                      <button className="text-gray-400 hover:text-blue-500" title="Edit">
                        <PencilIcon size={16} />
                      </button>
                      <button className="text-gray-400 hover:text-blue-500" title="Duplicate">
                        <CopyIcon size={16} />
                      </button>
                      <button className="text-gray-400 hover:text-red-500" title="Delete">
                        <TrashIcon size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="p-4">
                    <span className="bg-red-100 text-red-600 px-3 py-1 rounded-md text-sm">
                      Overdue
                    </span>
                  </td>
                  <td className="p-4">2025-05-23</td>
                  <td className="p-4">1016</td>
                  <td className="p-4">WeCount SA</td>
                  <td className="p-4">94.05 CHF</td>
                  <td className="p-4">
                    <div className="flex space-x-2">
                      <button className="text-gray-400 hover:text-blue-500" title="Edit">
                        <PencilIcon size={16} />
                      </button>
                      <button className="text-gray-400 hover:text-blue-500" title="Duplicate">
                        <CopyIcon size={16} />
                      </button>
                      <button className="text-gray-400 hover:text-red-500" title="Delete">
                        <TrashIcon size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="p-4">
                    <span className="bg-red-100 text-red-600 px-3 py-1 rounded-md text-sm">
                      Overdue
                    </span>
                  </td>
                  <td className="p-4">2025-05-23</td>
                  <td className="p-4">1015</td>
                  <td className="p-4">WeCount SA</td>
                  <td className="p-4">94.05 CHF</td>
                  <td className="p-4">
                    <div className="flex space-x-2">
                      <button className="text-gray-400 hover:text-blue-500" title="Edit">
                        <PencilIcon size={16} />
                      </button>
                      <button className="text-gray-400 hover:text-blue-500" title="Duplicate">
                        <CopyIcon size={16} />
                      </button>
                      <button className="text-gray-400 hover:text-red-500" title="Delete">
                        <TrashIcon size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="p-4">
                    <span className="bg-red-100 text-red-600 px-3 py-1 rounded-md text-sm">
                      Overdue
                    </span>
                  </td>
                  <td className="p-4">2025-05-23</td>
                  <td className="p-4">1014</td>
                  <td className="p-4">WeCount SA</td>
                  <td className="p-4">270.25 CHF</td>
                  <td className="p-4">
                    <div className="flex space-x-2">
                      <button className="text-gray-400 hover:text-blue-500" title="Edit">
                        <PencilIcon size={16} />
                      </button>
                      <button className="text-gray-400 hover:text-blue-500" title="Duplicate">
                        <CopyIcon size={16} />
                      </button>
                      <button className="text-gray-400 hover:text-red-500" title="Delete">
                        <TrashIcon size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>;
}