import PrimaryButton from "../components/Buttons";
import { SecondaryButton } from "../components/Buttons";
import Field from "../components/Field";
import MultiDatePickerField from "../components/MultiDatePickerField";

export default function Test() {
  return (
    <>
      <h1 className="text-2xl p-4">This is the Home Page!</h1>
      <PrimaryButton>Test Button</PrimaryButton>
      <SecondaryButton>Secondary Test Button</SecondaryButton>
      <br></br>
      <Field label="Email" name="email" type="email" placeholder="example@email.com" required/>
      <MultiDatePickerField label="Availablility"/>
    </>
  );
}