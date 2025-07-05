import React, { useState } from 'react';
import { TrendingUpIcon, TrendingDownIcon, DollarSignIcon, AlertCircleIcon, CalendarIcon, BarChart2Icon, PieChartIcon, UsersIcon, FileTextIcon, ArrowRightIcon, CheckCircleIcon, XCircleIcon, ClockIcon, ChevronDownIcon, ChevronUpIcon, FilterIcon, RefreshCwIcon, DownloadIcon, AlertTriangleIcon, CreditCardIcon, PlusIcon, MinusIcon, InfoIcon, ExternalLinkIcon } from 'lucide-react';
import { StatCard } from '../components/StatCard';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, AreaChart, Area, PieChart, Pie, Cell } from 'recharts';
// Données pour les graphiques
const cashFlowData = [{
  month: 'Jan',
  income: 45000,
  expenses: 32000,
  cashflow: 13000
}, {
  month: 'Feb',
  income: 52000,
  expenses: 34000,
  cashflow: 18000
}, {
  month: 'Mar',
  income: 48000,
  expenses: 36000,
  cashflow: 12000
}, {
  month: 'Apr',
  income: 51000,
  expenses: 35000,
  cashflow: 16000
}, {
  month: 'May',
  income: 60000,
  expenses: 38000,
  cashflow: 22000
}, {
  month: 'Jun',
  income: 55000,
  expenses: 39000,
  cashflow: 16000
}];
const revenueByClientData = [{
  name: 'Acme Corp',
  value: 120000
}, {
  name: 'Tech Solutions',
  value: 80000
}, {
  name: 'Global Services',
  value: 60000
}, {
  name: 'XYZ Industries',
  value: 40000
}, {
  name: 'Others',
  value: 50000
}];
const invoiceStatusData = [{
  name: 'Paid',
  value: 68
}, {
  name: 'Overdue',
  value: 12
}, {
  name: 'Pending',
  value: 20
}];
const forecastData = [{
  month: 'Jul',
  projected: 65000,
  confirmed: 45000
}, {
  month: 'Aug',
  projected: 70000,
  confirmed: 35000
}, {
  month: 'Sep',
  projected: 75000,
  confirmed: 25000
}, {
  month: 'Oct',
  projected: 80000,
  confirmed: 15000
}, {
  month: 'Nov',
  projected: 85000,
  confirmed: 10000
}, {
  month: 'Dec',
  projected: 90000,
  confirmed: 5000
}];
const conversionRateData = [{
  month: 'Jan',
  rate: 35
}, {
  month: 'Feb',
  rate: 38
}, {
  month: 'Mar',
  rate: 42
}, {
  month: 'Apr',
  rate: 40
}, {
  month: 'May',
  rate: 45
}, {
  month: 'Jun',
  rate: 48
}];
// Données pour les KPIs
const kpiData = {
  cashPosition: {
    value: '285,430',
    change: '+12.4%',
    positive: true
  },
  monthlyRevenue: {
    value: '58,250',
    change: '+8.2%',
    positive: true
  },
  overdueInvoices: {
    value: '42,680',
    change: '-5.3%',
    positive: false
  },
  averageCollectionPeriod: {
    value: '32',
    change: '-3',
    positive: true
  }
};
// Données pour les factures en retard
const overdueInvoices = [{
  id: 1,
  client: 'Digitalis Sarl',
  amount: 18580,
  days: 15,
  currency: 'CHF'
}, {
  id: 2,
  client: 'Outletco International SA',
  amount: 12050,
  days: 22,
  currency: 'CHF'
}, {
  id: 3,
  client: 'Outletco International SA',
  amount: 5270,
  days: 8,
  currency: 'CHF'
}, {
  id: 4,
  client: 'Zimmerei Eberle',
  amount: 6780,
  days: 45,
  currency: 'CHF'
}];
// Données pour les factures à payer
const payableInvoices = [{
  id: 1,
  supplier: 'Office Supplies Co.',
  amount: 1250,
  dueDate: '2023-07-15',
  currency: 'CHF'
}, {
  id: 2,
  supplier: 'IT Services Ltd',
  amount: 3580,
  dueDate: '2023-07-20',
  currency: 'CHF'
}, {
  id: 3,
  supplier: 'Marketing Agency',
  amount: 8750,
  dueDate: '2023-07-25',
  currency: 'CHF'
}, {
  id: 4,
  supplier: 'Rent',
  amount: 4500,
  dueDate: '2023-07-31',
  currency: 'CHF'
}];
// Données pour les opportunités commerciales
const salesOpportunities = [{
  id: 1,
  client: 'Nexus Technologies',
  amount: 85000,
  probability: 80,
  expectedDate: '2023-08-15',
  currency: 'CHF'
}, {
  id: 2,
  client: 'Alpine Solutions',
  amount: 45000,
  probability: 60,
  expectedDate: '2023-08-30',
  currency: 'CHF'
}, {
  id: 3,
  client: 'Geneva Group',
  amount: 120000,
  probability: 40,
  expectedDate: '2023-09-10',
  currency: 'CHF'
}, {
  id: 4,
  client: 'Lausanne Medical',
  amount: 35000,
  probability: 90,
  expectedDate: '2023-07-25',
  currency: 'CHF'
}];
// Couleurs pour les graphiques
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
const INVOICE_COLORS = ['#00C49F', '#FF8042', '#FFBB28'];
export function Dashboard() {
  const [timeRange, setTimeRange] = useState('6m');
  const [showCashFlowDetails, setShowCashFlowDetails] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(true);
  // Formater les montants avec séparateur de milliers
  const formatAmount = amount => {
    return new Intl.NumberFormat('fr-CH').format(amount);
  };
  // Calculer le montant total des opportunités pondérées
  const weightedOpportunities = salesOpportunities.reduce((acc, opp) => {
    return acc + opp.amount * opp.probability / 100;
  }, 0);
  return <div className="max-w-[1200px] w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard Financier</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center bg-white border rounded-md p-1">
            <button className={`px-3 py-1 rounded ${timeRange === '1m' ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}`} onClick={() => setTimeRange('1m')}>
              1M
            </button>
            <button className={`px-3 py-1 rounded ${timeRange === '3m' ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}`} onClick={() => setTimeRange('3m')}>
              3M
            </button>
            <button className={`px-3 py-1 rounded ${timeRange === '6m' ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}`} onClick={() => setTimeRange('6m')}>
              6M
            </button>
            <button className={`px-3 py-1 rounded ${timeRange === '1y' ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}`} onClick={() => setTimeRange('1y')}>
              1A
            </button>
          </div>
          <button className="flex items-center gap-1 text-gray-600 border px-3 py-1.5 rounded hover:bg-gray-50">
            <RefreshCwIcon size={16} />
            <span>Actualiser</span>
          </button>
          <button className="flex items-center gap-1 text-gray-600 border px-3 py-1.5 rounded hover:bg-gray-50">
            <DownloadIcon size={16} />
            <span>Exporter</span>
          </button>
        </div>
      </div>
      {/* Recommandations et alertes */}
      {showRecommendations && <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6 relative">
          <button className="absolute top-2 right-2 text-amber-400 hover:text-amber-600" onClick={() => setShowRecommendations(false)}>
            <XCircleIcon size={20} />
          </button>
          <h2 className="text-amber-800 font-semibold flex items-center gap-2 mb-3">
            <AlertTriangleIcon size={20} />
            Recommandations pour optimiser votre trésorerie
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-2">
              <div className="mt-0.5 text-amber-600">
                <AlertCircleIcon size={16} />
              </div>
              <div>
                <p className="text-amber-800 font-medium">
                  4 factures en retard (42'680 CHF)
                </p>
                <p className="text-amber-700 text-sm">
                  Relancer les clients pour accélérer les paiements
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="mt-0.5 text-amber-600">
                <TrendingDownIcon size={16} />
              </div>
              <div>
                <p className="text-amber-800 font-medium">
                  DSO en hausse ce trimestre
                </p>
                <p className="text-amber-700 text-sm">
                  Revoir vos conditions de paiement pour améliorer les
                  encaissements
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="mt-0.5 text-amber-600">
                <CalendarIcon size={16} />
              </div>
              <div>
                <p className="text-amber-800 font-medium">
                  Factures à payer (18'080 CHF)
                </p>
                <p className="text-amber-700 text-sm">
                  Planifiez vos paiements pour le 31/07
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="mt-0.5 text-green-600">
                <TrendingUpIcon size={16} />
              </div>
              <div>
                <p className="text-amber-800 font-medium">
                  Opportunité de 31'500 CHF
                </p>
                <p className="text-amber-700 text-sm">
                  Lausanne Medical à forte probabilité (90%) pour le 25/07
                </p>
              </div>
            </div>
          </div>
        </div>}
      {/* KPIs principaux */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Position de trésorerie" value={`${kpiData.cashPosition.value} CHF`} icon={<DollarSignIcon size={20} color="white" />} color="bg-blue-500" trend={{
        value: kpiData.cashPosition.change,
        isPositive: kpiData.cashPosition.positive
      }} />
        <StatCard title="Chiffre d'affaires mensuel" value={`${kpiData.monthlyRevenue.value} CHF`} icon={<BarChart2Icon size={20} color="white" />} color="bg-green-500" trend={{
        value: kpiData.monthlyRevenue.change,
        isPositive: kpiData.monthlyRevenue.positive
      }} />
        <StatCard title="Factures en retard" value={`${kpiData.overdueInvoices.value} CHF`} icon={<AlertCircleIcon size={20} color="white" />} color="bg-red-500" trend={{
        value: kpiData.overdueInvoices.change,
        isPositive: kpiData.overdueInvoices.positive
      }} />
        <StatCard title="Délai moyen de paiement" value={`${kpiData.averageCollectionPeriod.value} jours`} icon={<ClockIcon size={20} color="white" />} color="bg-purple-500" trend={{
        value: `${kpiData.averageCollectionPeriod.change} jours`,
        isPositive: kpiData.averageCollectionPeriod.positive
      }} />
      </div>
      {/* Flux de trésorerie et Prévisions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 bg-white rounded-lg border shadow-sm p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Flux de trésorerie</h2>
            <div className="flex items-center gap-2">
              <button className="text-gray-500 hover:text-blue-500 flex items-center gap-1 text-sm" onClick={() => setShowCashFlowDetails(!showCashFlowDetails)}>
                {showCashFlowDetails ? 'Masquer détails' : 'Afficher détails'}
                {showCashFlowDetails ? <ChevronUpIcon size={16} /> : <ChevronDownIcon size={16} />}
              </button>
            </div>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              {!showCashFlowDetails ? <AreaChart data={cashFlowData}>
                  <defs>
                    <linearGradient id="colorCashflow" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={value => `${value / 1000}k`} />
                  <Tooltip formatter={value => [`${formatAmount(value)} CHF`, 'Cash Flow']} labelFormatter={label => `Mois: ${label}`} />
                  <Area type="monotone" dataKey="cashflow" stroke="#3b82f6" fillOpacity={1} fill="url(#colorCashflow)" name="Cash Flow" />
                </AreaChart> : <BarChart data={cashFlowData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={value => `${value / 1000}k`} />
                  <Tooltip formatter={value => [`${formatAmount(value)} CHF`, '']} labelFormatter={label => `Mois: ${label}`} />
                  <Legend />
                  <Bar dataKey="income" name="Revenus" fill="#4ade80" />
                  <Bar dataKey="expenses" name="Dépenses" fill="#f87171" />
                  <Bar dataKey="cashflow" name="Cash Flow Net" fill="#3b82f6" />
                </BarChart>}
            </ResponsiveContainer>
          </div>
          <div className="flex justify-between mt-4 pt-4 border-t">
            <div className="text-center">
              <p className="text-sm text-gray-500">Revenus (6 mois)</p>
              <p className="text-lg font-semibold text-green-600">
                311'000 CHF
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500">Dépenses (6 mois)</p>
              <p className="text-lg font-semibold text-red-500">214'000 CHF</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500">Cash Flow Net</p>
              <p className="text-lg font-semibold text-blue-600">97'000 CHF</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border shadow-sm p-4">
          <h2 className="text-lg font-semibold mb-4">
            Prévisions de trésorerie
          </h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={forecastData}>
                <defs>
                  <linearGradient id="colorProjected" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1} />
                  </linearGradient>
                  <linearGradient id="colorConfirmed" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={value => `${value / 1000}k`} />
                <Tooltip formatter={value => [`${formatAmount(value)} CHF`, '']} labelFormatter={label => `Mois: ${label}`} />
                <Legend />
                <Area type="monotone" dataKey="projected" stroke="#8884d8" fillOpacity={1} fill="url(#colorProjected)" name="Revenus projetés" />
                <Area type="monotone" dataKey="confirmed" stroke="#82ca9d" fillOpacity={1} fill="url(#colorConfirmed)" name="Revenus confirmés" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 pt-4 border-t">
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm text-gray-500">Revenus projetés (6 mois)</p>
              <p className="font-semibold">465'000 CHF</p>
            </div>
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm text-gray-500">Revenus confirmés</p>
              <p className="font-semibold text-green-600">135'000 CHF</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-500">Gap à combler</p>
              <p className="font-semibold text-amber-600">330'000 CHF</p>
            </div>
          </div>
        </div>
      </div>
      {/* Revenus par client et Statut des factures */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-lg border shadow-sm p-4">
          <h2 className="text-lg font-semibold mb-4">
            Revenus par client (YTD)
          </h2>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={revenueByClientData} cx="50%" cy="50%" labelLine={false} outerRadius={80} fill="#8884d8" dataKey="value" nameKey="name" label={({
                name,
                percent
              }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                  {revenueByClientData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
                <Tooltip formatter={value => [`${formatAmount(value)} CHF`, '']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium mb-2">
              Top 3 clients (concentration)
            </h3>
            <div className="bg-gray-100 rounded-full h-2.5 mb-1">
              <div className="bg-blue-500 h-2.5 rounded-full" style={{
              width: '74%'
            }}></div>
            </div>
            <p className="text-xs text-gray-500 text-right">74% du CA total</p>
          </div>
        </div>
        <div className="bg-white rounded-lg border shadow-sm p-4">
          <h2 className="text-lg font-semibold mb-4">Statut des factures</h2>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={invoiceStatusData} cx="50%" cy="50%" labelLine={false} outerRadius={80} fill="#8884d8" dataKey="value" nameKey="name" label={({
                name,
                percent
              }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                  {invoiceStatusData.map((entry, index) => <Cell key={`cell-${index}`} fill={INVOICE_COLORS[index % INVOICE_COLORS.length]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2 text-center">
            <div>
              <div className="inline-block w-3 h-3 rounded-full bg-[#00C49F] mr-1"></div>
              <span className="text-sm">Payées</span>
              <p className="font-semibold">68%</p>
            </div>
            <div>
              <div className="inline-block w-3 h-3 rounded-full bg-[#FF8042] mr-1"></div>
              <span className="text-sm">En retard</span>
              <p className="font-semibold text-red-500">12%</p>
            </div>
            <div>
              <div className="inline-block w-3 h-3 rounded-full bg-[#FFBB28] mr-1"></div>
              <span className="text-sm">En attente</span>
              <p className="font-semibold text-amber-500">20%</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border shadow-sm p-4">
          <h2 className="text-lg font-semibold mb-4">Taux de conversion</h2>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={conversionRateData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" />
                <YAxis domain={[30, 50]} tickFormatter={value => `${value}%`} />
                <Tooltip formatter={value => [`${value}%`, 'Taux de conversion']} labelFormatter={label => `Mois: ${label}`} />
                <Line type="monotone" dataKey="rate" stroke="#8884d8" activeDot={{
                r: 8
              }} name="Taux de conversion" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 pt-4 border-t">
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-500">Moyenne 6 mois</p>
              <p className="font-semibold">41.3%</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-500">Tendance</p>
              <p className="font-semibold text-green-600 flex items-center">
                <TrendingUpIcon size={16} className="mr-1" />
                +13%
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Section factures en retard et pipeline commercial */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="font-semibold flex items-center">
              <AlertCircleIcon size={18} className="mr-2 text-red-500" />
              Factures en retard
            </h2>
            <button className="text-blue-500 text-sm flex items-center">
              Voir toutes
              <ArrowRightIcon size={16} className="ml-1" />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left p-3 text-sm font-medium text-gray-500">
                    Client
                  </th>
                  <th className="text-left p-3 text-sm font-medium text-gray-500">
                    Montant
                  </th>
                  <th className="text-left p-3 text-sm font-medium text-gray-500">
                    Retard (jours)
                  </th>
                  <th className="text-left p-3 text-sm font-medium text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {overdueInvoices.map(invoice => <tr key={invoice.id} className="border-t hover:bg-gray-50">
                    <td className="p-3">{invoice.client}</td>
                    <td className="p-3 font-medium">
                      {formatAmount(invoice.amount)} {invoice.currency}
                    </td>
                    <td className="p-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${invoice.days > 30 ? 'bg-red-100 text-red-800' : invoice.days > 15 ? 'bg-amber-100 text-amber-800' : 'bg-orange-100 text-orange-800'}`}>
                        {invoice.days} jours
                      </span>
                    </td>
                    <td className="p-3">
                      <button className="text-blue-500 text-sm mr-2 hover:underline">
                        Relancer
                      </button>
                      <button className="text-gray-500 text-sm hover:underline">
                        Détails
                      </button>
                    </td>
                  </tr>)}
              </tbody>
            </table>
          </div>
          <div className="p-3 bg-gray-50 border-t">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">
                Total factures en retard
              </span>
              <span className="font-semibold text-red-600">42'680 CHF</span>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="font-semibold flex items-center">
              <TrendingUpIcon size={18} className="mr-2 text-green-500" />
              Pipeline commercial
            </h2>
            <div className="flex items-center gap-2">
              <div className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-md">
                <span className="font-medium">
                  {formatAmount(Math.round(weightedOpportunities))} CHF
                </span>
                <span className="text-xs ml-1">pondéré</span>
              </div>
              <button className="text-blue-500 text-sm flex items-center">
                Voir tout
                <ArrowRightIcon size={16} className="ml-1" />
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left p-3 text-sm font-medium text-gray-500">
                    Client
                  </th>
                  <th className="text-left p-3 text-sm font-medium text-gray-500">
                    Montant
                  </th>
                  <th className="text-left p-3 text-sm font-medium text-gray-500">
                    Probabilité
                  </th>
                  <th className="text-left p-3 text-sm font-medium text-gray-500">
                    Date prévue
                  </th>
                </tr>
              </thead>
              <tbody>
                {salesOpportunities.map(opportunity => <tr key={opportunity.id} className="border-t hover:bg-gray-50">
                    <td className="p-3">{opportunity.client}</td>
                    <td className="p-3 font-medium">
                      {formatAmount(opportunity.amount)} {opportunity.currency}
                    </td>
                    <td className="p-3">
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                          <div className={`h-2 rounded-full ${opportunity.probability >= 80 ? 'bg-green-500' : opportunity.probability >= 50 ? 'bg-amber-500' : 'bg-orange-500'}`} style={{
                        width: `${opportunity.probability}%`
                      }}></div>
                        </div>
                        <span className="text-sm">
                          {opportunity.probability}%
                        </span>
                      </div>
                    </td>
                    <td className="p-3 text-sm">
                      {new Date(opportunity.expectedDate).toLocaleDateString('fr-CH')}
                    </td>
                  </tr>)}
              </tbody>
            </table>
          </div>
          <div className="p-3 bg-gray-50 border-t">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Total opportunités</span>
              <span className="font-semibold text-green-600">285'000 CHF</span>
            </div>
          </div>
        </div>
      </div>
      {/* Factures à payer et Actions rapides */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg border shadow-sm overflow-hidden">
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="font-semibold flex items-center">
              <CreditCardIcon size={18} className="mr-2 text-purple-500" />
              Factures à payer
            </h2>
            <button className="text-blue-500 text-sm flex items-center">
              Voir toutes
              <ArrowRightIcon size={16} className="ml-1" />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left p-3 text-sm font-medium text-gray-500">
                    Fournisseur
                  </th>
                  <th className="text-left p-3 text-sm font-medium text-gray-500">
                    Montant
                  </th>
                  <th className="text-left p-3 text-sm font-medium text-gray-500">
                    Échéance
                  </th>
                  <th className="text-left p-3 text-sm font-medium text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {payableInvoices.map(invoice => <tr key={invoice.id} className="border-t hover:bg-gray-50">
                    <td className="p-3">{invoice.supplier}</td>
                    <td className="p-3 font-medium">
                      {formatAmount(invoice.amount)} {invoice.currency}
                    </td>
                    <td className="p-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${new Date(invoice.dueDate) < new Date() ? 'bg-red-100 text-red-800' : new Date(invoice.dueDate) < new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) ? 'bg-amber-100 text-amber-800' : 'bg-green-100 text-green-800'}`}>
                        {new Date(invoice.dueDate).toLocaleDateString('fr-CH')}
                      </span>
                    </td>
                    <td className="p-3">
                      <button className="text-blue-500 text-sm mr-2 hover:underline">
                        Payer
                      </button>
                      <button className="text-gray-500 text-sm hover:underline">
                        Détails
                      </button>
                    </td>
                  </tr>)}
              </tbody>
            </table>
          </div>
          <div className="p-3 bg-gray-50 border-t">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Total à payer</span>
              <span className="font-semibold text-purple-600">18'080 CHF</span>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border shadow-sm p-4">
          <h2 className="font-semibold mb-4 flex items-center">
            <CalendarIcon size={18} className="mr-2 text-blue-500" />
            Actions rapides
          </h2>
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between bg-blue-50 hover:bg-blue-100 text-blue-700 p-3 rounded-md">
              <span className="flex items-center">
                <FileTextIcon size={18} className="mr-2" />
                Créer une facture
              </span>
              <PlusIcon size={16} />
            </button>
            <button className="w-full flex items-center justify-between bg-green-50 hover:bg-green-100 text-green-700 p-3 rounded-md">
              <span className="flex items-center">
                <FileTextIcon size={18} className="mr-2" />
                Créer un devis
              </span>
              <PlusIcon size={16} />
            </button>
            <button className="w-full flex items-center justify-between bg-purple-50 hover:bg-purple-100 text-purple-700 p-3 rounded-md">
              <span className="flex items-center">
                <UsersIcon size={18} className="mr-2" />
                Ajouter un client
              </span>
              <PlusIcon size={16} />
            </button>
            <button className="w-full flex items-center justify-between bg-amber-50 hover:bg-amber-100 text-amber-700 p-3 rounded-md">
              <span className="flex items-center">
                <ClockIcon size={18} className="mr-2" />
                Relancer les impayés
              </span>
              <ExternalLinkIcon size={16} />
            </button>
          </div>
          <div className="mt-6">
            <h3 className="text-sm font-medium mb-3 flex items-center">
              <InfoIcon size={16} className="mr-1 text-blue-500" />
              Indicateurs clés
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="text-sm">Liquidité immédiate</span>
                <span className="font-medium">1.8x</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="text-sm">Burn rate mensuel</span>
                <span className="font-medium">36'000 CHF</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="text-sm">Runway</span>
                <span className="font-medium">7.9 mois</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
}