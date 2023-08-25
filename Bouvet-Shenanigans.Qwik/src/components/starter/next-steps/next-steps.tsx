import { component$ } from "@builder.io/qwik";
import { useUserData } from "~/routes";

export default component$(() => {
  const user = useUserData();

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
          {user.value.balance.toFixed(0)} Kroner
        </h2>
      </div>
    </div>
  );
});
