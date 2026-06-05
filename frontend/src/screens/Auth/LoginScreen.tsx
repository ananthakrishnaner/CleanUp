import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useAuthStore } from '../../store/useAuthStore';
import client from '../../api/client';

export default function LoginScreen({ navigation }: any) {
  const setAuth = useAuthStore((s) => s.setAuth);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!username || !password) return;
    setLoading(true);
    setError('');
    try {
      // Assuming Nginx routes /api/auth/login to auth-service
      const res = await client.post('/auth/login', { username, password });
      const { token } = res.data;
      
      // Fetch user profile with the token
      const meRes = await client.get('/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setAuth(token, meRes.data);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>
      
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      
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
      
      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
        {loading ? <ActivityIndicator color="#FFF" /> : <Text style={styles.buttonText}>Login</Text>}
      </TouchableOpacity>

      <TouchableOpacity style={styles.linkButton} onPress={() => navigation.navigate('Register')}>
        <Text style={styles.linkText}>Don't have an account? Register</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FBFD', // neutral.50
    justifyContent: 'center',
    padding: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0F1E2A', // neutral.900
    marginBottom: 32,
    textAlign: 'center',
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
    backgroundColor: '#2BA3EC', // primary.500
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
    color: '#E5484D', // danger.500
    marginBottom: 16,
    textAlign: 'center',
  }
});
