
import { useRouter } from 'next/router';

import styles from '../../styles/Feed.module.css';
export const Feed = ({ articles, pageNumber }) => {
  const router = useRouter();
  return  (
    <>
    <div className={styles.main}>
    {articles.map((article, index) => (
      <div key={index} className={styles.post}>
        <h1 onClick={() => (window.location.href = article.url)}>{article.title}</h1>
        <p>{article.description}</p>
        {!!article.urlToImage && <img src={article.urlToImage} />}
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
       className={pageNumber === 5 ? styles.disabled : styles.active}
       onClick={() => {
         if (pageNumber < 5) {
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
   
   </>
  );
};

export const getServerSideProps = async pageContext => {
  const pageNumber = pageContext.query.pno;

  if (!pageNumber || pageNumber < 1 || pageNumber > 10) {
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