import { useState, useRef, useEffect } from 'react';
import { CitySelector } from './CitySelector';
import { Footer } from './Footer';
import logo from 'figma:asset/84b593ad60db7af2ab06d808ceddb2e236a6742f.png';

interface UserDashboardProps {
  onNavigateToOrderCreation: (workType: string, subType?: string) => void;
  onNavigateToMyOrders?: () => void;
  onLogout: () => void;
  onNavigateToHome: () => void;
}

const workTypes = [
  {
    id: 'finishing',
    title: 'Отделочные работы',
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
      </svg>
    ),
    subTypes: [
      'Штукатурные работы',
      'Покраска стен и потолков',
      'Поклейка обоев',
      'Укладка напольных покрытий'
    ]
  },
  {
    id: 'facade',
    title: 'Фасадные работы',
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="2" width="16" height="20" rx="2" ry="2"/>
        <path d="M9 22v-4h6v4"/>
        <path d="M8 6h.01"/>
        <path d="M16 6h.01"/>
        <path d="M12 6h.01"/>
        <path d="M12 10h.01"/>
        <path d="M12 14h.01"/>
        <path d="M16 10h.01"/>
        <path d="M16 14h.01"/>
        <path d="M8 10h.01"/>
        <path d="M8 14h.01"/>
      </svg>
    ),
    subTypes: [
      'Утепление фасада',
      'Облицовка фасада',
      'Штукатурка фасада',
      'Покраска фасада'
    ]
  },
  {
    id: 'roofing',
    title: 'Кровельные работы',
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
    subTypes: [
      'Монтаж кровли',
      'Ремонт кровли',
      'Утепление кровли',
      'Монтаж водосточной системы'
    ]
  },
  {
    id: 'electrical',
    title: 'Электромонтажные работы',
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    ),
    subTypes: [
      'Монтаж электропроводки',
      'Установка розеток и выключателей',
      'Монтаж освещения',
      'Установка электрощитов'
    ]
  },
  {
    id: 'plumbing',
    title: 'Сантехнические работы',
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20"/>
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    ),
    subTypes: [
      'Монтаж водопровода',
      'Установка сантехники',
      'Монтаж отопления',
      'Монтаж канализации'
    ]
  },
  {
    id: 'construction',
    title: 'Строительство и ремонт',
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
        <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
        <line x1="12" y1="22.08" x2="12" y2="12"/>
      </svg>
    ),
    subTypes: [
      'Возведение стен',
      'Устройство фундамента',
      'Перепланировка',
      'Капитальный ремонт'
    ]
  }
];

