import PrimaryButton from "../components/Buttons";
import { SecondaryButton } from "../components/Buttons";
import TertiaryButton from "../components/TertiaryButton";
import Field from "../components/Field";
import MultiDatePickerField from "../components/MultiDatePickerField";
import DropdownMenu from "../components/DropdownMenu";
import Selector from "../components/Selector";
import ProfileEditingCard from "../components/ProfileEditingCard";
import ProfileCard from "../components/ProfileCard";

const sampleUser = {
  name: "John Doe",
  city: "Albuquerque",
  state: "NM",
  skills: ["Gardening", "Cooking", "Baking", "Running", "Woodworking"],
  preferences: "Gardening assignments preferred.",
};
import SingleDatePickerField from "../components/SingleDatePickerField";

const states = [
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
  "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
  "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
  "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
  "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
];
// from DB or static

export default function Test() {
  const handleStateSelect = (state) => {
    console.log("Selected state:", state);
    // update form input or context state
  };
  return (
    <div className="">
      <h1 className="text-2xl">This is where we test things out:</h1>
      <PrimaryButton>Test Button</PrimaryButton>
      <SecondaryButton>Secondary Test Button</SecondaryButton>
      <Field
        labelClass="text-2xl p-4"
        label="Email"
        name="email"
        type="email"
        placeholder="example@email.com"
        required
      />
      <MultiDatePickerField label="Availablility" />
      <TertiaryButton>Button</TertiaryButton>
      <Field labelClass="text-2xl p-4" label="Email" name="email" type="email" placeholder="example@email.com" required/>
      <MultiDatePickerField label="Availablility"/>
      <SingleDatePickerField/>
      <h1 className="text-2xl mb-4">Selector Test</h1>
      <Selector
        items={states}
        onSelect={(selected) => console.log("Selected items:", selected)}
      >
        Select some States:
      </Selector>
      <h1 className="text-2xl mb-4">Drop down test</h1>
      <DropdownMenu items={states} onSelect={handleStateSelect}>
        Select a State:
      </DropdownMenu>

      <br></br>
      <Field
        label="Email"
        name="email"
        type="email"
        placeholder="example@email.com"
        required
      />
      <MultiDatePickerField label="Availablility" />
      <ProfileEditingCard />
      <ProfileCard user={sampleUser} />
    </div>
  );
}
