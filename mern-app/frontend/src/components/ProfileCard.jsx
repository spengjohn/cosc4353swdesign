import { useState } from "react";
import Field from "./Field";
import MultiDatePickerField from "./MultiDatePickerField";
import DropdownMenu from "./DropdownMenu";
import Selector from "./Selector";

const states = [
  "AL",
  "AK",
  "AZ",
  "AR",
  "CA",
  "CO",
  "CT",
  "DE",
  "FL",
  "GA",
  "HI",
  "ID",
  "IL",
  "IN",
  "IA",
  "KS",
  "KY",
  "LA",
  "ME",
  "MD",
  "MA",
  "MI",
  "MN",
  "MS",
  "MO",
  "MT",
  "NE",
  "NV",
  "NH",
  "NJ",
  "NM",
  "NY",
  "NC",
  "ND",
  "OH",
  "OK",
  "OR",
  "PA",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VT",
  "VA",
  "WA",
  "WV",
  "WI",
  "WY",
];

const skills = [
  "Gardening",
  "Cooking",
  "Cleaning",
  "Baking",
  "Fundraising",
  "Art",
];

const handleStateSelect = (state) => {
  console.log("Selected state:", state);
  // update form input or context state
};

export default function ProfileEditingCard() {
  return (
    <div
      className={`bg-white text-secondary px-4 py-2 rounded border-2 border-solid  w-lg`}
    >
      <form action="" classname={`flex`}>
        <div className={"flex flex-col size-full gap-2"}>
          <div className={"flex flex-3 flex-col gap-2"}>
            {/* <div className="">
            <img src={examplepic} width={200} height={200}></img>
          </div> */}

            <div>John Doe</div>
            <div className={"flex gap-4"}>
              <div>Albuquerque, NM</div>
            </div>
          </div>
          <div></div>
          <div className={"flex flex-2 row-span-full gap-4"}>
            <div className={"flex-1 "}>
              <div>
                <bold>Skills:</bold> a
              </div>
            </div>
            <div className={"flex-1"}>
              <bold>Preferences:</bold> a
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
