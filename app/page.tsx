import Hero from "./components/hero/Hero";
import styles from "./page.module.scss";
import Image from "next/image";
import LogoHome from "./../public/logo_bi.png";

export default function Home() {
  return (
    <div className={styles.pageContainer}>
      <main>
        <Hero />
        <div className={styles.principal}>
          {/* seções de destaque -- ver depois p trocar para Image..*/}
          <section className={styles.section}>
            <div className={styles.headerContent}>
              <Image
                src={LogoHome}
                alt="Biblioteca Casa Da Palavra"
                width={200}
                height={200}
                className={styles.logoSection}
              />
              <div className={styles.textContainer}>
                <h2 className={styles.sectionTitle}>
                  Novidades na Casa da Palavra
                </h2>
                <p className={styles.sectionSubtitle}>
                  Confira os títulos recém-chegados à nossa coleção.
                </p>
              </div>
            </div>
            {/* aqui dá p ter um carrossel */}
            <div className={styles.bookGrid}>
              {/* card de livro -- ver depois p criar um componente bookcard.tsx */}
              <div className={styles.bookCard}>
                <img
                  src="https://placehold.co/150x220/8a2be2/ffffff?text=Livro+1"
                  alt="Capa do Livro 1"
                  className={styles.bookCover}
                />
                <h3 className={styles.bookTitle}>O Grande Livro</h3>
                <p className={styles.bookAuthor}>Por Autor Famoso</p>
                <button className={styles.viewButton}>Ver Detalhes</button>
              </div>
              <div className={styles.bookCard}>
                <img
                  src="https://placehold.co/150x220/ff69b4/ffffff?text=Livro+2"
                  alt="Capa do Livro 2"
                  className={styles.bookCover}
                />
                <h3 className={styles.bookTitle}>Aventura no Desconhecido</h3>
                <p className={styles.bookAuthor}>Por Escritor Misterioso</p>
                <button className={styles.viewButton}>Ver Detalhes</button>
              </div>
              <div className={styles.bookCard}>
                <img
                  src="https://placehold.co/150x220/ffa500/ffffff?text=Livro+3"
                  alt="Capa do Livro 3"
                  className={styles.bookCover}
                />
                <h3 className={styles.bookTitle}>O Segredo Antigo</h3>
                <p className={styles.bookAuthor}>Por Narrador Lendário</p>
                <button className={styles.viewButton}>Ver Detalhes</button>
              </div>
              {/* colocar + cards aqui se precisar */}
            </div>
          </section>

          {/* seção de eventos */}
          <section className={`${styles.section} ${styles.eventsSection}`}>
            {" "}
            {/* como se coloca mais de uma classe no scss */}
            <h2 className={styles.sectionTitle}>Próximos Eventos</h2>
            <p className={styles.sectionSubtitle}>
              Participe de nossos workshops, clubes de leitura e encontros com
              autores.
            </p>
            <div className={styles.eventList}>
              <div className={styles.eventCard}>
                <h3>Clube do Livro: Ficção Científica</h3>
                <p>Data: 15 de Agosto, 19:00h</p>
                <p>Local: Sala de Leitura 3</p>
                <button className={styles.eventButton}>Inscreva-se</button>
              </div>
              <div className={styles.eventCard}>
                <h3>Workshop de Escrita Criativa</h3>
                <p>Data: 22 de Agosto, 10:00h</p>
                <p>Local: Auditório Principal</p>
                <button className={styles.eventButton}>Inscreva-se</button>
              </div>
            </div>
          </section>

          {/* seção "about" e CTA */}
          <section className={`${styles.section} ${styles.aboutCtaSection}`}>
            <div className={styles.aboutContent}>
              <h2 className={styles.sectionTitle}>
                Sobre a Biblioteca Casa da Palavra
              </h2>
              <p>
                Somos um refúgio para amantes da leitura e buscadores de
                conhecimento. Nossa missão é promover a cultura, incentivar a
                leitura e ser um ponto de encontro para a comunidade.
              </p>
              <p>
                Com uma vasta coleção de livros, eventos culturais e um ambiente
                acolhedor, a Casa da Palavra é o seu lar para todas as
                histórias.
              </p>
            </div>
            <div className={styles.ctaContent}>
              <h2 className={styles.sectionTitle}>Torne-se um Membro!</h2>
              <p>
                Tenha acesso ilimitado à nossa coleção, participe de eventos
                exclusivos e muito mais.
              </p>
              <button className={styles.joinButton}>Cadastre-se Agora</button>
            </div>
          </section>
        </div>
      </main>

      {/* footer  depois criar um componente p ele*/}
      <footer className={styles.footer}>
        <div className={styles.container}>
          <p>
            &copy; 2025 Biblioteca Casa da Palavra. Todos os direitos
            reservados.
          </p>
          <div className={styles.socialLinks}>
            <a href="#" className={styles.socialIcon}>
              FB
            </a>
            <a href="#" className={styles.socialIcon}>
              IG
            </a>
            <a href="#" className={styles.socialIcon}>
              TW
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
