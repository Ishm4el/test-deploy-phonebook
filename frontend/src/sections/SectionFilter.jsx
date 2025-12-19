import InputText from "../components/InputText";

const SectionFilter = ({ setNameFilter, nameFilter }) => (
  <section>
    <h2>Search</h2>
    <search>
      <form>
        <InputText setState={setNameFilter} state={nameFilter} />
      </form>
    </search>
  </section>
);

export default SectionFilter;
