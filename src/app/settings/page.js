"use client";

export const dynamic = "force-static";

import { useState, useEffect } from "react";
import { getData, setData } from "../utils/storage";

export default function Settings() {
  const [name, setName] = useState("");

  useEffect(() => {
    const store = getData("store", {});
    if (store.name) setName(store.name);
  }, []);

  const save = () => {
    setData("store", { name });
    alert("Store Saved");
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Store Settings</h1>
      <input
        className="border w-full p-2 mb-4 dark:bg-black"
        placeholder="Store Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={save} className="bg-black text-white px-4 py-2">
        Save
      </button>
    </div>
  );
}
