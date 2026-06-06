import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';

const testimonials = [
  {
    id: 1,
    name: 'Rahul Sharma',
    location: 'Bangalore',
    rating: 5,
    comment: 'Excellent service! The team was professional and did a thorough job. My home looks spotless after the deep cleaning.',
    date: '2 days ago',
  },
  {
    id: 2,
    name: 'Priya Patel',
    location: 'Hyderabad',
    rating: 5,
    comment: 'Best cleaning service I\'ve used. The cleaners were on time and very efficient. Highly recommended!',
    date: '1 week ago',
  },
  {
    id: 3,
    name: 'Amit Kumar',
    location: 'Pune',
    rating: 4,
    comment: 'Very convenient and affordable. They did a great job with my sofa. Will definitely book again.',
    date: '2 weeks ago',
  },
];

const ProfessionalTestimonials = () => {
  const renderStars = (rating) => {
    return '⭐'.repeat(rating);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Customer Reviews</Text>
        <View style={styles.ratingSummary}>
          <Text style={styles.ratingNumber}>4.8</Text>
          <View style={styles.ratingDetails}>
            <Text style={styles.ratingStars}>⭐⭐⭐⭐⭐</Text>
            <Text style={styles.ratingCount}>2,340 reviews</Text>
          </View>
        </View>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.testimonialScroll}
        contentContainerStyle={styles.testimonialContainer}
      >
        {testimonials.map((testimonial) => (
          <View key={testimonial.id} style={styles.testimonialCard}>
            <View style={styles.testimonialHeader}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {testimonial.name.split(' ').map(n => n[0]).join('')}
                </Text>
              </View>
              <View style={styles.userInfo}>
                <Text style={styles.userName}>{testimonial.name}</Text>
                <Text style={styles.userLocation}>{testimonial.location}</Text>
              </View>
              <Text style={styles.reviewDate}>{testimonial.date}</Text>
            </View>

            <Text style={styles.testimonialStars}>{renderStars(testimonial.rating)}</Text>
            <Text style={styles.testimonialComment}>"{testimonial.comment}"</Text>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.viewAllButton}>
        <Text style={styles.viewAllText}>View All Reviews</Text>
      </TouchableOpacity>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 700,
    color: '#212529',
  },
  ratingSummary: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  ratingNumber: {
    fontSize: 24,
    fontWeight: 800,
    color: '#1a237e',
  },
  ratingDetails: {
    flexDirection: 'column',
  },
  ratingStars: {
    fontSize: 12,
  },
  ratingCount: {
    fontSize: 11,
    color: '#6c757d',
  },
  testimonialScroll: {
    marginHorizontal: -16,
  },
  testimonialContainer: {
    paddingHorizontal: 16,
  },
  testimonialCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    width: 280,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#dee2e6',
  },
  testimonialHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#1a237e',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  avatarText: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: 700,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 15,
    fontWeight: 700,
    color: '#212529',
  },
  userLocation: {
    fontSize: 12,
    color: '#6c757d',
  },
  reviewDate: {
    fontSize: 11,
    color: '#adb5bd',
  },
  testimonialStars: {
    fontSize: 14,
    marginBottom: 8,
  },
  testimonialComment: {
    fontSize: 13,
    color: '#495057',
    lineHeight: 20,
    fontStyle: 'italic',
  },
  viewAllButton: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  viewAllText: {
    fontSize: 14,
    color: '#00c853',
    fontWeight: 600,
  },
});

export default ProfessionalTestimonials;