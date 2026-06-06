import React, { createContext, useContext, useState, useCallback } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '../store/useAuthStore';

interface ProtectedActionContextType {
  showLoginPrompt: (actionName: string) => void;
}

const ProtectedActionContext = createContext<ProtectedActionContextType | undefined>(undefined);

export const useProtectedAction = () => {
  const context = useContext(ProtectedActionContext);
  if (!context) {
    throw new Error('useProtectedAction must be used within ProtectedActionProvider');
  }
  return context;
};

export const ProtectedActionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [showModal, setShowModal] = useState(false);
  const [actionName, setActionName] = useState('');
  const { user, logout } = useAuthStore();

  const showLoginPrompt = useCallback((action: string) => {
    if (!user) {
      setActionName(action);
      setShowModal(true);
    }
    return !!user;
  }, [user]);

  const handleLogin = useCallback(() => {
    setShowModal(false);
  }, []);

  const handleGuestBook = useCallback(() => {
    // TODO: Implement guest booking
    setShowModal(false);
  }, []);

  return (
    <>
      <ProtectedActionContext.Provider value={{ showLoginPrompt }}>
        {children}
      </ProtectedActionContext.Provider>

      <Modal
        visible={showModal}
        animationType="fade"
        transparent
        statusBarTranslucent
      >
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Book Your Cleaning Service</Text>
              <TouchableOpacity onPress={() => setShowModal(false)}>
                <Ionicons name="close" size={24} color="#0F1E2A" />
              </TouchableOpacity>
            </View>

            <Text style={styles.modalSubtitle}>
              {actionName === 'booking'
                ? 'To book a cleaning service, please login to your account.'
                : 'Please login to view and manage your schedule.'
              }
            </Text>

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.button, styles.buttonSecondary]}
                onPress={() => setShowModal(false)}
              >
                <Text style={styles.buttonSecondaryText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.buttonPrimary]}
                onPress={handleLogin}
              >
                <Text style={styles.buttonPrimaryText}>Login</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.guestButton}
              onPress={handleGuestBook}
            >
              <Text style={styles.guestButtonText}>Continue as Guest</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 40,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0F1E2A',
  },
  modalSubtitle: {
    fontSize: 16,
    color: '#64748B',
    marginBottom: 24,
    lineHeight: 22,
  },
  modalActions: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  button: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonPrimary: {
    backgroundColor: '#1F8AD0',
  },
  buttonPrimaryText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonSecondary: {
    backgroundColor: '#F1F5F9',
  },
  buttonSecondaryText: {
    color: '#64748B',
    fontSize: 16,
    fontWeight: '600',
  },
  guestButton: {
    backgroundColor: '#F8FBFD',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  guestButtonText: {
    color: '#64748B',
    fontSize: 16,
    fontWeight: '500',
  },
});