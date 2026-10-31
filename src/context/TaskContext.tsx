
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
} from 'react';

export type Task = {
  id: number;
  title: string;
  category: string;
  time: string;
  done: boolean;
};

type TaskContextType = {
  tasks: Task[];
  addTask: (title: string, category: string, time: string) => void;
  toggleTask: (id: number) => void;
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

const initialTasks: Task[] = [
  {
    id: 1,
    title: 'Complete assignment',
    category: 'Study',
    time: '10:00 AM',
    done: false,
  },
  {
    id: 2,
    title: 'Read React Native notes',
    category: 'Learning',
    time: '02:00 PM',
    done: false,
  },
  {
    id: 3,
    title: 'Prepare presentation',
    category: 'Work',
    time: '04:00 PM',
    done: true,
  },
  {
    id: 4,
    title: 'Plan tomorrow',
    category: 'Personal',
    time: '06:00 PM',
    done: false,
  },
  {
    id: 5,
    title: 'Complete React Native Project',
    category: 'Study',
    time: '08:00 PM',
    done: false,
  },
];

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const addTask = (title: string, category: string, time: string) => {
    const newTask: Task = {
      id: Date.now(),
      title,
      category,
      time,
      done: false,
    };

    setTasks(currentTasks => [...currentTasks, newTask]);
  };

  const toggleTask = (id: number) => {
    setTasks(currentTasks =>
      currentTasks.map(task =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, toggleTask }}>
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
