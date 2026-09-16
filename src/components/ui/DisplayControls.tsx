import LanguageSwitcher from "./LanguageSwitcher";
import ThemeSwitcher from "./ThemeSwitcher";
import styles from "./DisplayControls.module.css";

export default function DisplayControls() {
  return <div className={styles.controls}><LanguageSwitcher /><ThemeSwitcher /></div>;
}
