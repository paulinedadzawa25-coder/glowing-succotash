import styles from "./page.module.css";
import BookBrochure from "../../components/BookBrochure";

export default function BrochurePage() {
  return (
    <main className={styles.main}>
      <BookBrochure />
    </main>
  );
}