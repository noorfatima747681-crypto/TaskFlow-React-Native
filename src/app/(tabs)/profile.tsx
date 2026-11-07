
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTasks } from '@/context/TaskContext';
import { supabase } from '../../../lib/supabase/client';
import { useRouter } from 'expo-router';
import { useState } from 'react';

export default function ProfileScreen() {
  const { tasks } = useTasks();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const completedTasks = tasks.filter(task => task.done).length;
  const pendingTasks = tasks.length - completedTasks;

  const handleSignOut = async () => {
    setLoading(true);

    const { error } = await supabase.auth.signOut();

    setLoading(false);

    if (error) {
      Alert.alert('Error', error.message);
      return;
    }

router.replace('/sign-in' as any);  };

  const confirmSignOut = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Yes, Sign Out', onPress: handleSignOut },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.heading}>My Profile</Text>
        <Text style={styles.subtitle}>
          Manage your TaskFlow profile
        </Text>

        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>TF</Text>
          </View>

          <Text style={styles.name}>TaskFlow User</Text>
          <Text style={styles.role}>TaskFlow Member</Text>
        </View>

        <Text style={styles.sectionTitle}>My Activity</Text>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{tasks.length}</Text>
            <Text style={styles.statLabel}>Total Tasks</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{completedTasks}</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{pendingTasks}</Text>
            <Text style={styles.statLabel}>Pending</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>About App</Text>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>TaskFlow</Text>
          <Text style={styles.infoDescription}>
            TaskFlow helps you organize daily activities,
            manage your tasks and track your progress
            in one place.
          </Text>

          <View style={styles.divider} />

          <Text style={styles.version}>App Version 1.0.0</Text>
        </View>

        <TouchableOpacity
          style={styles.signOutButton}
          onPress={confirmSignOut}
          disabled={loading}
        >
          <Text style={styles.signOutText}>
            {loading ? 'Signing Out...' : 'Sign Out'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F5ED',
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#263F36',
    marginTop: 20,
  },
  subtitle: {
    fontSize: 15,
    color: '#718078',
    marginTop: 6,
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 25,
    alignItems: 'center',
    marginTop: 25,
  },
  avatar: {
    width: 85,
    height: 85,
    borderRadius: 45,
    backgroundColor: '#315C50',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#263F36',
    marginTop: 15,
  },
  role: {
    fontSize: 14,
    color: '#718078',
    marginTop: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#263F36',
    marginTop: 30,
    marginBottom: 15,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    paddingVertical: 20,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#315C50',
  },
  statLabel: {
    fontSize: 11,
    color: '#718078',
    marginTop: 7,
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#263F36',
  },
  infoDescription: {
    fontSize: 14,
    color: '#718078',
    lineHeight: 22,
    marginTop: 10,
  },
  divider: {
    height: 1,
    backgroundColor: '#E5EAE2',
    marginVertical: 18,
  },
  version: {
    fontSize: 13,
    color: '#718078',
  },
  signOutButton: {
    backgroundColor: '#C0392B',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 30,
  },
  signOutText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
