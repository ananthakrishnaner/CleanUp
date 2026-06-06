import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { Typography } from '../../components/Typography';
import { colors, spacing, radius } from '../../theme';

// Mock data for available dates and times
const availableDates = [
  { date: '2024-01-15', day: 'Mon', available: true },
  { date: '2024-01-16', day: 'Tue', available: true },
  { date: '2024-01-17', day: 'Wed', available: true },
  { date: '2024-01-18', day: 'Thu', available: false },
  { date: '2024-01-19', day: 'Fri', available: true },
  { date: '2024-01-20', day: 'Sat', available: true },
  { date: '2024-01-21', day: 'Sun', available: true },
];

const timeSlots = [
  { time: '9:00 AM', available: true },
  { time: '10:00 AM', available: true },
  { time: '11:00 AM', available: true },
  { time: '12:00 PM', available: false },
  { time: '1:00 PM', available: true },
  { time: '2:00 PM', available: true },
  { time: '3:00 PM', available: true },
  { time: '4:00 PM', available: true },
  { time: '5:00 PM', available: false },
  { time: '6:00 PM', available: true },
];

export default function BookingFlowScreen() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [step, setStep] = useState(1);

  const nextStep = () =u003e {
    setStep(step + 1);
  };

  const prevStep = () =u003e {
    setStep(step - 1);
  };

  const handleDateSelect = (date) =u003e {
    setSelectedDate(date);
    setSelectedTime(null); // Reset time selection when date changes
  };

  const handleTimeSelect = (time) =u003e {
    setSelectedTime(time);
  };

  return (
    u003cView style={styles.container}u003e
      {/* Header with Step Indicator */}
      u003cView style={styles.header}u003e
        u003cView style={styles.stepIndicator}u003e
          u003cTypography variant="body.lg" color={step === 1 ? colors.primary[500] : colors.neutral[500]}u003e
            1. Date
          u003c/Typographyu003e
          u003cView style={styles.stepSeparator} /u003e
          u003cTypography variant="body.lg" color={step === 2 ? colors.primary[500] : colors.neutral[500]}u003e
            2. Time
          u003c/Typographyu003e
          u003cView style={styles.stepSeparator} /u003e
          u003cTypography variant="body.lg" color={step === 3 ? colors.primary[500] : colors.neutral[500]}u003e
            3. Address
          u003c/Typographyu003e
          u003cView style={styles.stepSeparator} /u003e
          u003cTypography variant="body.lg" color={step === 4 ? colors.primary[500] : colors.neutral[500]}u003e
            4. Review
          u003c/Typographyu003e
        u003c/Viewu003e
      u003c/Viewu003e

      {/* Content */}
      u003cScrollView style={styles.content}u003e
        {step === 1 u0026u0026 (
          u003cView style={styles.stepContent}u003e
            u003cTypography variant="heading.lg" style={styles.stepTitle}u003e
              Select a Date
            u003c/Typographyu003e
            u003cView style={styles.calendarContainer}u003e
              u003cView style={styles.calendarHeader}u003e
                u003cTypography variant="heading.md" color={colors.neutral[900]}u003e
                  January 2024
                u003c/Typographyu003e
              u003c/Viewu003e
              u003cView style={styles.calendarGrid}u003e
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day) =u003e (
                  u003cTypography key={day} variant="caption" color={colors.neutral[500]} style={styles.calendarDayHeader}u003e
                    {day}
                  u003c/Typographyu003e
                ))}
                {/* Calendar days */}
                {Array.from({ length: 35 }, (_, i) =u003e {
                  const day = i - 2; // Start from 3 days before the first
                  const date = new Date(2024, 0, day).toISOString().split('T')[0];
                  const dayData = availableDates.find(d =u003e d.date === date);

                  if (!dayData) return u003cView style={styles.calendarEmptyDay} key={i} /u003e;

                  return (
                    u003cTouchableOpacity
                      key={dayData.date}
                      style={[
                        styles.calendarDay,
                        selectedDate === dayData.date u0026u0026 styles.selectedDate
                      ]}
                      onPress={() =u003e handleDateSelect(dayData.date)}
                      disabled={!dayData.available}
                    u003e
                      u003cView style={styles.calendarDayContent}u003e
                        u003cTypography variant="body.md" color={dayData.available ? colors.neutral[900] : colors.neutral[300]}u003e
                          {day}
                        u003c/Typographyu003e
                        u003cTypography variant="caption" color={colors.neutral[500]}u003e
                          {dayData.day}
                        u03c/Typographyu003e
                      u003c/Viewu003e
                    u003c/TouchableOpacityu003e
                  );
                })}
              u003c/Viewu003e
            u003c/Viewu003e
          u003c/Viewu003e
        )}

        {step === 2 u0026u0026 (
          u003cView style={styles.stepContent}u003e
            u003cTypography variant="heading.lg" style={styles.stepTitle}u003e
              Select a Time
            u003c/Typographyu003e
            u003cTypography variant="body.md" color={colors.neutral[700]} style={styles.selectedDateText}u003e
              {selectedDate}
            u003c/Typographyu003e
            u003cView style={styles.timeSlotsContainer}u003e
              {timeSlots.map((slot) =u003e (
                u003cTouchableOpacity
                  key={slot.time}
                  style={[
                    styles.timeSlot,
                    selectedTime === slot.time u0026u0026 styles.selectedTime,
                    !slot.available u0026u0026 styles.unavailableTime
                  ]}
                  onPress={() =u003e slot.available ? handleTimeSelect(slot.time) : null}
                  disabled={!slot.available}
                u003e
                  u003cTypography variant="body.md" color={slot.available ? colors.neutral[900] : colors.neutral[300]}u003e
                    {slot.time}
                  u003c/Typographyu003e
                u003c/TouchableOpacityu003e
              ))}
            u003c/Viewu003e
          u003c/Viewu003e
        )}

        {step === 3 u0026u0026 (
          u003cView style={styles.stepContent}u003e
            u003cTypography variant="heading.lg" style={styles.stepTitle}u003e
              Select Address
            u003c/Typographyu003e
            u003cView style={styles.addressContainer}u003e
              u003cCard elevation="sm" style={styles.addressCard}u003e
                u003cView style={styles.addressContent}u003e
                  u003cTypography variant="body.md" color={colors.neutral[900]}u003e
                    123 Main St, Apt 4B
                  u003c/Typographyu003e
                  u003cTypography variant="caption" color={colors.neutral[500]}u003e
                    Koramangala, Bangalore
                  u003c/Typographyu003e
                  u003cTypography variant="caption" color={colors.neutral[500]}u003e
                    4BHK, 1200 sqft
                  u003c/Typographyu003e
                u003c/Viewu003e
                u003cButton variant="ghost" size="sm" style={styles.editButton}u003e
                  Edit
                u003c/Buttonu003e
              u003c/Cardu003e
              u003cButton variant="secondary" style={styles.addAddressButton}u003e
                + Add New Address
              u003c/Buttonu003e
            u003c/Viewu003e
          u003c/Viewu003e
        )}

        {step === 4 u0026u0026 (
          u003cView style={styles.stepContent}u003e
            u003cTypography variant="heading.lg" style={styles.stepTitle}u003e
              Review Booking
            u003c/Typographyu003e
            u003cCard elevation="md" style={styles.reviewCard}u003e
              u003cView style={styles.reviewSection}u003e
                u003cTypography variant="body.md" color={colors.neutral[700]}u003e
                  Date
                u003c/Typographyu003e
                u003cTypography variant="body.lg" color={colors.neutral[900]}u003e
                  {selectedDate}
                u003c/Typographyu003e
              u003c/Viewu003e
              u003cView style={styles.reviewSection}u003e
                u003cTypography variant="body.md" color={colors.neutral[700]}u003e
                  Time
                u003c/Typographyu003e
                u003cTypography variant="body.lg" color={colors.neutral[900]}u003e
                  {selectedTime}
                u003c/Typographyu003e
              u003c/Viewu003e
              u003cView style={styles.reviewSection}u003e
                u003cTypography variant="body.md" color={colors.neutral[700]}u003e
                  Address
                u003c/Typographyu003e
                u003cTypography variant="body.lg" color={colors.neutral[900]}u003e
                  123 Main St, Apt 4B
                u003c/Typographyu003e
                u003cTypography variant="caption" color={colors.neutral[500]}u003e
                  Koramangala, Bangalore
                u003c/Typographyu003e
              u003c/Viewu003e
              u003cView style={styles.reviewSection}u003e
                u003cTypography variant="body.md" color={colors.neutral[700]}u003e
                  Total
                u003c/Typographyu003e
                u003cTypography variant="heading.lg" color={colors.primary[500]}u003e
                  ₹1500
                u003c/Typographyu003e
              u003c/Viewu003e
            u003c/Cardu003e
          u003c/Viewu003e
        )}
      u003c/ScrollViewu003e

      {/* Footer Navigation */}
      u003cView style={styles.footer}u003e
        {step u003e 1 u0026u0026 (
          u003cButton
            variant="ghost"
            onPress={prevStep}
            style={styles.prevButton}
          u003e
            Back
          u003c/Buttonu003e
        )}
        u003cButton
          variant="primary"
          onPress={step u003c 4 ? nextStep : () =u003e {}}
          style={styles.nextButton}
        u003e
          {step === 4 ? 'Confirm Booking' : 'Next'}
        u003c/Buttonu003e
      u003c/Viewu003e
    u003c/Viewu003e
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
  selectedDateText: {
    textAlign: 'center',
    marginBottom: spacing[4],
  },
  calendarContainer: {
    backgroundColor: colors.neutral[0],
    borderRadius: radius.lg,
    padding: spacing[4],
    marginBottom: spacing[6],
    ...shadows.sm,
  },
  calendarHeader: {
    alignItems: 'center',
    marginBottom: spacing[4],
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[2],
  },
  calendarDayHeader: {
    width: (width - spacing[4] * 2 - spacing[2] * 6) / 7,
    textAlign: 'center',
    marginBottom: spacing[2],
  },
  calendarEmptyDay: {
    width: (width - spacing[4] * 2 - spacing[2] * 6) / 7,
    height: 0,
  },
  calendarDay: {
    width: (width - spacing[4] * 2 - spacing[2] * 6) / 7,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: radius.pill,
    margin: spacing[1],
  },
  selectedDate: {
    backgroundColor: colors.primary[500],
    color: colors.neutral[0],
  },
  calendarDayContent: {
    alignItems: 'center',
    gap: spacing[1],
  },
  timeSlotsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[2],
    marginBottom: spacing[6],
  },
  timeSlot: {
    backgroundColor: colors.neutral[0],
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[4],
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.neutral[200],
  },
  selectedTime: {
    backgroundColor: colors.primary[500],
    borderColor: colors.primary[500],
    color: colors.neutral[0],
  },
  unavailableTime: {
    backgroundColor: colors.neutral[100],
    borderColor: colors.neutral[200],
  },
  addressContainer: {
    gap: spacing[4],
  },
  addressCard: {
    padding: spacing[5],
  },
  addressContent: {
    flex: 1,
    gap: spacing[1],
  },
  editButton: {
    paddingHorizontal: spacing[4],
  },
  addAddressButton: {
    marginTop: spacing[4],
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