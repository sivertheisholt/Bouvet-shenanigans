import { component$ } from "@builder.io/qwik";
import Gauge from "../starter/gauge";
import { useCoalPlantsData, useSolarData, useWindData } from "~/routes";

export const OverviewElectricity = component$(() => {
  const solar = useSolarData();
  const wind = useWindData();
  const coalPlants = useCoalPlantsData();

  const coalTotal = coalPlants.value.reduce(
    (acc, obj) => (obj.active ? acc + obj.production : acc),
    0
  );

  return (
    <div class="container container-purple container-center">
      <h1 style={{ marginBottom: "50px" }}>Electricity</h1>
      <div>
        <Gauge
          value={parseInt(
            (
              wind.value.production +
              solar.value.production +
              coalTotal
            ).toFixed(1)
          )}
          maxValueMultiplier={3.5}
          text="kWh"
        />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
        }}
      >
        <div style={{ width: "100%" }}>
          <p style={{ fontSize: "2rem", textAlign: "center" }}>Solar</p>
          <Gauge
            value={parseInt(solar.value.production.toFixed(1))}
            maxValueMultiplier={3.5}
            text="kWh "
            maxHeight="300px"
          />
        </div>
        <div style={{ width: "100%", paddingLeft: "20%", paddingRight: "20%" }}>
          <p style={{ fontSize: "2rem", textAlign: "center" }}>Wind</p>
          <Gauge
            value={parseInt(wind.value.production.toFixed(1))}
            maxValueMultiplier={2.35}
            text="kWh"
            maxHeight="300px"
          />
        </div>
        <div style={{ width: "100%" }}>
          <p style={{ fontSize: "2rem", textAlign: "center" }}>Coal</p>
          <Gauge
            value={coalTotal}
            maxValueMultiplier={0.675}
            text="kWh"
            maxHeight="300px"
          />
        </div>
      </div>
    </div>
  );
});
