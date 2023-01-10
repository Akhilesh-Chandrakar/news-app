

import Navbar from '../components/Navbar'




export default function Home() {
  return (
    <>
      <div className=' bg-sky-800 page-container'>
        <Navbar/>
        <div className=" mt-32  flex-1 flex items-center flex-col justify-center">
        <h1 className='font-bold text-4xl mb-20 cursor-pointer text-center' > Hello, Welcome to Next.org News</h1>
        <h2 className='font-bold text-3xl mb-20 cursor-pointer text-center'>Go to Feed Section for Scrolling news </h2>
      </div>
      </div>
    </>
  )
}
