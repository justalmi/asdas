import { useState, useRef, useEffect } from 'react';
import { CitySelector } from './CitySelector';
import logo from 'figma:asset/84b593ad60db7af2ab06d808ceddb2e236a6742f.png';

interface ServiceSelectionProps {
  workTypeId: string;
  preSelectedSubType?: string;
  onNavigateBack: () => void;
  onNavigateToOrderCreation: (selectedServices: string[]) => void;
  onLogout: () => void;
  onNavigateToHome: () => void;
}

const allServices = {
  finishing: {
    title: 'Отделочные работы',
    categories: [
      {
        name: 'Штукатурные работы',
        services: [
          'Штукатурка стен по маякам',
          'Штукатурка потолков',
          'Декоративная штукатурка',
          'Выравнивание стен',
          'Машинная штукатурка'
        ]
      },
      {
        name: 'Покраска стен и потолков',
        services: [
          'Покраска стен водоэмульсионной краской',
          'Покраска потолков',
          'Декоративная покраска',
          'Колеровка краски',
          'Покраска фасадов'
        ]
      },
      {
        name: 'Поклейка обоев',
        services: [
          'Поклейка бумажных обоев',
          'Поклейка виниловых обоев',
          'Поклейка флизелиновых обоев',
          'Поклейка фотообоев',
          'Подготовка стен под обои'
        ]
      },
      {
        name: 'Укладка напольных покрытий',
        services: [
          'Укладка ламината',
          'Укладка паркетной доски',
          'Укладка линолеума',
          'Укладка кафельной плитки',
          'Монтаж теплого пола'
        ]
      }
    ]
  },
  facade: {
    title: 'Фасадные работы',
    categories: [
      {
        name: 'Утепление фасада',
        services: [
          'Утепление пенопластом',
          'Утепление минеральнойватой',
          'Утепление пеноплексом',
          'Утепление эковатой',
          'Вентилируемый фасад'
        ]
      },
      {
        name: 'Облицовка фасада',
        services: [
          'Облицовка сайдингом',
          'Облицовка клинкерной плиткой',
          'Облицовка керамогранитом',
          'Облицовка природным камнем',
          'Монтаж фасадных панелей'
        ]
      },
      {
        name: 'Штукатурка фасада',
        services: [
          'Мокрая штукатурка фасада',
          'Декоративная штукатурка',
          'Короед',
          'Барашек',
          'Венецианская штукатурка'
        ]
      },
      {
        name: 'Покраска фасада',
        services: [
          'Покраска фасадной краской',
          'Колеровка фасадной краски',
          'Покраска по штукатурке',
          'Покраска деревянного фасада',
          'Антисептирование'
        ]
      }
    ]
  },
  roofing: {
    title: 'Кровельные работы',
    categories: [
      {
        name: 'Монтаж кровли',
        services: [
          'Монтаж металлочерепицы',
          'Монтаж мягкой кровли',
          'Монтаж профнастила',
          'Монтаж фальцевой кровли',
          'Монтаж натуральной черепицы'
        ]
      },
      {
        name: 'Ремонт кровли',
        services: [
          'Ремонт металлочерепицы',
          'Ремонт мягкой кровли',
          'Устранение протечек',
          'Замена поврежденных участков',
          'Герметизация швов'
        ]
      },
      {
        name: 'Утепление кровли',
        services: [
          'Утепление минеральнойватой',
          'Утепление пенополистиролом',
          'Пароизоляция',
          'Гидроизоляция',
          'Монтаж обрешетки'
        ]
      },
      {
        name: 'Монтаж водосточной системы',
        services: [
          'Монтаж пластиковых водостоков',
          'Монтаж металлических водостоков',
          'Установка водосточных труб',
          'Установка желобов',
          'Установка воронок и отливов'
        ]
      }
    ]
  },
  electrical: {
    title: 'Электромонтажные работы',
    categories: [
      {
        name: 'Монтаж электропроводки',
        services: [
          'Прокладка электрокабеля',
          'Штробление стен',
          'Замена электропроводки',
          'Монтаж проводки в гофре',
          'Скрытая проводка'
        ]
      },
      {
        name: 'Установка розеток и выключателей',
        services: [
          'Установка розеток',
          'Установка выключателей',
          'Перенос розеток',
          'Установка диммеров',
          'Установка USB-розеток'
        ]
      },
      {
        name: 'Монтаж освещения',
        services: [
          'Установка люстр',
          'Монтаж точечных светильников',
          'Установка бра',
          'Монтаж светодиодной ленты',
          'Установка уличного освещения'
        ]
      },
      {
        name: 'Установка электрощитов',
        services: [
          'Монтаж электрощита',
          'Сборка электрощита',
          'Установка автоматов',
          'Установка УЗО',
          'Замена счетчика'
        ]
      }
    ]
  },
  plumbing: {
    title: 'Сантехнические работы',
    categories: [
      {
        name: 'Монтаж водопровода',
        services: [
          'Монтаж холодного водоснабжения',
          'Монтаж горячего водоснабжения',
          'Замена труб водоснабжения',
          'Установка фильтров',
          'Монтаж полипропиленовых труб'
        ]
      },
      {
        name: 'Установка сантехники',
        services: [
          'Установка унитаза',
          'Установка раковины',
          'Установка ванны',
          'Установка душевой кабины',
          'Установка смесителей'
        ]
      },
      {
        name: 'Монтаж отопления',
        services: [
          'Монтаж радиаторов отопления',
          'Замена батарей',
          'Установка котла',
          'Монтаж теплого пола',
          'Опрессовка системы отопления'
        ]
      },
      {
        name: 'Монтаж канализации',
        services: [
          'Монтаж внутренней канализации',
          'Монтаж наружной канализации',
          'Замена канализационных труб',
          'Установка септика',
          'Прочистка канализации'
        ]
      }
    ]
  },
  construction: {
    title: 'Строительство и ремонт',
    categories: [
      {
        name: 'Возведение стен',
        services: [
          'Кирпичная кладка',
          'Кладка из газоблоков',
          'Кладка из пеноблоков',
          'Монтаж перегородок',
          'Армирование кладки'
        ]
      },
      {
        name: 'Устройство фундамента',
        services: [
          'Ленточный фундамент',
          'Плитный фундамент',
          'Свайный фундамент',
          'Столбчатый фундамент',
          'Армирование фундамента'
        ]
      },
      {
        name: 'Перепланировка',
        services: [
          'Снос стен',
          'Демонтаж перегородок',
          'Устройство проемов',
          'Усиление проемов',
          'Согласование перепланировки'
        ]
      },
      {
        name: 'Капитальный ремонт',
        services: [
          'Демонтажные работы',
          'Черновая отделка',
          'Чистовая отделка',
          'Замена коммуникаций',
          'Комплексный ремонт квартир'
        ]
      }
    ]
  }
};

