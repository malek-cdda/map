"use client";
import { AutoComplete } from "@/components/autocomplete/home";
let apiKey = "AIzaSyD-CWmVyAapUI5zhqL8zIj8Oa6a95UexVs";
export default function Home() {
  return (
    <main className=" ">
      {/* in autocomplete field i declare use can auto search to find place and street view when he/she make all value true  */}
      <AutoComplete apiKey={apiKey} autoComplete={true} streetView={true} />
    </main>
  );
}
