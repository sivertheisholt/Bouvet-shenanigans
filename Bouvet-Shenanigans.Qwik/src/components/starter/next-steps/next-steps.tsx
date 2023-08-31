import { component$, useSignal, useStore, useVisibleTask$ } from "@builder.io/qwik";
import { fetchUser } from "~/endpoints/client/fetch-user";
import { useUserData } from "~/routes";

export default component$(() => {
  const user = useStore({user: useUserData().value})
  const isFetchingData = useSignal(false)


  // Refetched account data fevery 10 seconds
  useVisibleTask$(() => {
    if(!isFetchingData.value)
    {
      isFetchingData.value = true;
      setInterval(async () => {
        user.user = await fetchUser();
      }, 10000)
    }
  })

  return (
    <div class="container container-purple container-center">
      <h1 style={{ marginBottom: "50px" }}>Account</h1>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h2
          style={{
            borderBottom: "10px double #000",
            paddingBottom: "10px",
          }}
        >
          {user.user.balance.toFixed(0)} Kroner
        </h2>
      </div>
    </div>
  );
});
