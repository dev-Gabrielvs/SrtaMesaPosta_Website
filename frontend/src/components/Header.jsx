import styles from './styles/Header.module.css';
import MessageIcon from '@mui/icons-material/Message';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ShoppingCart from '@mui/icons-material/ShoppingCart'

function Header() {
    return (
        <>
            <header className={styles.header}>
                <h4 className={styles.promo}>Descontos e notícias rápidas: ex: "10% OFF"</h4>

                <nav className={styles.nav}>
                    <form action="" method="get" className={styles.searchForm}>
                        <input
                            type="text"
                            name="search"
                            id="search-box"
                            placeholder="O que você está buscando?"
                            className={styles.searchInput}
                        />
                        <input type="submit" id="submit" value="" className={styles.searchButton} />
                    </form>

                    <a href="landing-page.html" target="_self">
                        <img
                            src="../../public/srta mp mono.png"
                            alt="logo Mesaposta"
                            className={styles.logo}
                        />
                    </a>

                    <div className={styles.itemsNav}>
                        <div className={styles.item}>
                            <a href="#" target="_self" className={styles.itemLink}>
                                <MessageIcon/>
                                <p>Atendimento</p>
                            </a>
                        </div>

                        <div className={styles.item}>
                            <a href="#" target="_self" className={styles.itemLink}>
                                <AccountCircle/>
                                <p>Conta</p>
                            </a>
                        </div>

                        <div className={styles.item}>
                            <a href="#" target="_self" className={styles.itemLink}>
                                <ShoppingCart/>
                                <p>Carrinho</p>
                            </a>
                        </div>
                    </div>
                </nav>

                <ul className={styles.menu}>
                    <li><a href="#" className={styles.menuItem}>Jogos Americanos</a></li>
                    <li><a href="#" className={styles.menuItem}>Guardanapos</a></li>
                    <li><a href="#" className={styles.menuItem}>Natal</a></li>
                    <li><a href="#" className={styles.menuItem}>Kit Mesa</a></li>
                    <li><a href="#" className={styles.menuItem}>Promoções</a></li>
                    <li><a href="#" className={styles.menuItem}>Mais Vendidos</a></li>
                </ul>
            </header>
        </>
    )
};

export default Header;