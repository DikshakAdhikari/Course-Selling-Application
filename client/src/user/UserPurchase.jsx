import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  CardMedia,
  Typography,
} from "@mui/material";

import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import imgg from "../pic/picCourse.png";

import { userState } from "../store/atom/user";
import { PORT_LINK } from "../../Config";

export const UserPurchase = () => {
  const params = useParams();
  const user = useRecoilValue(userState);
  const { courseId } = params;
  const [course, setCourse] = useState({});
  const [courseValues, setValues] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fun = async () => {
      const course = await axios.get(
        `${PORT_LINK}/users/` + courseId,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("tokenUser"),
          },
        }
      );
      // console.log(course.data.course);
      setCourse(course.data.course);
    };

    const purchasedIds = async () => {
      const courseIds = await axios.get(
        `${PORT_LINK}/users/ids/purchasedCourses`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("tokenUser"),
          },
        }
      );
      console.log(courseIds.data.purchasedCoursesIds);
      setValues(courseIds.data.purchasedCoursesIds);
    };
    purchasedIds();

    fun();
  }, []);

  const isCourseAdded = (courseId) => courseValues.includes(courseId);

  return (
    <div>
      <Grid container style={{ padding: "5vw", display:"flex", flexDirection:"row" }}>
    
          <div style={{ marginTop: 15, display:"flex", flexDirection:"column", gap:20,width:"50%" }}>
          <img src={course.imageLink} alt={course.title}  style={{ width:"20vw", height:"30vh", marginLeft:40}}/>
          <img src={imgg} alt="" style={{height:"30vh", width:"30vw", }} />
            
          </div>
          <div>
          <Typography
              color="#002D62"
              variant="h4"
              fontWeight="bold"
              style={{ marginLeft: 490, marginTop: 30, fontSize: 50 }}
            >
              {course.title}
            </Typography>
         
            <Button
              variant="contained"
              style={{ marginLeft: 490, marginTop: 30 }}
              onClick={async () => {
                try {
                  const responsee = await axios.post(
                    `${PORT_LINK}/users/courses/${course._id}`,
                    { params },
                    {
                      headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                          "tokenUser"
                        )}`,
                      },
                    }
                  );
                  console.log(responsee.data.purchasedCourses);
                  setValues(responsee.data.purchasedCourses);
                } catch (err) {
                  console.log(err);
                }
              }}
              disabled={isCourseAdded(courseId)}
            >
              {isCourseAdded(courseId) ? "Purchased" : "Purchase"}
            </Button>

          </div>
        
       
      </Grid>
    </div>
  );
};
