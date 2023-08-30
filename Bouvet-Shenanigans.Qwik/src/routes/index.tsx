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

export const useCoalPlantsData = routeLoader$(async (requestEvent) => {
  return await fetchCoalPlants(
    requestEvent.env.get("API_KEY")!,
    requestEvent.env.get("FARMFRESH_BASEURL")!
  );
});

export const useFactoriesData = routeLoader$(async (requestEvent) => {
  return await fetchFactories(
    requestEvent.env.get("API_KEY")!,
    requestEvent.env.get("FARMFRESH_BASEURL")!
  );
});

export const useSolarData = routeLoader$(async (requestEvent) => {
  return await fetchSolar(
    requestEvent.env.get("API_KEY")!,
    requestEvent.env.get("FARMFRESH_BASEURL")!
  );
});

export const useWindData = routeLoader$(async (requestEvent) => {
  return await fetchWind(
    requestEvent.env.get("API_KEY")!,
    requestEvent.env.get("FARMFRESH_BASEURL")!
  );
});

export const useUserData = routeLoader$(async (requestEvent) => {
  return await fetchUser(
    requestEvent.env.get("API_KEY")!,
    requestEvent.env.get("FARMFRESH_BASEURL")!
  );
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
