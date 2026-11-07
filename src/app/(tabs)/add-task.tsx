
import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Alert,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTasks } from '@/context/TaskContext';
import { supabase } from '../../../lib/supabase/client';

export default function AddTaskScreen() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Study');
  const [time, setTime] = useState('');
  const [loading, setLoading] = useState(false);

  const { addTask } = useTasks();

  const handleAddTask = async () => {
    if (!title.trim() || !time.trim()) {
      Alert.alert('Missing Information', 'Please enter task name and time.');
      return;
    }

    setLoading(true);

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        Alert.alert('Error', 'Please sign in first.');
        return;
      }

      const { data, error } = await supabase
        .from('tasks')
        .insert({
          title: title.trim(),
          category,
          time: time.trim(),
          done: false,
          user_id: user.id,
        })
        .select()
        .single();

      if (error) {
        Alert.alert('Database Error', error.message);
        return;
      }

      addTask(data);

      Alert.alert('Success', 'Your task has been saved!');

      setTitle('');
      setTime('');
      setCategory('Study');
    } catch (error) {
      Alert.alert('Error', 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.heading}>Add New Task</Text>
        <Text style={styles.subtitle}>Create a task for your day</Text>

        <View style={styles.form}>
          <Text style={styles.label}>Task Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your task"
            placeholderTextColor="#999"
            value={title}
            onChangeText={setTitle}
          />

          <Text style={styles.label}>Category</Text>
          <View style={styles.categories}>
            {['Study', 'Work', 'Personal'].map(item => (
              <Pressable
                key={item}
                onPress={() => setCategory(item)}
                style={[
                  styles.categoryButton,
                  category === item && styles.selectedCategory,
                ]}
              >
                <Text
                  style={[
                    styles.categoryText,
                    category === item && styles.selectedText,
                  ]}
                >
                  {item}
                </Text>
              </Pressable>
            ))}
          </View>

          <Text style={styles.label}>Time</Text>
          <TextInput
            style={styles.input}
            placeholder="Example: 10:00 AM"
            placeholderTextColor="#999"
            value={time}
            onChangeText={setTime}
          />

          <Pressable
            style={styles.addButton}
            onPress={handleAddTask}
            disabled={loading}
          >
            <Text style={styles.addButtonText}>
              {loading ? 'Saving...' : '+ Add Task'}
            </Text>
          </Pressable>
        </View>
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
  form: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 18,
    marginTop: 28,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#263F36',
    marginBottom: 10,
    marginTop: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#DCE7DC',
    borderRadius: 12,
    padding: 14,
    fontSize: 15,
    color: '#263F36',
    backgroundColor: '#FDFCFA',
  },
  categories: {
    flexDirection: 'row',
    gap: 8,
  },
  categoryButton: {
    flex: 1,
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#E8EFE7',
    alignItems: 'center',
  },
  selectedCategory: {
    backgroundColor: '#315C50',
  },
  categoryText: {
    color: '#315C50',
    fontWeight: '600',
  },
  selectedText: {
    color: '#FFFFFF',
  },
  addButton: {
    backgroundColor: '#315C50',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 30,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
