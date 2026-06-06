import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useAuthStore } from '../../store/useAuthStore';
import client from '../../api/client';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Typography } from '../../components/Typography';
import { colors, spacing, shadows, radius } from '../../theme';

const { width, height } = Dimensions.get('window');

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
      {/* Hero Section */}
      <View style={styles.hero}>
        <View style={styles.heroOverlay} />
        <View style={styles.heroContent}>
          <Typography variant="display.xl" style={styles.heroTitle}>
            Welcome Back
          </Typography>
          <Typography variant="body.lg" style={styles.heroSubtitle}>
            Book trusted home cleaners in minutes
          </Typography>
        </View>
      </View>

      {/* Login Form */}
      <View style={styles.formContainer}>
        <View style={styles.formContent}>
          {error && (
            <Typography variant="caption" color={colors.danger[500]} style={styles.errorText}>
              {error}
            </Typography>
          )}

          <Input
            label="Username"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
            style={styles.input}
            leftIcon={
              <Typography variant="label.lg" color={colors.neutral[500]}>@</Typography>
            }
          />

          <Input
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
            showPasswordToggle
          />

          <Button
            title="Login"
            onPress={handleLogin}
            loading={loading}
            style={styles.button}
            variant="primary"
          />

          <View style={styles.footer}>
            <Typography variant="label.md" color={colors.neutral[700]}>
              Don't have an account?
            </Typography>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Typography variant="label.md" color={colors.primary[500]} style={styles.linkText}>
                Register
              </Typography>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral[0],
  },
  hero: {
    width,
    height: height * 0.4,
    backgroundColor: colors.primary.lightGradient,
    borderBottomLeftRadius: radius.xl,
    borderBottomRightRadius: radius.xl,
    overflow: 'hidden',
    position: 'relative',
  },
  heroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.overlay,
    borderRadius: radius.xl,
  },
  heroContent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing[8],
  },
  heroTitle: {
    color: colors.neutral[0],
    textAlign: 'center',
    marginBottom: spacing[2],
  },
  heroSubtitle: {
    color: colors.neutral[0],
    textAlign: 'center',
    opacity: 0.9,
  },
  formContainer: {
    flex: 1,
    marginTop: -spacing[12],
    marginHorizontal: spacing[6],
    borderRadius: radius.xl,
    overflow: 'hidden',
    ...shadows.lg,
  },
  formContent: {
    backgroundColor: colors.neutral[0],
    padding: spacing[8],
    paddingTop: spacing[12],
  },
  input: {
    marginBottom: spacing[6],
  },
  button: {
    marginTop: spacing[6],
    marginBottom: spacing[4],
  },
  errorText: {
    textAlign: 'center',
    marginBottom: spacing[4],
    color: colors.danger[500],
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing[6],
    paddingTop: spacing[6],
    borderTopWidth: 1,
    borderTopColor: colors.neutral[200],
  },
  linkText: {
    marginLeft: spacing[1],
  },
});