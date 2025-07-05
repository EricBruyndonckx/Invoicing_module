import React, { useState } from 'react';
import { MoreVerticalIcon, PlusIcon, ArrowLeftIcon, CheckCircleIcon, CircleIcon, ChevronRightIcon, SaveIcon } from 'lucide-react';
// Type pour un compte bancaire
type BankAccount = {
  id: string;
  name: string;
  iban: string;
  currency: string;
  isEbicsConnected: boolean;
  additionalInfo?: string;
  address1?: string;
  address2?: string;
  postcode?: string;
  city?: string;
  country?: string;
  swift?: string;
};
// Type pour les étapes EBICS
type EbicsStep = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  bankSpecific: boolean;
};
// Liste des banques supportées
const supportedBanks = ['UBS', 'PostFinance', 'Raiffeisen', 'BCV', 'BCVS', 'BCGE', 'BCNE', 'BCFR'];
export function Banking() {
  // État pour les comptes bancaires
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([{
    id: '1',
    name: 'Raiffeisen (CHF)',
    iban: 'CH0880808009563367409',
    currency: 'CHF',
    isEbicsConnected: true,
    country: 'CH',
    swift: 'RAIFCH22'
  }, {
    id: '2',
    name: 'Banque Raiffeisen de Lavaux (Test) (CHF)',
    iban: 'CH11 8080 8009 1942 7284 9',
    currency: 'CHF',
    isEbicsConnected: false,
    country: 'CH',
    swift: 'RAIFCH22'
  }, {
    id: '3',
    name: 'Raiffeisen (CHF)',
    iban: 'CH08 8080 8009 5633 6740 9',
    currency: 'CHF',
    isEbicsConnected: false,
    country: 'CH',
    swift: 'RAIFCH22'
  }]);
  // État pour le mode d'affichage (liste ou formulaire)
  const [displayMode, setDisplayMode] = useState<'list' | 'form' | 'ebics-setup'>('list');
  // État pour le compte en cours d'édition
  const [currentAccount, setCurrentAccount] = useState<BankAccount | null>(null);
  // État pour la banque sélectionnée dans le processus EBICS
  const [selectedBank, setSelectedBank] = useState<string | null>(null);
  // Étapes génériques du processus EBICS
  const [ebicsSteps, setEbicsSteps] = useState<EbicsStep[]>([{
    id: 1,
    title: 'Initialisation',
    description: 'Créez votre compte bancaire dans WeCount',
    completed: false,
    bankSpecific: false
  }, {
    id: 2,
    title: 'Demande de connexion EBICS',
    description: 'Générez votre demande de connexion EBICS',
    completed: false,
    bankSpecific: false
  }, {
    id: 3,
    title: 'Soumission à la banque',
    description: 'Soumettez votre demande à votre banque',
    completed: false,
    bankSpecific: true
  }, {
    id: 4,
    title: 'Validation par la banque',
    description: 'Attendez la validation de votre banque',
    completed: false,
    bankSpecific: true
  }, {
    id: 5,
    title: 'Activation',
    description: 'Activez la connexion EBICS dans WeCount',
    completed: false,
    bankSpecific: false
  }]);
  // Fonction pour commencer l'ajout d'un nouveau compte
  const handleAddAccount = () => {
    setCurrentAccount({
      id: String(Date.now()),
      name: '',
      iban: '',
      currency: 'CHF',
      isEbicsConnected: false,
      country: 'CH'
    });
    setDisplayMode('form');
  };
  // Fonction pour éditer un compte existant
  const handleEditAccount = (account: BankAccount) => {
    setCurrentAccount({
      ...account
    });
    setDisplayMode('form');
  };
  // Fonction pour commencer le processus EBICS
  const handleStartEbicsSetup = (account: BankAccount) => {
    setCurrentAccount({
      ...account
    });
    setDisplayMode('ebics-setup');
    // Réinitialiser les étapes
    setEbicsSteps(ebicsSteps.map(step => ({
      ...step,
      completed: false
    })));
    setSelectedBank(null);
  };
  // Fonction pour mettre à jour les champs du formulaire
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (!currentAccount) return;
    const {
      name,
      value
    } = e.target;
    setCurrentAccount({
      ...currentAccount,
      [name]: value
    });
  };
  // Fonction pour sauvegarder le compte
  const handleSaveAccount = () => {
    if (!currentAccount) return;
    // Vérifier si c'est un nouveau compte ou une mise à jour
    if (bankAccounts.some(account => account.id === currentAccount.id)) {
      // Mise à jour d'un compte existant
      setBankAccounts(bankAccounts.map(account => account.id === currentAccount.id ? currentAccount : account));
    } else {
      // Ajout d'un nouveau compte
      setBankAccounts([...bankAccounts, currentAccount]);
    }
    // Retourner à la liste
    setDisplayMode('list');
    setCurrentAccount(null);
  };
  // Fonction pour sélectionner une banque dans le processus EBICS
  const handleSelectBank = (bank: string) => {
    setSelectedBank(bank);
    // Marquer la première étape comme complétée
    const updatedSteps = [...ebicsSteps];
    updatedSteps[0].completed = true;
    setEbicsSteps(updatedSteps);
  };
  // Fonction pour avancer dans le processus EBICS
  const handleNextEbicsStep = () => {
    // Trouver la prochaine étape non complétée
    const currentStepIndex = ebicsSteps.findIndex(step => !step.completed);
    if (currentStepIndex >= 0 && currentStepIndex < ebicsSteps.length - 1) {
      const updatedSteps = [...ebicsSteps];
      updatedSteps[currentStepIndex].completed = true;
      setEbicsSteps(updatedSteps);
    }
  };
  // Fonction pour terminer le processus EBICS
  const handleCompleteEbicsSetup = () => {
    if (!currentAccount) return;
    // Mettre à jour le compte pour indiquer qu'il est connecté via EBICS
    const updatedAccount = {
      ...currentAccount,
      isEbicsConnected: true
    };
    setBankAccounts(bankAccounts.map(account => account.id === updatedAccount.id ? updatedAccount : account));
    // Retourner à la liste
    setDisplayMode('list');
    setCurrentAccount(null);
  };
  // Rendu de la liste des comptes
  const renderAccountsList = () => <div className="max-w-[1200px]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Banking</h1>
        <button className="bg-blue-500 text-white py-2 px-6 rounded-md flex items-center gap-2" onClick={handleAddAccount}>
          <PlusIcon size={18} />
          <span>New bank account</span>
        </button>
      </div>
      {/* Liste des comptes bancaires */}
      <div className="space-y-4">
        {bankAccounts.map(account => <div key={account.id} className="bg-white rounded-md shadow-sm border overflow-hidden relative">
            {account.isEbicsConnected && <div className="absolute top-0 right-0 bg-green-500 text-white px-3 py-1 rounded-bl-md text-xs font-medium flex items-center">
                <img src="https://www.ebics.org/typo3conf/ext/ebics_template/Resources/Public/Images/logo.svg" alt="EBICS" className="h-4 mr-1" />
                Connected
              </div>}
            <div className="p-4 flex justify-between items-center">
              <div>
                <div className="font-medium">{account.name}</div>
                <div className="text-sm text-gray-500">{account.iban}</div>
              </div>
              <div className="flex items-center space-x-2">
                {!account.isEbicsConnected && <button className="border border-blue-500 text-blue-500 px-3 py-1 rounded-md text-sm hover:bg-blue-50" onClick={() => handleStartEbicsSetup(account)}>
                    Connect with EBICS
                  </button>}
                <button className="text-gray-400 hover:text-gray-600" onClick={() => handleEditAccount(account)}>
                  <MoreVerticalIcon size={18} />
                </button>
              </div>
            </div>
          </div>)}
      </div>
    </div>;
  // Rendu du formulaire d'ajout/édition de compte
  const renderAccountForm = () => <div className="max-w-[800px]">
      <div className="mb-6">
        <button className="flex items-center text-gray-600 hover:text-blue-500" onClick={() => {
        setDisplayMode('list');
        setCurrentAccount(null);
      }}>
          <ArrowLeftIcon size={18} className="mr-2" />
          <span>Back</span>
        </button>
      </div>
      <h1 className="text-2xl font-bold mb-6">
        {currentAccount?.id ? 'Edit bank account' : 'Create bank account'}
      </h1>
      <div className="bg-white p-6 rounded-md shadow-sm border">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bank name*
            </label>
            <input type="text" name="name" value={currentAccount?.name || ''} onChange={handleInputChange} className="w-full border rounded-md px-3 py-2" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Further information*
            </label>
            <input type="text" name="currency" value={currentAccount?.currency || ''} onChange={handleInputChange} className="w-full border rounded-md px-3 py-2" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address 1*
            </label>
            <input type="text" name="address1" value={currentAccount?.address1 || ''} onChange={handleInputChange} className="w-full border rounded-md px-3 py-2" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address 2
            </label>
            <input type="text" name="address2" value={currentAccount?.address2 || ''} onChange={handleInputChange} className="w-full border rounded-md px-3 py-2" />
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Postcode*
              </label>
              <input type="text" name="postcode" value={currentAccount?.postcode || ''} onChange={handleInputChange} className="w-full border rounded-md px-3 py-2" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City*
              </label>
              <input type="text" name="city" value={currentAccount?.city || ''} onChange={handleInputChange} className="w-full border rounded-md px-3 py-2" required />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Country code*
            </label>
            <input type="text" name="country" value={currentAccount?.country || ''} onChange={handleInputChange} className="w-full border rounded-md px-3 py-2" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              IBAN*
            </label>
            <input type="text" name="iban" value={currentAccount?.iban || ''} onChange={handleInputChange} className="w-full border rounded-md px-3 py-2" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              SWIFT
            </label>
            <input type="text" name="swift" value={currentAccount?.swift || ''} onChange={handleInputChange} className="w-full border rounded-md px-3 py-2" />
          </div>
          <div className="flex justify-center mt-8">
            <button onClick={handleSaveAccount} className="flex items-center gap-2 bg-blue-500 text-white px-8 py-3 rounded-md hover:bg-blue-600">
              <SaveIcon size={18} />
              <span>Save</span>
            </button>
          </div>
        </div>
      </div>
    </div>;
  // Rendu de la configuration EBICS
  const renderEbicsSetup = () => <div className="max-w-[800px]">
      <div className="mb-6">
        <button className="flex items-center text-gray-600 hover:text-blue-500" onClick={() => {
        setDisplayMode('list');
        setCurrentAccount(null);
      }}>
          <ArrowLeftIcon size={18} className="mr-2" />
          <span>Back</span>
        </button>
      </div>
      <h1 className="text-2xl font-bold mb-2">Connect to EBICS</h1>
      <p className="text-gray-600 mb-6">
        Follow these steps to connect your bank account to EBICS. The process
        may vary depending on your bank.
      </p>
      {!selectedBank ? <div className="bg-white p-6 rounded-md shadow-sm border">
          <h2 className="text-lg font-medium mb-4">Select your bank</h2>
          <div className="grid grid-cols-2 gap-4">
            {supportedBanks.map(bank => <button key={bank} className="border p-4 rounded-md hover:border-blue-500 hover:bg-blue-50 flex items-center justify-between" onClick={() => handleSelectBank(bank)}>
                <span>{bank}</span>
                <ChevronRightIcon size={18} className="text-gray-400" />
              </button>)}
          </div>
        </div> : <div className="bg-white p-6 rounded-md shadow-sm border">
          <h2 className="text-lg font-medium mb-2">
            Connect {currentAccount?.name} to {selectedBank}
          </h2>
          <p className="text-gray-600 mb-6">
            Follow these steps to establish an EBICS connection with{' '}
            {selectedBank}.
          </p>
          <div className="space-y-6">
            {ebicsSteps.map((step, index) => <div key={step.id} className="flex">
                <div className="mr-4">
                  {step.completed ? <CheckCircleIcon size={24} className="text-green-500" /> : <CircleIcon size={24} className={index === ebicsSteps.findIndex(s => !s.completed) ? 'text-blue-500' : 'text-gray-300'} />}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                  {step.bankSpecific && <div className="mt-2 text-sm text-amber-600 bg-amber-50 p-2 rounded">
                      This step is specific to {selectedBank}. Please follow
                      their instructions.
                    </div>}
                </div>
              </div>)}
          </div>
          <div className="mt-8 flex justify-end space-x-4">
            {ebicsSteps.every(step => step.completed) ? <button onClick={handleCompleteEbicsSetup} className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600">
                Complete Setup
              </button> : <button onClick={handleNextEbicsStep} className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600">
                Next Step
              </button>}
          </div>
        </div>}
    </div>;
  // Rendu conditionnel selon le mode d'affichage
  return <div className="w-full">
      {displayMode === 'list' && renderAccountsList()}
      {displayMode === 'form' && renderAccountForm()}
      {displayMode === 'ebics-setup' && renderEbicsSetup()}
    </div>;
}