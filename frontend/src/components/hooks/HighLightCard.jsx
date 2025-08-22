function HighlightCard({ image, alt, legend, price, styles }) {
  return (
    <a href="#" className={styles.highlightCard}>
      <img src={image} alt={alt} className={styles.imageHighlightCard} />
      <div className={styles.footerHighlightCard}>
        <div className={styles.footerTextContent}>
          <p className={styles.legend}>{legend}</p>
          <p className={styles.price}>{price}</p>
        </div>
        <button className={styles.detailsButton}>Mais Detalhes</button>
      </div>
    </a>
  );
};

export default HighlightCard;