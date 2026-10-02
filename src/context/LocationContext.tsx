import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { DeliveryAddress } from '../types';
import { useToast } from './ToastContext';

interface LocationContextType {
  currentAddress: DeliveryAddress;
  savedAddresses: DeliveryAddress[];
  isModalOpen: boolean;
  openLocationModal: () => void;
  closeLocationModal: () => void;
  selectAddress: (address: DeliveryAddress) => void;
  addNewAddress: (address: Omit<DeliveryAddress, 'id'>) => void;
  simulateGpsLocation: () => void;
}

const DEFAULT_ADDRESS: DeliveryAddress = {
  id: 'addr-1',
  label: 'Home',
  houseFlat: '123, Green Park Colony',
  streetArea: 'Talwandi',
  town: 'Kota',
  pincode: '324005',
  isDefault: true
};

const LocationContext = createContext<LocationContextType | undefined>(undefined);

const ADDR_STORAGE_KEY = 'zippycart_current_address';
const SAVED_ADDR_KEY = 'zippycart_saved_addresses';

export const LocationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { showToast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [currentAddress, setCurrentAddress] = useState<DeliveryAddress>(() => {
    try {
      const saved = localStorage.getItem(ADDR_STORAGE_KEY);
      return saved ? JSON.parse(saved) : DEFAULT_ADDRESS;
    } catch {
      return DEFAULT_ADDRESS;
    }
  });

  const [savedAddresses, setSavedAddresses] = useState<DeliveryAddress[]>(() => {
    try {
      const saved = localStorage.getItem(SAVED_ADDR_KEY);
      return saved ? JSON.parse(saved) : [DEFAULT_ADDRESS];
    } catch {
      return [DEFAULT_ADDRESS];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(ADDR_STORAGE_KEY, JSON.stringify(currentAddress));
    } catch (e) {
      console.error(e);
    }
  }, [currentAddress]);

  useEffect(() => {
    try {
      localStorage.setItem(SAVED_ADDR_KEY, JSON.stringify(savedAddresses));
    } catch (e) {
      console.error(e);
    }
  }, [savedAddresses]);

  const openLocationModal = () => setIsModalOpen(true);
  const closeLocationModal = () => setIsModalOpen(false);

  const selectAddress = (addr: DeliveryAddress) => {
    setCurrentAddress(addr);
    closeLocationModal();
    showToast(`Location set to ${addr.streetArea}, ${addr.town}`, 'success');
  };

  const addNewAddress = (addrData: Omit<DeliveryAddress, 'id'>) => {
    const newAddr: DeliveryAddress = {
      ...addrData,
      id: `addr-${Date.now()}`
    };
    setSavedAddresses(prev => [...prev, newAddr]);
    setCurrentAddress(newAddr);
    closeLocationModal();
    showToast('New address saved successfully!', 'success');
  };

  const simulateGpsLocation = () => {
    showToast('Detecting location via GPS...', 'info');
    setTimeout(() => {
      const gpsAddress: DeliveryAddress = {
        id: `addr-gps-${Date.now()}`,
        label: 'Current Location',
        houseFlat: 'GPS Detected Spot',
        streetArea: 'Mahaveer Nagar 2nd',
        town: 'Kota',
        pincode: '324005',
        isDefault: false
      };
      setCurrentAddress(gpsAddress);
      closeLocationModal();
      showToast('Location updated: Mahaveer Nagar 2nd, Kota', 'success');
    }, 600);
  };

  return (
    <LocationContext.Provider
      value={{
        currentAddress,
        savedAddresses,
        isModalOpen,
        openLocationModal,
        closeLocationModal,
        selectAddress,
        addNewAddress,
        simulateGpsLocation
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) throw new Error('useLocation must be used within LocationProvider');
  return context;
};
