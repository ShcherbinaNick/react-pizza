import styles from './NotFoundBlock.module.scss';

function NotFoundBlock() {
  return (
    <div className={styles.root}>
      <h1>Упс!</h1>
      <br />
      <p className={styles.description}>Такой страницы не существует :С</p>
    </div>
  )
}

export default NotFoundBlock