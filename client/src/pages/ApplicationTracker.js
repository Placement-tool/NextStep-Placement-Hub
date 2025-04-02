import React from "react";

const savedApplications = []

export const add_application = (application) => {
    savedApplications.push(application);
}

export const remove_application = (title) => {
    const index = savedApplications.findIndex(app => app.title === title);
    if (index !== -1) {
        savedApplications.splice(index, 1);
    } else {
        ;
    }
}

export const getApplications = () => {
    return [...savedApplications];
}

const Tracker = () => {
  return (
    <div>
      <h1>This is the Application tracker</h1>
    </div>
  );
};

export default Tracker;