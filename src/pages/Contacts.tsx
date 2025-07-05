import React, { useState, Fragment } from 'react';
import { SearchIcon, ChevronDownIcon, FileSpreadsheetIcon, XIcon, PencilIcon, TrashIcon, SaveIcon, XCircleIcon, UserIcon, BuildingIcon, PhoneIcon, MailIcon, MapPinIcon } from 'lucide-react';
// Type pour un contact
type Contact = {
  id: string;
  salutation: string;
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  phone: string;
  mobile: string;
  company: string;
  address1: string;
  address2: string;
  postcode: string;
  location: string;
  country: string;
  website: string;
  languageCode: string;
  currency: string;
  type: 'customer' | 'prospect';
};
export function Contacts() {
  const [showFilters, setShowFilters] = useState(false);
  // État pour stocker l'ID du contact en cours d'édition
  const [editingContactId, setEditingContactId] = useState<string | null>(null);
  // Données de contacts fictives
  const [contacts, setContacts] = useState<Contact[]>([{
    id: '1',
    salutation: 'Mr',
    firstName: '',
    lastName: '',
    name: '3spirits Sàrl',
    email: 'info@3spirits.ch',
    phone: '+41 21 123 45 67',
    mobile: '+41 79 123 45 67',
    company: '3spirits Sàrl',
    address1: 'Rue de Lausanne 10',
    address2: '',
    postcode: '1010',
    location: 'Lausanne',
    country: 'CH',
    website: 'www.3spirits.ch',
    languageCode: 'fr',
    currency: 'CHF',
    type: 'customer'
  }, {
    id: '2',
    salutation: 'Mr',
    firstName: 'Marc',
    lastName: 'Hannebert',
    name: '4809 Brokers AG',
    email: 'marc.hannebert@4809.ch',
    phone: '+41 41 987 65 43',
    mobile: '+41 79 987 65 43',
    company: '4809 Brokers AG',
    address1: 'Bahnhofstrasse 20',
    address2: '',
    postcode: '6300',
    location: 'Zug',
    country: 'CH',
    website: 'www.4809brokers.ch',
    languageCode: 'de',
    currency: 'CHF',
    type: 'customer'
  }, {
    id: '3',
    salutation: 'Mr',
    firstName: 'Benjamin',
    lastName: '',
    name: '4H Holding GmbH',
    email: 'benjamin@4hholding.ch',
    phone: '+41 41 555 66 77',
    mobile: '+41 79 555 66 77',
    company: '4H Holding GmbH',
    address1: 'Industriestrasse 5',
    address2: '',
    postcode: '6300',
    location: 'Zug',
    country: 'CH',
    website: 'www.4hholding.ch',
    languageCode: 'de',
    currency: 'CHF',
    type: 'customer'
  }, {
    id: '4',
    salutation: 'None',
    firstName: '',
    lastName: '',
    name: '8004.salon Co-Working Collective',
    email: 'pos@8004.salon.administration@wecount.swiss',
    phone: '+41 44 123 45 67',
    mobile: '',
    company: '8004.salon Co-Working Collective',
    address1: 'Badenerstrasse 123',
    address2: '',
    postcode: '8004',
    location: 'Zürich',
    country: 'CH',
    website: 'www.8004.salon',
    languageCode: 'de',
    currency: 'CHF',
    type: 'customer'
  }, {
    id: '5',
    salutation: 'Mr',
    firstName: 'Eric',
    lastName: 'Bruyndonckx',
    name: 'A prospect',
    email: 'eric.bruyndonckx+ProspectA@wecount.swiss',
    phone: '+41 21 987 65 43',
    mobile: '+41 79 987 65 43',
    company: 'Prospect Company A',
    address1: 'Avenue de la Gare 15',
    address2: '',
    postcode: '1800',
    location: 'Vevey',
    country: 'CH',
    website: '',
    languageCode: 'fr',
    currency: 'CHF',
    type: 'prospect'
  }, {
    id: '6',
    salutation: 'Ms',
    firstName: 'Nancy',
    lastName: 'Rodolfi',
    name: 'A88Lab. Digital Agency N. Rodolfi',
    email: 'nancy@a88lab.com',
    phone: '+41 43 111 22 33',
    mobile: '+41 79 111 22 33',
    company: 'A88Lab',
    address1: 'Zürcherstrasse 80',
    address2: '',
    postcode: '8953',
    location: 'Dietikon',
    country: 'CH',
    website: 'www.a88lab.com',
    languageCode: 'de',
    currency: 'CHF',
    type: 'customer'
  }]);
  // État pour stocker les valeurs temporaires lors de l'édition
  const [editFormData, setEditFormData] = useState<Contact | null>(null);
  // Fonction pour ouvrir le formulaire d'édition
  const handleEditClick = (contact: Contact) => {
    if (editingContactId === contact.id) {
      // Si on clique sur le même contact, on ferme l'accordéon
      setEditingContactId(null);
      setEditFormData(null);
    } else {
      // Sinon, on ouvre l'accordéon pour ce contact
      setEditingContactId(contact.id);
      setEditFormData({
        ...contact
      });
    }
  };
  // Fonction pour mettre à jour les champs du formulaire
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (!editFormData) return;
    const {
      name,
      value
    } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value
    });
  };
  // Fonction pour sauvegarder les modifications
  const handleSaveEdit = () => {
    if (!editFormData) return;
    setContacts(contacts.map(contact => contact.id === editFormData.id ? editFormData : contact));
    // Fermer l'accordéon
    setEditingContactId(null);
    setEditFormData(null);
  };
  // Fonction pour annuler l'édition
  const handleCancelEdit = () => {
    setEditingContactId(null);
    setEditFormData(null);
  };
  return <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Contacts</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <input type="text" placeholder="Search contacts" className="py-2 pl-4 pr-10 border rounded-md w-[300px]" />
            <SearchIcon className="absolute right-3 top-2.5 text-gray-400" size={18} />
            <button className="absolute right-10 top-2.5 text-gray-400" onClick={() => setShowFilters(!showFilters)}>
              <ChevronDownIcon size={18} />
            </button>
          </div>
          <button className="bg-blue-500 text-white py-2 px-6 rounded-md">
            Create Contact
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
                Type:
              </label>
              <select className="w-full border rounded-md px-3 py-2">
                <option>All types</option>
                <option>Customer</option>
                <option>Prospect</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Country:
              </label>
              <select className="w-full border rounded-md px-3 py-2">
                <option>All countries</option>
                <option>CH</option>
                <option>FR</option>
                <option>DE</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location:
              </label>
              <input type="text" placeholder="City or region" className="w-full border rounded-md px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Postcode:
              </label>
              <input type="text" placeholder="Enter postcode" className="w-full border rounded-md px-3 py-2" />
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
            <option>All types</option>
            <option>Customer</option>
            <option>Prospect</option>
          </select>
          <select className="border rounded px-2 py-1 text-sm">
            <option>All countries</option>
            <option>CH</option>
            <option>FR</option>
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
                  Name
                  <ChevronDownIcon size={16} className="ml-1" />
                </div>
              </th>
              <th className="text-left p-4 font-medium">
                <div className="flex items-center">
                  Postcode
                  <ChevronDownIcon size={16} className="ml-1" />
                </div>
              </th>
              <th className="text-left p-4 font-medium">
                <div className="flex items-center">
                  Location
                  <ChevronDownIcon size={16} className="ml-1" />
                </div>
              </th>
              <th className="text-left p-4 font-medium">
                <div className="flex items-center">
                  Country
                  <ChevronDownIcon size={16} className="ml-1" />
                </div>
              </th>
              <th className="text-right p-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map(contact => <Fragment key={contact.id}>
                <tr className={`border-b hover:bg-gray-50 ${editingContactId === contact.id ? 'bg-gray-50' : ''}`}>
                  <td className="p-4">
                    <div className={`px-3 py-1 rounded-md inline-block font-medium text-sm ${contact.type === 'customer' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'}`}>
                      {contact.type === 'customer' ? 'Customer' : 'Prospect'}
                    </div>
                  </td>
                  <td className="p-4">
                    <div>
                      <div className="font-medium">{contact.name}</div>
                      <div className="text-sm text-gray-500">
                        {contact.email}
                      </div>
                    </div>
                  </td>
                  <td className="p-4">{contact.postcode}</td>
                  <td className="p-4">{contact.location}</td>
                  <td className="p-4">{contact.country}</td>
                  <td className="p-4 text-right">
                    <div className="flex space-x-2 justify-end">
                      <button className={`${editingContactId === contact.id ? 'text-blue-500' : 'text-gray-400 hover:text-blue-500'}`} title="Edit" onClick={() => handleEditClick(contact)}>
                        {editingContactId === contact.id ? <ChevronDownIcon size={16} /> : <PencilIcon size={16} />}
                      </button>
                      <button className="text-gray-400 hover:text-red-500" title="Delete">
                        <TrashIcon size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
                {/* Accordéon d'édition */}
                {editingContactId === contact.id && editFormData && <tr>
                    <td colSpan={6} className="p-0">
                      <div className="bg-gray-50 p-6 border-b">
                        <h3 className="font-medium text-lg mb-4">
                          Edit Contact
                        </h3>
                        <div className="mb-6 flex items-center">
                          <div className="bg-blue-500 rounded-full p-3 mr-3">
                            <UserIcon size={24} className="text-white" />
                          </div>
                          <h4 className="text-lg font-medium">
                            Personal details
                          </h4>
                        </div>
                        <div className="grid grid-cols-3 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Contact Type:
                            </label>
                            <select name="type" value={editFormData.type} onChange={handleInputChange} className="w-full border rounded-md px-3 py-2">
                              <option value="customer">Customer</option>
                              <option value="prospect">Prospect</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Salutation:
                            </label>
                            <select name="salutation" value={editFormData.salutation} onChange={handleInputChange} className="w-full border rounded-md px-3 py-2">
                              <option value="None">None</option>
                              <option value="Mr">Mr</option>
                              <option value="Ms">Ms</option>
                              <option value="Mrs">Mrs</option>
                              <option value="Dr">Dr</option>
                            </select>
                          </div>
                          <div className="col-span-3 grid grid-cols-2 gap-6">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                First name:
                              </label>
                              <input type="text" name="firstName" value={editFormData.firstName} onChange={handleInputChange} className="w-full border rounded-md px-3 py-2" />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Last name:
                              </label>
                              <input type="text" name="lastName" value={editFormData.lastName} onChange={handleInputChange} className="w-full border rounded-md px-3 py-2" />
                            </div>
                          </div>
                          <div className="col-span-3">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Company Name*:
                            </label>
                            <input type="text" name="company" value={editFormData.company} onChange={handleInputChange} className="w-full border rounded-md px-3 py-2" required />
                          </div>
                          <div className="col-span-3 grid grid-cols-2 gap-6">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Address 1*:
                              </label>
                              <input type="text" name="address1" value={editFormData.address1} onChange={handleInputChange} className="w-full border rounded-md px-3 py-2" required />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Address 2:
                              </label>
                              <input type="text" name="address2" value={editFormData.address2} onChange={handleInputChange} className="w-full border rounded-md px-3 py-2" />
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Postcode*:
                            </label>
                            <input type="text" name="postcode" value={editFormData.postcode} onChange={handleInputChange} className="w-full border rounded-md px-3 py-2" required />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Location*:
                            </label>
                            <input type="text" name="location" value={editFormData.location} onChange={handleInputChange} className="w-full border rounded-md px-3 py-2" required />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Country*:
                            </label>
                            <select name="country" value={editFormData.country} onChange={handleInputChange} className="w-full border rounded-md px-3 py-2" required>
                              <option value="CH">Switzerland (CH)</option>
                              <option value="FR">France (FR)</option>
                              <option value="DE">Germany (DE)</option>
                              <option value="IT">Italy (IT)</option>
                            </select>
                          </div>
                          <div className="relative">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Phone:
                            </label>
                            <div className="flex items-center">
                              <div className="flex items-center border rounded-l-md px-2 py-2 bg-gray-50">
                                <img src="https://flagcdn.com/16x12/ch.png" alt="Switzerland" className="mr-1" />
                                <span>+41</span>
                              </div>
                              <input type="text" name="phone" value={editFormData.phone.replace('+41 ', '')} onChange={e => {
                          const value = e.target.value;
                          setEditFormData({
                            ...editFormData,
                            phone: value.startsWith('+41 ') ? value : `+41 ${value}`
                          });
                        }} className="w-full border border-l-0 rounded-r-md px-3 py-2" />
                            </div>
                          </div>
                          <div className="relative">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Mobile:
                            </label>
                            <div className="flex items-center">
                              <div className="flex items-center border rounded-l-md px-2 py-2 bg-gray-50">
                                <img src="https://flagcdn.com/16x12/ch.png" alt="Switzerland" className="mr-1" />
                                <span>+41</span>
                              </div>
                              <input type="text" name="mobile" value={editFormData.mobile.replace('+41 ', '')} onChange={e => {
                          const value = e.target.value;
                          setEditFormData({
                            ...editFormData,
                            mobile: value.startsWith('+41 ') ? value : `+41 ${value}`
                          });
                        }} className="w-full border border-l-0 rounded-r-md px-3 py-2" />
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Email*:
                            </label>
                            <input type="email" name="email" value={editFormData.email} onChange={handleInputChange} className="w-full border rounded-md px-3 py-2" required />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Website:
                            </label>
                            <input type="text" name="website" value={editFormData.website} onChange={handleInputChange} className="w-full border rounded-md px-3 py-2" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Language code:
                            </label>
                            <select name="languageCode" value={editFormData.languageCode} onChange={handleInputChange} className="w-full border rounded-md px-3 py-2">
                              <option value="fr">French (fr)</option>
                              <option value="de">German (de)</option>
                              <option value="it">Italian (it)</option>
                              <option value="en">English (en)</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Currency*:
                            </label>
                            <select name="currency" value={editFormData.currency} onChange={handleInputChange} className="w-full border rounded-md px-3 py-2" required>
                              <option value="CHF">Swiss Franc (CHF)</option>
                              <option value="EUR">Euro (EUR)</option>
                              <option value="USD">US Dollar (USD)</option>
                            </select>
                          </div>
                          <div className="col-span-3 flex justify-end space-x-3 mt-4">
                            <button onClick={handleCancelEdit} className="flex items-center gap-2 border px-4 py-2 rounded-md hover:bg-gray-100">
                              <XCircleIcon size={16} />
                              <span>Cancel</span>
                            </button>
                            <button onClick={handleSaveEdit} className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                              <SaveIcon size={16} />
                              <span>Save Changes</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>}
              </Fragment>)}
          </tbody>
        </table>
      </div>
    </div>;
}