interface ServicesProps {
  onNavigateToAuth: () => void;
}

export function Services({ onNavigateToAuth }: ServicesProps) {
  const services = [
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
      ),
      title: 'Строительство домов',
      description: 'Строительство загородных домов и коттеджей под ключ с использованием современных технологий.',
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
      title: 'Коммерческое строительство',
      description: 'Возведение офисных зданий, торговых центров и промышленных объектов любой сложности.',
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
          <polyline points="10 17 15 12 10 7"/>
          <line x1="15" y1="12" x2="3" y2="12"/>
        </svg>
      ),
      title: 'Ремонт и реконструкция',
      description: 'Капитальный и косметический ремонт квартир, домов и нежилых помещений.',
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
          <polyline points="14 2 14 8 20 8"/>
          <path d="M8 13h8"/>
          <path d="M8 17h8"/>
          <path d="M8 9h2"/>
        </svg>
      ),
      title: 'Отделочные работы',
      description: 'Профессиональная внутренняя и наружная отделка с применением качественных материалов.',
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
        </svg>
      ),
      title: 'Инженерные системы',
      description: 'Монтаж и обслуживание систем отопления, водоснабжения, вентиляции и кондиционирования.',
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
        </svg>
      ),
      title: 'Электромонтажные работы',
      description: 'Проектирование и монтаж электрических сетей, установка электрооборудования.',
    },
  ];

  return (
    <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 rounded-full mb-4" style={{ backgroundColor: 'var(--color-secondary)' }}>
            <span style={{ color: 'var(--color-primary-dark)' }}>Наши услуги</span>
          </div>
          
          <h2 style={{ color: 'var(--color-text-dark)' }} className="mb-4">
            Полный спектр строительных услуг
          </h2>
          
          <p style={{ color: 'var(--color-text-gray)' }} className="max-w-2xl mx-auto">
            Мы предлагаем комплексные решения для всех видов строительных и ремонтных работ
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <button
              key={index}
              onClick={onNavigateToAuth}
              className="p-8 rounded-xl border-2 transition-all hover:shadow-lg hover:-translate-y-1 text-left w-full"
              style={{ borderColor: 'var(--color-secondary)' }}
            >
              <div
                className="w-14 h-14 rounded-lg flex items-center justify-center mb-6"
                style={{ backgroundColor: 'var(--color-secondary)', color: 'var(--color-primary)' }}
              >
                {service.icon}
              </div>

              <h4 style={{ color: 'var(--color-text-dark)' }} className="mb-3">
                {service.title}
              </h4>

              <p style={{ color: 'var(--color-text-gray)' }}>
                {service.description}
              </p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
