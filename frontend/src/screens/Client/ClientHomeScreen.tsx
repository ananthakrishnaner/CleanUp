import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, StatusBar } from 'react-native';
import ProfessionalNavbar from '../../components/ProfessionalNavbar';
import ProfessionalHero from '../../components/ProfessionalHero';
import ProfessionalFeatures from '../../components/ProfessionalFeatures';
import ProfessionalTestimonials from '../../components/ProfessionalTestimonials';
import ProfessionalFooter from '../../components/ProfessionalFooter';

export default function ClientHomeScreen() {
  const [searchQuery, setSearchQuery] = useState('Koramangala, Bangalore');

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <ProfessionalNavbar
          location={searchQuery}
          setLocation={setSearchQuery}
        />
        <ProfessionalHero
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        <ProfessionalFeatures />
        <ProfessionalTestimonials />
        <ProfessionalFooter />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
});