import React, { useState, Fragment } from 'react';
import { SearchIcon, ChevronDownIcon, FileSpreadsheetIcon, XIcon, PencilIcon, TrashIcon, SaveIcon, XCircleIcon, ChevronRightIcon } from 'lucide-react';
// Type pour un produit
type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  rate: number;
};
export function Products() {
  const [showFilters, setShowFilters] = useState(false);
  // État pour stocker l'ID du produit en cours d'édition
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  // Données de produits fictives
  const [products, setProducts] = useState<Product[]>([{
    id: '1',
    name: 'Cooking',
    description: 'Description du service CookingDescription du service CookingDescription du service Cooking...',
    price: 87,
    currency: 'CHF',
    rate: 8.1
  }, {
    id: '2',
    name: 'produit A',
    description: 'description longuesdescription longuesdescription longuesdescription longues...',
    price: 1000,
    currency: 'EUR',
    rate: 0
  }, {
    id: '3',
    name: 'Sapin',
    description: "Sapin de 30m de haut!! C'est bien haut",
    price: 250,
    currency: 'CHF',
    rate: 8.1
  }, {
    id: '4',
    name: 'Service A',
    description: 'Une courte description pour ce service',
    price: 1000,
    currency: 'CHF',
    rate: 0
  }, {
    id: '5',
    name: 'test',
    description: '',
    price: 0,
    currency: 'CHF',
    rate: 0
  }, {
    id: '6',
    name: 'test A',
    description: 'test A test A test A test A test A test A test A test A test A test A test A test A test A test A...',
    price: 100,
    currency: 'CHF',
    rate: 8.1
  }]);
  // État pour stocker les valeurs temporaires lors de l'édition
  const [editFormData, setEditFormData] = useState<Product | null>(null);
  // Fonction pour ouvrir le formulaire d'édition
  const handleEditClick = (product: Product) => {
    if (editingProductId === product.id) {
      // Si on clique sur le même produit, on ferme l'accordéon
      setEditingProductId(null);
      setEditFormData(null);
    } else {
      // Sinon, on ouvre l'accordéon pour ce produit
      setEditingProductId(product.id);
      setEditFormData({
        ...product
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
    // Gestion spéciale pour les champs numériques
    if (name === 'price' || name === 'rate') {
      setEditFormData({
        ...editFormData,
        [name]: parseFloat(value) || 0
      });
    } else {
      setEditFormData({
        ...editFormData,
        [name]: value
      });
    }
  };
  // Fonction pour sauvegarder les modifications
  const handleSaveEdit = () => {
    if (!editFormData) return;
    setProducts(products.map(product => product.id === editFormData.id ? editFormData : product));
    // Fermer l'accordéon
    setEditingProductId(null);
    setEditFormData(null);
  };
  // Fonction pour annuler l'édition
  const handleCancelEdit = () => {
    setEditingProductId(null);
    setEditFormData(null);
  };
  return <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Product items</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <input type="text" placeholder="Search products" className="py-2 pl-4 pr-10 border rounded-md w-[300px]" />
            <SearchIcon className="absolute right-3 top-2.5 text-gray-400" size={18} />
            <button className="absolute right-10 top-2.5 text-gray-400" onClick={() => setShowFilters(!showFilters)}>
              <ChevronDownIcon size={18} />
            </button>
          </div>
          <button className="bg-blue-500 text-white py-2 px-6 rounded-md">
            Add a Product
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
                Category:
              </label>
              <select className="w-full border rounded-md px-3 py-2">
                <option>All categories</option>
                <option>Services</option>
                <option>Products</option>
                <option>Subscriptions</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price range:
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
                Rating:
              </label>
              <select className="w-full border rounded-md px-3 py-2">
                <option>Any rating</option>
                <option>8 and above</option>
                <option>5-8</option>
                <option>Below 5</option>
              </select>
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
            <option>All categories</option>
          </select>
          <select className="border rounded px-2 py-1 text-sm">
            <option>All currencies</option>
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
                  Name
                  <ChevronDownIcon size={16} className="ml-1" />
                </div>
              </th>
              <th className="text-left p-4 font-medium">
                <div className="flex items-center">
                  Price
                  <ChevronDownIcon size={16} className="ml-1" />
                </div>
              </th>
              <th className="text-left p-4 font-medium">
                <div className="flex items-center">
                  Current rate
                  <ChevronDownIcon size={16} className="ml-1" />
                </div>
              </th>
              <th className="text-right p-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => <Fragment key={product.id}>
                <tr className={`border-b hover:bg-gray-50 ${editingProductId === product.id ? 'bg-gray-50' : ''}`}>
                  <td className="p-4">
                    <div>
                      <div className="font-medium">{product.name}</div>
                      {product.description && <div className="text-sm text-gray-500 line-clamp-2">
                          {product.description}
                        </div>}
                    </div>
                  </td>
                  <td className="p-4">
                    {product.price} {product.currency}
                  </td>
                  <td className="p-4">{product.rate}</td>
                  <td className="p-4 text-right">
                    <div className="flex space-x-2 justify-end">
                      <button className={`${editingProductId === product.id ? 'text-blue-500' : 'text-gray-400 hover:text-blue-500'}`} title="Edit" onClick={() => handleEditClick(product)}>
                        {editingProductId === product.id ? <ChevronDownIcon size={16} /> : <PencilIcon size={16} />}
                      </button>
                      <button className="text-gray-400 hover:text-red-500" title="Delete">
                        <TrashIcon size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
                {/* Accordéon d'édition */}
                {editingProductId === product.id && editFormData && <tr>
                    <td colSpan={4} className="p-0">
                      <div className="bg-gray-50 p-6 border-b">
                        <h3 className="font-medium text-lg mb-4">
                          Edit Product
                        </h3>
                        <div className="grid grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Name:
                            </label>
                            <input type="text" name="name" value={editFormData.name} onChange={handleInputChange} className="w-full border rounded-md px-3 py-2" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Price:
                            </label>
                            <div className="flex items-center space-x-2">
                              <input type="number" name="price" value={editFormData.price} onChange={handleInputChange} className="w-full border rounded-md px-3 py-2" />
                              <select name="currency" value={editFormData.currency} onChange={handleInputChange} className="border rounded-md px-3 py-2">
                                <option>CHF</option>
                                <option>EUR</option>
                                <option>USD</option>
                              </select>
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Current rate:
                            </label>
                            <input type="number" name="rate" value={editFormData.rate} onChange={handleInputChange} step="0.1" min="0" max="10" className="w-full border rounded-md px-3 py-2" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Category:
                            </label>
                            <select className="w-full border rounded-md px-3 py-2">
                              <option>Services</option>
                              <option>Products</option>
                              <option>Subscriptions</option>
                            </select>
                          </div>
                          <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Description:
                            </label>
                            <textarea name="description" value={editFormData.description} onChange={handleInputChange} rows={3} className="w-full border rounded-md px-3 py-2" />
                          </div>
                          <div className="col-span-2 flex justify-end space-x-3">
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