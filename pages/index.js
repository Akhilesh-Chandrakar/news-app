
import { Inter } from '@next/font/google'
import Navbar from '../components/Navbar'
import styles from '../styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <div className='page-container'>
        <Navbar/>
        <div className={styles.main}>
        <h1> Hello, Welcome to Next.org News</h1>
        <h2>Go to feed for Scrolling news </h2>
      </div>
      </div>
    </>
  )
}
