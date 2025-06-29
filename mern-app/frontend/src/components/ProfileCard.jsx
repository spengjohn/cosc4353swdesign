import { useState } from "react";
import Field from "./Field";

const userFullName = ["John Doe"];
const userLocationCity = ["Albuquerque"];
const userLocationState = ["NM"];
const usersPreferences = ["Gardening tasks preferred"];
const usersSkills = ["Gardening", "Cooking", "Cleaning", "Baking"];

const handleStateSelect = (state) => {
  console.log("Selected state:", state);
  // update form input or context state
};

const ProfileCard = ({ user }) => {
  return (
    <div
      className={`bg-white text-secondary px-4 py-2 rounded border-2 border-solid  w-lg`}
    >
      <form action="" classname={`flex`}>
        <div className={"flex flex-col size-full gap-2"}>
          <div className={"flex flex-3 flex-row gap-2 content-center"}>
            <div className={"flex-1"}>{user.name}</div>

            <div className={"flex-1"}>
              {user.city}, {user.state}
            </div>
          </div>
          <div className={"flex flex-2 flex-row gap-2"}>
            <div className={"flex-1 "}>
              <p>
                <strong>Skills:</strong> {user.skills.join(", ")}.
              </p>
            </div>
            <div className={"flex-1"}>
              <p>
                <strong>Preferences:</strong> {user.preferences}
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProfileCard;
