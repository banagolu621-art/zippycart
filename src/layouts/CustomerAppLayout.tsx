import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { BottomNav } from '../components/common/BottomNav';
import { ToastContainer } from '../components/common/ToastContainer';
import { LocationModal } from '../components/common/LocationModal';
import { RoleSwitcherBar } from '../components/common/RoleSwitcherBar';
import { useRole } from '../context/RoleContext';

export const CustomerAppLayout: React.FC = () => {
  const location = useLocation();
  const { viewportMode, deviceWidth } = useRole();

  // Hide BottomNav on splash, onboarding, order-success, track order if needed, but show on main screens
  const isSplash = location.pathname === '/' || location.pathname === '/splash';
  const isOnboarding = location.pathname === '/onboarding';

  const widthClass = deviceWidth === '360px' ? 'w-[360px]' : deviceWidth === '414px' ? 'w-[414px]' : 'w-[390px]';

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col font-sans">
      <RoleSwitcherBar />

      <main className="flex-1 flex items-center justify-center p-0 md:py-6 overflow-x-hidden">
        {viewportMode === 'mobile-frame' ? (
          /* Realistic Smartphone Container Frame on Desktop */
          <div className={`w-full ${widthClass} max-w-full bg-slate-50 min-h-[92vh] md:min-h-[844px] md:max-h-[920px] md:rounded-[44px] md:border-[10px] md:border-slate-800 md:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] flex flex-col relative overflow-hidden transition-all duration-300`}>
            {/* Phone Notch/Speaker Header Bar on Desktop */}
            <div className="hidden md:flex items-center justify-center bg-emerald-950 py-1.5 shrink-0 z-40">
              <div className="w-20 h-4 bg-slate-900 rounded-full flex items-center justify-center gap-2 px-2">
                <div className="w-2 h-2 rounded-full bg-slate-800" />
                <div className="w-2.5 h-1 bg-emerald-800 rounded-full" />
              </div>
            </div>

            {/* Screen Content Wrapper */}
            <div className="flex-1 overflow-y-auto relative no-scrollbar pb-16 flex flex-col">
              <Outlet />
            </div>

            {/* Bottom Nav inside Phone Frame */}
            {!isSplash && !isOnboarding && <BottomNav />}
          </div>
        ) : (
          /* Wide Responsive Layout */
          <div className="w-full max-w-md md:max-w-4xl lg:max-w-6xl mx-auto bg-slate-50 min-h-[90vh] md:rounded-3xl md:shadow-2xl overflow-hidden flex flex-col relative pb-16 border border-slate-200">
            <div className="flex-1 overflow-y-auto">
              <Outlet />
            </div>
            {!isSplash && !isOnboarding && <BottomNav />}
          </div>
        )}
      </main>

      <LocationModal />
      <ToastContainer />
    </div>
  );
};
