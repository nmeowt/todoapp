import styles from './styles/app.module.scss';
import TaskInput from './components/task/task-input';
import TaskList from './components/task/task-list';
import TaskClearButton from './components/task/task-clear-button';
import Header from './components/common/header';

function App() {
  return (
    <div className={styles['container']}>
      <Header />

      <div className={styles.section}>
        <div className={styles.task}>
          <TaskInput />
          <TaskList />
        </div>
      </div>

      <div className={styles.footer}>
        <TaskClearButton />
      </div>
      <div className={styles.background}></div>
    </div>
  );
}

export default App;
