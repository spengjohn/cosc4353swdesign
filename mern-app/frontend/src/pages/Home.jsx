import PrimaryButton from "../components/Buttons";
import { SecondaryButton } from "../components/Buttons";
import Field from "../components/Field";
import DropdownMenu from "../components/DropdownMenu";
import Selector from "../components/Selector";

const states = [
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
  "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
  "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
  "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
  "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
];
 // from DB or static


export default function Home() {
  const handleStateSelect = (state) => {
    console.log("Selected state:", state);
    // update form input or context state
  };

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-2xl mb-4">Home...</h1>
      
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
