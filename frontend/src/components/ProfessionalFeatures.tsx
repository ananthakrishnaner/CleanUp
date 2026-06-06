import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

const features = [
  {
    id: 1,
    icon: '👨‍💼',
    title: 'Expert Professionals',
    description: 'Background-verified & trained cleaners',
    color: '#e3f2fd',
  },
  {
    id: 2,
    icon: '📋',
    title: 'Customized Cleaning',
    description: 'Tailor services to your needs',
    color: '#f3e5f5',
  },
  {
    id: 3,
    icon: '💳',
    title: 'Secure Payment',
    description: 'Cashless & hassle-free',
    color: '#e8f5e9',
  },
  {
    id: 4,
    icon: '✨',
    title: 'Damage Protection',
    description: 'Up to ₹10,000 coverage',
    color: '#fff3e0',
  },
];

const ProfessionalFeatures = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Why Choose CleanUp?</Text>
        <Text style={styles.subtitle}>
          Experience premium home cleaning services
        </Text>
      </View>

      <View style={styles.featuresGrid}>
        {features.map((feature) => (
          <TouchableOpacity key={feature.id} style={[styles.featureCard, { backgroundColor: feature.color }]}>
            <Text style={styles.featureIcon}>{feature.icon}</Text>
            <Text style={styles.featureTitle}>{feature.title}</Text>
            <Text style={styles.featureDescription}>{feature.description}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: 800,
    color: '#212529',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#6c757d',
    textAlign: 'center',
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'center',
  },
  featureCard: {
    borderRadius: 12,
    padding: 20,
    width: '47%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#dee2e6',
  },
  featureIcon: {
    fontSize: 32,
    marginBottom: 12,
  },
  featureTitle: {
    fontSize: 15,
    fontWeight: 700,
    color: '#212529',
    textAlign: 'center',
    marginBottom: 6,
  },
  featureDescription: {
    fontSize: 13,
    color: '#6c757d',
    textAlign: 'center',
    lineHeight: 18,
  },
});

export default ProfessionalFeatures;