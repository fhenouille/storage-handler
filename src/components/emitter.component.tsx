import { useState, type FunctionComponent } from "react";
import { useKeyStorage } from "../services/useKeyStorage";

const Emitter: FunctionComponent = () => {
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");
  const { updateKeyValue, removeKey } = useKeyStorage();

  return (
    <>
      <h2>Store/Update/Remove a key/value pair</h2>
      <input
        type="text"
        placeholder="Type a key"
        value={key}
        onChange={(e) => {
          setKey(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Type a value"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
      <button
        type="button"
        disabled={!key}
        onClick={() => {
          updateKeyValue(key, value);
          setKey("");
          setValue("");
        }}
      >
        Store/Update
      </button>
      <button
        type="button"
        disabled={!key}
        onClick={() => {
          removeKey(key);
          setKey("");
          setValue("");
        }}
      >
        Remove
      </button>
    </>
  );
};

export default Emitter;
