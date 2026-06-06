import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ProfessionalNavbar = ({ location, setLocation }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Top Navigation */}
      <View style={styles.topNav}>
        <View style={styles.topNavLeft}>
          <TouchableOpacity style={styles.navItem}>
            <Text style={styles.navIcon}>🌍</Text>
          </TouchableOpacity>
          <Text style={styles.locationText}>📍 {location}</Text>
        </View>

        <View style={styles.topNavRight}>
          <TouchableOpacity style={styles.navItem}>
            <Text style={styles.navIcon}>🔔</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Text style={styles.navIcon}>🛒</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.signInButton}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.signInText}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Brand Header */}
      <View style={styles.brandHeader}>
        <View style={styles.brandLeft}>
          <View style={styles.brandLogo}>
            <Text style={styles.logoText}>🧼</Text>
          </View>
          <View style={styles.brandInfo}>
            <Text style={styles.brandName}>CleanUp</Text>
            <Text style={styles.brandTagline}>Professional Home Cleaning</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.bookNowButton}>
          <Text style={styles.bookNowText}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  topNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  topNavLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  topNavRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  navItem: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  navIcon: {
    fontSize: 18,
  },
  locationText: {
    fontSize: 14,
    color: '#495057',
    fontWeight: 500,
  },
  signInButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: '#e9ecef',
  },
  signInText: {
    fontSize: 14,
    color: '#495057',
    fontWeight: 600,
  },
  brandHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  brandLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  brandLogo: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: '#1a237e',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1a237e',
  },
  logoText: {
    fontSize: 28,
    color: '#ffffff',
  },
  brandInfo: {
    flexDirection: 'column',
  },
  brandName: {
    fontSize: 24,
    fontWeight: 800,
    color: '#212529',
  },
  brandTagline: {
    fontSize: 14,
    color: '#6c757d',
    marginTop: 2,
  },
  bookNowButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#1a237e',
    borderWidth: 1,
    borderColor: '#1a237e',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  bookNowText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 600,
    letterSpacing: 0.5,
  },
});

export default ProfessionalNavbar;