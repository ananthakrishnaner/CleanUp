import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';

const services = [
  { id: 1, name: 'Deep Cleaning', icon: '🧹', price: '₹1,500', off: '20% OFF' },
  { id: 2, name: 'Kitchen', icon: '🍳', price: '₹800', off: null },
  { id: 3, name: 'Sofa', icon: '🛋️', price: '₹600', off: null },
  { id: 4, name: 'Bathroom', icon: '🚿', price: '₹500', off: '10% OFF' },
  { id: 5, name: 'Carpet', icon: '🏵️', price: '₹700', off: null },
  { id: 6, name: 'Windows', icon: '🪟', price: '₹400', off: null },
];

const Hero = ({ searchQuery, onSearchChange }) => {
  return (
    <View style={styles.container}>
      <View style={styles.searchCard}>
        <Text style={styles.title}>Book trusted home cleaners</Text>
        <Text style={styles.subtitle}>Professional cleaning services at your doorstep</Text>

        <View style={styles.searchBox}>
          <Text style={styles.searchIcon}>📍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Enter locality..."
            placeholderTextColor="#9ca3af"
            value={searchQuery}
            onChangeText={onSearchChange}
          />
          <TouchableOpacity style={styles.searchButton}>
            <Text style={styles.searchButtonText}>Search</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.servicesSection}>
        <Text style={styles.sectionTitle}>Popular Services</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.servicesScroll}>
          <View style={styles.servicesRow}>
            {services.slice(0, 4).map((service) => (
              <TouchableOpacity key={service.id} style={styles.serviceCard}>
                <Text style={styles.serviceIcon}>{service.icon}</Text>
                <Text style={styles.serviceName}>{service.name}</Text>
                <Text style={styles.servicePrice}>{service.price}</Text>
                {service.off && <View style={styles.offBadge}><Text style={styles.offText}>{service.off}</Text></View>}
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  searchCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 800,
    color: '#1e293b',
    marginBottom: 4,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 20,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 4,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  searchIcon: {
    fontSize: 18,
    marginHorizontal: 12,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1e293b',
  },
  searchButton: {
    backgroundColor: '#22c55e',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  searchButtonText: {
    color: '#ffffff',
    fontWeight: 600,
    fontSize: 14,
  },
  servicesSection: {
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 700,
    color: '#1e293b',
    marginBottom: 16,
  },
  servicesScroll: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  servicesRow: {
    flexDirection: 'row',
    gap: 12,
  },
  serviceCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    width: 120,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    position: 'relative',
  },
  serviceIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  serviceName: {
    fontSize: 14,
    fontWeight: 600,
    color: '#1e293b',
  },
  servicePrice: {
    fontSize: 14,
    fontWeight: 700,
    color: '#22c55e',
    marginTop: 4,
  },
  offBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#fef3c7',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  offText: {
    fontSize: 10,
    fontWeight: 600,
    color: '#d97706',
  },
});

export default Hero;