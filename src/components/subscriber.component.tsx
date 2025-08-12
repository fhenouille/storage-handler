import { useState, type FunctionComponent } from "react";
import { useKeyStorage } from "../services/useKeyStorage";

const Subscriber: FunctionComponent = () => {
  const [keyInput, setKeyInput] = useState("");
  const [subscribedKey, setSubscribedKey] = useState<string | undefined>();
  const { keyValue: valueForSubscribedKey } = useKeyStorage(subscribedKey);

  const handleSubscribe = () => {
    if (keyInput && keyInput !== subscribedKey) {
      setSubscribedKey(keyInput);
    }
    setKeyInput("");
  };

  return (
    <>
      <h2>Subscribe to a specific key</h2>
      <input
        type="text"
        placeholder="Type a key"
        value={keyInput}
        onChange={(e) => {
          setKeyInput(e.target.value);
        }}
      />
      <button type="button" disabled={!keyInput} onClick={handleSubscribe}>
        Submit
      </button>
      {subscribedKey && (
        <>
          <p>{`Subscribed key: ${subscribedKey}`}</p>
          <p>{`Corresponding value: ${
            valueForSubscribedKey ?? "No Data found !"
          }`}</p>
        </>
      )}
    </>
  );
};

export default Subscriber;
