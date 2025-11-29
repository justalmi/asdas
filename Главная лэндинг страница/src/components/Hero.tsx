import { ImageWithFallback } from './figma/ImageWithFallback';

interface HeroProps {
  onNavigateToAuth: () => void;
}

export function Hero({ onNavigateToAuth }: HeroProps) {
  return (
    <section id="home" className="pt-32 pb-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: 'var(--color-bg-light)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div>
            <div className="inline-block px-4 py-2 rounded-full mb-6" style={{ backgroundColor: 'var(--color-secondary)' }}>
              <span style={{ color: 'var(--color-primary-dark)' }}>✓ Лицензированные подрядчики</span>
            </div>
            
            <h1 style={{ color: 'var(--color-text-dark)' }} className="mb-6">
              Надёжные строительные услуги от профессионалов
            </h1>
            
            <p style={{ color: 'var(--color-text-gray)' }} className="mb-8">
              Мы соединяем вас с проверенными подрядчиками для реализации любых строительных проектов. 
              От ремонта квартиры до строительства дома — гарантируем качество и соблюдение сроков.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button
                onClick={onNavigateToAuth}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: 'var(--color-primary)' }}
              >
                Оставить заявку
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </button>
              
              <a
                href="#services"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg border-2 transition-colors hover:bg-white/50"
                style={{ 
                  borderColor: 'var(--color-primary)',
                  color: 'var(--color-primary-dark)'
                }}
              >
                Узнать больше
              </a>
            </div>

            {/* Features */}
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
                <span style={{ color: 'var(--color-text-gray)' }}>Гарантия качества</span>
              </div>
              <div className="flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
                <span style={{ color: 'var(--color-text-gray)' }}>Точные сроки</span>
              </div>
              <div className="flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
                <span style={{ color: 'var(--color-text-gray)' }}>Прозрачные цены</span>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1634231647709-06609f7dd3ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25zdHJ1Y3Rpb24lMjB3b3JrZXJzJTIwYnVpbGRpbmd8ZW58MXx8fHwxNzY0MjU3NjYwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Строительные работы"
                className="w-full h-[500px] object-cover"
              />
            </div>
            
            {/* Stats Card */}
            <div className="absolute bottom-8 left-8 right-8 bg-white rounded-xl shadow-xl p-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div style={{ color: 'var(--color-primary)' }}>более 20.000</div>
                  <div style={{ color: 'var(--color-text-gray)' }}>Выполненных заказов</div>
                </div>
                <div className="text-center border-x" style={{ borderColor: 'var(--color-secondary)' }}>
                  <div style={{ color: 'var(--color-primary)' }}>98%</div>
                  <div style={{ color: 'var(--color-text-gray)' }}>Довольных клиентов</div>
                </div>
                <div className="text-center">
                  <div style={{ color: 'var(--color-primary)' }}>более 2000</div>
                  <div style={{ color: 'var(--color-text-gray)' }}>Специалистов</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
