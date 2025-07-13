import { sendTestData } from "../api/sendDataTest";

export default function TestButton() {
  const handleClick = async () => {
    try {
      const response = await sendTestData({
        name: "John Doe",
        email: "john@example.com",
      });
      console.log("Response:", response.data);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return <button onClick={handleClick}>Send Test Data</button>;
}
