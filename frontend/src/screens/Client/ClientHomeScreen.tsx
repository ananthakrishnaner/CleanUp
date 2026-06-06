import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, StatusBar } from 'react-native';
import Navbar from '../../components/Navbar';
import Hero from '../../components/Hero';
import WhyChooseUs from '../../components/WhyChooseUs';
import Testimonials from '../../components/Testimonials';
import Footer from '../../components/Footer';

export default function ClientHomeScreen() {
  const [searchQuery, setSearchQuery] = useState('Koramangala, Bangalore');

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Navbar />
        <Hero searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        <WhyChooseUs />
        <Testimonials />
        <Footer />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
});