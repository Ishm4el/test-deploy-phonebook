import { arrayBasicStringFilter } from "../utilityFunction";
import personsService from "../services/persons";

const NumberListItem = ({ entry, setPersons, setErrorMessage }) => (
  <li>
    {entry.name} {entry.number}{" "}
    <button
      onClick={() => {
        if (
          window.confirm(
            `delete phone number address ${entry.id} ${entry.name}`
          )
        )
          personsService
            .destroy(entry.id)
            .then(() => {
              setPersons((persons) => {
                console.log(persons);
                const newPersons = persons.filter(
                  (person) => person.id !== entry.id
                );
                console.log(newPersons);

                return newPersons;
              });
            })
            .catch(() => {
              setErrorMessage(`Note ${entry.name} was already removed!`);
              setTimeout(() => {
                setErrorMessage("");
              }, 5000);
              setPersons((persons) => {
                console.log(persons);
                const newPersons = persons.filter(
                  (person) => person.id !== entry.id
                );
                console.log(newPersons);

                return newPersons;
              });
            });
      }}
    >
      Delete
    </button>
  </li>
);

const mapPersons = (entry, setPersons, setErrorMessage) => () =>
  (
    <NumberListItem
      key={entry.name}
      entry={entry}
      setErrorMessage={setErrorMessage}
      setPersons={setPersons}
    />
  );

const SectionNumbers = ({
  persons,
  nameFilter,
  setPersons,
  setErrorMessage,
}) => (
  <section>
    <h2>Numbers</h2>
    <ul>
      {nameFilter !== ""
        ? persons
            .filter(arrayBasicStringFilter(nameFilter))
            .map((entry) => mapPersons(entry, setPersons, setErrorMessage)())
        : persons.map((entry) =>
            mapPersons(entry, setPersons, setErrorMessage)()
          )}
    </ul>
  </section>
);

export default SectionNumbers;
