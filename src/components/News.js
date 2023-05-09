import styles from "../styles/news.module.css";

const News = ({ article }) => {
  return (
    <a href={article.url} style={{textDecoration:'none', color:'black'}}>
      <div className={styles.news}>
        <div className={styles.newsInfo}>
          <h4 className={styles.title}>{article.title}</h4>
          {/* <p className={styles.description}>{article.description}</p> */}
        </div>
        <img src={article.urlToImage} alt="" className={styles.newsImage} />
      </div>
    </a>
  );
};

export default News;
