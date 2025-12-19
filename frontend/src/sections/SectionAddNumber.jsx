import InputText from "../components/InputText";
import personsService from "../services/persons";

const SectionAddNumber = ({
  persons,
  newName,
  setNewName,
  newNumber,
  setNewNumber,
  setPersons,
  setSuccessMessage,
}) => (
  <section>
    <h2>add a new</h2>
    <form
      onSubmit={(e) => {
        e.preventDefault();

        const existingEntry = persons.find((entry) => entry.name === newName);

        if (existingEntry) {
          //* Previous implementation
          // alert(`${newName} already exists!`);
          // setNewName("");

          if (
            window.confirm(
              `${newName} is already added to phonebook, replace the old number with a new one?`
            )
          ) {
            const updatePerson = { number: newNumber, name: newName };
            personsService.update(existingEntry.id, updatePerson);
            setPersons((prevPersons) => {
              const newPersons = prevPersons.map((entry) =>
                entry.id === existingEntry.id
                  ? { ...entry, number: newNumber }
                  : { ...entry }
              );
              console.log(newPersons);
              return newPersons;
            });
            setSuccessMessage(`Updated ${newName}`);
            setTimeout(() => {
              setSuccessMessage("");
            }, 5000);
            setNewName("");
            setNewNumber("");
          }
        } else {
          const personObject = { name: newName, number: newNumber };
          personsService
            .create(personObject)
            .then((res) => {
              setPersons(persons.concat(res));
              setSuccessMessage(`Added ${newName}`);
              setTimeout(() => {
                setSuccessMessage("");
              }, 5000);
              setNewName("");
              setNewNumber("");
            })
            .catch((error) => console.log(error));
        }
      }}
    >
      <div id="form-body">
        <InputText text={"New Name: "} setState={setNewName} state={newName} />
        <InputText
          text={"New Number: "}
          setState={setNewNumber}
          state={newNumber}
        />
      </div>
      <div id="form-submit">
        <button type="submit">add</button>
      </div>
    </form>
  </section>
);

export default SectionAddNumber;
