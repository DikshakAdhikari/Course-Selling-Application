import {atom} from 'recoil'
import { selector } from "recoil"
import { courseState } from '../atoms/course'


export const isCourseLoading = selector({
    key: 'isCourseLoaingState',
    get: ({get}) => {
      const state = get(courseState);
  
      return state.isLoading;
    },
  });

export const courseDetails= selector({
    key: 'courseDetails',
    get: ({get})=> {
        const state= get(courseState);
        return state.courses;
    }
});


export const courseTitle= selector({
    key: 'courseTitle',
    get: ({get})=> {
        const state =get(courseState);
        if(state.courses){
            return state.courses.title
        }else{
            return ""
        }
    }
});

export const coursePrice= selector({
    key: 'coursePrice',
    get: ({get})=> {
        const state = get(courseState);
        if(state.courses){
            return state.courses.price
        }else{
            return ""
        }
    }
});

export const courseImage= selector({
    key: 'courseImage',
    get: ({get})=> {
        const state = get(courseState);
        if(state.courses){
            return state.courses.imageLink;
        }else{
            return ""
        }
    }
});