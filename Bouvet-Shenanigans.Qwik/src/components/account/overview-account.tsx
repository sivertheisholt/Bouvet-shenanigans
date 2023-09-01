import {
  component$,
  useSignal,
  useStore,
  useVisibleTask$,
} from "@builder.io/qwik";
import { fetchUser } from "~/endpoints/client/fetch-user";
import { useUserData } from "~/routes";
import styles from "./overview-account.module.css";

export default component$(() => {
  const user = useStore({ user: useUserData().value });
  const isFetchingData = useSignal(false);

  // Refetched account data fevery 10 seconds
  useVisibleTask$(() => {
    if (!isFetchingData.value) {
      isFetchingData.value = true;
      setInterval(async () => {
        user.user = await fetchUser();
      }, 10000);
    }
  });

  return (
    <div class="container container-purple container-center">
      <h1 class={styles.accountText}>Account</h1>
      <div class={styles.wrapperAccount}>
        <h2 class={styles.accountBalanceText}>
          {user.user.balance.toFixed(0)} Kroner
        </h2>
      </div>
    </div>
  );
});
