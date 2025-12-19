const InputText = ({ state, setState, text }) => {
  const handleInput = (setter) => (e) => setter(e.target.value);
  return (
    <div>
      <label htmlFor="filter-name">{text} </label>
      <input
        type="text"
        name="filter-name"
        id="filter-name"
        onChange={handleInput(setState)}
        value={state}
      />
    </div>
  );
};

export default InputText;
