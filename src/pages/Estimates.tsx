import React, { useState } from 'react';
import { FileTextIcon, CheckCircleIcon, ClockIcon, DollarSignIcon, SearchIcon, ChevronDownIcon, FileSpreadsheetIcon, XIcon, PencilIcon, CopyIcon, TrashIcon, CalendarIcon } from 'lucide-react';
import { StatCard } from '../components/StatCard';
export function Estimates() {
  const [showFilters, setShowFilters] = useState(false);
  return <div className="max-w-[1200px]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Estimates</h1>
        {/* Affichage des totaux multi-devises */}
        <div className="bg-blue-50 border border-blue-200 rounded-md px-4 py-2 font-medium text-blue-800 flex items-center">
          <span className="mr-4">Total:</span>
          <span className="font-bold">12,450.00 CHF</span>
          <div className="h-6 w-px bg-blue-300 mx-4"></div>
          <span className="font-bold">2,120.50 EUR</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <input type="text" placeholder="Search estimates" className="py-2 pl-4 pr-10 border rounded-md w-[300px]" />
            <SearchIcon className="absolute right-3 top-2.5 text-gray-400" size={18} />
            <button className="absolute right-10 top-2.5 text-gray-400" onClick={() => setShowFilters(!showFilters)}>
              <ChevronDownIcon size={18} />
            </button>
          </div>
          <button className="bg-blue-500 text-white py-2 px-6 rounded-md">
            Create estimate
          </button>
        </div>
      </div>
      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Estimates" value="24" icon={<FileTextIcon size={20} color="white" />} color="bg-blue-500" trend={{
        value: '8%',
        isPositive: true
      }} />
        <StatCard title="Total Value" value="$12,450" icon={<DollarSignIcon size={20} color="white" />} color="bg-green-500" trend={{
        value: '12%',
        isPositive: true
      }} />
        <StatCard title="Conversion Rate" value="68%" icon={<CheckCircleIcon size={20} color="white" />} color="bg-purple-500" trend={{
        value: '5%',
        isPositive: true
      }} />
        <StatCard title="Pending Approval" value="7" icon={<ClockIcon size={20} color="white" />} color="bg-amber-500" trend={{
        value: '2%',
        isPositive: false
      }} />
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
                <option>Accepted</option>
                <option>Declined</option>
                <option>Expired</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Client:
              </label>
              <input type="text" placeholder="Client name" className="w-full border rounded-md px-3 py-2" />
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
            <option>All clients</option>
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
                  Client
                  <ChevronDownIcon size={16} className="ml-1" />
                </div>
              </th>
              <th className="text-left p-4 font-medium">
                <div className="flex items-center">
                  Amount
                  <ChevronDownIcon size={16} className="ml-1" />
                </div>
              </th>
              <th className="text-left p-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b hover:bg-gray-50">
              <td className="p-4">
                <span className="bg-green-100 text-green-600 px-3 py-1 rounded-md text-sm">
                  Accepted
                </span>
              </td>
              <td className="p-4">2025-05-15</td>
              <td className="p-4">EST-1003</td>
              <td className="p-4">Acme Corp</td>
              <td className="p-4">5,200.00 CHF</td>
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
                <span className="bg-amber-100 text-amber-600 px-3 py-1 rounded-md text-sm">
                  Pending
                </span>
              </td>
              <td className="p-4">2025-05-10</td>
              <td className="p-4">EST-1002</td>
              <td className="p-4">Tech Solutions</td>
              <td className="p-4">3,450.00 CHF</td>
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
                <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-md text-sm">
                  Sent
                </span>
              </td>
              <td className="p-4">2025-05-08</td>
              <td className="p-4">EST-1001</td>
              <td className="p-4">Global Services</td>
              <td className="p-4">2,120.50 EUR</td>
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
                  Declined
                </span>
              </td>
              <td className="p-4">2025-05-05</td>
              <td className="p-4">EST-1000</td>
              <td className="p-4">XYZ Industries</td>
              <td className="p-4">3,800.00 CHF</td>
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
    </div>;
}