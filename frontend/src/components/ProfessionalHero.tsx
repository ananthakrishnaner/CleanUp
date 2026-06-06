import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';

const services = [
  { id: 1, name: 'Deep Cleaning', icon: '🧹', price: '₹1,499', duration: '4-5 hrs', rating: 4.8, reviews: 2340 },
  { id: 2, name: 'Kitchen Cleaning', icon: '🍳', price: '₹799', duration: '2-3 hrs', rating: 4.7, reviews: 1856 },
  { id: 3, name: 'Sofa Cleaning', icon: '🛋️', price: '₹599', duration: '1-2 hrs', rating: 4.6, reviews: 987 },
  { id: 4, name: 'Bathroom Cleaning', icon: '🚿', price: '₹499', duration: '1-2 hrs', rating: 4.9, reviews: 1234 },
  { id: 5, name: 'Carpet Cleaning', icon: '🏵️', price: '₹699', duration: '2-3 hrs', rating: 4.5, reviews: 654 },
  { id: 6, name: 'Move-in/out', icon: '📦', price: '₹2,499', duration: '6-8 hrs', rating: 4.8, reviews: 1567 },
];

const ProfessionalHero = ({ searchQuery, onSearchChange }) => {
  return (
    <View style={styles.container}>
      {/* Hero Banner */}
      <View style={styles.heroBanner}>
        <View style={styles.bannerContent}>
          <Text style={styles.bannerTitle}>Professional Home Cleaning Services</Text>
          <Text style={styles.bannerSubtitle}>
            Book expert cleaners for a spotless home
          </Text>
        </View>

        {/* Search Box */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBox}>
            <View style={styles.searchIconBox}>
              <Text style={styles.searchIcon}>🔍</Text>
            </View>
            <View style={styles.searchInputContainer}>
              <TextInput
                style={styles.searchInput}
                placeholder="Enter your locality..."
                placeholderTextColor="#868e96"
                value={searchQuery}
                onChangeText={onSearchChange}
              />
              <TouchableOpacity style={styles.searchButton}>
                <Text style={styles.searchButtonText}>Search</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Trust Indicators */}
        <View style={styles.trustIndicators}>
          <View style={styles.trustItem}>
            <Text style={styles.trustIcon}>🛡️</Text>
            <Text style={styles.trustText}>100% Verified Professionals</Text>
          </View>
          <View style={styles.trustItem}>
            <Text style={styles.trustIcon}>💰</Text>
            <Text style={styles.trustText}>Fixed Pricing</Text>
          </View>
          <View style={styles.trustItem}>
            <Text style={styles.trustIcon}>🛠️</Text>
            <Text style={styles.trustText}>Free Reservice</Text>
          </View>
        </View>
      </View>

      {/* Services Section */}
      <View style={styles.servicesSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Popular Services</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllLink}>See All →</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.servicesScroll}>
          <View style={styles.servicesRow}>
            {services.map((service) => (
              <TouchableOpacity key={service.id} style={styles.serviceCard}>
                <View style={styles.serviceIconBox}>
                  <Text style={styles.serviceIcon}>{service.icon}</Text>
                </View>
                <View style={styles.serviceInfo}>
                  <Text style={styles.serviceName}>{service.name}</Text>
                  <View style={styles.serviceMeta}>
                    <Text style={styles.serviceRating}>⭐ {service.rating}</Text>
                    <Text style={styles.serviceReviews}>({service.reviews}+)</Text>
                  </View>
                  <View style={styles.servicePriceRow}>
                    <Text style={styles.servicePrice}>{service.price}</Text>
                    <Text style={styles.serviceDuration}>{service.duration}</Text>
                  </View>
                </View>
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
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  heroBanner: {
    backgroundColor: '#1a237e',
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
  },
  bannerContent: {
    marginBottom: 20,
  },
  bannerTitle: {
    fontSize: 22,
    fontWeight: 800,
    color: '#ffffff',
    marginBottom: 8,
    lineHeight: 28,
  },
  bannerSubtitle: {
    fontSize: 14,
    color: '#c5cae9',
    marginBottom: 4,
  },
  searchContainer: {
    marginBottom: 20,
  },
  searchBox: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  searchIconBox: {
    paddingHorizontal: 12,
    paddingVertical: 14,
    backgroundColor: '#f8f9fa',
  },
  searchIcon: {
    fontSize: 18,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 12,
    fontSize: 15,
    color: '#212529',
  },
  searchButton: {
    backgroundColor: '#00c853',
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  searchButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  trustIndicators: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  trustItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  trustIcon: {
    fontSize: 14,
  },
  trustText: {
    fontSize: 12,
    color: '#c5cae9',
    fontWeight: 500,
  },
  servicesSection: {
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 700,
    color: '#212529',
  },
  seeAllLink: {
    fontSize: 14,
    color: '#00c853',
    fontWeight: 600,
  },
  servicesScroll: {
    marginHorizontal: -16,
    paddingHorizontal: 16,
  },
  servicesRow: {
    flexDirection: 'row',
    gap: 12,
  },
  serviceCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    width: 180,
    borderWidth: 1,
    borderColor: '#dee2e6',
    flexDirection: 'column',
  },
  serviceIconBox: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  serviceIcon: {
    fontSize: 28,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: 700,
    color: '#212529',
    marginBottom: 8,
  },
  serviceMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 8,
  },
  serviceRating: {
    fontSize: 13,
    fontWeight: 600,
    color: '#212529',
  },
  serviceReviews: {
    fontSize: 12,
    color: '#868e96',
  },
  servicePriceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  servicePrice: {
    fontSize: 18,
    fontWeight: 800,
    color: '#1a237e',
  },
  serviceDuration: {
    fontSize: 12,
    color: '#868e96',
  },
});

export default ProfessionalHero;