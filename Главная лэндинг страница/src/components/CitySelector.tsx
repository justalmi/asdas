import { useState } from 'react';

interface CitySelectorProps {
  currentCity: string;
  onCityChange: (city: string) => void;
}

export function CitySelector({ currentCity, onCityChange }: CitySelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const popularCities = [
    'Москва',
    'Санкт-Петербург',
    'Новосибирск',
    'Екатеринбург',
    'Казань',
    'Нижний Новгород',
    'Челябинск',
    'Самара',
    'Омск',
    'Ростов-на-Дону',
    'Уфа',
    'Красноярск',
    'Воронеж',
    'Пермь',
    'Волгоград',
    'Краснодар',
    'Саратов',
    'Тюмень',
    'Тольятти',
    'Ижевск',
    'Барнаул',
    'Ульяновск',
    'Иркутск',
    'Хабаровск',
    'Владивосток',
  ];

  const filteredCities = popularCities.filter(city =>
    city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCitySelect = (city: string) => {
    onCityChange(city);
    setIsOpen(false);
    setSearchQuery('');
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg transition-colors hover:bg-gray-100"
        style={{ color: 'var(--color-text-dark)' }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
          <circle cx="12" cy="10" r="3"/>
        </svg>
        <span>{currentCity}</span>
        <svg 
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
        >
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>

      {isOpen && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div 
            className="absolute top-full left-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border-2 z-50 overflow-hidden"
            style={{ borderColor: 'var(--color-secondary)' }}
          >
            {/* Search */}
            <div className="p-4 border-b-2" style={{ borderColor: 'var(--color-secondary)' }}>
              <div className="relative">
                <svg 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className="absolute left-3 top-1/2 -translate-y-1/2"
                  style={{ color: 'var(--color-text-gray)' }}
                >
                  <circle cx="11" cy="11" r="8"/>
                  <path d="m21 21-4.35-4.35"/>
                </svg>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Поиск города..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border-2 outline-none transition-colors"
                  style={{ 
                    borderColor: 'var(--color-secondary)',
                    color: 'var(--color-text-dark)'
                  }}
                />
              </div>
            </div>

            {/* Cities List */}
            <div className="max-h-80 overflow-y-auto">
              {filteredCities.length > 0 ? (
                <div className="py-2">
                  {filteredCities.map((city) => (
                    <button
                      key={city}
                      onClick={() => handleCitySelect(city)}
                      className="w-full px-4 py-3 text-left transition-colors hover:bg-gray-50"
                      style={{ 
                        color: city === currentCity ? 'var(--color-primary)' : 'var(--color-text-dark)'
                      }}
                    >
                      {city}
                      {city === currentCity && (
                        <svg 
                          width="16" 
                          height="16" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                          className="inline ml-2"
                        >
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="px-4 py-8 text-center" style={{ color: 'var(--color-text-gray)' }}>
                  Город не найден
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
