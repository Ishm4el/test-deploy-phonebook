import axios from "axios";
const baseUrl = "/api/persons";

const extractResData = (res) => res.data;

const getAll = () => axios.get(baseUrl).then(extractResData);

const create = (newObject) =>
  axios.post(baseUrl, newObject).then(extractResData);

const update = (id, newObject) =>
  axios.put(`${baseUrl}/${id}`, newObject).then(extractResData);

const destroy = (id) =>
  axios.delete(`${baseUrl}/${id}`).then((res) => {
    console.log(res);
    return res;
  });

export default { getAll, create, update, destroy };
