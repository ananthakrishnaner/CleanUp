import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useAuthStore } from '../../store/useAuthStore';

export default function AdminSettingsScreen() {
  const { user, logout } = useAuthStore();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarPlaceholder}>
          <Text style={styles.avatarText}>{user?.username?.[0]?.toUpperCase()}</Text>
        </View>
        <Text style={styles.name}>{user?.username}</Text>
        <Text style={styles.role}>Super Admin</Text>
      </View>

      <View style={styles.menu}>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>User Management</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Notification Config</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>System Secrets</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FBFD',
  },
  header: {
    alignItems: 'center',
    padding: 48,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#DBEAFE',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1F8AD0',
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0F1E2A',
  },
  role: {
    color: '#64748B',
    marginTop: 4,
    fontWeight: '500',
  },
  menu: {
    marginTop: 24,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#E2E8F0',
  },
  menuItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  menuText: {
    fontSize: 16,
    color: '#0F1E2A',
  },
  logoutButton: {
    margin: 24,
    backgroundColor: '#FEE2E2',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutText: {
    color: '#E5484D',
    fontWeight: '600',
    fontSize: 16,
  }
});
