import {map, prop} from "ramda";

export const getNodes = (data) => map(prop("node"), data.edges);