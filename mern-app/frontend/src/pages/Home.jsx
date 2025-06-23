import PrimaryButton from "../components/Buttons";
import { SecondaryButton } from "../components/Buttons";

export default function Home() {
  return (
    <>
      <h1 className="text-2xl p-4">This is the Home Page!</h1>
      <PrimaryButton>Test Button</PrimaryButton>
      <SecondaryButton>Secondary Test Button</SecondaryButton>
    </>
  );
}
