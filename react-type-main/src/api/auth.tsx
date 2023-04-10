import instance from "./instance";
import { Iauth } from './../types/auth';

const addAccount = (data: Iauth)=>{
    return instance.post("/signup", data)
}
const checkOneAccount = (data: Iauth) => {
  return instance.post("/signin", data);
};

export { addAccount, checkOneAccount };