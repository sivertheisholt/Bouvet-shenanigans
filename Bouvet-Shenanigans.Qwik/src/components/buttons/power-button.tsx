import { component$ } from "@builder.io/qwik";
import styles from "./power-button.module.css";

export const PowerButton = component$(() => {
  return (
    <div class={styles.powerButton}>
      <div class={styles.powerButtonBar}></div>
    </div>
  );
});
