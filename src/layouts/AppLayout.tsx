import { Outlet } from 'react-router-dom';

import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar';

export const AppLayout = () => (
  <div className="min-h-screen">
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-amber-100 focus:px-4 focus:py-2 focus:text-stone-950"
    >
      Skip to content
    </a>
    <Navbar />
    <main id="main-content" className="page-shell py-10">
      <Outlet />
    </main>
    <Footer />
  </div>
);
