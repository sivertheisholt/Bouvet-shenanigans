import { component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import { OverviewElectricity } from "~/components/electricity/overview-electricity";
import { OverviewFactory } from "~/components/factory/overview-factory";

import Hero from "~/components/starter/hero/hero";
import Starter from "~/components/starter/next-steps/next-steps";
import { fetchCoalPlants } from "~/endpoints/fetch-coal-plants";
import { fetchFactories } from "~/endpoints/fetch-factories";
import { fetchSolar } from "~/endpoints/fetch-solar";
import { fetchUser } from "~/endpoints/fetch-user";
import { fetchWind } from "~/endpoints/fetch-wind";
import type { CoalPlant } from "~/types/coal-plant";
import type { Factory } from "~/types/factory";
import type { Solar } from "~/types/solar";
import type { User } from "~/types/user";
import type { Wind } from "~/types/wind";

export const useCoalPlantsData = routeLoader$(
  async (): Promise<Array<CoalPlant>> => {
    return await fetchCoalPlants();
  }
);

export const useFactoriesData = routeLoader$(
  async (): Promise<Array<Factory>> => {
    return await fetchFactories();
  }
);

export const useSolarData = routeLoader$(async (): Promise<Solar> => {
  return await fetchSolar();
});

export const useWindData = routeLoader$(async (): Promise<Wind> => {
  return await fetchWind();
});

export const useUserData = routeLoader$(async (): Promise<User> => {
  return await fetchUser();
});

export default component$(() => {
  return (
    <>
      <Hero />
      <Starter />

      <div role="presentation" class="ellipsis"></div>
      <div role="presentation" class="ellipsis ellipsis-purple"></div>

      <OverviewFactory />
      <OverviewElectricity />
    </>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
