export function Process() {
  const steps = [
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 11l3 3L22 4"/>
          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
        </svg>
      ),
      number: '01',
      title: 'Оставьте заявку',
      description: 'Заполните форму или позвоните нам. Мы обсудим ваш проект и составим предварительную смету.',
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      ),
      number: '02',
      title: 'Подбор подрядчика',
      description: 'Наши специалисты подберут оптимального подрядчика с учётом специфики вашего проекта.',
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
          <line x1="16" y1="2" x2="16" y2="6"/>
          <line x1="8" y1="2" x2="8" y2="6"/>
          <line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
      ),
      number: '03',
      title: 'Планирование работ',
      description: 'Составляем детальный план работ, утверждаем сроки и согласовываем все детали проекта.',
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
          <polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
      ),
      number: '04',
      title: 'Выполнение и сдача',
      description: 'Контролируем качество на всех этапах. Принимаем работу и передаём вам готовый объект.',
    },
  ];

  return (
    <section id="process" className="py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: 'var(--color-bg-light)' }}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 rounded-full mb-4" style={{ backgroundColor: 'var(--color-secondary)' }}>
            <span style={{ color: 'var(--color-primary-dark)' }}>Как мы работаем</span>
          </div>
          
          <h2 style={{ color: 'var(--color-text-dark)' }} className="mb-4">
            Простой и прозрачный процесс
          </h2>
          
          <p style={{ color: 'var(--color-text-gray)' }} className="max-w-2xl mx-auto">
            Мы разработали удобную систему взаимодействия, чтобы ваш проект был реализован качественно и в срок
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-full w-full h-0.5" style={{ backgroundColor: 'var(--color-secondary)' }}>
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full" style={{ backgroundColor: 'var(--color-primary)' }} />
                </div>
              )}

              <div className="relative z-10">
                {/* Icon */}
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto"
                  style={{ backgroundColor: 'var(--color-primary)' }}
                >
                  {step.icon}
                </div>

                {/* Number */}
                <div className="text-center mb-4">
                  <span style={{ color: 'var(--color-primary-light)' }}>
                    {step.number}
                  </span>
                </div>

                {/* Content */}
                <div className="text-center">
                  <h5 style={{ color: 'var(--color-text-dark)' }} className="mb-3">
                    {step.title}
                  </h5>
                  
                  <p style={{ color: 'var(--color-text-gray)' }}>
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white rounded-xl">
            <div style={{ color: 'var(--color-primary)' }} className="mb-2">Бесплатная консультация</div>
            <p style={{ color: 'var(--color-text-gray)' }}>Поможем определиться с выбором и рассчитаем смету</p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-xl">
            <div style={{ color: 'var(--color-primary)' }} className="mb-2">Договор и гарантии</div>
            <p style={{ color: 'var(--color-text-gray)' }}>Официальное оформление с юридической защитой</p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-xl">
            <div style={{ color: 'var(--color-primary)' }} className="mb-2">Контроль качества</div>
            <p style={{ color: 'var(--color-text-gray)' }}>Наш менеджер следит за ходом работ</p>
          </div>
        </div>
      </div>
    </section>
  );
}
