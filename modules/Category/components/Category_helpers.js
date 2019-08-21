export function constructConfigQuery(config) {
  if (config && typeof config === "object") {
    let query = "";
    for (const key in config) {
      query = `${query !== "" ? `${query}&` : "?"}${key}=${config[key]}`;
    }
    return query;
  }

  return "";
}

export function configsStatusToQuery(config) {
  let query = "";
  for (const key in config) {
    if (config[key].selected && config[key].selected !== "") {
      query = `${query !== "" ? `${query}&` : "?"}${key}=${config[key].selected}`;
    }
  }
  return query;
}
