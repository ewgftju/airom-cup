import Image from "next/image";
import Link from "next/link";
import DisplayControls from "@/components/ui/DisplayControls";
import styles from "./Regulations.module.css";

export default function RegulationsHeader() {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.brand}>
        <Image src="/images/logos/airom-cup-logo.png" width={45} height={45} alt="" />
        AIROM CUP
      </Link>
      <DisplayControls />
    </header>
  );
}
