import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';

const TestimonialCard = ({ name, rating, comment, date, image }) => {
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Text key={i} style={[styles.star, i <= rating ? styles.filledStar : styles.emptyStar]}>
          ⭐
        </Text>
      );
    }
    return <View style={styles.stars}>{stars}</View>;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {image ? (
          <Image source={image} style={styles.avatar} />
        ) : (
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{name.split(' ').map(n => n[0]).join('')}</Text>
          </View>
        )}
        <View style={styles.userInfo}>
          <Text style={styles.name}>{name}</Text>
          {renderStars()}
        </View>
        <Text style={styles.date}>{date}</Text>
      </View>
      <Text style={styles.comment}>"{comment}"</Text>
      <TouchableOpacity style={styles.readMore}>
        <Text style={styles.readMoreText}>Read full review</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#3b82f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 20,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  userInfo: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 700,
    color: '#1e293b',
    marginBottom: 4,
  },
  stars: {
    flexDirection: 'row',
  },
  star: {
    fontSize: 14,
    marginRight: 2,
  },
  filledStar: {
    color: '#fbbf24',
  },
  emptyStar: {
    color: '#e5e7eb',
  },
  date: {
    fontSize: 12,
    color: '#9ca3af',
  },
  comment: {
    fontSize: 14,
    color: '#4b5563',
    lineHeight: 20,
    marginBottom: 16,
    fontStyle: 'italic',
  },
  readMore: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#f3f4f6',
    borderRadius: 20,
  },
  readMoreText: {
    fontSize: 12,
    color: '#3b82f6',
    fontWeight: 500,
  },
});

export default TestimonialCard;