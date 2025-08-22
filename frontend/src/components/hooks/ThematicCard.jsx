function ThematicCard({ image, legend, price, alt, styles }) {
    return (
        <a href="#" target="_self" className={styles.thematic_card}>
            <img className={styles.image_thematic_card} src={image} alt={alt} />
            <div className={styles.footer_thematic_card}>
                <div className={styles.footer_text_content}>
                    <p className="legend">{legend}</p>
                    <p className="price">{price}</p>
                </div>
                <button className={styles.details_button}>Mais Detalhes</button>
            </div>
        </a>
    );
};

export default ThematicCard;