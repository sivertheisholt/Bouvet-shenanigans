import { component$ } from "@builder.io/qwik";
import styles from "./power-button.module.css";

interface PowerButtonProps {
  onClickFunc?: any;
}

export const PowerButton = component$<PowerButtonProps>((props) => {
  return (
    <div
      class={styles.powerButton}
      onClick$={() => {
        props.onClickFunc();
      }}
    >
      <div class={styles.powerButtonBar}></div>
    </div>
  );
});
