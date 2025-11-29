import { useState } from 'react';

interface LoginProps {
  onNavigateToRegister: () => void;
  onNavigateToHome: () => void;
  onNavigateToUserDashboard?: () => void;
}

export function Login({ onNavigateToRegister, onNavigateToHome, onNavigateToUserDashboard }: LoginProps) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login
    console.log('Login submitted:', formData);
    // После успешного входа перенаправить на dashboard
    if (onNavigateToUserDashboard) {
      onNavigateToUserDashboard();
    } else {
      onNavigateToHome();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleGuestLogin = () => {
    // Вход как гость
    if (onNavigateToUserDashboard) {
      onNavigateToUserDashboard();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12" style={{ backgroundColor: 'var(--color-bg-light)' }}>
      <div className="max-w-md w-full">
        {/* Back Button */}
        <button
          onClick={onNavigateToHome}
          className="mb-8 flex items-center gap-2 transition-opacity hover:opacity-80 hover:cursor-pointer"
          style={{ color: 'var(--color-text-gray)' }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"/>
            <polyline points="12 19 5 12 12 5"/>
          </svg>
          Вернуться на главную
        </button>

        {/* Login Form */}
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'var(--color-primary)' }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 22V12H15V22" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h2 style={{ color: 'var(--color-text-dark)' }} className="mb-2">
              Вход в систему
            </h2>
            <p style={{ color: 'var(--color-text-gray)' }}>
              Войдите в свой аккаунт
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block mb-2"
                style={{ color: 'var(--color-text-dark)' }}
              >
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border-2 outline-none transition-colors"
                style={{
                  borderColor: 'var(--color-secondary)',
                  color: 'var(--color-text-dark)',
                }}
                placeholder="your@email.ru"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block mb-2"
                style={{ color: 'var(--color-text-dark)' }}
              >
                Пароль *
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border-2 outline-none transition-colors"
                style={{
                  borderColor: 'var(--color-secondary)',
                  color: 'var(--color-text-dark)',
                }}
                placeholder="Введите пароль"
              />
            </div>

            <button
              type="submit"
              className="w-full px-8 py-4 rounded-lg text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: 'var(--color-primary)' }}
            >
              Войти
            </button>
          </form>

          <div className="mt-6 text-center">
            <p style={{ color: 'var(--color-text-gray)' }}>
              Нет аккаунта?{' '}
              <button
                onClick={onNavigateToRegister}
                className="transition-opacity hover:opacity-80 hover:cursor-pointer"
                style={{ color: 'var(--color-primary)' }}
              >
                Зарегистрироваться
              </button>
            </p>
          </div>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t" style={{ borderColor: 'var(--color-secondary)' }}></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-4 bg-white" style={{ color: 'var(--color-text-gray)' }}>
                или
              </span>
            </div>
          </div>

          {/* Guest Login Button */}
          <button
            type="button"
            onClick={handleGuestLogin}
            className="w-full px-6 py-3 rounded-lg border-2 transition-all hover:shadow-md mb-4"
            style={{ 
              borderColor: 'var(--color-secondary)',
              color: 'var(--color-text-dark)'
            }}
          >
            Авторизоваться как гость
          </button>

          {/* Social Auth Buttons */}
          <div className="flex justify-center gap-4">
            <button
              type="button"
              className="w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all hover:shadow-md hover:cursor-pointer"
              style={{ borderColor: 'var(--color-secondary)' }}
              title="Войти через Google"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
            </button>

            <button
              type="button"
              className="w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all hover:shadow-md hover:cursor-pointer"
              style={{ borderColor: 'var(--color-secondary)' }}
              title="Войти через Яндекс"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#FC3F1D">
                <path d="M13.47 18.89h-2.54V8.66H9.58c-2.2 0-3.35 1.15-3.35 2.85 0 1.92 1.02 2.76 2.65 3.88l1.5 1.02-4.02 5.48H3.5l3.46-4.72c-2.03-1.42-3.46-2.85-3.46-5.48C3.5 8.18 5.72 6 9.64 6h3.83v12.89z"/>
              </svg>
            </button>

            <button
              type="button"
              className="w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all hover:shadow-md hover:cursor-pointer"
              style={{ borderColor: 'var(--color-secondary)' }}
              title="Войти через Госуслуги"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <rect width="24" height="24" rx="4" fill="#0D4CD3"/>
                <path d="M7 8h10M7 12h10M7 16h6" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
