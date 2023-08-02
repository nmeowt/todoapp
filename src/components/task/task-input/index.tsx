import { memo, useState } from 'react';
import useLocalStorage from 'src/hooks/useLocalStorage';
import { ITask } from 'src/interface';
import styles from './styles.module.scss';
import Button from 'src/components/common/button';

function TaskInput() {
  const [tasks, setTasks] = useLocalStorage<ITask[]>("tasks", []);
  const [formData, setFormData] = useState<ITask | {}>();
  const [title, setTitle] = useState<string>("");

  const handleCreateTask = (task: ITask) => {
    const length = tasks.length;
    const maxId = length > 0 && tasks.sort((a, b) => b.id - a.id)[0].id;

    const newTask: ITask = {
      id: Number(maxId) + 1,
      title: task.title,
      status: false,
    };

    setTasks([...tasks, newTask]);
  }

  const handleForm = (e: React.FormEvent<HTMLInputElement>): void => {
    setTitle(e.currentTarget.value)
    setFormData({
      ...formData,
      [e.currentTarget.id]: e.currentTarget.value,
    });
  };

  const handleSaveTask = (e: React.FormEvent, formData: ITask | any) => {
    e.preventDefault();
    handleCreateTask(formData);
    setTitle("");
  };

  return (
    <form className={styles.form} onSubmit={(e) => handleSaveTask(e, formData)}>
      <input
        className={styles.input}
        onChange={handleForm}
        placeholder='Task'
        type="text"
        id="title"
        value={title}
      />
      <Button
        className={styles['add-button']}
        disabled={formData === undefined ? true : false}
        startIcon='icon-plus'
      />
    </form>
  )
}

export default memo(TaskInput);
