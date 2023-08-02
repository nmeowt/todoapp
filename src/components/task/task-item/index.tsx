import { ChangeEvent, FormEvent, memo, useState } from 'react';
import useLocalStorage from 'src/hooks/useLocalStorage';
import { ITask } from 'src/interface';
import styles from './styles.module.scss';
import Button from 'src/components/common/button';
import classnames from 'classnames';

interface IProps {
  task: ITask;
}

function TaskItem({ task }: IProps) {
  const [tasks, setTasks] = useLocalStorage<ITask[]>("tasks", []);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(task.title);
  const checkStatus: string = task.status ? `line-through` : '';

  const toggleForm = () => {
    setIsEditing(!isEditing);
  };

  const handleUpdate = (e: FormEvent) => {
    e.preventDefault();
    const updatedTasks = tasks && tasks.map((_task: ITask) => {
      if (_task.id === task.id) {
        return { ..._task, title: title };
      }
      return _task;
    });
    setTasks(updatedTasks);
    toggleForm();
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  }

  const handleCompleteTask = () => {
    const completedTasks = tasks && tasks.map((_task: ITask) => {
      if (_task.id === task.id) {
        return { ..._task, status: true };
      }
      return _task;
    });
    setTasks(completedTasks);
  }

  return (
    <div className={styles.task}>
      {isEditing
        ? (
          <form className={styles.form} onSubmit={handleUpdate}>
            <input onChange={handleChange} value={title} type="text" autoFocus />
            <Button>Save</Button>
          </form>
        ) : (
          <div className={styles.item}>
            <div className={classnames(styles.title, { [styles.checked]: checkStatus })}>
              {task.title}
            </div>
            {!checkStatus
              ? (
                <div>
                  <Button
                    onClick={toggleForm}
                    className={styles['edit-button']}
                    startIcon='icon-pencil'
                  />
                  <Button
                    onClick={handleCompleteTask}
                    className={styles['radio-button']}
                    startIcon='icon-radio-unchecked'
                  />
                </div>
              ) : (
                <Button
                  startIcon='icon-checkmark'
                  className={styles['check-button']}
                />
              )}
          </div>
        )}
    </div>
  )
}

export default memo(TaskItem);
