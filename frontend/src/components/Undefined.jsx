import styles from './styles/Undefined.module.css'

function Undefined() {
    return (
        <section className={styles.undefined}>
            
            <div className={styles.textcontent}>
                <h2>Lorem Ipusum</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum quisquam dolorum autem, similique impedit, aliquam natus ipsa laborum adipisci sapiente asperiores, illo voluptates nemo totam quibusdam. Cum eius odio dolor. Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum dolorum consequatur repellat. Ad consequatur minus unde error nulla repellat deserunt, nisi rerum dolore cupiditate officia, deleniti doloremque. Nemo, itaque aut?</p>
            </div>

            <img className={styles.imagecontent} src="../../public/testeimage.png" alt="Undefined"/>

        </section>
    );
};

export default Undefined;