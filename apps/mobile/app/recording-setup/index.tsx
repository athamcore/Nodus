import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import { useState } from 'react';

export default function RecordingSetupScreen() {
  const router = useRouter();
  const [selectedCourse, setSelectedCourse] = useState<string>('');
  const [lectureTitle, setLectureTitle] = useState('');
  const [storageMode, setStorageMode] = useState<'local' | 'cloud'>('local');

  const courses = [
    { id: 'cs101', name: 'CS 101: Introduction to Computer Science' },
    { id: 'math201', name: 'MATH 201: Calculus II' },
    { id: 'phys101', name: 'PHYS 101: General Physics' },
  ];

  const handleStartRecording = () => {
    if (!selectedCourse) {
      Alert.alert('Validation', 'Please select a course');
      return;
    }
    if (!lectureTitle.trim()) {
      Alert.alert('Validation', 'Please enter a lecture title');
      return;
    }
    // Phase 1: Recording engine not implemented yet
    Alert.alert(
      'Not Implemented',
      'Recording engine is implemented in Phase 7.\nThis is a Phase 1 scaffold only.'
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Recording Setup</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Course</Text>
        <Picker
          selectedValue={selectedCourse}
          onValueChange={setSelectedCourse}
          style={styles.picker}
          itemStyle={styles.pickerItem}
        >
          <Picker.Item label="Select a course..." value="" />
          {courses.map((course) => (
            <Picker.Item key={course.id} label={course.name} value={course.id} />
          ))}
        </Picker>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Lecture Title</Text>
        <TextInput
          style={styles.input}
          value={lectureTitle}
          onChangeText={setLectureTitle}
          placeholder="e.g., Lecture 5: Recursion & Dynamic Programming"
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Recording Storage Mode</Text>
        <View style={styles.radioGroup}>
          <TouchableOpacity
            style={[styles.radioButton, storageMode === 'local' && styles.radioButtonSelected]}
            onPress={() => setStorageMode('local')}
          >
            <Text style={[styles.radioLabel, storageMode === 'local' && styles.radioLabelSelected]}>Local Only</Text>
            <Text style={styles.radioDescription}>Recording stays on this device</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.radioButton, storageMode === 'cloud' && styles.radioButtonSelected]}
            onPress={() => setStorageMode('cloud')}
          >
            <Text style={[styles.radioLabel, storageMode === 'cloud' && styles.radioLabelSelected]}>Local + Cloud Backup</Text>
            <Text style={styles.radioDescription}>Auto-upload when online</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Microphone Permission</Text>
        <View style={styles.permissionStatus}>
          <Text style={styles.permissionPlaceholder}>Not requested (Phase 1 scaffold)</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Storage Available</Text>
        <View style={styles.permissionStatus}>
          <Text style={styles.permissionPlaceholder}>Not checked (Phase 1 scaffold)</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.startButton} onPress={handleStartRecording} disabled={!selectedCourse || !lectureTitle.trim()}>
        <Text style={[styles.startButtonText, (!selectedCourse || !lectureTitle.trim()) && styles.startButtonDisabled]}>Start Recording (Phase 7)</Text>
      </TouchableOpacity>

      <View style={styles.phaseNotice}>
        <Text style={styles.phaseNoticeText}>⚠ Phase 1 Scaffold — Recording engine implemented in Phase 7</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  backButton: {
    marginRight: 16,
  },
  backButtonText: {
    fontSize: 16,
    color: '#0066CC',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  section: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  picker: {
    height: 48,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  pickerItem: {
    fontSize: 16,
  },
  input: {
    height: 48,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#1a1a1a',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  radioGroup: {
    gap: 12,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  radioButtonSelected: {
    borderColor: '#0066CC',
    backgroundColor: '#f0f7ff',
  },
  radioLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  radioLabelSelected: {
    color: '#0066CC',
  },
  radioDescription: {
    fontSize: 14,
    color: '#888888',
    marginTop: 2,
  },
  permissionStatus: {
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  permissionPlaceholder: {
    fontSize: 16,
    color: '#888888',
  },
  startButton: {
    marginTop: 8,
    height: 56,
    backgroundColor: '#0066CC',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  startButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
  },
  startButtonDisabled: {
    opacity: 0.5,
  },
  phaseNotice: {
    marginTop: 24,
    padding: 16,
    backgroundColor: '#fff3e0',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ffcc80',
  },
  phaseNoticeText: {
    fontSize: 14,
    color: '#e65100',
    textAlign: 'center',
  },
});