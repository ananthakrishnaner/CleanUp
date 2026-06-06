import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';

const companyLinks = [
  { name: 'About Us', route: '#' },
  { name: 'Careers', route: '#' },
  { name: 'Blog', route: '#' },
  { name: 'Press', route: '#' },
  { name: 'Partnership', route: '#' },
];

const serviceLinks = [
  { name: 'Deep Cleaning', route: '#' },
  { name: 'Kitchen Cleaning', route: '#' },
  { name: 'Sofa Cleaning', route: '#' },
  { name: 'Bathroom Cleaning', route: '#' },
  { name: 'Carpet Cleaning', route: '#' },
  { name: 'Window Cleaning', route: '#' },
];

const legalLinks = [
  { name: 'Terms of Service', route: '#' },
  { name: 'Privacy Policy', route: '#' },
  { name: 'Cookie Policy', route: '#' },
  { name: 'Disclaimer', route: '#' },
];

const cities = [
  { name: 'Bangalore', route: '#' },
  { name: 'Mumbai', route: '#' },
  { name: 'Delhi', route: '#' },
  { name: 'Hyderabad', route: '#' },
  { name: 'Chennai', route: '#' },
  { name: 'Pune', route: '#' },
];

const ProfessionalFooter = () => {
  return (
    <View style={styles.container}>
      {/* Main Footer Content */}
      <View style={styles.mainContent}>
        {/* Brand Section */}
        <View style={styles.brandSection}>
          <View style={styles.brandLogo}>
            <Text style={styles.logoText}>🧼</Text>
          </View>
          <Text style={styles.brandName}>CleanUp</Text>
          <Text style={styles.tagline}>
            Professional home cleaning services
          </Text>

          <View style={styles.socialLinks}>
            <TouchableOpacity style={styles.socialLink}>
              <Text style={styles.socialIcon}>f</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialLink}>
              <Text style={styles.socialIcon}>🐦</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialLink}>
              <Text style={styles.socialIcon}>📸</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialLink}>
              <Text style={styles.socialIcon}>▶️</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Links Grid */}
        <View style={styles.linksGrid}>
          <View style={styles.linkColumn}>
            <Text style={styles.columnTitle}>Company</Text>
            {companyLinks.map((link, index) => (
              <TouchableOpacity key={index} style={styles.link}>
                <Text style={styles.linkText}>{link.name}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.linkColumn}>
            <Text style={styles.columnTitle}>Services</Text>
            {serviceLinks.map((link, index) => (
              <TouchableOpacity key={index} style={styles.link}>
                <Text style={styles.linkText}>{link.name}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.linkColumn}>
            <Text style={styles.columnTitle}>Cities</Text>
            {cities.map((city, index) => (
              <TouchableOpacity key={index} style={styles.link}>
                <Text style={styles.linkText}>{city.name}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.linkColumn}>
            <Text style={styles.columnTitle}>Legal</Text>
            {legalLinks.map((link, index) => (
              <TouchableOpacity key={index} style={styles.link}>
                <Text style={styles.linkText}>{link.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Newsletter */}
        <View style={styles.newsletter}>
          <Text style={styles.newsletterTitle}>Get Updates</Text>
          <Text style={styles.newsletterText}>
            Subscribe to our newsletter for offers and updates
          </Text>
          <View style={styles.newsletterForm}>
            <Text style={styles.emailIcon}>📧</Text>
            <Text style={styles.emailPlaceholder}>your@email.com</Text>
            <TouchableOpacity style={styles.subscribeButton}>
              <Text style={styles.subscribeText}>Subscribe</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Bottom Bar */}
      <View style={styles.bottomBar}>
        <Text style={styles.copyright}>
          © 2024 CleanUp. All rights reserved.
        </Text>
        <View style={styles.quickLinks}>
          <TouchableOpacity style={styles.quickLink}>
            <Text style={styles.quickLinkText}>Help</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickLink}>
            <Text style={styles.quickLinkText}>Contact</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickLink}>
            <Text style={styles.quickLinkText}>Support</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1a237e',
    paddingTop: 40,
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  mainContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 24,
    marginBottom: 32,
  },
  brandSection: {
    flexBasis: '100%',
    marginBottom: 24,
  },
  brandLogo: {
    width: 48,
    height: 48,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  logoText: {
    fontSize: 24,
    color: '#1a237e',
  },
  brandName: {
    fontSize: 28,
    fontWeight: 800,
    color: '#ffffff',
    marginBottom: 8,
  },
  tagline: {
    fontSize: 14,
    color: '#b3b8ff',
    marginBottom: 16,
  },
  socialLinks: {
    flexDirection: 'row',
    gap: 12,
  },
  socialLink: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialIcon: {
    fontSize: 16,
    color: '#ffffff',
  },
  linksGrid: {
    flexBasis: '60%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 24,
  },
  linkColumn: {
    flexBasis: '50%',
  },
  columnTitle: {
    fontSize: 14,
    fontWeight: 700,
    color: '#ffffff',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  link: {
    marginBottom: 8,
  },
  linkText: {
    fontSize: 13,
    color: '#b3b8ff',
  },
  newsletter: {
    flexBasis: '30%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 24,
  },
  newsletterTitle: {
    fontSize: 16,
    fontWeight: 700,
    color: '#ffffff',
    marginBottom: 8,
  },
  newsletterText: {
    fontSize: 13,
    color: '#b3b8ff',
    marginBottom: 16,
  },
  newsletterForm: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    overflow: 'hidden',
  },
  emailIcon: {
    fontSize: 16,
    paddingHorizontal: 12,
    color: '#b3b8ff',
  },
  emailPlaceholder: {
    flex: 1,
    fontSize: 14,
    color: '#b3b8ff',
    paddingVertical: 12,
  },
  subscribeButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#00c853',
  },
  subscribeText: {
    fontSize: 13,
    color: '#ffffff',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    paddingTop: 16,
  },
  copyright: {
    fontSize: 12,
    color: '#b3b8ff',
  },
  quickLinks: {
    flexDirection: 'row',
    gap: 16,
  },
  quickLink: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  quickLinkText: {
    fontSize: 12,
    color: '#ffffff',
  },
});

export default ProfessionalFooter;