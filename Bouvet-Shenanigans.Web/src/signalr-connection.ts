import * as signalR from "@microsoft/signalr";
const URL = process.env.REACT_APP_HUB_ADDRESS ?? "https://localhost:7055/hub"; //or whatever your backend port is
class Connector {
  private connection: signalR.HubConnection;
  public events: (onTfImage: (data: any) => void) => void;
  static instance: Connector;
  constructor() {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(URL)
      .withAutomaticReconnect()
      .build();
    this.connection.start().catch((err) => document.write(err));
    this.events = (onTfImage) => {
      this.connection.on("tfImage", (data) => {
        onTfImage(data);
      });
    };
  }
  public static getInstance(): Connector {
    if (!Connector.instance) Connector.instance = new Connector();
    return Connector.instance;
  }
}
export default Connector.getInstance;
