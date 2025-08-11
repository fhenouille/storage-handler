import { useEffect, useState, type FunctionComponent } from "react";
import { customStorage } from "../services/storage.service";

const Subscriber: FunctionComponent = () => {
  const [keyInput, setKeyInput] = useState("");
  const [subscribedKey, setSubscribedKey] = useState("");
  const [valueForSubscribedKey, setValueForSubscribedKey] = useState<
    string | null
  >();
  const [unsubscribeFn, setUnsubscribeFn] = useState<() => void>();

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      if (unsubscribeFn) {
        unsubscribeFn();
      }
    };
  }, [unsubscribeFn]);

  const handleSubscribe = () => {
    if (keyInput && keyInput !== subscribedKey) {
      //subscribe to new key
      const newUnsubscribeFn = customStorage.subscribe(
        keyInput,
        setValueForSubscribedKey
      );
      //get new unsuscribe function and unsubscribe from old key if necessary
      setUnsubscribeFn((oldUnsuscribeFn) => {
        if (oldUnsuscribeFn) {
          oldUnsuscribeFn();
        }
        return newUnsubscribeFn;
      });
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
      <p>{`Subscribed key: ${subscribedKey}`}</p>
      {subscribedKey && (
        <p>{`Corresponding value: ${
          valueForSubscribedKey ?? "No Data found !"
        }`}</p>
      )}
    </>
  );
};

export default Subscriber;
