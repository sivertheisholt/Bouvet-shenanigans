import type { RequestEventLoader } from "@builder.io/qwik-city";
import type { AxiosInstance } from "axios";
import { customServerAxios } from "~/api/custom-server-axios";

export class CustomServerAxiosInstance {
  instance: AxiosInstance;
  constructor(requestEvent: RequestEventLoader<QwikCityPlatform>) {
    this.instance = customServerAxios(requestEvent);
  }
}
