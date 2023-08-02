import { memo, useMemo } from 'react';
import { ITask } from 'src/interface';
import TaskItem from '../task-item';
import useLocalStorage from 'src/hooks/useLocalStorage';
import styles from './styles.module.scss';

function TaskList() {
  const [tasks] = useLocalStorage<ITask[]>("tasks", []);

  const sortedTasks = useMemo(() => {
    return tasks.sort((a: ITask, b: ITask) => b.id - a.id).filter((task: ITask) => task.status === false);
  }, [tasks])

  const completedTasks = useMemo(() => {
    return tasks.filter((task: ITask) => task.status === true);
  }, [tasks]);

  const getCompletedCountText = useMemo(() => {
    const completedCount = completedTasks.length;

    if (completedCount === 0) {
      return 'No completed items';
    } else if (completedCount === 1) {
      return '1 completed item';
    }

    return completedCount + ' completed items';
  }, [completedTasks]);

  return (
    <div className={styles.list}>
      {sortedTasks.map((task: ITask) => (
        <TaskItem key={task.id} task={task} />
      ))}
      <div className={styles['items-completed']}>
        <div className={styles['count-text']}>{getCompletedCountText}
        </div>
        {completedTasks.map((task: ITask) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </div>
    </div>
  )
}

export default memo(TaskList);
