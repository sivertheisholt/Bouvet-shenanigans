import React, { useEffect, useState } from "react";
import Connector from "../signalr-connection";

export interface TensorFlowProps {}

const TensorFlowComponent = (props: TensorFlowProps) => {
  const { newMessage, events } = Connector();
  const [message, setMessage] = useState();
  useEffect(() => {
    events((data) => setMessage(data));
  });
  return (
    <div className="App">
      <span>
        message from signalR: <span style={{ color: "green" }}>{message}</span>{" "}
      </span>
      <br />
    </div>
  );
};

export const TensorFlow = React.memo(TensorFlowComponent);
