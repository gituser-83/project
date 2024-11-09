import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Button } from 'react-native';
import { HelloWave } from '@/components/HelloWave';
import { Picker } from '@react-native-picker/picker';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import DateTimePickerModal from 'react-native-modal-datetime-picker'; // Correct import for DateTimePickerModal

export default function StudyPlannerScreen() {
  const [subject, setSubject] = useState('');
  const [duration, setDuration] = useState('');
  const [deadline, setDeadline] = useState(new Date());
  const [offDay, setOffDay] = useState('Sunday');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const handleSubmit = () => {
    console.log({
      subject,
      duration,
      deadline,
      offDay,
    });
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirmDate = (date: Date) => {
    setDeadline(date);
    hideDatePicker();
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={<View />} // Empty View to satisfy the type requirement for `headerImage`
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Study Planner</ThemedText>
        <HelloWave />
      </ThemedView>

      {/* Subject Input */}
      <ThemedView style={styles.formContainer}>
        <ThemedText type="subtitle">Subject</ThemedText>
        <TextInput
          style={styles.input}
          placeholder="Enter subject name"
          placeholderTextColor="#fff"  // Custom color for the placeholder (white)
          value={subject}
          onChangeText={setSubject}
        />
      </ThemedView>

      {/* Duration Input */}
      <ThemedView style={styles.formContainer}>
        <ThemedText type="subtitle">Duration per week (hrs)</ThemedText>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Enter duration"
          placeholderTextColor="#fff"  // Custom color for the placeholder (white)
          value={duration}
          onChangeText={setDuration}
        />
      </ThemedView>

      {/* Deadline Input */}
      <ThemedView style={styles.formContainer}>
        <ThemedText type="subtitle">Deadline</ThemedText>
        <Button title="Select Deadline" onPress={showDatePicker} />
        <TextInput
          style={styles.input}
          editable={false}
          value={deadline.toLocaleDateString()} // Display the date as a string
        />
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          date={deadline}
          onConfirm={handleConfirmDate}
          onCancel={hideDatePicker}
        />
      </ThemedView>

      {/* Off Day Picker */}
      <ThemedView style={styles.formContainer}>
        <ThemedText type="subtitle">Off Day</ThemedText>
        <Picker
          selectedValue={offDay}
          onValueChange={setOffDay}
          style={styles.picker}
        >
          <Picker.Item label="Sunday" value="Sunday" />
          <Picker.Item label="Monday" value="Monday" />
          <Picker.Item label="Tuesday" value="Tuesday" />
          <Picker.Item label="Wednesday" value="Wednesday" />
          <Picker.Item label="Thursday" value="Thursday" />
          <Picker.Item label="Friday" value="Friday" />
          <Picker.Item label="Saturday" value="Saturday" />
        </Picker>
      </ThemedView>

      {/* Submit Button */}
      <ThemedView style={styles.formContainer}>
        <Button title="Save Study Plan" onPress={handleSubmit} />
      </ThemedView>
      <ThemedView style={styles.getOP}>
        <Button title="Save and Generate Study Plan" onPress={handleSubmit}/>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  getOP: {
    gap: 5,
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  formContainer: {
    gap: 8,
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    fontSize: 16,
    color: '#fff', // Color of the text input text
  },
  picker: {
    height: 50,
    width: '100%',
    color: '#FF6F00'
  },
});