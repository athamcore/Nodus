import { View, Text, StyleSheet, TextInput } from 'react-native';

export default function SearchScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Search</Text>
      </View>
      <View style={styles.searchBar}>
        <TextInput
          placeholder="Search lectures, notes, materials..."
          style={styles.searchInput}
          placeholderTextColor="#888888"
          editable={false}
        />
      </View>
      <View style={styles.emptyState}>
        <Text style={styles.emptyText}>Search your academic memory</Text>
        <Text style={styles.emptySubtext}>Results from transcripts, notes, materials, and visuals will appear here.</Text>
      </View>
      <View style={styles.phaseNotice}>
        <Text style={styles.phaseNoticeText}>⚠ Phase 1 Scaffold — Search implemented in Phase 17</Text>
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
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  searchBar: {
    marginBottom: 24,
  },
  searchInput: {
    height: 48,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#1a1a1a',
    borderWidth: 1,
    borderColor: '#e0e0e0',
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