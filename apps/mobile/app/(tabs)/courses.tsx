import { View, Text, StyleSheet } from 'react-native';

export default function CoursesScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Courses</Text>
      </View>
      <View style={styles.emptyState}>
        <Text style={styles.emptyText}>No courses yet.</Text>
        <Text style={styles.emptySubtext}>Join a course with an invite code or create a new one.</Text>
      </View>
      <View style={styles.phaseNotice}>
        <Text style={styles.phaseNoticeText}>⚠ Phase 1 Scaffold — Courses implemented in Phase 5</Text>
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
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 16,
    color: '#888888',
    textAlign: 'center',
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