import * as axios from "axios";
import {API_URL} from '../config';

export const instance = axios.create({
  baseURL: API_URL,
});







