import { useState, useRef } from 'react';
import { Check, X, Camera, AlertTriangle, Plus, Car, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import Card from '../common/Card';
import Button from '../common/Button';

type ServiceType = 'lavagem' | 'estetica';

interface ChecklistItem {
  id: string;
  label: string;
  checked: boolean;
  hasDamage: boolean;
  notes: string;
}

interface ChecklistImage {
  id: string;
  url: string;
  caption: string;
}

interface VehicleChecklistProps {
  serviceType: ServiceType;
  vehicleInfo?: {
    plate: string;
    model: string;
    color: string;
    clientName: string;
  };
}

export default function VehicleChecklist({ serviceType, vehicleInfo }: VehicleChecklistProps) {
  const [clientInfo, setClientInfo] = useState({
    plate: vehicleInfo?.plate || '',
    model: vehicleInfo?.model || '',
    color: vehicleInfo?.color || '',
    clientName: vehicleInfo?.clientName || '',
  });

  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>([
    { id: '1', label: 'Verificar arranhões na lataria', checked: false, hasDamage: false, notes: '' },
    { id: '2', label: 'Verificar amassados', checked: false, hasDamage: false, notes: '' },
    { id: '3', label: 'Verificar estado dos pneus', checked: false, hasDamage: false, notes: '' },
    { id: '4', label: 'Verificar interior do veículo', checked: false, hasDamage: false, notes: '' },
    { id: '5', label: 'Verificar funcionamento dos faróis', checked: false, hasDamage: false, notes: '' },
    { id: '6', label: 'Verificar nível de combustível', checked: false, hasDamage: false, notes: '' },
  ]);

  const [customItems, setCustomItems] = useState<ChecklistItem[]>([]);
  const [newItemText, setNewItemText] = useState('');
  const [images, setImages] = useState<ChecklistImage[]>([]);
  const [currentTab, setCurrentTab] = useState<'checklist' | 'photos'>('checklist');
  const [generalNotes, setGeneralNotes] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleItemToggle = (id: string, field: 'checked' | 'hasDamage') => {
    const updateItems = (items: ChecklistItem[]) => 
      items.map(item => 
        item.id === id 
          ? { ...item, [field]: !item[field] } 
          : item
      );
    
    if (checklistItems.some(item => item.id === id)) {
      setChecklistItems(updateItems(checklistItems));
    } else {
      setCustomItems(updateItems(customItems));
    }
  };

  const handleItemNotes = (id: string, notes: string) => {
    const updateItems = (items: ChecklistItem[]) => 
      items.map(item => 
        item.id === id 
          ? { ...item, notes } 
          : item
      );
    
    if (checklistItems.some(item => item.id === id)) {
      setChecklistItems(updateItems(checklistItems));
    } else {
      setCustomItems(updateItems(customItems));
    }
  };

  const handleAddCustomItem = () => {
    if (newItemText.trim()) {
      setCustomItems([
        ...customItems,
        {
          id: `custom-${Date.now()}`,
          label: newItemText.trim(),
          checked: false,
          hasDamage: false,
          notes: ''
        }
      ]);
      setNewItemText('');
    }
  };

  const handleRemoveCustomItem = (id: string) => {
    setCustomItems(customItems.filter(item => item.id !== id));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      
      // Em um ambiente real, você enviaria isso para um servidor
      // Aqui, estamos apenas criando uma URL local para demonstração
      const imageUrl = URL.createObjectURL(file);
      
      setImages([
        ...images,
        {
          id: `img-${Date.now()}`,
          url: imageUrl,
          caption: ''
        }
      ]);
    }
  };

  const handleImageCaption = (id: string, caption: string) => {
    setImages(images.map(img => 
      img.id === id 
        ? { ...img, caption } 
        : img
    ));
  };

  const handleRemoveImage = (id: string) => {
    setImages(images.filter(img => img.id !== id));
  };

  const handleClientInfoChange = (field: keyof typeof clientInfo, value: string) => {
    setClientInfo({ ...clientInfo, [field]: value });
  };

  const handleSaveChecklist = () => {
    // Em uma aplicação real, você enviaria esses dados para um servidor
    console.log('Checklist salvo:', {
      clientInfo,
      items: [...checklistItems, ...customItems],
      images,
      generalNotes
    });

    // Mostrar alguma confirmação de sucesso para o usuário
    alert('Checklist salvo com sucesso!');
  };

  const getCompletionPercentage = () => {
    const totalItems = checklistItems.length + customItems.length;
    const checkedItems = [
      ...checklistItems,
      ...customItems
    ].filter(item => item.checked).length;
    
    return Math.round((checkedItems / totalItems) * 100);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Checklist do Veículo
        <span className="text-gray-500 dark:text-gray-400 text-lg ml-2 font-normal">
          {serviceType === 'lavagem' ? 'Lavagem' : 'Estética Automotiva'}
        </span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card serviceType={serviceType} className="md:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Placa do Veículo
              </label>
              <input
                type="text"
                value={clientInfo.plate}
                onChange={(e) => handleClientInfoChange('plate', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="ABC-1234"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Modelo
              </label>
              <input
                type="text"
                value={clientInfo.model}
                onChange={(e) => handleClientInfoChange('model', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Ex: Toyota Corolla"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Cor
              </label>
              <input
                type="text"
                value={clientInfo.color}
                onChange={(e) => handleClientInfoChange('color', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Ex: Prata"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Nome do Cliente
              </label>
              <input
                type="text"
                value={clientInfo.clientName}
                onChange={(e) => handleClientInfoChange('clientName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Nome do cliente"
              />
            </div>
          </div>
          
          <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
            <button
              className={`py-2 px-4 font-medium ${
                currentTab === 'checklist'
                  ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                  : 'text-gray-500 dark:text-gray-400'
              }`}
              onClick={() => setCurrentTab('checklist')}
            >
              Checklist
            </button>
            <button
              className={`py-2 px-4 font-medium ${
                currentTab === 'photos'
                  ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                  : 'text-gray-500 dark:text-gray-400'
              }`}
              onClick={() => setCurrentTab('photos')}
            >
              Fotos
            </button>
          </div>

          {currentTab === 'checklist' ? (
            <div>
              <div className="space-y-4 mb-6">
                {checklistItems.map((item) => (
                  <div key={item.id} className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                    <div className="flex items-start">
                      <div className="flex items-center">
                        <button
                          onClick={() => handleItemToggle(item.id, 'checked')}
                          className={`w-5 h-5 rounded flex items-center justify-center mr-3 ${
                            item.checked 
                              ? 'bg-green-500 text-white' 
                              : 'border border-gray-300 dark:border-gray-600'
                          }`}
                        >
                          {item.checked && <Check className="w-4 h-4" />}
                        </button>
                      </div>
                      <div className="flex-grow">
                        <div className="flex justify-between">
                          <span className={`font-medium ${item.checked ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-800 dark:text-gray-200'}`}>
                            {item.label}
                          </span>
                          <button
                            onClick={() => handleItemToggle(item.id, 'hasDamage')}
                            className={`ml-2 p-1 rounded ${
                              item.hasDamage 
                                ? 'bg-red-100 dark:bg-red-900/30 text-red-500 dark:text-red-400' 
                                : 'text-gray-400 dark:text-gray-500'
                            }`}
                            title={item.hasDamage ? "Dano detectado" : "Marcar dano"}
                          >
                            <AlertTriangle className="w-4 h-4" />
                          </button>
                        </div>
                        
                        {(item.checked || item.hasDamage) && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            className="mt-2"
                          >
                            <textarea
                              value={item.notes}
                              onChange={(e) => handleItemNotes(item.id, e.target.value)}
                              placeholder="Adicionar observações..."
                              className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                              rows={2}
                            />
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {customItems.map((item) => (
                  <div key={item.id} className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                    <div className="flex items-start">
                      <div className="flex items-center">
                        <button
                          onClick={() => handleItemToggle(item.id, 'checked')}
                          className={`w-5 h-5 rounded flex items-center justify-center mr-3 ${
                            item.checked 
                              ? 'bg-green-500 text-white' 
                              : 'border border-gray-300 dark:border-gray-600'
                          }`}
                        >
                          {item.checked && <Check className="w-4 h-4" />}
                        </button>
                      </div>
                      <div className="flex-grow">
                        <div className="flex justify-between">
                          <span className={`font-medium ${item.checked ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-800 dark:text-gray-200'}`}>
                            {item.label}
                          </span>
                          <div className="flex items-center">
                            <button
                              onClick={() => handleItemToggle(item.id, 'hasDamage')}
                              className={`ml-2 p-1 rounded ${
                                item.hasDamage 
                                  ? 'bg-red-100 dark:bg-red-900/30 text-red-500 dark:text-red-400' 
                                  : 'text-gray-400 dark:text-gray-500'
                              }`}
                              title={item.hasDamage ? "Dano detectado" : "Marcar dano"}
                            >
                              <AlertTriangle className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleRemoveCustomItem(item.id)}
                              className="ml-2 p-1 rounded text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400"
                              title="Remover item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        
                        {(item.checked || item.hasDamage) && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            className="mt-2"
                          >
                            <textarea
                              value={item.notes}
                              onChange={(e) => handleItemNotes(item.id, e.target.value)}
                              placeholder="Adicionar observações..."
                              className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                              rows={2}
                            />
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex mb-6">
                <input
                  type="text"
                  value={newItemText}
                  onChange={(e) => setNewItemText(e.target.value)}
                  placeholder="Adicionar item personalizado..."
                  className="flex-grow px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-l-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  onKeyPress={(e) => e.key === 'Enter' && handleAddCustomItem()}
                />
                <button
                  onClick={handleAddCustomItem}
                  className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Observações Gerais
                </label>
                <textarea
                  value={generalNotes}
                  onChange={(e) => setGeneralNotes(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  rows={4}
                  placeholder="Adicione observações gerais sobre o veículo..."
                />
              </div>
            </div>
          ) : (
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {images.map((img) => (
                  <div key={img.id} className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3">
                    <div className="relative">
                      <img 
                        src={img.url} 
                        alt="Foto do veículo" 
                        className="w-full h-40 object-cover rounded-md mb-2" 
                      />
                      <button
                        onClick={() => handleRemoveImage(img.id)}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <input
                      type="text"
                      value={img.caption}
                      onChange={(e) => handleImageCaption(img.id, e.target.value)}
                      placeholder="Adicionar legenda..."
                      className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                ))}
              </div>

              <div className="flex justify-center mb-6">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="hidden"
                />
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  variant="outline"
                  icon={<Camera className="w-5 h-5" />}
                >
                  Adicionar Foto
                </Button>
              </div>
            </div>
          )}

          <div className="flex justify-end">
            <Button
              onClick={handleSaveChecklist}
              serviceType={serviceType}
            >
              Salvar Checklist
            </Button>
          </div>
        </Card>

        <Card serviceType={serviceType}>
          <div className="flex items-center justify-center mb-4">
            <div className="relative h-24 w-24">
              <Car className="w-24 h-24 text-gray-300 dark:text-gray-600" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xl font-bold text-gray-900 dark:text-white">
                  {getCompletionPercentage()}%
                </span>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-100 dark:bg-gray-700 h-2 rounded-full mb-4">
            <div 
              className={`h-full rounded-full ${
                serviceType === 'lavagem' 
                  ? 'bg-blue-500 dark:bg-blue-600' 
                  : 'bg-purple-500 dark:bg-purple-600'
              }`}
              style={{ width: `${getCompletionPercentage()}%` }}
            />
          </div>
          
          <div className="text-center mb-6">
            <h3 className="font-medium text-gray-900 dark:text-white">
              Resumo do Checklist
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {getCompletionPercentage() === 100 
                ? 'Checklist completo!' 
                : `${getCompletionPercentage()}% completo`}
            </p>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-300">Itens verificados:</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {[...checklistItems, ...customItems].filter(item => item.checked).length} / {checklistItems.length + customItems.length}
              </span>
            </div>
            
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-300">Danos detectados:</span>
              <span className="font-medium text-red-500 dark:text-red-400">
                {[...checklistItems, ...customItems].filter(item => item.hasDamage).length}
              </span>
            </div>
            
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-300">Fotos adicionadas:</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {images.length}
              </span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
} 