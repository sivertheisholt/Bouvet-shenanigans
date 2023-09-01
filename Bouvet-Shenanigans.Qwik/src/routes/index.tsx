import { component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import { OverviewElectricity } from "~/components/electricity/overview-electricity";
import { OverviewFactory } from "~/components/factory/overview-factory";

import Hero from "~/components/hero/hero";
import OverViewAccount from "~/components/account/overview-account";
import { fetchCoalPlants } from "~/endpoints/server/fetch-coal-plants";
import { fetchFactories } from "~/endpoints/server/fetch-factories";
import { fetchSolar } from "~/endpoints/server/fetch-solar";
import { fetchUser } from "~/endpoints/server/fetch-user";
import { fetchWind } from "~/endpoints/server/fetch-wind";
import type { CoalPlant } from "~/types/coal-plant";
import type { Factory } from "~/types/factory";
import type { Solar } from "~/types/solar";
import type { User } from "~/types/user";
import type { Wind } from "~/types/wind";

export const useCoalPlantsData = routeLoader$(async (requestEvent) => {
  return (await fetchCoalPlants(requestEvent)) as Array<CoalPlant>;
});

export const useFactoriesData = routeLoader$(async (requestEvent) => {
  return (await fetchFactories(requestEvent)) as Array<Factory>;
});

export const useSolarData = routeLoader$(async (requestEvent) => {
  return (await fetchSolar(requestEvent)) as Solar;
});

export const useWindData = routeLoader$(async (requestEvent) => {
  return (await fetchWind(requestEvent)) as Wind;
});

export const useUserData = routeLoader$(async (requestEvent) => {
  return (await fetchUser(requestEvent)) as User;
});

export default component$(() => {
  return (
    <>
      <Hero />
      <OverViewAccount />

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
