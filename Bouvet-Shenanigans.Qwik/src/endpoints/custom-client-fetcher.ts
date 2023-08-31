import type { AxiosInstance } from "axios";
import { customClientAxios } from "~/api/custom-client-axios";

export class CustomClientAxiosInstance {
  instance: AxiosInstance;
  constructor() {
    this.instance = customClientAxios();
  }
}
