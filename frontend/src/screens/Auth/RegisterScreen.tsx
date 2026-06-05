import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import client from '../../api/client';

export default function RegisterScreen({ navigation }: any) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'client'|'cleaner'>('client');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async () => {
    if (!username || !password) return;
    setLoading(true);
    setError('');
    try {
      await client.post('/auth/register', { username, password, role });
      // On success, go back to login
      navigation.replace('Login');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      
      <View style={styles.roleContainer}>
        <TouchableOpacity 
          style={[styles.roleButton, role === 'client' && styles.roleButtonActive]}
          onPress={() => setRole('client')}>
          <Text style={[styles.roleText, role === 'client' && styles.roleTextActive]}>Client</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.roleButton, role === 'cleaner' && styles.roleButtonActive]}
          onPress={() => setRole('cleaner')}>
          <Text style={[styles.roleText, role === 'cleaner' && styles.roleTextActive]}>Cleaner</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      
      <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
        {loading ? <ActivityIndicator color="#FFF" /> : <Text style={styles.buttonText}>Register</Text>}
      </TouchableOpacity>

      <TouchableOpacity style={styles.linkButton} onPress={() => navigation.goBack()}>
        <Text style={styles.linkText}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FBFD',
    justifyContent: 'center',
    padding: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0F1E2A',
    marginBottom: 32,
    textAlign: 'center',
  },
  roleContainer: {
    flexDirection: 'row',
    marginBottom: 24,
    gap: 16,
  },
  roleButton: {
    flex: 1,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    alignItems: 'center',
  },
  roleButtonActive: {
    borderColor: '#2BA3EC',
    backgroundColor: '#EBF6FE',
  },
  roleText: {
    color: '#334155',
  },
  roleTextActive: {
    color: '#2BA3EC',
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#2BA3EC',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  linkButton: {
    marginTop: 24,
    alignItems: 'center',
  },
  linkText: {
    color: '#2BA3EC',
    fontSize: 14,
  },
  errorText: {
    color: '#E5484D',
    marginBottom: 16,
    textAlign: 'center',
  }
});
