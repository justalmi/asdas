import { useState, useEffect, useRef } from 'react';
import { projectId, publicAnonKey } from '../utils/supabase/info.tsx';
import { CitySelector } from './CitySelector';
import { Footer } from './Footer';
import logo from 'figma:asset/84b593ad60db7af2ab06d808ceddb2e236a6742f.png';

interface MyOrdersProps {
  onNavigateToHome: () => void;
  onLogout: () => void;
}

interface Order {
  id: string;
  services: string[];
  description: string;
  budget: string;
  address: string;
  contactName: string;
  contactPhone: string;
  workType: string;
  pricingMethod: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export function MyOrders({ onNavigateToHome, onLogout }: MyOrdersProps) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [currentCity, setCurrentCity] = useState('Хабаровск');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const profileMenuRef = useRef<HTMLDivElement>(null);

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

  // Load orders from server
  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      setError('');

      try {
        const response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-06a45a2b/orders`,
          {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${publicAnonKey}`,
            },
          }
        );

        const data = await response.json();

        if (data.success) {
          console.log('Orders loaded successfully:', data.orders.length);
          setOrders(data.orders);
        } else {
          console.error('Failed to load orders:', data.error);
          setError('Не удалось загрузить заявки.');
        }
      } catch (err) {
        console.error('Error loading orders:', err);
        setError('Произошла ошибка при загрузке заявок.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return '#10b981'; // green
      case 'in_progress':
        return '#f59e0b'; // amber
      case 'completed':
        return '#6366f1'; // indigo
      default:
        return 'var(--color-text-gray)';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Активна';
      case 'in_progress':
        return 'В процессе';
      case 'completed':
        return 'Завершена';
      default:
        return status;
    }
  };

  const filteredOrders = orders.filter(order => {
    if (selectedFilter === 'all') return true;
    return order.status === selectedFilter;
  });

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
                    <a
                      href="#orders"
                      className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-gray-50"
                      style={{ color: 'var(--color-text-dark)' }}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                        <polyline points="14 2 14 8 20 8"/>
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
          {/* Page Header */}
          <div className="mb-8">
            <h1 style={{ color: 'var(--color-text-dark)' }} className="mb-2">
              Мои заявки
            </h1>
            <p style={{ color: 'var(--color-text-gray)' }}>
              Здесь вы можете просмотреть все свои заявки
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="mb-8">
            <div className="flex gap-3 flex-wrap">
              <button
                onClick={() => setSelectedFilter('all')}
                className={`px-4 py-2 rounded-lg transition-all hover:cursor-pointer ${
                  selectedFilter === 'all' ? 'text-white' : ''
                }`}
                style={{
                  backgroundColor: selectedFilter === 'all' ? 'var(--color-primary)' : 'white',
                  color: selectedFilter === 'all' ? 'white' : 'var(--color-text-dark)',
                  border: selectedFilter === 'all' ? 'none' : '2px solid var(--color-secondary)'
                }}
              >
                Все ({orders.length})
              </button>
              <button
                onClick={() => setSelectedFilter('active')}
                className={`px-4 py-2 rounded-lg transition-all hover:cursor-pointer ${
                  selectedFilter === 'active' ? 'text-white' : ''
                }`}
                style={{
                  backgroundColor: selectedFilter === 'active' ? 'var(--color-primary)' : 'white',
                  color: selectedFilter === 'active' ? 'white' : 'var(--color-text-dark)',
                  border: selectedFilter === 'active' ? 'none' : '2px solid var(--color-secondary)'
                }}
              >
                Активные ({orders.filter(o => o.status === 'active').length})
              </button>
              <button
                onClick={() => setSelectedFilter('in_progress')}
                className={`px-4 py-2 rounded-lg transition-all hover:cursor-pointer ${
                  selectedFilter === 'in_progress' ? 'text-white' : ''
                }`}
                style={{
                  backgroundColor: selectedFilter === 'in_progress' ? 'var(--color-primary)' : 'white',
                  color: selectedFilter === 'in_progress' ? 'white' : 'var(--color-text-dark)',
                  border: selectedFilter === 'in_progress' ? 'none' : '2px solid var(--color-secondary)'
                }}
              >
                В процессе ({orders.filter(o => o.status === 'in_progress').length})
              </button>
              <button
                onClick={() => setSelectedFilter('completed')}
                className={`px-4 py-2 rounded-lg transition-all hover:cursor-pointer ${
                  selectedFilter === 'completed' ? 'text-white' : ''
                }`}
                style={{
                  backgroundColor: selectedFilter === 'completed' ? 'var(--color-primary)' : 'white',
                  color: selectedFilter === 'completed' ? 'white' : 'var(--color-text-dark)',
                  border: selectedFilter === 'completed' ? 'none' : '2px solid var(--color-secondary)'
                }}
              >
                Завершённые ({orders.filter(o => o.status === 'completed').length})
              </button>
            </div>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-solid border-current border-r-transparent" style={{ color: 'var(--color-primary)' }}></div>
              <p className="mt-4" style={{ color: 'var(--color-text-gray)' }}>Загрузка заявок...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-600">
              {error}
            </div>
          )}

          {/* Empty State */}
          {!isLoading && !error && filteredOrders.length === 0 && (
            <div className="text-center py-12 bg-white rounded-2xl">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-gray)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-4">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
              </svg>
              <h3 className="mb-2" style={{ color: 'var(--color-text-dark)' }}>
                Нет заявок
              </h3>
              <p style={{ color: 'var(--color-text-gray)' }}>
                {selectedFilter === 'all' ? 'У вас пока нет созданных заявок' : `Нет заявок в категории "${getStatusText(selectedFilter)}"`}
              </p>
            </div>
          )}

          {/* Orders List */}
          {!isLoading && !error && filteredOrders.length > 0 && (
            <div className="space-y-4">
              {filteredOrders.map((order) => (
                <div key={order.id} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 style={{ color: 'var(--color-text-dark)' }}>
                          {order.workType}
                        </h3>
                        <span 
                          className="px-3 py-1 rounded-full text-sm text-white"
                          style={{ backgroundColor: getStatusColor(order.status) }}
                        >
                          {getStatusText(order.status)}
                        </span>
                      </div>
                      <p className="text-sm mb-2" style={{ color: 'var(--color-text-gray)' }}>
                        {order.services.join(', ')}
                      </p>
                    </div>
                    <div className="text-right text-sm" style={{ color: 'var(--color-text-gray)' }}>
                      <p>ID: {order.id.split('_')[1]}</p>
                      <p>{new Date(order.createdAt).toLocaleDateString('ru-RU')}</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm mb-1" style={{ color: 'var(--color-text-gray)' }}>Описание:</p>
                      <p className="text-sm line-clamp-2" style={{ color: 'var(--color-text-dark)' }}>{order.description}</p>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span style={{ color: 'var(--color-text-gray)' }}>Бюджет:</span>
                        <span style={{ color: 'var(--color-text-dark)' }}>{order.budget}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span style={{ color: 'var(--color-text-gray)' }}>Адрес:</span>
                        <span style={{ color: 'var(--color-text-dark)' }}>{order.address}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span style={{ color: 'var(--color-text-gray)' }}>Контакт:</span>
                        <span style={{ color: 'var(--color-text-dark)' }}>{order.contactName}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4 border-t" style={{ borderColor: 'var(--color-secondary)' }}>
                    <button
                      className="px-4 py-2 rounded-lg transition-all hover:shadow-md hover:cursor-pointer"
                      style={{ 
                        backgroundColor: 'var(--color-bg-light)',
                        color: 'var(--color-text-dark)'
                      }}
                    >
                      Подробнее
                    </button>
                    <button
                      className="px-4 py-2 rounded-lg text-white transition-all hover:opacity-90 hover:cursor-pointer"
                      style={{ backgroundColor: 'var(--color-primary)' }}
                    >
                      Связаться
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <Footer onNavigateToHome={onNavigateToHome} />
    </div>
  );
}
