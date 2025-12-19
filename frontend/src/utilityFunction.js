const arrayBasicStringFilter = (query) => (entry) =>
  entry.name.toLocaleLowerCase().includes(query.toLocaleLowerCase());

export { arrayBasicStringFilter };
