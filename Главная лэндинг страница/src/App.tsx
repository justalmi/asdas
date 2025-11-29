import { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Process } from './components/Process';
import { Reviews } from './components/Reviews';
import { Footer } from './components/Footer';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { UserDashboard } from './components/UserDashboard';
import { ServiceSelection } from './components/ServiceSelection';
import { OrderCreation } from './components/OrderCreation';
import { MyOrders } from './components/MyOrders';

type Page = 'home' | 'login' | 'register' | 'dashboard' | 'serviceSelection' | 'orderCreation' | 'myOrders';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedWorkType, setSelectedWorkType] = useState<string>('');
  const [selectedSubType, setSelectedSubType] = useState<string>('');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  if (currentPage === 'login') {
    return (
      <Login
        onNavigateToRegister={() => setCurrentPage('register')}
        onNavigateToHome={() => setCurrentPage('home')}
        onNavigateToUserDashboard={() => setCurrentPage('dashboard')}
      />
    );
  }

  if (currentPage === 'register') {
    return (
      <Register
        onNavigateToLogin={() => setCurrentPage('login')}
        onNavigateToHome={() => setCurrentPage('home')}
      />
    );
  }

  if (currentPage === 'dashboard') {
    return (
      <UserDashboard
        onNavigateToOrderCreation={(workType, subType) => {
          setSelectedWorkType(workType);
          setSelectedSubType(subType || '');
          setCurrentPage('serviceSelection');
        }}
        onLogout={() => setCurrentPage('home')}
        onNavigateToHome={() => setCurrentPage('home')}
      />
    );
  }

  if (currentPage === 'serviceSelection') {
    return (
      <ServiceSelection
        workTypeId={selectedWorkType}
        preSelectedSubType={selectedSubType}
        onNavigateBack={() => setCurrentPage('dashboard')}
        onNavigateToOrderCreation={(services) => {
          setSelectedServices(services);
          setCurrentPage('orderCreation');
        }}
        onLogout={() => setCurrentPage('home')}
        onNavigateToHome={() => setCurrentPage('home')}
      />
    );
  }

  if (currentPage === 'orderCreation') {
    return (
      <OrderCreation
        workTypeId={selectedWorkType}
        preSelectedSubType={selectedSubType}
        selectedServices={selectedServices}
        onNavigateBack={() => setCurrentPage('serviceSelection')}
        onNavigateToMyOrders={() => setCurrentPage('myOrders')}
        onNavigateToHome={() => setCurrentPage('home')}
        onLogout={() => setCurrentPage('home')}
      />
    );
  }

  if (currentPage === 'myOrders') {
    return (
      <MyOrders
        onNavigateToHome={() => setCurrentPage('home')}
        onLogout={() => setCurrentPage('home')}
      />
    );
  }

  return (
    <div className="min-h-screen">
      <Header 
        onNavigateToAuth={() => setCurrentPage('login')} 
        onNavigateToHome={() => setCurrentPage('home')}
      />
      <main>
        <Hero onNavigateToAuth={() => setCurrentPage('login')} />
        <Services onNavigateToAuth={() => setCurrentPage('login')} />
        <Process />
        <Reviews />
      </main>
      <Footer onNavigateToHome={() => setCurrentPage('home')} />
    </div>
  );
}
