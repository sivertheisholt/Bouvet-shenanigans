import { component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import { customAxios } from "~/api/custom-axios";
import { OverviewElectricity } from "~/components/electricity/overview-electricity";
import { OverviewFactory } from "~/components/factory/overview-factory";

import Hero from "~/components/starter/hero/hero";
import Starter from "~/components/starter/next-steps/next-steps";
import type { CoalPlant } from "~/types/coal-plant";
import type { Factory } from "~/types/factory";
import type { Solar } from "~/types/solar";
import type { User } from "~/types/user";
import type { Wind } from "~/types/wind";

export const useCoalPlantsData = routeLoader$(
  async (): Promise<Array<CoalPlant>> => {
    return await customAxios.get(`api/electricity/coal`).then((resp: any) => {
      return resp.data;
    });
  }
);

export const useFactoriesData = routeLoader$(
  async (): Promise<Array<Factory>> => {
    return await customAxios.get(`api/factories`).then((resp: any) => {
      return resp.data;
    });
  }
);

export const useSolarData = routeLoader$(async (): Promise<Solar> => {
  return await customAxios.get(`api/electricity/solar`).then((resp: any) => {
    return resp.data;
  });
});

export const useWindData = routeLoader$(async (): Promise<Wind> => {
  return await customAxios.get(`api/electricity/wind`).then((resp: any) => {
    return resp.data;
  });
});

export const useUserData = routeLoader$(async (): Promise<User> => {
  return await customAxios.get(`api/users`).then((resp: any) => {
    return resp.data;
  });
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
