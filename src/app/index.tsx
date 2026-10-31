
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTasks } from '@/context/TaskContext';

export default function HomeScreen() {
  const { tasks } = useTasks();

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.done).length;
  const pendingTasks = totalTasks - completedTasks;

  const progress = totalTasks > 0
    ? (completedTasks / totalTasks) * 100
    : 0;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Welcome back 👋</Text>
            <Text style={styles.heading}>TaskFlow</Text>
          </View>

          <View style={styles.profile}>
            <Text style={styles.profileText}>TF</Text>
          </View>
        </View>

        {/* Welcome Banner */}
        <View style={styles.banner}>
          <Text style={styles.bannerTag}>YOUR DAILY PLANNER</Text>

          <Text style={styles.bannerTitle}>
            Make today count!
          </Text>

          <Text style={styles.bannerText}>
            Stay focused, manage your tasks and achieve your goals.
          </Text>

          <View style={styles.bannerBottom}>
            <Text style={styles.bannerBottomText}>
              Keep moving forward ✨
            </Text>
          </View>
        </View>

        {/* Overview */}
        <Text style={styles.sectionTitle}>Overview</Text>

        <View style={styles.stats}>
          <View style={styles.card}>
            <Text style={styles.statIcon}>📋</Text>
            <Text style={styles.number}>{totalTasks}</Text>
            <Text style={styles.cardText}>Total Tasks</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.statIcon}>✓</Text>
            <Text style={styles.number}>{completedTasks}</Text>
            <Text style={styles.cardText}>Completed</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.statIcon}>⏳</Text>
            <Text style={styles.number}>{pendingTasks}</Text>
            <Text style={styles.cardText}>Pending</Text>
          </View>
        </View>

        {/* Progress */}
        <View style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressTitle}>Your Progress</Text>
            <Text style={styles.progressPercent}>
              {Math.round(progress)}%
            </Text>
          </View>

          <View style={styles.progressBackground}>
            <View
              style={[
                styles.progressFill,
                { width: `${progress}%` },
              ]}
            />
          </View>

          <Text style={styles.progressText}>
            {completedTasks} out of {totalTasks} tasks completed
          </Text>
        </View>

        {/* Today's Tasks */}
        <View style={styles.taskHeader}>
          <Text style={styles.sectionTitle}>Today's Tasks</Text>
          <Text style={styles.taskCount}>
            {totalTasks} Tasks
          </Text>
        </View>

        {tasks.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>No tasks yet!</Text>
            <Text style={styles.emptyText}>
              Add your first task to get started.
            </Text>
          </View>
        ) : (
          tasks.map(task => (
            <View style={styles.task} key={task.id}>
              <View style={[
                styles.taskIndicator,
                task.done && styles.taskIndicatorDone,
              ]}>
                <Text style={styles.taskCheck}>
                  {task.done ? '✓' : '•'}
                </Text>
              </View>

              <View style={styles.taskInfo}>
                <Text
                  style={[
                    styles.taskTitle,
                    task.done && styles.completed,
                  ]}
                >
                  {task.title}
                </Text>

                <Text style={styles.taskTime}>
                  {task.time}  •  {task.category}
                </Text>
              </View>

              <View style={[
                styles.statusBadge,
                task.done ? styles.doneBadge : styles.pendingBadge,
              ]}>
                <Text style={[
                  styles.statusText,
                  task.done ? styles.doneText : styles.pendingText,
                ]}>
                  {task.done ? 'Done' : 'Pending'}
                </Text>
              </View>
            </View>
          ))
        )}

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Made with TaskFlow ✨
          </Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F5ED',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 22,
    marginTop: 18,
    marginBottom: 22,
  },
  greeting: {
    fontSize: 14,
    color: '#718078',
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#263F36',
    marginTop: 4,
  },
  profile: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#DCE7DC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileText: {
    color: '#315C50',
    fontSize: 18,
    fontWeight: 'bold',
  },
  banner: {
    backgroundColor: '#315C50',
    marginHorizontal: 20,
    padding: 23,
    borderRadius: 20,
  },
  bannerTag: {
    color: '#DCE7DC',
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  bannerTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 12,
  },
  bannerText: {
    color: '#E5EEE6',
    fontSize: 14,
    lineHeight: 21,
    marginTop: 8,
  },
  bannerBottom: {
    marginTop: 20,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: '#648477',
  },
  bannerBottomText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#263F36',
    marginHorizontal: 20,
    marginTop: 27,
    marginBottom: 15,
  },
  stats: {
    flexDirection: 'row',
    marginHorizontal: 20,
    gap: 10,
  },
  card: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    paddingHorizontal: 10,
    borderRadius: 15,
    elevation: 2,
  },
  statIcon: {
    fontSize: 19,
    color: '#315C50',
  },
  number: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#263F36',
    marginTop: 10,
  },
  cardText: {
    fontSize: 11,
    color: '#718078',
    marginTop: 5,
  },
  progressCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: 20,
    padding: 19,
    borderRadius: 16,
    elevation: 2,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#263F36',
  },
  progressPercent: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#315C50',
  },
  progressBackground: {
    height: 9,
    backgroundColor: '#DCE7DC',
    borderRadius: 10,
    marginTop: 15,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#315C50',
    borderRadius: 10,
  },
  progressText: {
    fontSize: 12,
    color: '#718078',
    marginTop: 10,
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taskCount: {
    color: '#315C50',
    fontSize: 13,
    fontWeight: '600',
    marginRight: 20,
    marginTop: 12,
  },
  task: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 12,
    padding: 15,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 1,
  },
  taskIndicator: {
    width: 35,
    height: 35,
    borderRadius: 11,
    backgroundColor: '#E8EFE7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  taskIndicatorDone: {
    backgroundColor: '#DCE7DC',
  },
  taskCheck: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#315C50',
  },
  taskInfo: {
    flex: 1,
    marginLeft: 12,
  },
  taskTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#263F36',
  },
  completed: {
    textDecorationLine: 'line-through',
    color: '#999999',
  },
  taskTime: {
    fontSize: 11,
    color: '#718078',
    marginTop: 6,
  },
  statusBadge: {
    paddingHorizontal: 9,
    paddingVertical: 6,
    borderRadius: 8,
  },
  doneBadge: {
    backgroundColor: '#DCE7DC',
  },
  pendingBadge: {
    backgroundColor: '#F5EAD5',
  },
  statusText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  doneText: {
    color: '#315C50',
  },
  pendingText: {
    color: '#956B2D',
  },
  emptyCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    padding: 25,
    borderRadius: 15,
    alignItems: 'center',
  },
  emptyTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#263F36',
  },
  emptyText: {
    fontSize: 13,
    color: '#718078',
    marginTop: 7,
  },
  footer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  footerText: {
    color: '#8A968D',
    fontSize: 12,
  },
});
