import styles from './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';

function BasicLayout(props) {
  return <div className={styles.normal}>{props.children}</div>;
}

export default BasicLayout;
