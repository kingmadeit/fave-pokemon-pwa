'use client'
import { CustomStepperForm } from "./components";
import styles from "./page.module.css";
import React from 'react'

const Home = () => {
  return (
    <main className={styles.main}>
      <CustomStepperForm />
    </main>
  );
    
}

export default Home
