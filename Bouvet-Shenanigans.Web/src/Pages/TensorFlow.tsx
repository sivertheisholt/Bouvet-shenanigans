import React, { useEffect, useState } from "react";
import Connector from "../signalr-connection";

export interface TensorFlowProps {}

const TensorFlowComponent = (props: TensorFlowProps) => {
  const { events } = Connector();
  const [message, setMessage] = useState<any>();
  useEffect(() => {
    events((data) => setMessage(data));
  });
  return (
    <div>
      <h1>Detection: {message && message.detections}</h1>
      {message && <img src={`data:image/jpg;base64,${message.base64}`} />}
    </div>
  );
};

export const TensorFlow = React.memo(TensorFlowComponent);
