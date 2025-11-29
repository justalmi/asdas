import { useState, useRef, useEffect } from 'react';
import { projectId, publicAnonKey } from '../utils/supabase/info.tsx';
import { CitySelector } from './CitySelector';
import logo from 'figma:asset/84b593ad60db7af2ab06d808ceddb2e236a6742f.png';

interface OrderCreationProps {
  workTypeId: string;
  preSelectedSubType?: string;
  selectedServices?: string[];
  onNavigateBack: () => void;
  onNavigateToMyOrders: () => void;
  onNavigateToHome: () => void;
  onLogout: () => void;
}

type Step = 'taskDetails' | 'pricingMethod' | 'description';

const workTypeNames: Record<string, string> = {
  finishing: 'Отделочные работы',
  facade: 'Фасадные работы',
  roofing: 'Кровельные работы',
  electrical: 'Электромонтажные работы',
  plumbing: 'Сантехнические работы',
  construction: 'Строительство и ремонт'
};

const taskTypes: Record<string, string[]> = {
  finishing: [
    'Штукатурные работы',
    'Покраска стен и потолков',
    'Поклейка обоев',
    'Укладка напольных покрытий',
    'Монтаж гипсокартона',
    'Декоративная отделка'
  ],
  facade: [
    'Утепление фасада',
    'Облицовка фасада',
    'Штукатурка фасада',
    'Покраска фасада',
    'Монтаж вентилируемого фасада',
    'Ремонт фасада'
  ],
  roofing: [
    'Монтаж кровли',
    'Ремонт кровли',
    'Утепление кровли',
    'Монтаж водосточной системы',
    'Монтаж мансардных окон',
    'Кровельные работы под ключ'
  ],
  electrical: [
    'Монтаж электропроводки',
    'Установка розеток и выключателей',
    'Монтаж освещения',
    'Установка электрощитов',
    'Замена электропроводки',
    'Подключение оборудования'
  ],
  plumbing: [
    'Монтаж водопровода',
    'Установка сантехники',
    'Монтаж отопления',
    'Монтаж канализации',
    'Установка водонагревателей',
    'Замена труб'
  ],
  construction: [
    'Возведение стен',
    'Устройство фундамента',
    'Перепланировка',
    'Капитальный ремонт',
    'Строительство под ключ',
    'Реконструкция здания'
  ]
};

