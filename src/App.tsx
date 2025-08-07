import type { FunctionComponent } from "react";
import Emitter from "./components/emitter.component";
import Subscriber from "./components/subscriber.component";

const App: FunctionComponent = () => {
  return (
    <>
      <h1>Storage Sync Demo</h1>
      <Emitter />
      <Subscriber />
    </>
  );
};

export default App;
