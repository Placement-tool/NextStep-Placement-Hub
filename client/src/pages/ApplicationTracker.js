//Import important files
import React from "react";

//This list stores User's saved applications
const savedApplications = []

//This function adds Application from tracker
export const add_application = (application) => {
    savedApplications.push(application);
}

//This function removes Application from tracker
export const remove_application = (title) => {
    const index = savedApplications.findIndex(app => app.title === title);
    if (index !== -1) {
        savedApplications.splice(index, 1);
    } else {
        ;
    }
}

//This function gets the current applications
export const getApplications = () => {
    return [...savedApplications];
}

//Tracker page design
const Tracker = () => {
  return (
    <div>
      <h1>This is the Application tracker</h1>
    </div>
  );
};

export default Tracker;