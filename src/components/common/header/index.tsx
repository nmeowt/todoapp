import { memo } from 'react';
import styles from './styles.module.scss';

function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.title}>
        <a href='/'>To-do List</a>
      </div>
    </div>
  )
}

export default memo(Header);