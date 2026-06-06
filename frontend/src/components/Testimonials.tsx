import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import TestimonialCard from './TestimonialCard';

const testimonials = [
  {
    id: 1,
    name: 'Rahul Sharma',
    rating: 5,
    comment: 'Excellent service! The cleaning team was professional and did a thorough job. My home looks sparkling clean.',
    date: '2 days ago',
    image: null,
  },
  {
    id: 2,
    name: 'Priya Patel',
    rating: 5,
    comment: 'Best cleaning service I\'ve used. The app is easy to use and the cleaners are very polite.',
    date: '1 week ago',
    image: null,
  },
  {
    id: 3,
    name: 'Amit Kumar',
    rating: 4,
    comment: 'Very convenient and affordable. They arrived on time and did a good job overall.',
    date: '3 weeks ago',
    image: null,
  }
];

const Testimonials = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>What Our Customers Say</Text>
      <View style={styles.section}>
        <View style={styles.intro}>
          <Text style={styles.subtitle}>
            Join thousands of satisfied customers who trust CleanUp for their cleaning needs.
          </Text>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.testimonialScroll}
          contentContainerStyle={styles.testimonialContainer}
        >
          {testimonials.map((testimonial) => (
            <TestimonialCard
              key={testimonial.id}
              {...testimonial}
            />
          ))}
        </ScrollView>
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
    marginBottom: 16,
  },
  section: {
    backgroundColor: '#f8fafc',
    borderRadius: 20,
    padding: 24,
  },
  intro: {
    marginBottom: 24,
  },
  subtitle: {
    fontSize: 16,
    color: '#475569',
    textAlign: 'center',
    lineHeight: 24,
  },
  testimonialScroll: {
    marginHorizontal: -24,
  },
  testimonialContainer: {
    paddingHorizontal: 24,
  },
});

export default Testimonials;