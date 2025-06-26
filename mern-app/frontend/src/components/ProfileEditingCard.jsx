import { useState } from "react";
import Field from "./Field";
import MultiDatePickerField from "./MultiDatePickerField";

export default function ProfileEditingCard() {
  return (
    <div
      className={`bg-white text-secondary px-4 py-2 rounded border-2 border-solid flex w-lg`}
    >
      <div className={"flex flex-col size-full"}>
        <div className={"flex flex-3 flex-col gap-2"}>
          {/* <div className="">
            <img src={examplepic} width={200} height={200}></img>
          </div> */}
          <Field
            label="Name"
            name="name"
            type="text"
            placeholder="John Doe"
            required
          />
          <Field
            label="Address 1"
            name="address1"
            type="text"
            placeholder="Penny Lane"
            required
          />
          <div className={"flex gap-4"}>
            <Field
              className={"flex-3"}
              label="Address 2"
              name="address2"
              type="text"
              placeholder="Mailbox 1"
            />
            <Field
              className={"flex-1"}
              label="Zipcode"
              name="zipcode"
              type="number"
              placeholder="12345"
              required
            />
          </div>
          <div className={"flex gap-4"}>
            <Field
              className={"flex-3"}
              label="City"
              name="city"
              type="text"
              placeholder="Albuquerque"
              required
            />
            <Field
              className={"flex-1"}
              label="City"
              name="city"
              type="text"
              placeholder="Albuquerque"
              required
            />
          </div>
        </div>
        <div></div>
        <div className={"flex flex-2 row-span-full gap-4"}>
          <div className={"flex-1 flex flex-col"}>
            <Field
              className={""}
              label="Preferences"
              name="preferences"
              type="text"
              placeholder="Gardening, cooking..."
            />
            <Field
              className={""}
              label="Preferences"
              name="preferences"
              type="text"
              placeholder="Gardening, cooking..."
            />
          </div>
          <div className={"flex-1"}>
            <p>Availability</p>
            <MultiDatePickerField required />
          </div>
        </div>
      </div>
    </div>
  );
}