export function OrderCreation({ workTypeId, preSelectedSubType, selectedServices, onNavigateBack, onNavigateToMyOrders, onNavigateToHome, onLogout }: OrderCreationProps) {
  const [currentStep, setCurrentStep] = useState<Step>('taskDetails');
  const [selectedTaskType, setSelectedTaskType] = useState<string>(preSelectedSubType || '');
  const [isTaskTypeDropdownOpen, setIsTaskTypeDropdownOpen] = useState(false);
  const [selectedPricingMethod, setSelectedPricingMethod] = useState<string>('');
  const [orderDescription, setOrderDescription] = useState(
    selectedServices && selectedServices.length > 0 
      ? `Необходимы следующие услуги:\n${selectedServices.map(s => `- ${s}`).join('\n')}`
      : ''
  );
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishError, setPublishError] = useState<string>('');

  // Additional form fields
  const [budget, setBudget] = useState('');
  const [address, setAddress] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');

  // Navigation state
  const [currentCity, setCurrentCity] = useState('Хабаровск');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  const workTypeName = workTypeNames[workTypeId] || 'Не указан';
  const availableTaskTypes = taskTypes[workTypeId] || [];

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleTaskTypeSelect = (taskType: string) => {
    setSelectedTaskType(taskType);
    setIsTaskTypeDropdownOpen(false);
  };

  const handleNextStep = () => {
    if (currentStep === 'taskDetails' && selectedTaskType) {
      setCurrentStep('pricingMethod');
    } else if (currentStep === 'pricingMethod' && selectedPricingMethod) {
      setCurrentStep('description');
    }
  };

  const isStepCompleted = (step: Step): boolean => {
    if (step === 'taskDetails') return !!selectedTaskType;
    if (step === 'pricingMethod') return !!selectedPricingMethod;
    if (step === 'description') return orderDescription.length > 0;
    return false;
  };

  const handlePublishOrder = async () => {
    setIsPublishing(true);
    setPublishError('');

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-06a45a2b/orders`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({
            services: selectedServices || [selectedTaskType],
            description: orderDescription,
            budget: budget || 'Не указан',
            address: address || 'Не указан',
            contactName: contactName || 'Гость',
            contactPhone: contactPhone || 'Не указан',
            workType: workTypeName,
            pricingMethod: selectedPricingMethod,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        console.log('Order published successfully:', data.orderId);
        // Redirect to My Orders page
        onNavigateToMyOrders();
      } else {
        console.error('Failed to publish order:', data.error);
        setPublishError('Не удалось опубликовать заявку. Попробуйте снова.');
      }
    } catch (error) {
      console.error('Error publishing order:', error);
      setPublishError('Произошла ошибка при публикации заявки.');
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--color-bg-light)' }}>
      {/* Top Header - Full Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo and City */}
            <div className="flex items-center gap-4">
              <button 
                onClick={onNavigateToHome}
                className="transition-opacity hover:opacity-80 cursor-pointer"
              >
                <img src={logo} alt="Brandoma Deal Logo" className="h-16 w-auto" />
              </button>
              <CitySelector currentCity={currentCity} onCityChange={setCurrentCity} />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <button
                onClick={onNavigateToHome}
                className="transition-colors hover:opacity-80"
                style={{ color: 'var(--color-text-gray)' }}
              >
                Главная
              </button>
              <button
                className="transition-colors hover:opacity-80"
                style={{ color: 'var(--color-text-gray)' }}
              >
                Помощь
              </button>
            </nav>

            {/* User Avatar with Dropdown */}
            <div className="hidden md:flex items-center gap-3">
              <div className="relative" ref={profileMenuRef}>
                <button
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                >
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: 'var(--color-secondary)' }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                  </div>
                  <span style={{ color: 'var(--color-text-dark)' }}>Гость</span>
                  <svg 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="var(--color-text-gray)" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className={`transition-transform ${isProfileMenuOpen ? 'rotate-180' : ''}`}
                  >
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </button>

                {/* Profile Dropdown Menu */}
                {isProfileMenuOpen && (
                  <div 
                    className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl py-2 border"
                    style={{ borderColor: 'var(--color-secondary)' }}
                  >
                    <a
                      href="#notifications"
                      className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-gray-50"
                      style={{ color: 'var(--color-text-dark)' }}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                        <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                      </svg>
                      Уведомления
                    </a>
                    <a
                      href="#messages"
                      className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-gray-50"
                      style={{ color: 'var(--color-text-dark)' }}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                      </svg>
                      Сообщения
                    </a>
                    <button
                      onClick={onNavigateToMyOrders}
                      className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-gray-50 w-full text-left"
                      style={{ color: 'var(--color-text-dark)' }}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                        <polyline points="14 2 14 8 20 8"/>
                      </svg>
                      Мои заявки
                    </button>
                    <a
                      href="#settings"
                      className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-gray-50"
                      style={{ color: 'var(--color-text-dark)' }}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="3"/>
                        <path d="M12 2v2m0 16v2m8.66-10h2m-20 0h2m15.07-6.93l-1.41 1.41M5.34 18.66l-1.41 1.41m15.07 0l-1.41-1.41M5.34 5.34L3.93 3.93"/>
                      </svg>
                      Настройки
                    </a>
                    <div className="border-t my-2" style={{ borderColor: 'var(--color-secondary)' }}></div>
                    <button
                      onClick={onLogout}
                      className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-red-50 w-full text-left"
                      style={{ color: '#dc2626' }}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                        <polyline points="16 17 21 12 16 7"/>
                        <line x1="21" y1="12" x2="9" y2="12"/>
                      </svg>
                      Выйти
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              style={{ color: 'var(--color-text-dark)' }}
            >
              {isMenuOpen ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="12" x2="21" y2="12"/>
                  <line x1="3" y1="6" x2="21" y2="6"/>
                  <line x1="3" y1="18" x2="21" y2="18"/>
                </svg>
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden pb-6">
              <nav className="flex flex-col gap-4">
                <button
                  onClick={onNavigateToHome}
                  className="py-2 transition-colors hover:opacity-80 text-left"
                  style={{ color: 'var(--color-text-gray)' }}
                >
                  Главная
                </button>
                <button
                  className="py-2 transition-colors hover:opacity-80 text-left"
                  style={{ color: 'var(--color-text-gray)' }}
                >
                  Помощь
                </button>
                <div className="flex items-center gap-2 py-2">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: 'var(--color-secondary)' }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                  </div>
                  <span style={{ color: 'var(--color-text-dark)' }}>Гость</span>
                </div>
                <div className="border-t pt-4" style={{ borderColor: 'var(--color-secondary)' }}>
                  <div className="flex flex-col gap-2">
                    <a
                      href="#notifications"
                      className="py-2 transition-colors hover:opacity-80"
                      style={{ color: 'var(--color-text-dark)' }}
                    >
                      Уведомления
                    </a>
                    <a
                      href="#messages"
                      className="py-2 transition-colors hover:opacity-80"
                      style={{ color: 'var(--color-text-dark)' }}
                    >
                      Сообщения
                    </a>
                    <button
                      onClick={onNavigateToMyOrders}
                      className="py-2 transition-colors hover:opacity-80 text-left"
                      style={{ color: 'var(--color-text-dark)' }}
                    >
                      Мои заявки
                    </button>
                    <a
                      href="#settings"
                      className="py-2 transition-colors hover:opacity-80"
                      style={{ color: 'var(--color-text-dark)' }}
                    >
                      Настройки
                    </a>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    onLogout();
                  }}
                  className="mt-4 px-6 py-3 rounded-lg text-center transition-all hover:shadow-md text-white"
                  style={{ backgroundColor: '#dc2626' }}
                >
                  Выйти
                </button>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Main Content with Sidebar */}
      <div className="flex-1 flex pt-20">
        {/* Left Sidebar Navigation */}
        <aside className="w-80 bg-white shadow-sm">
          <div className="p-6">
            <div className="mb-6">
              <button
                onClick={onNavigateBack}
                className="flex items-center gap-2 mb-4 p-2 rounded-lg hover:bg-gray-100 transition-colors hover:cursor-pointer"
                style={{ color: 'var(--color-text-dark)' }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="19" y1="12" x2="5" y2="12"/>
                  <polyline points="12 19 5 12 12 5"/>
                </svg>
                <span>Назад</span>
              </button>
              <h1 style={{ color: 'var(--color-text-dark)' }}>Создание заявки</h1>
              <p className="text-sm" style={{ color: 'var(--color-text-gray)' }}>{workTypeName}</p>
            </div>
            <h2 className="mb-6" style={{ color: 'var(--color-text-dark)' }}>Этапы оформления</h2>
            <nav className="space-y-3">
              {/* Task Details Step */}
              <button
                onClick={() => setCurrentStep('taskDetails')}
                className={`w-full text-left px-4 py-3 rounded-lg transition-all hover:cursor-pointer ${
                  currentStep === 'taskDetails' ? 'shadow-md' : ''
                }`}
                style={{
                  backgroundColor: currentStep === 'taskDetails' ? 'var(--color-primary)' : 'var(--color-bg-light)',
                  color: currentStep === 'taskDetails' ? 'white' : 'var(--color-text-dark)'
                }}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    isStepCompleted('taskDetails') ? 'bg-green-500' : currentStep === 'taskDetails' ? 'bg-white bg-opacity-20' : 'bg-gray-200'
                  }`}>
                    {isStepCompleted('taskDetails') ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    ) : (
                      <span className={currentStep === 'taskDetails' ? 'text-white' : 'text-gray-600'}>1</span>
                    )}
                  </div>
                  <span>Детали задачи</span>
                </div>
              </button>

              {/* Pricing Method Step */}
              <button
                onClick={() => selectedTaskType && setCurrentStep('pricingMethod')}
                disabled={!selectedTaskType}
                className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                  selectedTaskType ? 'hover:cursor-pointer' : 'opacity-50 cursor-not-allowed'
                } ${currentStep === 'pricingMethod' ? 'shadow-md' : ''}`}
                style={{
                  backgroundColor: currentStep === 'pricingMethod' ? 'var(--color-primary)' : 'var(--color-bg-light)',
                  color: currentStep === 'pricingMethod' ? 'white' : 'var(--color-text-dark)'
                }}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    isStepCompleted('pricingMethod') ? 'bg-green-500' : currentStep === 'pricingMethod' ? 'bg-white bg-opacity-20' : 'bg-gray-200'
                  }`}>
                    {isStepCompleted('pricingMethod') ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    ) : (
                      <span className={currentStep === 'pricingMethod' ? 'text-white' : 'text-gray-600'}>2</span>
                    )}
                  </div>
                  <span>Способ указания цены</span>
                </div>
              </button>

              {/* Description Step */}
              <button
                onClick={() => selectedPricingMethod && setCurrentStep('description')}
                disabled={!selectedPricingMethod}
                className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                  selectedPricingMethod ? 'hover:cursor-pointer' : 'opacity-50 cursor-not-allowed'
                } ${currentStep === 'description' ? 'shadow-md' : ''}`}
                style={{
                  backgroundColor: currentStep === 'description' ? 'var(--color-primary)' : 'var(--color-bg-light)',
                  color: currentStep === 'description' ? 'white' : 'var(--color-text-dark)'
                }}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    isStepCompleted('description') ? 'bg-green-500' : currentStep === 'description' ? 'bg-white bg-opacity-20' : 'bg-gray-200'
                  }`}>
                    {isStepCompleted('description') ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    ) : (
                      <span className={currentStep === 'description' ? 'text-white' : 'text-gray-600'}>3</span>
                    )}
                  </div>
                  <span>Описание работ</span>
                </div>
              </button>
            </nav>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-8">
          <div className="max-w-3xl">
            {/* Task Details Step */}
            {currentStep === 'taskDetails' && (
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <h2 className="mb-6" style={{ color: 'var(--color-text-dark)' }}>Выберите тип работ</h2>
                
                <div className="mb-6">
                  <label className="block mb-2" style={{ color: 'var(--color-text-dark)' }}>
                    Тип задачи *
                  </label>
                  <div className="relative">
                    <button
                      onClick={() => setIsTaskTypeDropdownOpen(!isTaskTypeDropdownOpen)}
                      className="w-full px-4 py-3 rounded-lg border-2 text-left flex items-center justify-between transition-all hover:cursor-pointer"
                      style={{
                        borderColor: 'var(--color-secondary)',
                        color: selectedTaskType ? 'var(--color-text-dark)' : 'var(--color-text-gray)'
                      }}
                    >
                      <span>{selectedTaskType || 'Выберите тип работ'}</span>
                      <svg 
                        width="20" 
                        height="20" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                        className={`transition-transform ${isTaskTypeDropdownOpen ? 'rotate-180' : ''}`}
                      >
                        <polyline points="6 9 12 15 18 9"/>
                      </svg>
                    </button>

                    {isTaskTypeDropdownOpen && (
                      <div 
                        className="absolute z-10 w-full mt-2 bg-white rounded-lg border-2 shadow-lg max-h-64 overflow-y-auto"
                        style={{ borderColor: 'var(--color-secondary)' }}
                      >
                        {availableTaskTypes.map((taskType, index) => (
                          <button
                            key={index}
                            onClick={() => handleTaskTypeSelect(taskType)}
                            className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors hover:cursor-pointer"
                            style={{ 
                              color: 'var(--color-text-dark)',
                              backgroundColor: selectedTaskType === taskType ? 'var(--color-bg-light)' : 'transparent'
                            }}
                          >
                            {taskType}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {selectedTaskType && (
                  <div className="mt-8">
                    <button
                      onClick={handleNextStep}
                      className="px-8 py-3 rounded-lg text-white transition-opacity hover:opacity-90 hover:cursor-pointer"
                      style={{ backgroundColor: 'var(--color-primary)' }}
                    >
                      Продолжить
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Pricing Method Step */}
            {currentStep === 'pricingMethod' && (
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <h2 className="mb-6" style={{ color: 'var(--color-text-dark)' }}>Способ указания цены</h2>
                
                <div className="space-y-4 mb-6">
                  <button
                    onClick={() => setSelectedPricingMethod('fixed')}
                    className={`w-full p-4 rounded-lg border-2 text-left transition-all hover:cursor-pointer ${
                      selectedPricingMethod === 'fixed' ? 'shadow-md' : ''
                    }`}
                    style={{
                      borderColor: selectedPricingMethod === 'fixed' ? 'var(--color-primary)' : 'var(--color-secondary)',
                      backgroundColor: selectedPricingMethod === 'fixed' ? 'var(--color-bg-light)' : 'white'
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mt-1 ${
                        selectedPricingMethod === 'fixed' ? 'border-current' : ''
                      }`}
                      style={{ 
                        borderColor: selectedPricingMethod === 'fixed' ? 'var(--color-primary)' : 'var(--color-secondary)'
                      }}>
                        {selectedPricingMethod === 'fixed' && (
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'var(--color-primary)' }}></div>
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="mb-1" style={{ color: 'var(--color-text-dark)' }}>Фиксированная цена</h3>
                        <p className="text-sm" style={{ color: 'var(--color-text-gray)' }}>
                          Укажите точную сумму за выполнение работы
                        </p>
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => setSelectedPricingMethod('hourly')}
                    className={`w-full p-4 rounded-lg border-2 text-left transition-all hover:cursor-pointer ${
                      selectedPricingMethod === 'hourly' ? 'shadow-md' : ''
                    }`}
                    style={{
                      borderColor: selectedPricingMethod === 'hourly' ? 'var(--color-primary)' : 'var(--color-secondary)',
                      backgroundColor: selectedPricingMethod === 'hourly' ? 'var(--color-bg-light)' : 'white'
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mt-1 ${
                        selectedPricingMethod === 'hourly' ? 'border-current' : ''
                      }`}
                      style={{ 
                        borderColor: selectedPricingMethod === 'hourly' ? 'var(--color-primary)' : 'var(--color-secondary)'
                      }}>
                        {selectedPricingMethod === 'hourly' && (
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'var(--color-primary)' }}></div>
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="mb-1" style={{ color: 'var(--color-text-dark)' }}>Почасовая оплата</h3>
                        <p className="text-sm" style={{ color: 'var(--color-text-gray)' }}>
                          Укажите стоимость работы за час
                        </p>
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => setSelectedPricingMethod('negotiable')}
                    className={`w-full p-4 rounded-lg border-2 text-left transition-all hover:cursor-pointer ${
                      selectedPricingMethod === 'negotiable' ? 'shadow-md' : ''
                    }`}
                    style={{
                      borderColor: selectedPricingMethod === 'negotiable' ? 'var(--color-primary)' : 'var(--color-secondary)',
                      backgroundColor: selectedPricingMethod === 'negotiable' ? 'var(--color-bg-light)' : 'white'
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mt-1 ${
                        selectedPricingMethod === 'negotiable' ? 'border-current' : ''
                      }`}
                      style={{ 
                        borderColor: selectedPricingMethod === 'negotiable' ? 'var(--color-primary)' : 'var(--color-secondary)'
                      }}>
                        {selectedPricingMethod === 'negotiable' && (
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'var(--color-primary)' }}></div>
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="mb-1" style={{ color: 'var(--color-text-dark)' }}>Договорная цена</h3>
                        <p className="text-sm" style={{ color: 'var(--color-text-gray)' }}>
                          Цена обсуждается с подрядчиками
                        </p>
                      </div>
                    </div>
                  </button>
                </div>

                {selectedPricingMethod && (
                  <div className="flex gap-4 mt-8">
                    <button
                      onClick={() => setCurrentStep('taskDetails')}
                      className="px-8 py-3 rounded-lg border-2 transition-all hover:shadow-md hover:cursor-pointer"
                      style={{ 
                        borderColor: 'var(--color-secondary)',
                        color: 'var(--color-text-dark)'
                      }}
                    >
                      Назад
                    </button>
                    <button
                      onClick={handleNextStep}
                      className="px-8 py-3 rounded-lg text-white transition-opacity hover:opacity-90 hover:cursor-pointer"
                      style={{ backgroundColor: 'var(--color-primary)' }}
                    >
                      Продолжить
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Description Step */}
            {currentStep === 'description' && (
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <h2 className="mb-6" style={{ color: 'var(--color-text-dark)' }}>Описание работ</h2>
                
                <div className="mb-6">
                  <label className="block mb-2" style={{ color: 'var(--color-text-dark)' }}>
                    Подробное описание задачи *
                  </label>
                  <textarea
                    value={orderDescription}
                    onChange={(e) => setOrderDescription(e.target.value)}
                    rows={8}
                    className="w-full px-4 py-3 rounded-lg border-2 outline-none transition-colors resize-none"
                    style={{
                      borderColor: 'var(--color-secondary)',
                      color: 'var(--color-text-dark)'
                    }}
                    placeholder="Опишите детали работы: объем, сроки, особые требования..."
                  />
                  <p className="mt-2 text-sm" style={{ color: 'var(--color-text-gray)' }}>
                    Чем подробнее описание, тем точнее будут предложения от подрядчиков
                  </p>
                </div>

                {/* Additional Fields */}
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block mb-2" style={{ color: 'var(--color-text-dark)' }}>
                      Бюджет
                    </label>
                    <input
                      type="text"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border-2 outline-none transition-colors"
                      style={{
                        borderColor: 'var(--color-secondary)',
                        color: 'var(--color-text-dark)'
                      }}
                      placeholder="Например: 100 000 ₽"
                    />
                  </div>
                  <div>
                    <label className="block mb-2" style={{ color: 'var(--color-text-dark)' }}>
                      Адрес объекта
                    </label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border-2 outline-none transition-colors"
                      style={{
                        borderColor: 'var(--color-secondary)',
                        color: 'var(--color-text-dark)'
                      }}
                      placeholder="Например: г. Хабаровск, ул. Ленина, 1"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block mb-2" style={{ color: 'var(--color-text-dark)' }}>
                      Контактное лицо
                    </label>
                    <input
                      type="text"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border-2 outline-none transition-colors"
                      style={{
                        borderColor: 'var(--color-secondary)',
                        color: 'var(--color-text-dark)'
                      }}
                      placeholder="Ваше имя"
                    />
                  </div>
                  <div>
                    <label className="block mb-2" style={{ color: 'var(--color-text-dark)' }}>
                      Телефон
                    </label>
                    <input
                      type="tel"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border-2 outline-none transition-colors"
                      style={{
                        borderColor: 'var(--color-secondary)',
                        color: 'var(--color-text-dark)'
                      }}
                      placeholder="+7 (999) 123-45-67"
                    />
                  </div>
                </div>

                {/* Summary */}
                <div className="p-4 rounded-lg mb-6" style={{ backgroundColor: 'var(--color-bg-light)' }}>
                  <h3 className="mb-3" style={{ color: 'var(--color-text-dark)' }}>Сводка заявки</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span style={{ color: 'var(--color-text-gray)' }}>Тип работ:</span>
                      <span style={{ color: 'var(--color-text-dark)' }}>{workTypeName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span style={{ color: 'var(--color-text-gray)' }}>Задача:</span>
                      <span style={{ color: 'var(--color-text-dark)' }}>{selectedTaskType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span style={{ color: 'var(--color-text-gray)' }}>Оплата:</span>
                      <span style={{ color: 'var(--color-text-dark)' }}>
                        {selectedPricingMethod === 'fixed' && 'Фиксированная цена'}
                        {selectedPricingMethod === 'hourly' && 'Почасовая оплата'}
                        {selectedPricingMethod === 'negotiable' && 'Договорная'}
                      </span>
                    </div>
                  </div>
                </div>

                {publishError && (
                  <div className="mb-4 p-4 rounded-lg" style={{ backgroundColor: '#fee2e2', color: '#dc2626' }}>
                    {publishError}
                  </div>
                )}

                <div className="flex gap-4">
                  <button
                    onClick={() => setCurrentStep('pricingMethod')}
                    className="px-8 py-3 rounded-lg border-2 transition-all hover:shadow-md hover:cursor-pointer"
                    style={{ 
                      borderColor: 'var(--color-secondary)',
                      color: 'var(--color-text-dark)'
                    }}
                    disabled={isPublishing}
                  >
                    Назад
                  </button>
                  <button
                    onClick={handlePublishOrder}
                    disabled={!orderDescription || isPublishing}
                    className={`px-8 py-3 rounded-lg text-white transition-opacity ${
                      orderDescription && !isPublishing ? 'hover:opacity-90 hover:cursor-pointer' : 'opacity-50 cursor-not-allowed'
                    }`}
                    style={{ backgroundColor: 'var(--color-primary)' }}
                  >
                    {isPublishing ? 'Публикация...' : 'Опубликовать заявку'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
