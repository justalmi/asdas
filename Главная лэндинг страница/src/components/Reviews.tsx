export function Reviews() {
  const reviews = [
    {
      name: 'Анна Петрова',
      rating: 5,
      text: 'Работали с подрядчиком Иваном Смирновым по строительству дома. Отличная работа! Построили дом точно в срок, качество на высшем уровне. Особенно порадовало внимательное отношение к деталям.',
      avatar: 'АП',
      contractor: 'Иван Смирнов',
      contractorProfile: 'Строительство домов',
    },
    {
      name: 'Дмитрий Соколов',
      rating: 5,
      text: 'Нашли подрядчика Ольгу Васильеву через платформу для ремонта офиса. Всё прошло гладко, без задержек. Очень ответственный специалист. Рекомендую всем!',
      avatar: 'ДС',
      contractor: 'Ольга Васильева',
      contractorProfile: 'Ремонт и реконструкция',
    },
    {
      name: 'Елена Иванова',
      rating: 5,
      text: 'Сотрудничали с мастером Петром Николаевым по отделочным работам. Сделали капремонт квартиры под ключ. Результат превзошёл ожидания! Спасибо за профессионализм!',
      avatar: 'ЕИ',
      contractor: 'Петр Николаев',
      contractorProfile: 'Отделочные работы',
    },
    {
      name: 'Михаил Кузнецов',
      rating: 5,
      text: 'Подрядчик Андрей Морозов установил систему отопления в коттедже. Работа выполнена качественно, всё объяснил и показал. Отличный специалист по инженерным системам!',
      avatar: 'МК',
      contractor: 'Андрей Морозов',
      contractorProfile: 'Инженерные системы',
    },
    {
      name: 'Светлана Романова',
      rating: 5,
      text: 'Мастер Сергей Федоров провёл полную замену электропроводки в магазине. Работал быстро и аккуратно, соблюдал все нормы безопасности. Очень довольны результатом!',
      avatar: 'СР',
      contractor: 'Сергей Федоров',
      contractorProfile: 'Электромонтажные работы',
    },
    {
      name: 'Алексей Волков',
      rating: 5,
      text: 'Благодарю подрядчика Марину Лебедеву за качественное строительство бизнес-центра. Проект был сложный, но все сроки соблюдены. Профессионал своего дела!',
      avatar: 'АВ',
      contractor: 'Марина Лебедева',
      contractorProfile: 'Коммерческое строительство',
    },
  ];

  return (
    <section id="reviews" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 rounded-full mb-4" style={{ backgroundColor: 'var(--color-secondary)' }}>
            <span style={{ color: 'var(--color-primary-dark)' }}>Отзывы</span>
          </div>
          
          <h2 style={{ color: 'var(--color-text-dark)' }} className="mb-4">
            Что говорят наши клиенты
          </h2>
          
          <p style={{ color: 'var(--color-text-gray)' }} className="max-w-2xl mx-auto">
            Мы гордимся доверием наших клиентов и стремимся превосходить их ожидания
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="p-8 rounded-xl border-2 relative"
              style={{ 
                borderColor: 'var(--color-secondary)',
                backgroundColor: 'var(--color-bg-light)'
              }}
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 opacity-20">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/>
                  <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/>
                </svg>
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <svg
                    key={i}
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="var(--color-primary)"
                    stroke="var(--color-primary)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                ))}
              </div>

              {/* Contractor Info Badge */}
              <div className="mb-4 px-3 py-2 rounded-lg inline-block" style={{ backgroundColor: 'var(--color-secondary)' }}>
                <div style={{ color: 'var(--color-primary-dark)' }}>
                  Подрядчик: {review.contractor}
                </div>
                <div style={{ color: 'var(--color-text-gray)', fontSize: '0.875rem' }}>
                  {review.contractorProfile}
                </div>
              </div>

              {/* Review Text */}
              <p style={{ color: 'var(--color-text-gray)' }} className="mb-6">
                {review.text}
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: 'var(--color-primary)' }}
                >
                  <span className="text-white">{review.avatar}</span>
                </div>
                
                <div>
                  <div style={{ color: 'var(--color-text-dark)' }}>
                    {review.name}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
