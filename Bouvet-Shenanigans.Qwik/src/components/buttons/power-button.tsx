import { component$ } from "@builder.io/qwik";
import styles from "./power-button.module.css";

export const PowerButton = component$(({ onClick }: { onClick?: any }) => {
  return (
    <div onClick$={onClick} class={styles.powerButton}>
      <div class={styles.powerButtonBar}></div>
    </div>
  );
});
