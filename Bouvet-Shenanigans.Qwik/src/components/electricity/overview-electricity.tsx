import {
  component$,
  useSignal,
  useStore,
  useVisibleTask$,
} from "@builder.io/qwik";
import Gauge from "../gauge";
import { useCoalPlantsData, useSolarData, useWindData } from "~/routes";
import { fetchSolar } from "~/endpoints/client/fetch-solar";
import { fetchWind } from "~/endpoints/client/fetch-wind";

import styles from "./overview-electricity.module.css";
import widthStyles from "../../css/width.module.css";
import textStyles from "../../css/width.module.css";
import paddingStyles from "../../css/padding.module.css";

export const OverviewElectricity = component$(() => {
  const solar = useStore({ solar: useSolarData().value });
  const wind = useStore({ wind: useWindData().value });
  const coalPlants = useCoalPlantsData();

  const isFetchingData = useSignal(false);

  // Refetched solar/wind data fevery 10 seconds
  useVisibleTask$(() => {
    if (!isFetchingData.value) {
      isFetchingData.value = true;
      setInterval(async () => {
        solar.solar = await fetchSolar();
        wind.wind = await fetchWind();
      }, 10000);
    }
  });

  const coalTotal = coalPlants.value.reduce(
    (acc, obj) => (obj.active ? acc + obj.production : acc),
    0
  );

  return (
    <div class="container container-purple container-center">
      <h1 class={styles.electricityText}>Electricity</h1>
      <div>
        <Gauge
          value={parseInt(
            (wind.wind.production + solar.solar.production + coalTotal).toFixed(
              1
            )
          )}
          maxValueMultiplier={3.5}
          text="kWh"
        />
      </div>
      <div class={styles.wrapper}>
        <div class={widthStyles.width_100_percent}>
          <p class={[textStyles.text_center, textStyles.font_size_m]}>Solar</p>
          <Gauge
            value={parseInt(solar.solar.production.toFixed(1))}
            maxValueMultiplier={3.5}
            text="kWh "
            maxHeight="300px"
          />
        </div>
        <div
          class={[
            widthStyles.width_100_percent,
            paddingStyles.padding_left_20_percent,
            paddingStyles.padding_right_20_percent,
          ]}
        >
          <p class={[textStyles.font_size_m, textStyles.text_center]}>Wind</p>
          <Gauge
            value={parseInt(wind.wind.production.toFixed(1))}
            maxValueMultiplier={2.35}
            text="kWh"
            maxHeight="300px"
          />
        </div>
        <div class={[widthStyles.width_100_percent]}>
          <p class={[textStyles.font_size_m, textStyles.text_center]}>Coal</p>
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
