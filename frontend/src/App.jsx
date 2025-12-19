import { useEffect, useState } from "react";
import SectionFilter from "./sections/SectionFilter";
import SectionAddNumber from "./sections/SectionAddNumber";
import SectionNumbers from "./sections/SectionNumbers";
import personsService from "./services/persons";
import ErrorNotification from "./components/ErrorNotification";
import SuccessNotification from "./components/SuccessNotification";

const App = () => {
  const [nameFilter, setNameFilter] = useState("");
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    personsService
      .getAll()
      .then((res) => setPersons(res))
      .catch((error) => console.log(error));
  }, []);

  return (
    <main>
      <h1>Phonebook</h1>
      <ErrorNotification message={errorMessage} />
      <SuccessNotification message={successMessage} />
      <SectionFilter nameFilter={nameFilter} setNameFilter={setNameFilter} />
      <SectionAddNumber
        newName={newName}
        newNumber={newNumber}
        persons={persons}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
        setPersons={setPersons}
        setSuccessMessage={setSuccessMessage}
      />
      <SectionNumbers
        nameFilter={nameFilter}
        persons={persons}
        setPersons={setPersons}
        setErrorMessage={setErrorMessage}
      />
    </main>
  );
};

export default App;
