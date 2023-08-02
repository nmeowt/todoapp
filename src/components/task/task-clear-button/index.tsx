import { memo } from 'react';
import useLocalStorage from 'src/hooks/useLocalStorage';
import { ITask } from 'src/interface';
import styles from './styles.module.scss';
import Button from 'src/components/common/button';

function TaskClearButton() {
  const [tasks, setTasks] = useLocalStorage<ITask[]>("tasks", []);

  const handleClick = () => {
    const uncompletedTasks = tasks && tasks.filter((task: ITask) => task.status === false);

    setTasks(uncompletedTasks);
  }

  return (
    <Button
      className={styles["clear-button"]}
      onClick={handleClick}
      endIcon='icon-cross'
    >
      clear all completed
    </Button>
  )
}

export default memo(TaskClearButton);
