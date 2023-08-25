import { component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
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
    const res = await fetch(
      "https://bouvetfarmfresh.azurewebsites.net/api/electricity/coal",
      {
        headers: {
          ApiKey: "5ba28a1c-3c70-4d6d-9147-8ff195380b5e",
          Accept: "application/json",
        },
      }
    );
    return (await res.json()) as Array<CoalPlant>;
  }
);

export const useFactoriesData = routeLoader$(
  async (): Promise<Array<Factory>> => {
    const res = await fetch(
      "https://bouvetfarmfresh.azurewebsites.net/api/factories",
      {
        headers: {
          ApiKey: "5ba28a1c-3c70-4d6d-9147-8ff195380b5e",
          Accept: "application/json",
        },
      }
    );
    return (await res.json()) as Array<Factory>;
  }
);

export const useSolarData = routeLoader$(async (): Promise<Solar> => {
  const res = await fetch(
    "https://bouvetfarmfresh.azurewebsites.net/api/electricity/solar",
    {
      headers: {
        ApiKey: "5ba28a1c-3c70-4d6d-9147-8ff195380b5e",
        Accept: "application/json",
      },
    }
  );
  return (await res.json()) as Solar;
});

export const useWindData = routeLoader$(async (): Promise<Wind> => {
  const res = await fetch(
    "https://bouvetfarmfresh.azurewebsites.net/api/electricity/wind",
    {
      headers: {
        ApiKey: "5ba28a1c-3c70-4d6d-9147-8ff195380b5e",
        Accept: "application/json",
      },
    }
  );
  return (await res.json()) as Wind;
});

export const useUserData = routeLoader$(async (): Promise<User> => {
  const res = await fetch(
    "https://bouvetfarmfresh.azurewebsites.net/api/users",
    {
      headers: {
        ApiKey: "5ba28a1c-3c70-4d6d-9147-8ff195380b5e",
        Accept: "application/json",
      },
    }
  );
  return (await res.json()) as User;
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
