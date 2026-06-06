import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { Typography } from '../../components/Typography';
import { colors, spacing, radius } from '../../theme';

export default function ServiceSelectionScreen() {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [step, setStep] = useState(1);

  const services = [
    {
      id: 1,
      name: 'Deep Cleaning',
      description: 'Comprehensive cleaning of all rooms',
      price: 1500,
      duration: '4-5 hours',
      icon: '🏠',
    },
    {
      id: 2,
      name: 'Kitchen Cleaning',
      description: 'Deep clean kitchen appliances and surfaces',
      price: 800,
      duration: '2-3 hours',
      icon: '🍳',
    },
    {
      id: 3,
      name: 'Sofa Cleaning',
      description: 'Professional sofa and upholstery cleaning',
      price: 600,
      duration: '1-2 hours',
      icon: '🛋️',
    },
    {
      id: 4,
      name: 'Bathroom Cleaning',
      description: 'Deep clean and sanitize bathroom',
      price: 500,
      duration: '1-2 hours',
      icon: '🚽',
    },
  ];

  const addOns = [
    {
      id: 1,
      name: 'Window Cleaning',
      price: 200,
      description: 'Interior window cleaning',
    },
    {
      id: 2,
      name: 'Closet Organization',
      price: 300,
      description: 'Organize and declutter closet',
    },
    {
      id: 3,
      name: 'Mattress Cleaning',
      price: 400,
      description: 'Deep clean and sanitize mattress',
    },
    {
      id: 4,
      name: 'Refrigerator Cleaning',
      price: 250,
      description: 'Clean interior and exterior of refrigerator',
    },
  ];

  const toggleAddOn = (addOnId: string) => {
    if (selectedAddOns.includes(addOnId)) {
      setSelectedAddOns(selectedAddOns.filter(id => id !== addOnId));
    } else {
      setSelectedAddOns([...selectedAddOns, addOnId]);
    }
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const totalAddOnPrice = addOns
    .filter(addOn => selectedAddOns.includes(addOn.id.toString()))
    .reduce((sum, addOn) => sum + addOn.price, 0);

  const selectedServiceObj = services.find(s => s.id.toString() === selectedService);
  const total = selectedServiceObj ? selectedServiceObj.price + totalAddOnPrice : 0;

  return (
    <View style={styles.container}>
      {/* Header with Step Indicator */}
      <View style={styles.header}>
        <View style={styles.stepIndicator}>
          <Typography variant="body.lg" color={step === 1 ? colors.primary[500] : colors.neutral[500]}>
            1. Service
          </Typography>
          <View style={styles.stepSeparator} />
          <Typography variant="body.lg" color={step === 2 ? colors.primary[500] : colors.neutral[500]}>
            2. Add-ons
          </Typography>
          <View style={styles.stepSeparator} />
          <Typography variant="body.lg" color={step === 3 ? colors.primary[500] : colors.neutral[500]}>
            3. Review
          </Typography>
        </View>
      </View>

      {/* Content */}
      <ScrollView style={styles.content}>
        {step === 1 && (
          <View style={styles.stepContent}>
            <Typography variant="heading.lg" style={styles.stepTitle}>
              Select Your Service
            </Typography>
            <View style={styles.servicesGrid}>
              {services.map((service) => (
                <Card
                  key={service.id}
                  elevation="md"
                  style={[
                    styles.serviceCard,
                    selectedService === service.id.toString() && styles.selectedService
                  ]}
                  onPress={() => setSelectedService(service.id.toString())}
                >
                  <View style={styles.serviceContent}>
                    <View style={styles.serviceIcon}>
                      <Typography variant="heading.xl">{service.icon}</Typography>
                    </View>
                    <View style={styles.serviceInfo}>
                      <Typography variant="body.md" color={colors.neutral[900]}>
                        {service.name}
                      </Typography>
                      <Typography variant="caption" color={colors.neutral[500]}>
                        {service.description}
                      </Typography>
                    </View>
                    <View style={styles.servicePrice}>
                      <Typography variant="heading.md" color={colors.primary[500]}>
                        ₹{service.price}
                      </Typography>
                      <Typography variant="caption" color={colors.neutral[500]}>
                        {service.duration}
                      </Typography>
                    </View>
                  </View>
                </Card>
              ))}
            </View>
          </View>
        )}

        {step === 2 && (
          <View style={styles.stepContent}>
            <Typography variant="heading.lg" style={styles.stepTitle}>
              Add Additional Services
            </Typography>
            <View style={styles.addOnsGrid}>
              {addOns.map((addOn) => (
                <Card
                  key={addOn.id}
                  elevation="sm"
                  style={[
                    styles.addOnCard,
                    selectedAddOns.includes(addOn.id.toString()) && styles.selectedAddOn
                  ]}
                  onPress={() => toggleAddOn(addOn.id.toString())}
                >
                  <View style={styles.addOnContent}>
                    <Typography variant="body.md" color={colors.neutral[900]}>
                      {addOn.name}
                    </Typography>
                    <Typography variant="caption" color={colors.neutral[500]}>
                      {addOn.description}
                    </Typography>
                    <Typography variant="body.lg" color={colors.primary[500]}>
                      +₹{addOn.price}
                    </Typography>
                  </View>
                </Card>
              ))}
            </View>
          </View>
        )}

        {step === 3 && (
          <View style={styles.stepContent}>
            <Typography variant="heading.lg" style={styles.stepTitle}>
              Review Your Booking
            c/Typography>
            <Card elevation="md" style={styles.reviewCard}>
              <View style={styles.reviewSection}>
                <Typography variant="body.md" color={colors.neutral[700]}>
                  Service
                </Typography>
                <Typography variant="body.lg" color={colors.neutral[900]}>
                  {selectedServiceObj?.name}
                </Typography>
                <Typography variant="body.md" color={colors.primary[500]}>
                  ₹{selectedServiceObj?.price}
                </Typography>
              </View>
              {selectedAddOns.length > 0 && (
                <View style={styles.reviewSection}>
                  <Typography variant="body.md" color={colors.neutral[700]}>
                    Add-ons
                  </Typography>
                  {addOns
                    .filter(addOn => selectedAddOns.includes(addOn.id.toString()))
                    .map((addOn) => (
                      <View key={addOn.id} style={styles.addOnItem}>
                        <Typography variant="body.md" color={colors.neutral[900]}>
                          {addOn.name}
                        </Typography>
                        <Typography variant="body.md" color={colors.primary[500]}>
                          ₹{addOn.price}
                        </Typography>
                      </View>
                    ))}
                  <Typography variant="body.md" color={colors.primary[500]} style={styles.addOnTotal}>
                    Total Add-ons: ₹{totalAddOnPrice}
                  </Typography>
                </View>
              )}
              <View style={styles.reviewSection}>
                <Typography variant="body.md" color={colors.neutral[700]}>
                  Total
                </Typography>
                <Typography variant="heading.lg" color={colors.primary[500]}>
                  ₹{total}
                </Typography>
              </View>
            </Card>
          </View>
        )}
      </ScrollView>

      {/* Footer Navigation */}
      <View style={styles.footer}>
        {step > 1 && (
          <Button
            variant="ghost"
            onPress={prevStep}
            style={styles.prevButton}
          >
            Back
          </Button>
        )}
        <Button
          variant="primary"
          onPress={step < 3 ? nextStep : () => {}}
          style={styles.nextButton}
          title={step === 3 ? 'Confirm Booking' : 'Next'}
        >
          {step === 3 ? 'Confirm Booking' : 'Next'}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral[50],
  },
  header: {
    padding: spacing[6],
    backgroundColor: colors.neutral[0],
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[200],
  },
  stepIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepSeparator: {
    width: 16,
    height: 1,
    backgroundColor: colors.neutral[300],
    marginHorizontal: spacing[2],
  },
  content: {
    flex: 1,
    padding: spacing[6],
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    textAlign: 'center',
    marginBottom: spacing[6],
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[4],
  },
  serviceCard: {
    width: '45%',
    padding: spacing[5],
  },
  selectedService: {
    borderWidth: 2,
    borderColor: colors.primary[500],
    borderRadius: radius.lg,
  },
  serviceContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing[3],
  },
  serviceIcon: {
    width: 48,
    height: 48,
    borderRadius: radius.lg,
    backgroundColor: colors.primary[50],
    justifyContent: 'center',
    alignItems: 'center',
  },
  serviceInfo: {
    flex: 1,
  },
  servicePrice: {
    alignItems: 'flex-end',
  },
  addOnsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[3],
  },
  addOnCard: {
    width: '45%',
    padding: spacing[4],
  },
  selectedAddOn: {
    backgroundColor: colors.primary[50],
    borderWidth: 1,
    borderColor: colors.primary[500],
    borderRadius: radius.md,
  },
  addOnContent: {
    alignItems: 'center',
    gap: spacing[1],
  },
  reviewCard: {
    padding: spacing[5],
  },
  reviewSection: {
    gap: spacing[1],
    marginBottom: spacing[4],
    paddingBottom: spacing[4],
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[200],
  },
  addOnItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing[1],
  },
  addOnTotal: {
    marginTop: spacing[2],
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing[4],
    backgroundColor: colors.neutral[0],
    borderTopWidth: 1,
    borderTopColor: colors.neutral[200],
  },
  prevButton: {
    paddingHorizontal: spacing[6],
  },
  nextButton: {
    width: '60%',
    paddingVertical: spacing[4],
  },
});