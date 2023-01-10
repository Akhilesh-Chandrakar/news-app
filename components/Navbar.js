import React from 'react'
import { useRouter } from 'next/router'
import styles from '../styles/Navbar.module.css';
const Navbar = () => {
    const router= useRouter();
  return (
    <div  className={styles.main}>
        <div onClick={()=>{router.push('/')}}>
            Home
        </div>
        <div onClick={()=>{router.push('/feed/1')}}> Feed</div>
    </div>
  )
}

export default Navbar