function checkNull(value) {
  return value == null || value.length == 0;
}

let config = {
  mode: "dev",
  size: 10,
};

export { checkNull, config };