export function UserDashboard({ onNavigateToOrderCreation, onLogout, onNavigateToHome }: UserDashboardProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [currentCity, setCurrentCity] = useState('Хабаровск');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubTypeClick = (workTypeId: string, subType: string) => {
    onNavigateToOrderCreation(workTypeId, subType);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-bg-light)' }}>
      {/* Header matching landing page */}
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
              <a
                href="#home"
                className="transition-colors hover:opacity-80"
                style={{ color: 'var(--color-text-gray)' }}
              >
                Главная
              </a>
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
                    <a
                      href="#orders"
                      className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-gray-50"
                      style={{ color: 'var(--color-text-dark)' }}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                        <polyline points="14 2 14 8 20 8"/>
                        <line x1="16" y1="13" x2="8" y2="13"/>
                        <line x1="16" y1="17" x2="8" y2="17"/>
                        <polyline points="10 9 9 9 8 9"/>
                      </svg>
                      Мои заявки
                    </a>
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
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg transition-colors"
              style={{ color: 'var(--color-primary)' }}
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
                <a
                  href="#home"
                  className="py-2 transition-colors hover:opacity-80"
                  style={{ color: 'var(--color-text-gray)' }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Главная
                </a>
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
                    <a
                      href="#orders"
                      className="py-2 transition-colors hover:opacity-80"
                      style={{ color: 'var(--color-text-dark)' }}
                    >
                      Мои заявки
                    </a>
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

      {/* Main Content */}
      <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Title */}
          <div className="mb-8">
            <h1 style={{ color: 'var(--color-text-dark)' }} className="mb-2">
              Панель заказчика
            </h1>
            <p style={{ color: 'var(--color-text-gray)' }}>
              Выберите тип работ для создания заявки
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: 'var(--color-bg-light)' }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                    <line x1="16" y1="13" x2="8" y2="13"/>
                    <line x1="16" y1="17" x2="8" y2="17"/>
                    <polyline points="10 9 9 9 8 9"/>
                  </svg>
                </div>
                <div>
                  <p style={{ color: 'var(--color-text-gray)' }}>Активных заявок</p>
                  <h3 style={{ color: 'var(--color-text-dark)' }}>0</h3>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: 'var(--color-bg-light)' }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                  </svg>
                </div>
                <div>
                  <p style={{ color: 'var(--color-text-gray)' }}>В процессе</p>
                  <h3 style={{ color: 'var(--color-text-dark)' }}>0</h3>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: 'var(--color-bg-light)' }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <div>
                  <p style={{ color: 'var(--color-text-gray)' }}>Завершено</p>
                  <h3 style={{ color: 'var(--color-text-dark)' }}>0</h3>
                </div>
              </div>
            </div>
          </div>

          {/* Categories Filter */}
          <div className="mb-8">
            <div className="flex gap-3 flex-wrap">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-lg transition-all hover:cursor-pointer ${
                  selectedCategory === 'all' ? 'text-white' : ''
                }`}
                style={{
                  backgroundColor: selectedCategory === 'all' ? 'var(--color-primary)' : 'white',
                  color: selectedCategory === 'all' ? 'white' : 'var(--color-text-dark)',
                  border: selectedCategory === 'all' ? 'none' : '2px solid var(--color-secondary)'
                }}
              >
                Все виды работ
              </button>
              <button
                onClick={() => setSelectedCategory('popular')}
                className={`px-4 py-2 rounded-lg transition-all hover:cursor-pointer ${
                  selectedCategory === 'popular' ? 'text-white' : ''
                }`}
                style={{
                  backgroundColor: selectedCategory === 'popular' ? 'var(--color-primary)' : 'white',
                  color: selectedCategory === 'popular' ? 'white' : 'var(--color-text-dark)',
                  border: selectedCategory === 'popular' ? 'none' : '2px solid var(--color-secondary)'
                }}
              >
                Популярные
              </button>
            </div>
          </div>

          {/* Work Types Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {workTypes.map((workType) => (
              <div
                key={workType.id}
                className="bg-white rounded-2xl p-6 shadow-sm transition-all hover:shadow-xl duration-300"
              >
                <div 
                  className="w-16 h-16 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: 'var(--color-bg-light)' }}
                >
                  <div style={{ color: 'var(--color-primary)' }}>
                    {workType.icon}
                  </div>
                </div>
                <button
                  onClick={() => onNavigateToOrderCreation(workType.id)}
                  className="mb-4 transition-opacity hover:opacity-80 hover:cursor-pointer text-left w-full"
                >
                  <h3 style={{ color: 'var(--color-text-dark)' }}>
                    {workType.title}
                  </h3>
                </button>

                {/* Sub Types - always visible */}
                <div className="space-y-2">
                  {workType.subTypes.map((subType, index) => (
                    <button
                      key={index}
                      onClick={() => handleSubTypeClick(workType.id, subType)}
                      className="w-full text-sm transition-all hover:cursor-pointer text-left py-2 px-3 rounded-lg hover:shadow-sm"
                      style={{ 
                        color: 'var(--color-text-gray)',
                        backgroundColor: 'var(--color-bg-light)'
                      }}
                    >
                      • {subType}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer onNavigateToHome={onNavigateToHome} />
    </div>
  );
}
