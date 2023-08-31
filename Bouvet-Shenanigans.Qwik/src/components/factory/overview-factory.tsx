import { component$, $, useStore, useVisibleTask$, useSignal } from "@builder.io/qwik";
import Gauge from "../starter/gauge";
import { PowerButton } from "../buttons/power-button";
import { useFactoriesData } from "~/routes";
import { startFactory } from "~/endpoints/client/start-factory";
import { stopFactory } from "~/endpoints/client/stop-factory";
import { fetchFactories } from "~/endpoints/client/fetch-factories";

export const OverviewFactory = component$(() => {
  const factoriesStore = useStore({ factories: useFactoriesData().value });
  const isFetchingData = useSignal(false)

  const startFactoryFunction = $((id: number) => {
    factoriesStore.factories[id].active ? stopFactory(id) : startFactory(id);
    factoriesStore.factories[id].active = !factoriesStore.factories[id].active;
  });

  // Refetched factories data fevery 10 seconds
  useVisibleTask$(() => {
    if(!isFetchingData.value)
    {
      isFetchingData.value = true;
      setInterval(async () => {
        factoriesStore.factories = await fetchFactories();
      }, 10000)
    }
  })

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        padding: "50px",
      }}
    >
      <h1>Factories</h1>

      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "row",
          columnGap: "300px",
        }}
      >
        <div
          style={{
            width: "50%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <p style={{ fontSize: "2rem", textAlign: "center" }}>
            Organic fertilizers
          </p>
          <div
            style={{
              display: "flex",
              height: "100%",
              alignItems: "center",
            }}
          >
            <Gauge
              value={parseFloat(factoriesStore.factories[0].capacity.toFixed(1))}
              maxValueMultiplier={35}
              text="Tonn"
            />
            <div style={{ textAlign: "center", paddingLeft: "20px" }}>
              <PowerButton
                onClickFunc={$(() => {
                  startFactoryFunction(0);
                })}
              />
              <p style={{ fontSize: "1.5rem", textAlign: "center" }}>Current</p>
              <p
                style={{
                  fontSize: "1rem",
                  textAlign: "center",
                  textDecoration: "underline",
                }}
              >
                {factoriesStore.factories[0].active ? 1 : 0} Ton /h
              </p>
            </div>
          </div>
        </div>

        <div
          style={{
            width: "50%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <p style={{ fontSize: "2rem", textAlign: "center" }}>
            Organic seeds and seedlings
          </p>
          <div
            style={{
              display: "flex",
              height: "100%",
              alignItems: "center",
            }}
          >
            <div style={{ textAlign: "center", paddingRight: "20px" }}>
              <PowerButton
                onClickFunc={$(() => {
                  startFactoryFunction(1);
                })}
              />
              <p style={{ fontSize: "1.5rem", textAlign: "center" }}>Current</p>
              <p
                style={{
                  fontSize: "1rem",
                  textAlign: "center",
                  textDecoration: "underline",
                }}
              >
                {factoriesStore.factories[1].active ? 1 : 0} Ton /h
              </p>
            </div>
            <Gauge
              value={parseFloat(factoriesStore.factories[1].capacity.toFixed(1))}
              maxValueMultiplier={35}
              text="Tonn"
            />
          </div>
        </div>
      </div>

      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "row",
          columnGap: "300px",
        }}
      >
        <div
          style={{
            width: "50%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <p style={{ fontSize: "2rem", textAlign: "center" }}>
            Pest and disease control
          </p>
          <div
            style={{
              display: "flex",
              height: "100%",
              alignItems: "center",
            }}
          >
            <Gauge
              value={parseFloat(factoriesStore.factories[2].capacity.toFixed(1))}
              maxValueMultiplier={35}
              text="Tonn"
            />
            <div style={{ textAlign: "center", paddingLeft: "20px" }}>
              <PowerButton
                onClickFunc={$(() => {
                  startFactoryFunction(2);
                })}
              />
              <p style={{ fontSize: "1.5rem", textAlign: "center" }}>Current</p>
              <p
                style={{
                  fontSize: "1rem",
                  textAlign: "center",
                  textDecoration: "underline",
                }}
              >
                {factoriesStore.factories[2].active ? 1 : 0} Ton /h
              </p>
            </div>
          </div>
        </div>

        <div
          style={{
            width: "50%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <p style={{ fontSize: "2rem", textAlign: "center" }}>
            Soil Amendments
          </p>
          <div
            style={{
              display: "flex",
              height: "100%",
              alignItems: "center",
            }}
          >
            <div style={{ textAlign: "center", paddingRight: "20px" }}>
              <PowerButton
                onClickFunc={$(() => {
                  startFactoryFunction(3);
                })}
              />
              <p style={{ fontSize: "1.5rem", textAlign: "center" }}>Current</p>
              <p
                style={{
                  fontSize: "1rem",
                  textAlign: "center",
                  textDecoration: "underline",
                }}
              >
                {factoriesStore.factories[3].active ? 1 : 0} Ton /h
              </p>
            </div>
            <Gauge
              value={parseFloat(factoriesStore.factories[3].capacity.toFixed(1))}
              maxValueMultiplier={35}
              text="Tonn"
            />
          </div>
        </div>
      </div>
    </div>
  );
});
