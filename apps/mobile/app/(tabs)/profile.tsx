import { View, Text, StyleSheet, Switch } from 'react-native';
import { useState } from 'react';

export default function ProfileScreen() {
  const [cloudBackup, setCloudBackup] = useState(false);
  const [localOnly, setLocalOnly] = useState(true);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Account Status</Text>
          <Text style={styles.settingPlaceholder}>Not signed in (Phase 1 scaffold)</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Storage & Cloud</Text>
        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Local Only</Text>
          <Switch
            value={localOnly}
            onValueChange={(v) => { setLocalOnly(v); if (v) setCloudBackup(false); }}
            disabled={!localOnly && !cloudBackup}
          />
        </View>
        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Local + Cloud Backup</Text>
          <Switch
            value={cloudBackup}
            onValueChange={(v) => { setCloudBackup(v); if (v) setLocalOnly(false); }}
            disabled={localOnly && !cloudBackup}
          />
        </View>
        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Used Storage</Text>
          <Text style={styles.settingPlaceholder}>Not available (Phase 1 scaffold)</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Privacy</Text>
        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Recording Consent</Text>
          <Text style={styles.settingPlaceholder}>Not configured (Phase 1 scaffold)</Text>
        </View>
        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Data Retention</Text>
          <Text style={styles.settingPlaceholder}>Not configured (Phase 1 scaffold)</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Version</Text>
          <Text style={styles.settingValue}>0.0.1 (Phase 1 Scaffold)</Text>
        </View>
      </View>

      <View style={styles.phaseNotice}>
        <Text style={styles.phaseNoticeText}>⚠ Phase 1 Scaffold — Auth & settings implemented in Phase 3+</Text>
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
  section: {
    marginBottom: 24,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  settingLabel: {
    fontSize: 16,
    color: '#1a1a1a',
  },
  settingValue: {
    fontSize: 16,
    color: '#666666',
  },
  settingPlaceholder: {
    fontSize: 16,
    color: '#888888',
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