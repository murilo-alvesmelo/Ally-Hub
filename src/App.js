import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import FormBox from "./components/FormBox/index";
import styles from './App.module.css'

function App() {
  return (
    <div className={styles.container}>
      <FormBox/>
    </div>
  );
}

export default App;
