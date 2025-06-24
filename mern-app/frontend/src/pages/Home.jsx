import PrimaryButton from "../components/Buttons";
import { SecondaryButton } from "../components/Buttons";
import Field from "../components/Field";
import DropdownMenu from "../components/DropdownMenu";
import Selector from "../components/Selector";

export default function App() {
  return (
    <div className="min-h-screen bg-white p-8">
      <h1 className="text-2xl mb-4">Selector Test</h1>
      <Selector />
    </div>
  );
}



/*export default function Home() {
  return (
    <>
      <h1 className="text-2xl p-4">This is the Home Page!</h1>
      <PrimaryButton>Test Button</PrimaryButton>
      <SecondaryButton>Secondary Test Button</SecondaryButton>
      <br></br>
      <Field label="Email" name="email" type="email" placeholder="example@email.com" required/>
    </>
    
  );
}*/
