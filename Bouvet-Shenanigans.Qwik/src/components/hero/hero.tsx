import { component$ } from "@builder.io/qwik";
import styles from "./hero.module.css";
import ImgThunder from "~/media/thunder.png?jsx";

export default component$(() => {
  return (
    <div class={["container", styles.hero]}>
      <ImgThunder class={styles["hero-image"]} />
      <h1>FarmFresh Production System</h1>
      <h2>Built using Qwik.</h2>
    </div>
  );
});
