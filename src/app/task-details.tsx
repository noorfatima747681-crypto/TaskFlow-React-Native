
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTasks } from '@/context/TaskContext';

export default function TaskDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { tasks, toggleTask } = useTasks();

  const task = tasks.find(item => item.id === Number(id));

  if (!task) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.heading}>Task Not Found</Text>
        <Pressable style={styles.button} onPress={() => router.back()}>
          <Text style={styles.buttonText}>Go Back</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Pressable onPress={() => router.back()}>
        <Text style={styles.back}>‹ Back to My Tasks</Text>
      </Pressable>

      <Text style={styles.heading}>Task Details</Text>
      <Text style={styles.subtitle}>View your task information</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Task Name</Text>
        <Text style={styles.value}>{task.title}</Text>

        <Text style={styles.label}>Category</Text>
        <Text style={styles.value}>{task.category}</Text>

        <Text style={styles.label}>Scheduled Time</Text>
        <Text style={styles.value}>{task.time}</Text>

        <Text style={styles.label}>Task Status</Text>
        <Text style={styles.status}>
          {task.done ? 'Completed' : 'Pending'}
        </Text>

        <Pressable
          style={styles.button}
          onPress={() => toggleTask(task.id)}
        >
          <Text style={styles.buttonText}>
            {task.done ? 'Mark as Pending' : 'Mark as Completed'}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F6FC',
    padding: 20,
  },
  back: {
    color: '#7054D8',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 15,
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#33245E',
    marginTop: 25,
  },
  subtitle: {
    fontSize: 15,
    color: '#89859A',
    marginTop: 6,
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 22,
    borderRadius: 18,
    marginTop: 30,
  },
  label: {
    color: '#89859A',
    fontSize: 14,
    marginTop: 18,
  },
  value: {
    color: '#33245E',
    fontSize: 18,
    fontWeight: '600',
    marginTop: 6,
  },
  status: {
    color: '#7054D8',
    fontSize: 17,
    fontWeight: 'bold',
    marginTop: 6,
  },
  button: {
    backgroundColor: '#7054D8',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 30,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
