import {atom} from "recoil"
import { selector } from "recoil"
import { userState } from "../atoms/user"

export const IsLoading= selector({
    key: 'IsLoading',
    get: ({get})=> {
        const state= get(userState);
        return state.isLoading;
    }
});