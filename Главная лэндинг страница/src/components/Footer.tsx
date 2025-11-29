import logo from 'figma:asset/84b593ad60db7af2ab06d808ceddb2e236a6742f.png';

interface FooterProps {
  onNavigateToHome?: () => void;
}

export function Footer({ onNavigateToHome }: FooterProps = {}) {
  return (
    <footer className="bg-white border-t-2" style={{ borderColor: 'var(--color-secondary)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-5 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <button 
                onClick={onNavigateToHome}
                className="transition-opacity hover:opacity-80 cursor-pointer"
              >
                <img src={logo} alt="Brandoma Deal Logo" className="h-16 w-auto" />
              </button>
            </div>
            <p style={{ color: 'var(--color-text-gray)' }} className="mb-4">
              Профессиональные строительные услуги с гарантией качества
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-lg flex items-center justify-center transition-opacity hover:opacity-80"
                style={{ backgroundColor: 'var(--color-secondary)' }}
                aria-label="Facebook"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg flex items-center justify-center transition-opacity hover:opacity-80"
                style={{ backgroundColor: 'var(--color-secondary)' }}
                aria-label="Instagram"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg flex items-center justify-center transition-opacity hover:opacity-80"
                style={{ backgroundColor: 'var(--color-secondary)' }}
                aria-label="YouTube"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/>
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h6 style={{ color: 'var(--color-text-dark)' }} className="mb-4">
              Услуги
            </h6>
            <ul className="space-y-2">
              {['Строительство домов', 'Коммерческое строительство', 'Ремонт и реконструкция', 'Отделочные работы', 'Инженерные системы'].map((item) => (
                <li key={item}>
                  <a
                    href="#services"
                    style={{ color: 'var(--color-text-gray)' }}
                    className="hover:opacity-80 transition-opacity"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h6 style={{ color: 'var(--color-text-dark)' }} className="mb-4">
              Компания
            </h6>
            <ul className="space-y-2">
              {['О нас', 'Наши проекты', 'Лицензии', 'Карьера', 'Блог'].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    style={{ color: 'var(--color-text-gray)' }}
                    className="hover:opacity-80 transition-opacity"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* For Contractors */}
          <div>
            <h6 style={{ color: 'var(--color-text-dark)' }} className="mb-4">
              Для подрядчиков
            </h6>
            <ul className="space-y-2">
              {['Сайт для подрядчиков', 'Вход для подрядчиков', 'Работа'].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    style={{ color: 'var(--color-text-gray)' }}
                    className="hover:opacity-80 transition-opacity"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h6 style={{ color: 'var(--color-text-dark)' }} className="mb-4">
              Контакты
            </h6>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: '2px' }}>
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                <a
                  href="tel:+74951234567"
                  style={{ color: 'var(--color-text-gray)' }}
                  className="hover:opacity-80 transition-opacity"
                >
                  +7 (495) 123-45-67
                </a>
              </li>
              <li className="flex items-start gap-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: '2px' }}>
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                <a
                  href="mailto:help@brandomadeal.ru"
                  style={{ color: 'var(--color-text-gray)' }}
                  className="hover:opacity-80 transition-opacity"
                >
                  help@brandomadeal.ru
                </a>
              </li>
              <li className="flex items-start gap-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: '2px' }}>
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                <span style={{ color: 'var(--color-text-gray)' }}>
                  г. Хабаровск, ул. Брандома, д. 69
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t" style={{ borderColor: 'var(--color-secondary)' }}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p style={{ color: 'var(--color-text-gray)' }}>
              © 2025 Сделка Brandoma. Все права защищены.
            </p>
            <div className="flex gap-6">
              <a
                href="#"
                style={{ color: 'var(--color-text-gray)' }}
                className="hover:opacity-80 transition-opacity"
              >
                Политика конфиденциальности
              </a>
              <a
                href="#"
                style={{ color: 'var(--color-text-gray)' }}
                className="hover:opacity-80 transition-opacity"
              >
                Условия использования
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
