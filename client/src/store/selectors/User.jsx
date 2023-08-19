import {atom} from 'recoil'
import { selector } from 'recoil'
import { userState } from '../atoms/user'

export const UserEmail= selector({
    key: 'userEmail',
    get: ({get})=> {
        const state= get(userState);
        return state.userEmail
    }
})

export const isUserLoading= selector({
    key: 'isUserLoading',
    get: ({get})=> {
        const state= get(userState);
        return state.isLoading
    }
})