import { useState } from 'react';
import { CitySelector } from './CitySelector';
import logo from 'figma:asset/84b593ad60db7af2ab06d808ceddb2e236a6742f.png';

interface HeaderProps {
  onNavigateToAuth: () => void;
  onNavigateToHome?: () => void;
}

export function Header({ onNavigateToAuth, onNavigateToHome }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentCity, setCurrentCity] = useState('Хабаровск');

  return (
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
              onClick={onNavigateToAuth}
              className="transition-colors hover:opacity-80"
              style={{ color: 'var(--color-text-gray)' }}
            >
              Помощь
            </button>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <button
              onClick={onNavigateToAuth}
              className="px-6 py-3 rounded-lg text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: 'var(--color-primary)' }}
            >
              Вход и регистрация
            </button>
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
                onClick={() => {
                  setIsMenuOpen(false);
                  onNavigateToAuth();
                }}
                className="py-2 transition-colors hover:opacity-80 text-left"
                style={{ color: 'var(--color-text-gray)' }}
              >
                Помощь
              </button>
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  onNavigateToAuth();
                }}
                className="mt-4 px-6 py-3 rounded-lg text-white text-center transition-opacity hover:opacity-90"
                style={{ backgroundColor: 'var(--color-primary)' }}
              >
                Вход и регистрация
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
