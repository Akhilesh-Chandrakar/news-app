
import { useRouter } from 'next/router';
import Navbar from '../../components/Navbar'
import styles from '../../styles/Feed.module.css';
export const Feed = ({ articles, pageNumber }) => {
  const router = useRouter();
  return  articles.length? (
    <>
      <div className='bg-slate-100 page-container'>
        <Navbar/>
    <div className=" flex mt-24 items-center flex-col justify-center">
    {articles.map((article, index) => (
      <div key={index} className="w-96 mb-10 pb-10 rounded-r-lg">
        <h1 className='font-bold text-xl cursor-pointer text-center mb-2 pb-2' onClick={() => (window.location.href = article.url)}>{article.title}</h1>
        <p className='text-center mb-2 pb-2'>{article.description}</p>
        {!!article.urlToImage && <img className='w-full' src={article.urlToImage} />}
      </div>
    ))}
  </div>
     <div className={styles.paginator}>
     <div
       className={pageNumber === 1 ? styles.disabled : styles.active}
       onClick={() => {
         if (pageNumber > 1) {
           // As of the current version of Next.js the default behavior for router.push
           // will leave the scroll where it is, so we have to manually call scrollTo.
           // This however is being worked on and is fixed in canary.
           // Show this in tutorial vid:
           // https://github.com/vercel/next.js/issues/3249
           router.push(`/feed/${pageNumber - 1}`).then(() => window.scrollTo(0, 0));
         }
       }}
     >
       Previous Page
     </div>

     <div>#{pageNumber}</div>

     <div
       className={pageNumber === 10 ? styles.disabled : styles.active}
       onClick={() => {
         if (pageNumber < 10) {
           // As of the current version of Next.js the default behavior for router.push
           // will leave the scroll where it is, so we have to manually call scrollTo.
           // This however is being worked on and is fixed in canary.
           // Show this in tutorial vid:
           // https://github.com/vercel/next.js/issues/3249
           router.push(`/feed/${pageNumber + 1}`).then(() => window.scrollTo(0, 0));
         }
       }}
     >
       Next Page
     </div>
   </div>
   </div>
   </>
  ): (<>
  <div className="bg-slate-100 page-container">
      <Navbar />
      <div className=" flex mt-24 items-center flex-col justify-center">
        <h1 className='font-bold text-xl'>Oops! No articles for this page</h1>
      </div>
    </div>
    </>);
};

export const getServerSideProps = async pageContext => {
  const pageNumber = pageContext.query.pno;

  if (!pageNumber || pageNumber < 1 || pageNumber > 5) {
    return {
      props: {
        articles: [],
        pageNumber: 1,
      },
    };
  }

  const apiResponse = await fetch(
    `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&page=${pageNumber}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEWS_API_KEY}`,
      },
    },
  )
  const apijson=await apiResponse.json();
const {articles}=apijson;
return {
    props: {
      articles,
      pageNumber: Number.parseInt(pageNumber),
    },
  };
  };
 

export default Feed;