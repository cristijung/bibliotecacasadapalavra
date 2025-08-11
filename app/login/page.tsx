"use client"; 

import React from 'react';
import AuthForm from './AuthForm'; 
import styles from './LoginAuth.module.scss'; 

export default function LoginPage() {
  return (
    <div className={styles.authContainer}>
      <AuthForm />
    </div>
  );
}

