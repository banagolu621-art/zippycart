import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import { CartProvider } from './context/CartContext';
import { LocationProvider } from './context/LocationContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { RoleProvider } from './context/RoleContext';

import { CustomerAppLayout } from './layouts/CustomerAppLayout';

// Customer Pages
import { SplashScreen } from './pages/SplashScreen';
import { OnboardingLocationPage } from './pages/OnboardingLocationPage';
import { HomePage } from './pages/HomePage';
import { ExplorePage } from './pages/ExplorePage';
import { CategoryListingPage } from './pages/CategoryListingPage';
import { StoreDetailsPage } from './pages/StoreDetailsPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { SearchPage } from './pages/SearchPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderSuccessPage } from './pages/OrderSuccessPage';
import { OrdersPage } from './pages/OrdersPage';
import { OrderTrackingPage } from './pages/OrderTrackingPage';
import { ProfilePage } from './pages/ProfilePage';
import { FavoritesPage } from './pages/FavoritesPage';
import { CouponsPage } from './pages/CouponsPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { SupportPage } from './pages/SupportPage';

// Admin, Merchant, Rider Portals
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { MerchantDashboardPage } from './pages/merchant/MerchantDashboardPage';
import { RiderDashboardPage } from './pages/rider/RiderDashboardPage';

export function App() {
  return (
    <ToastProvider>
      <LocationProvider>
        <CartProvider>
          <FavoritesProvider>
            <RoleProvider>
              <BrowserRouter>
                <Routes>
                  {/* Portals without phone shell layout */}
                  <Route path="/admin/*" element={<AdminDashboardPage />} />
                  <Route path="/merchant/*" element={<MerchantDashboardPage />} />
                  <Route path="/rider/*" element={<RiderDashboardPage />} />

                  {/* Customer Mobile Application Routes */}
                  <Route element={<CustomerAppLayout />}>
                    <Route path="/" element={<SplashScreen />} />
                    <Route path="/splash" element={<SplashScreen />} />
                    <Route path="/onboarding" element={<OnboardingLocationPage />} />
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/explore" element={<ExplorePage />} />
                    <Route path="/category/:id" element={<CategoryListingPage />} />
                    <Route path="/store/:id" element={<StoreDetailsPage />} />
                    <Route path="/product/:id" element={<ProductDetailsPage />} />
                    <Route path="/search" element={<SearchPage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/order-success/:id" element={<OrderSuccessPage />} />
                    <Route path="/orders" element={<OrdersPage />} />
                    <Route path="/orders/:id/track text" element={<OrderTrackingPage />} />
                    <Route path="/orders/:id/track" element={<OrderTrackingPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/favorites" element={<FavoritesPage />} />
                    <Route path="/coupons" element={<CouponsPage />} />
                    <Route path="/notifications" element={<NotificationsPage />} />
                    <Route path="/support" element={<SupportPage />} />
                  </Route>

                  {/* Catch-all redirect to /home */}
                  <Route path="*" element={<Navigate to="/home" replace />} />
                </Routes>
              </BrowserRouter>
            </RoleProvider>
          </FavoritesProvider>
        </CartProvider>
      </LocationProvider>
    </ToastProvider>
  );
}

export default App;
