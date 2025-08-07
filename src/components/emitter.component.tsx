import { useState, type FunctionComponent } from "react";
import { customStorage } from "../services/storage.service";

const Emitter: FunctionComponent = () => {
    const [key, setKey] = useState("");
    const [value, setValue] = useState("");
    return (
        <>
            <h2>Store/Update a key/value pair</h2>
            <input type="text" placeholder="Type a key" value={key} onChange={(e) => setKey(e.target.value)} />
            <input type="text" placeholder="Type a value" value={value} onChange={(e) => setValue(e.target.value)} />
            <button disabled={!key} onClick={() => { customStorage.setItem(key, value); setKey(""); setValue(""); }}>Submit</button>
        </>
    );
}

export default Emitter;
