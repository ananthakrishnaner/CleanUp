import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity, TextInput, Modal, Alert } from 'react-native';
import client from '../../api/client';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '../../store/useAuthStore';

export default function CleanerManagementScreen() {
  const [cleaners, setCleaners] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [registering, setRegistering] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: ''
  });
  const { user } = useAuthStore();

  const fetchCleaners = async () => {
    try {
      const res = await client.get('/admin/cleaners');
      setCleaners(res.data.cleaners || []);
    } catch (err) {
      console.log('Fetch cleaners err', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchCleaners();
    }
  }, [user]);

  const handleRegisterCleaner = async () => {
    if (!formData.username || !formData.password) {
      Alert.alert('Validation', 'Username and password are required');
      return;
    }

    setRegistering(true);
    try {
      const res = await client.post('/auth/register', {
        username: formData.username,
        email: formData.email || undefined,
        phone: formData.phone || undefined,
        password: formData.password,
        role: 'cleaner'
      });
      Alert.alert('Success', 'Cleaner registered successfully');
      setShowModal(false);
      setFormData({ username: '', email: '', phone: '', password: '' });
      fetchCleaners();
    } catch (err: any) {
      Alert.alert('Error', err.response?.data?.message || 'Failed to register cleaner');
    } finally {
      setRegistering(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Cleaner Management</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setShowModal(true)}
        >
          <Ionicons name="add" size={20} color="#FFF" />
          <Text style={styles.addButtonText}>Add Cleaner</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#1F8AD0" style={{ marginTop: 24 }} />
      ) : (
        <View style={styles.list}>
          {cleaners.map((cleaner) => (
            <View key={cleaner.id} style={styles.cleanerCard}>
              <View style={styles.cleanerInfo}>
                <Text style={styles.cleanerName}>{cleaner.username}</Text>
                {cleaner.email && (
                  <Text style={styles.cleanerEmail}>{cleaner.email}</Text>
                )}
                {cleaner.phone && (
                  <Text style={styles.cleanerPhone}>{cleaner.phone}</Text>
                )}
              </View>
              <Text style={[
                styles.cleanerStatus,
                { color: cleaner.isActive ? '#10B981' : '#EF4444' }
              ]}>
                {cleaner.isActive ? 'Active' : 'Inactive'}
              </Text>
            </View>
          ))}
          {cleaners.length === 0 && (
            <View style={styles.emptyState}>
              <Ionicons name="people" size={48} color="#CBD5E1" />
              <Text style={styles.emptyStateText}>No cleaners registered</Text>
            </View>
          )}
        </View>
      )}

      <Modal
        visible={showModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Register New Cleaner</Text>
            <TouchableOpacity onPress={() => setShowModal(false)}>
              <Ionicons name="close" size={24} color="#0F1E2A" />
            </TouchableOpacity>
          </View>

          <View style={styles.form}>
            <Text style={styles.formLabel}>Username *</Text>
            <TextInput
              style={styles.input}
              value={formData.username}
              onChangeText={(text) => setFormData({...formData, username: text})}
              placeholder="Enter username"
              autoCapitalize="none"
            />

            <Text style={styles.formLabel}>Email (optional)</Text>
            <TextInput
              style={styles.input}
              value={formData.email}
              onChangeText={(text) => setFormData({...formData, email: text})}
              placeholder="Enter email"
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Text style={styles.formLabel}>Phone (optional)</Text>
            <TextInput
              style={styles.input}
              value={formData.phone}
              onChangeText={(text) => setFormData({...formData, phone: text})}
              placeholder="Enter phone"
              keyboardType="phone-pad"
            />

            <Text style={styles.formLabel}>Password *</Text>
            <TextInput
              style={styles.input}
              value={formData.password}
              onChangeText={(text) => setFormData({...formData, password: text})}
              placeholder="Enter password"
              secureTextEntry
            />
          </View>

          <TouchableOpacity
            style={[styles.button, registering && styles.buttonDisabled]}
            onPress={handleRegisterCleaner}
            disabled={registering}
          >
            <ActivityIndicator
              color="#FFF"
              size="small"
              style={{ marginRight: 8 }}
              hidden={!registering}
            />
            <Text style={styles.buttonText}>
              {registering ? 'Registering...' : 'Register Cleaner'}
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FBFD',
  },
  header: {
    padding: 24,
    paddingTop: 48,
    backgroundColor: '#1F8AD0',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: '#FFF',
    fontSize: 28,
    fontWeight: '700',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#10B981',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  list: {
    padding: 24,
  },
  cleanerCard: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cleanerInfo: {
    flex: 1,
  },
  cleanerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0F1E2A',
    marginBottom: 4,
  },
  cleanerEmail: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 2,
  },
  cleanerPhone: {
    fontSize: 14,
    color: '#64748B',
  },
  cleanerStatus: {
    fontSize: 14,
    fontWeight: '500',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#64748B',
    marginTop: 16,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0F1E2A',
  },
  form: {
    padding: 24,
  },
  formLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0F1E2A',
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#FFF',
  },
  button: {
    backgroundColor: '#1F8AD0',
    marginHorizontal: 24,
    marginVertical: 24,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#CBD5E1',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  }
});