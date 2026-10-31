
import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTasks } from '@/context/TaskContext';

export default function TasksScreen() {
  const { tasks, toggleTask } = useTasks();

  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);

  const selectedTask = tasks.find(
    task => task.id === selectedTaskId
  );

  // Task Details View
  if (selectedTask) {
    return (
      <SafeAreaView style={styles.container}>
        <Pressable
          style={styles.backButton}
          onPress={() => setSelectedTaskId(null)}
        >
          <Text style={styles.backText}>‹  Back to My Tasks</Text>
        </Pressable>

        <Text style={styles.heading}>Task Details</Text>
        <Text style={styles.subtitle}>
          View your task information
        </Text>

        <View style={styles.detailCard}>
          <Text style={styles.detailLabel}>TASK TITLE</Text>
          <Text style={styles.detailTitle}>
            {selectedTask.title}
          </Text>

          <View style={styles.detailDivider} />

          <Text style={styles.detailLabel}>CATEGORY</Text>
          <Text style={styles.detailValue}>
            {selectedTask.category}
          </Text>

          <View style={styles.detailDivider} />

          <Text style={styles.detailLabel}>TIME</Text>
          <Text style={styles.detailValue}>
            {selectedTask.time}
          </Text>

          <View style={styles.detailDivider} />

          <Text style={styles.detailLabel}>STATUS</Text>
          <Text style={styles.detailValue}>
            {selectedTask.done ? 'Completed' : 'Pending'}
          </Text>

          <Pressable
            style={styles.completeButton}
            onPress={() => toggleTask(selectedTask.id)}
          >
            <Text style={styles.completeButtonText}>
              {selectedTask.done
                ? 'Mark as Pending'
                : 'Mark as Completed'}
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  // My Tasks View
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.heading}>My Tasks</Text>

        <Text style={styles.subtitle}>
          Manage your daily activities
        </Text>

        <View style={styles.summary}>
          <Text style={styles.summaryText}>
            {tasks.filter(task => task.done).length} of {tasks.length} tasks completed
          </Text>
        </View>

        <Text style={styles.sectionTitle}>All Tasks</Text>

        {tasks.map(task => (
          <View key={task.id} style={styles.taskCard}>
            <Pressable
              style={[styles.checkbox, task.done && styles.checked]}
              onPress={() => toggleTask(task.id)}
            >
              <Text style={styles.checkText}>
                {task.done ? '✓' : ''}
              </Text>
            </Pressable>

            <Pressable
              style={styles.taskInfo}
              onPress={() => setSelectedTaskId(task.id)}
            >
              <Text style={[styles.taskTitle, task.done && styles.completed]}>
                {task.title}
              </Text>

              <Text style={styles.taskDetails}>
                {task.category}  •  {task.time}
              </Text>
            </Pressable>

            <Text style={styles.arrow}>›</Text>
          </View>
        ))}

        <Text style={styles.footer}>
          Tap a task to view its details
        </Text>
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
  summary: {
    backgroundColor: '#315C50',
    padding: 20,
    borderRadius: 16,
    marginTop: 25,
  },
  summaryText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#263F36',
    marginTop: 30,
    marginBottom: 15,
  },
  taskCard: {
    backgroundColor: '#FFFFFF',
    padding: 17,
    borderRadius: 15,
    marginBottom: 13,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 25,
    height: 25,
    borderWidth: 2,
    borderColor: '#315C50',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checked: {
    backgroundColor: '#315C50',
  },
  checkText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  taskInfo: {
    flex: 1,
    marginLeft: 13,
  },
  taskTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#263F36',
  },
  completed: {
    textDecorationLine: 'line-through',
    color: '#999999',
  },
  taskDetails: {
    color: '#718078',
    fontSize: 12,
    marginTop: 6,
  },
  arrow: {
    fontSize: 25,
    color: '#315C50',
  },
  footer: {
    textAlign: 'center',
    color: '#718078',
    marginTop: 15,
    marginBottom: 30,
  },
  backButton: {
    marginTop: 20,
    marginBottom: 15,
  },
  backText: {
    fontSize: 16,
    color: '#315C50',
    fontWeight: '600',
  },
  detailCard: {
    backgroundColor: '#FFFFFF',
    padding: 22,
    borderRadius: 16,
    marginTop: 25,
  },
  detailLabel: {
    fontSize: 12,
    color: '#718078',
    fontWeight: '600',
  },
  detailTitle: {
    fontSize: 22,
    color: '#263F36',
    fontWeight: 'bold',
    marginTop: 8,
  },
  detailValue: {
    fontSize: 17,
    color: '#263F36',
    marginTop: 8,
    fontWeight: '600',
  },
  detailDivider: {
    height: 1,
    backgroundColor: '#E5EAE2',
    marginVertical: 18,
  },
  completeButton: {
    backgroundColor: '#315C50',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 25,
  },
  completeButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
