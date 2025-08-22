import styles from './styles/ThematicCard.module.css';
import ThematicCard from './hooks/ThematicCard';

function FatherDay() {
    const products = [
    { id: 1, image: "../../public/jogo.jpeg", alt: "product-father", legend: "Lorem Ipsum", price: "R$ 99,99" },
    { id: 2, image: "../../public/jogo.jpeg", alt: "product-father", legend: "Lorem Ipsum", price: "R$ 99,99" },
    { id: 3, image: "../../public/jogo.jpeg", alt: "product-father", legend: "Lorem Ipsum", price: "R$ 99,99" }
  ];

  return (  
    <section className={styles.thematic_day}>
      <h3 className={styles.thematic_title}>Dia dos Pais</h3>
      <div className={styles.thematic_content}>
        <img src="../../public/pais.jpg" alt="Father day" className={styles.themed_image} />
        {products.map((p) => (
          <ThematicCard 
          key={p.id} 
          image={p.image}
          legend={p.legend}
          price={p.price}
          alt={p.alt}
          styles={styles}
            />
        ))}
      </div>
    </section>

  );
};

export default FatherDay;