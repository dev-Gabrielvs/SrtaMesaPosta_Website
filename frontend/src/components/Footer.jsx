import styles from './styles/Footer.module.css'

function Footer() {
    return (
        <>
            <footer className={styles.footer}>
                {/* Insert Email */}
                <div className={styles.insertEmail}>
                    <div className='text_email'>
                        <h3>Receba novidades por e-mail</h3>
                        <p>E receba todas as nossas novidades em primeira mão</p>

                    </div>

                    <form action="" method="post" autoComplete='on' className={styles.form}>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Digite seu e-mail"
                            autoComplete='email'
                            className={styles.inputEmail}
                        />
                        <input type="submit" value="Cadastrar" className={styles.submit} />
                    </form>
                </div>

                {/* Informações */}
                <div className={styles.information}>
                    <section className={styles.boxInformation}>
                        {/* Contato */}
                        <h3>Contatos</h3>
                        <ul>
                            <li>
                                <a href="#" target='_self'>
                                    <img src="../../public/insta-icon.png" alt="instagram" />
                                    <p>@srtamesaposta</p>
                                </a>
                            </li>

                            <li>
                                <a href="#">
                                    <img src="../../public/whatsapp-icon.png" alt="whatsapp" />
                                    <p>+55 (85) 9 9999-9999</p>
                                </a>
                            </li>

                            <li>
                                <a href="#">
                                    <img src="../../public/email-icon.png" alt="email" />
                                    <p>srtamesaposta@gmail.com</p>
                                </a>
                            </li>

                        </ul>

                        <div className={styles.horario}>
                            <h3>HORÁRIOS DE FUNCIONAMENTO</h3>
                            <p>Segunda à Sábado : 07:00h às 20:00h</p>
                        </div>

                    </section>

                    {/* Institucional */}
                    <section className={styles.boxInformation}>
                        <h3>Institucional</h3>
                        <ul>
                            <li><a href="#" target="_self">Quem somos</a></li>
                            <li><a href="#" target="_self">Nossa loja</a></li>
                            <li><a href="#" target="_self">Política de privacidade</a></li>
                            <li><a href="#" target="_self">Atacado</a></li>
                        </ul>
                    </section>

                    {/* Ajuda e Suporte */}
                    <section className={styles.boxInformation}>
                        <h3>Ajuda e Suporte</h3>

                        <ul>
                            <li><a href="#" target="_self">Política de Trocas</a></li>
                            <li><a href="#" target="_self">Entrega e Frete</a></li>
                            <li><a href="#" target="_self">Trocas e Devoluções</a></li>
                            <li><a href="#" target="_self">Dúvidas Frequentes</a></li>
                        </ul>
                    </section>

                    {/* Pagamentos */}
                    <section className={styles.payInformation}>
                        <h3>Pague com</h3>
                        <div>
                            <img src="../../public/pix-icon.png" alt="Pix" className={styles.pixMethod} />
                        </div>
                        <div>
                            <img src="../../public/visa-icon.png" alt="Visa" className={styles.visaMethod} />
                        </div>
                        <div>
                            <img src="../../public/mastercard-icon.png" alt="Mastercard" className={styles.mastercardMethod} />
                        </div>
                    </section>
                </div>

                {/* Copy */}
                <div className={styles.copy}>
                    <p>© 2025 Srta Mesa Posta - Todos os direitos reservados</p>
                    <p>DESENVOLVIDO POR Gabriel & Cia</p>
                </div>
            </footer>
        </>
    )
};

export default Footer;