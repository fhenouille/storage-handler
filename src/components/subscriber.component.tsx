import { useState, type FunctionComponent } from "react";
import { customStorage } from "../services/storage.service";

const Subscriber: FunctionComponent = () => {
    const [key, setKey] = useState("");
    const [subscribedKey, setSubscribedKey] = useState("");
    const [correspondingValue, setCorrespondingValue] = useState<string | null>();
    const [, setUnsubscribeKey] = useState<() => void>();
    return (
        <>
            <h2>Subscribe to a specific key</h2>
            <input type="text" placeholder="Type a key" value={key} onChange={(e) => setKey(e.target.value)} />
            <button disabled={!key} onClick={() => {
                if (key !== subscribedKey) {
                    const unsubscribe = customStorage.subscribe(key, setCorrespondingValue);
                    setSubscribedKey(key);
                    setUnsubscribeKey((oldUnsuscribe) => {
                        if (oldUnsuscribe) {
                            oldUnsuscribe();

                        };
                        return unsubscribe
                    });
                }
                setKey("");
            }}>Submit</button>
            <p>{`Subscribed key: ${subscribedKey}`}</p>
            {subscribedKey && <p>{`Corresponding value: ${correspondingValue ?? "No Data found !"}`}</p>}
        </>
    );
}

export default Subscriber;
