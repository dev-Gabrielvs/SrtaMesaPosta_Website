import HighlightCard from "./hooks/HighLightCard";
import styles from './styles/HighLights.module.css'

function HighLights() {
    const products = [
    {id: 1, image: "../../public/jogo.jpeg", alt: "jogoamericano", legend: "Lorem Ipsum", price: "R$ 99,99" },
    {id: 2, image: "../../public/jogo2.jpeg", alt: "jogoamericano", legend: "Lorem Ipsum", price: "R$ 99,99" },
    {id: 3, image: "../../public/jogo3.jpeg", alt: "jogoamericano", legend: "Lorem Ipsum", price: "R$ 99,99" },
    {id: 4, image: "../../public/jogo4.jpg", alt: "jogoamericano", legend: "Lorem Ipsum", price: "R$ 99,99" }
  ];

  return (
    <section id="highlights">
      <h1 className={styles.highlightsTitle}>Destaques</h1>
      <section className={styles.featuredCards}>
        {products.map((p) => (
          <HighlightCard
            key={p.id}
            image={p.image}
            alt={p.alt}
            legend={p.legend}
            price={p.price}
            styles={styles} // passar os estilos para os cards
          />
        ))}
      </section>
    </section>
  );    
};

export default HighLights;