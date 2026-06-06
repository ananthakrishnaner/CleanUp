import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';

const companyLinks = [
  { name: 'About Us', route: 'About' },
  { name: 'Careers', route: 'Careers' },
  { name: 'Blog', route: 'Blog' },
  { name: 'Press', route: 'Press' },
];

const serviceLinks = [
  { name: 'Deep Cleaning', route: 'Service' },
  { name: 'Kitchen Cleaning', route: 'Service' },
  { name: 'Sofa Cleaning', route: 'Service' },
  { name: 'Bathroom Cleaning', route: 'Service' },
];

const legalLinks = [
  { name: 'Terms of Service', route: 'Terms' },
  { name: 'Privacy Policy', route: 'Privacy' },
  { name: 'Cookie Policy', route: 'Cookie' },
];

const Footer = () => {
  return (
    <View style={styles.container}>
      <View style={styles.brandSection}>
        <View style={styles.logoContainer}>
          <View style={styles.logoIcon}>
            <Text style={styles.logoText}>🧼</Text>
          </View>
          <Text style={styles.logoTitle}>CleanUp</Text>
        </View>
        <Text style={styles.tagline}>
          Your trusted home cleaning service
        </Text>

        <View style={styles.appButtons}>
          <TouchableOpacity style={styles.appButton}>
            <Text style={styles.appText}>🍎 App Store</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.appButton}>
            <Text style={styles.appText}>▶️ Play Store</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.linksSection}>
        <View style={styles.linkColumn}>
          <Text style={styles.linkTitle}>Company</Text>
          {companyLinks.map((link, index) => (
            <TouchableOpacity key={index} style={styles.link}>
              <Text style={styles.linkText}>{link.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.linkColumn}>
          <Text style={styles.linkTitle}>Services</Text>
          {serviceLinks.map((link, index) => (
            <TouchableOpacity key={index} style={styles.link}>
              <Text style={styles.linkText}>{link.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.linkColumn}>
          <Text style={styles.linkTitle}>Legal</Text>
          {legalLinks.map((link, index) => (
            <TouchableOpacity key={index} style={styles.link}>
              <Text style={styles.linkText}>{link.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.contactSection}>
        <Text style={styles.contactTitle}>Contact Us</Text>
        <Text style={styles.contactText}>📞 1800-123-4567</Text>
        <Text style={styles.contactText}>✉️ support@cleanup.com</Text>
        <Text style={styles.contactText}>🏠 Bangalore, India</Text>
      </View>

      <View style={styles.socialSection}>
        <TouchableOpacity style={styles.socialIcon}>
          <Text style={styles.socialText}>🐦</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialIcon}>
          <Text style={styles.socialText}>📘</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialIcon}>
          <Text style={styles.socialText}>📸</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialIcon}>
          <Text style={styles.socialText}>▶️</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.copyright}>
        <Text style={styles.copyrightText}>
          © 2024 CleanUp. All rights reserved.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1e293b',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
  },
  brandSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  logoIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#22c55e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 24,
  },
  logoTitle: {
    fontSize: 28,
    fontWeight: 800,
    color: '#ffffff',
  },
  tagline: {
    fontSize: 14,
    color: '#94a3b8',
    marginBottom: 20,
  },
  appButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  appButton: {
    backgroundColor: '#334155',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
  },
  appText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 500,
  },
  linksSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  linkColumn: {
    width: '30%',
  },
  linkTitle: {
    fontSize: 14,
    fontWeight: 700,
    color: '#ffffff',
    marginBottom: 12,
  },
  link: {
    marginBottom: 8,
  },
  linkText: {
    fontSize: 13,
    color: '#94a3b8',
  },
  contactSection: {
    marginBottom: 24,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  contactTitle: {
    fontSize: 14,
    fontWeight: 700,
    color: '#ffffff',
    marginBottom: 12,
  },
  contactText: {
    fontSize: 13,
    color: '#94a3b8',
    marginBottom: 8,
  },
  socialSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginBottom: 20,
  },
  socialIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#334155',
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialText: {
    fontSize: 18,
  },
  copyright: {
    alignItems: 'center',
  },
  copyrightText: {
    fontSize: 12,
    color: '#64748b',
  },
});

export default Footer;