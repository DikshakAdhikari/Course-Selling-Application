import React, { useEffect, useState } from "react";
import { Card, TextField, Typography, Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { PORT_LINK } from "../Config";
import axios from "axios";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { courseState } from "../store/atoms/course";
import { courseDetails, isCourseLoading } from "../store/selectors/Course";
import { Loading } from "./Loading";
export const UpdateCourse = () => {
  const params = useParams();
  const detail= useRecoilValue(courseDetails);
  const { courseId } = params;
  const courseLoading = useRecoilValue(isCourseLoading);
  //console.log(courseId);
  const setRecoilCourse = useSetRecoilState(courseState);

  useEffect(() => {
    const fun = async () => {
      //console.log("darrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr");
      try {
        const response = await axios.get(`${PORT_LINK}/admin/${courseId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        console.log(response.data.course);
        setRecoilCourse({
          isLoading: false,
          courses: response.data.course,
        });
      } catch (err) {
        console.log("Error here");
        console.log(err);
      }
    };
    fun();
  },[]);

  if(courseLoading){
    return <Loading />
  }
  console.log(detail);
 
  return (
    <div>
      {/* <GreyLabel /> */}

      <UpdateCard />
      {/* <SideCard /> */}
    </div>
  );
};

const UpdateCard = () => {
  const [currentCourse, setCourse] = useRecoilState(courseState); // not using any selector instead using the original courseState to set updated course value

  const [title, setTitle] = useState();
  const [description, setDesc] = useState();
  const [price, setPrice] = useState();
  const [imageLink, setImage] = useState();

  const navigate= useNavigate();

  useEffect(() => {
    setTitle(currentCourse.courses.title);
  }, [currentCourse.courses.title]);

  useEffect(() => {
    setDesc(currentCourse.courses.description);
  }, [currentCourse.courses.description]);

  useEffect(() => {
    setImage(currentCourse.courses.imageLink);
  }, [currentCourse.courses.imageLink]);

  useEffect(() => {
    setPrice(currentCourse.courses.price);
  }, [currentCourse.courses.price]);

  //console.log(description);

 
  return (
    <div>
      <div
        style={{
          paddingTop: 150,
          marginBottom: 10,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography variant={"h6"}>Coursera</Typography>
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card varint={"outlined"} style={{ width: 400, padding: 20 }}>
          <TextField
          value={title}
            id="outlined-basic"
            fullWidth={true}
            label="title"
            variant="outlined"
            onChange={(e) => setTitle(e.target.value)}
          />
          <br />
          <br />
          <TextField
          value={description}
            id="outlined-basic"
            fullWidth={true}
            label="description"
            variant="outlined"
            type="text"
            onChange={(e) => setDesc(e.target.value)}
          />
          <br />
          <br />
          <TextField
          value={price}
            id="outlined-basic"
            fullWidth={true}
            label="price"
            variant="outlined"
            type="text"
            onChange={(e) => setPrice(e.target.value)}
          />
          <br />
          <br />
          <TextField
          value={imageLink}
            id="outlined-basic"
            fullWidth={true}
            label="imageUrl"
            variant="outlined"
            type="text"
            onChange={(e) => setImage(e.target.value)}
          />
          <br />
          <br />

          <Button
            variant="contained"
            size={"large"}
            onClick={async () => {
              try{
                await axios.put(
                  `${PORT_LINK}/admin/courses/${currentCourse.courses._id}`,
                  {
                    title: title,
                    description: description,
                    imageLink: imageLink,
                    price: price,
                    published: true,
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                  }
                );
                const updatedCourse= {
                  courseId: currentCourse.courses._id,
                  title: title,
                  description: description,
                  imageLink: imageLink,
                  price: price,
                  published: true,
                }
                setCourse({
                  isLoading:false,
                  courses:updatedCourse
                });

                navigate('/courses')
              } catch(err){
                console.log("error in UpdateCourses");
                console.log(err);
              }        
            }
          }

          >
            Update Course
          </Button>





          <Button
            variant="contained"
            size={"large"}
            onClick={async () => {
              try{
                await axios.delete(
                  `${PORT_LINK}/admin/course/${currentCourse.courses._id}`,
                  
                  {
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                  }
                );
               alert('Course deleted successfully!')

                navigate('/courses')
              } catch(err){
                console.log("error in UpdateCourses");
                console.log(err);
              }        
            }
          }

          >
            Delete Course
          </Button>
        </Card>
      </div>
    </div>
  );
};
