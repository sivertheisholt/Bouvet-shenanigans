import React, { useState } from "react";
import { Routing } from "./Routing";

const AppComponent = () => {
  return <Routing />;
};

export const App = React.memo(AppComponent);