export function ServiceSelection({ workTypeId, preSelectedSubType, onNavigateBack, onNavigateToOrderCreation, onLogout, onNavigateToHome }: ServiceSelectionProps) {
  const [currentCity, setCurrentCity] = useState('Хабаровск');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(preSelectedSubType || '');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
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

  const workTypeData = allServices[workTypeId as keyof typeof allServices] || allServices.finishing;

  const selectService = (service: string) => {
    // Сразу переходим к созданию заказа с выбранной услугой
    onNavigateToOrderCreation([service]);
  };

  // Filter services based on search
  const filteredCategories = workTypeData.categories.map(category => ({
    ...category,
    services: category.services.filter(service => 
      service.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.services.length > 0);

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-bg-light)' }}>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-4">
              <button 
                onClick={onNavigateToHome}
                className="transition-opacity hover:opacity-80 cursor-pointer"
              >
                <img src={logo} alt="Brandoma Deal Logo" className="h-16 w-auto" />
              </button>
              <CitySelector currentCity={currentCity} onCityChange={setCurrentCity} />
            </div>

            <nav className="hidden md:flex items-center gap-8">
              <a href="#home" className="transition-colors hover:opacity-80" style={{ color: 'var(--color-text-gray)' }}>Главная</a>
              <button className="transition-colors hover:opacity-80" style={{ color: 'var(--color-text-gray)' }}>Помощь</button>
            </nav>

            <div className="hidden md:flex items-center gap-3">
              <div className="relative" ref={profileMenuRef}>
                <button onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--color-secondary)' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                  </div>
                  <span style={{ color: 'var(--color-text-dark)' }}>Гость</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-gray)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform ${isProfileMenuOpen ? 'rotate-180' : ''}`}>
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </button>

                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl py-2 border" style={{ borderColor: 'var(--color-secondary)' }}>
                    <a href="#notifications" className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-gray-50" style={{ color: 'var(--color-text-dark)' }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                        <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                      </svg>
                      Уведомления
                    </a>
                    <a href="#messages" className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-gray-50" style={{ color: 'var(--color-text-dark)' }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                      </svg>
                      Сообщения
                    </a>
                    <a href="#orders" className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-gray-50" style={{ color: 'var(--color-text-dark)' }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                        <polyline points="14 2 14 8 20 8"/>
                        <line x1="16" y1="13" x2="8" y2="13"/>
                        <line x1="16" y1="17" x2="8" y2="17"/>
                        <polyline points="10 9 9 9 8 9"/>
                      </svg>
                      Мои заявки
                    </a>
                    <a href="#settings" className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-gray-50" style={{ color: 'var(--color-text-dark)' }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="3"/>
                        <path d="M12 1v6m0 6v6m-8-7h6m6 0h6m-15.364 6.364l4.243-4.243m4.243 4.243l4.242-4.242M6.636 6.636l4.243 4.243m4.243-4.243l4.242 4.243"/>
                      </svg>
                      Настройки
                    </a>
                    <div className="border-t my-2" style={{ borderColor: 'var(--color-secondary)' }}></div>
                    <button onClick={onLogout} className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-red-50 w-full text-left" style={{ color: '#dc2626' }}>
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

            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 rounded-lg transition-colors" style={{ color: 'var(--color-primary)' }}>
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
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header with back button */}
          <div className="mb-8">
            <button
              onClick={onNavigateBack}
              className="flex items-center gap-2 mb-4 transition-opacity hover:opacity-80"
              style={{ color: 'var(--color-primary)' }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"/>
                <polyline points="12 19 5 12 12 5"/>
              </svg>
              Назад
            </button>
            <h1 style={{ color: 'var(--color-text-dark)' }} className="mb-2">
              {workTypeData.title}
            </h1>
            <p style={{ color: 'var(--color-text-gray)' }}>
              Выберите необходимые услуги
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Поиск услуг..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pl-12 rounded-xl border-2 transition-all focus:outline-none"
                style={{ 
                  borderColor: 'var(--color-secondary)',
                  backgroundColor: 'white'
                }}
              />
              <svg 
                className="absolute left-4 top-1/2 transform -translate-y-1/2" 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="var(--color-text-gray)" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
            </div>
          </div>

          {/* Services Grid with Categories */}
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Left Sidebar - Categories Menu */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-32">
                <h3 className="mb-4" style={{ color: 'var(--color-text-dark)' }}>
                  Категории
                </h3>
                <div className="space-y-2">
                  {workTypeData.categories.map((category, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedCategory(category.name)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                        selectedCategory === category.name ? 'text-white' : ''
                      }`}
                      style={{
                        backgroundColor: selectedCategory === category.name ? 'var(--color-primary)' : 'var(--color-bg-light)',
                        color: selectedCategory === category.name ? 'white' : 'var(--color-text-dark)'
                      }}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Content - Services List */}
            <div className="lg:col-span-3">
              <div className="space-y-6">
                {filteredCategories.map((category, catIndex) => (
                  <div key={catIndex} className="bg-white rounded-2xl p-6 shadow-sm">
                    <h3 className="mb-4" style={{ color: 'var(--color-text-dark)' }}>
                      {category.name}
                    </h3>
                    <div className="grid md:grid-cols-2 gap-3">
                      {category.services.map((service, servIndex) => (
                        <button
                          key={servIndex}
                          onClick={() => selectService(service)}
                          className="flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all hover:shadow-md hover:scale-105"
                          style={{ backgroundColor: 'var(--color-bg-light)' }}
                        >
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="9 11 12 14 22 4"/>
                            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
                          </svg>
                          <span className="text-left" style={{ color: 'var(--color-text-dark)' }}>
                            {service}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
