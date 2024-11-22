import Image from "next/image";
import styles from "./page.module.css";
import Link from 'next/link'

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />

        <Link href="/player">Video Player</Link>
      </main>
      <footer className={styles.footer}>
        <Link href="/about">About</Link>
      </footer>
    </div>
  );
}
