
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

import { Alert } from 'react-native';
import { supabase } from '../../lib/supabase/client';

export type Task = {
  id: number;
  title: string;
  category: string;
  time: string;
  done: boolean;
  user_id?: string;
};

type TaskContextType = {
  tasks: Task[];
  loading: boolean;
  addTask: (task: Task) => void;
  toggleTask: (id: number) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setTasks([]);
        return;
      }

      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.log('Fetch Tasks Error:', error.message);
        return;
      }

      setTasks(data || []);
    } catch (error) {
      console.log('Fetch Error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = (task: Task) => {
    setTasks(currentTasks => [task, ...currentTasks]);
  };

  const toggleTask = async (id: number) => {
    const task = tasks.find(item => item.id === id);
    if (!task) return;

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      Alert.alert('Error', 'Please sign in first.');
      return;
    }

    const newStatus = !task.done;

    const { data, error } = await supabase
      .from('tasks')
      .update({ done: newStatus })
      .eq('id', id)
      .eq('user_id', user.id)
      .select('id, done')
      .maybeSingle();

    if (error || !data) {
      Alert.alert('Error', error?.message || 'Task update failed.');
      return;
    }

    setTasks(currentTasks =>
      currentTasks.map(item =>
        item.id === id ? { ...item, done: data.done } : item
      )
    );
  };

  const deleteTask = async (id: number) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      Alert.alert('Error', 'Please sign in first.');
      return;
    }

    const { data, error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id)
      .select('id')
      .maybeSingle();

    if (error || !data) {
      Alert.alert('Delete Error', error?.message || 'Task could not be deleted.');
      return;
    }

    setTasks(currentTasks =>
      currentTasks.filter(item => item.id !== id)
    );

    Alert.alert('Success', 'Task deleted successfully.');
  };

  return (
    <TaskContext.Provider
      value={{ tasks, loading, addTask, toggleTask, deleteTask }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error('useTasks must be used inside TaskProvider');
  }

  return context;
}
