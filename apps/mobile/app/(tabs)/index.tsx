import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Nodus</Text>
        <Text style={styles.subtitle}>Intelligent Academic Memory</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Current Courses</Text>
        <View style={styles.emptyState}>
          <Text>No courses yet. Join or create a course to get started.</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Lectures</Text>
        <View style={styles.emptyState}>
          <Text>No lectures recorded yet.</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Processing Queue</Text>
        <View style={styles.emptyState}>
          <Text>No processing jobs.</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.recordButton}
        onPress={() => router.push('/recording-setup')}
        accessibilityLabel="Go to recording setup (Phase 1 scaffold)"
      >
        <Text style={styles.recordButtonText}>Recording Setup (Phase 7)</Text>
      </TouchableOpacity>

      <View style={styles.phaseNotice}>
        <Text style={styles.phaseNoticeText}>⚠ Phase 1 Scaffold — Core features implemented in Phases 2-21</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    padding: 20,
    paddingBottom: 140,
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    marginTop: 4,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 12,
  },
  emptyState: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  recordButton: {
    position: 'absolute',
    bottom: 80,
    left: 20,
    right: 20,
    height: 56,
    backgroundColor: '#0066CC',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  recordButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
  },
  phaseNotice: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
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