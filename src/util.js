import {map, prop} from "ramda";

export const getNodes = (data) => map(prop("node"), data.edges);

export const nvListToObj = (nvList) => nvList.reduce((obj, val) => {
    obj[val.name] = decodeURIComponent(val.value);
    return obj;
  }, {});