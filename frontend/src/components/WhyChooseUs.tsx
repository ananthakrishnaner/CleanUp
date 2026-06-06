import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const WhyChooseUs = () => {
  const features = [
    {
      icon: '👨‍💼',
      title: 'Verified Professionals',
      description: 'All cleaners are background checked and trained'
    },
    {
      icon: '🛡️',
      title: 'Secure Payment',
      description: 'Pay only after service completion'
    },
    {
      icon: '⚡',
      title: 'Quick Booking',
      description: 'Book in less than 2 minutes'
    },
    {
      icon: '🎯',
      title: 'Custom Cleaning',
      description: 'Choose your specific cleaning needs'
    }
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Why Choose CleanUp?</Text>
      <View style={styles.grid}>
        {features.map((feature, index) => (
          <View key={index} style={styles.featureCard}>
            <Text style={styles.featureIcon}>{feature.icon}</Text>
            <Text style={styles.featureTitle}>{feature.title}</Text>
            <Text style={styles.featureDescription}>{feature.description}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 800,
    color: '#1e293b',
    textAlign: 'center',
    marginBottom: 24,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  featureCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    width: '50%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  featureIcon: {
    fontSize: 32,
    marginBottom: 12,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: 700,
    color: '#1e293b',
    textAlign: 'center',
  },
  featureDescription: {
    fontSize: 13,
    color: '#64748b',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 20,
  },
});

export default WhyChooseUs;