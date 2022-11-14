import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8080",
});

// navigation guard ?
// interceptor 같은 느낌의 event cb
