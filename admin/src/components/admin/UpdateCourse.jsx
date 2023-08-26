import React, { useEffect, useState } from "react";
import { Button, Card, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { PORT_LINK } from "../../Config";
import axios from "axios";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { courseState } from "../../store/atoms/course";
import { courseDetails, isCourseLoading } from "../../store/selectors/Course";
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
       // console.log(response.data.course);
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
 // console.log(detail);
 
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

  const [title, setTitle] = useState(currentCourse.courses.title);
  const [description, setDesc] = useState(currentCourse.courses.description);
  const [price, setPrice] = useState(currentCourse.courses.price);
  const [imageLink, setImage] = useState(currentCourse.courses.imageLink);
  const [published, setPublished] = useState(currentCourse.courses.published);
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
  
  useEffect(() => {
    setPublished(currentCourse.courses.published);
  }, [currentCourse.courses.published]);

  //console.log(description);

 
  return (
    <div>
      <div
        style={{
          paddingTop: 50,
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
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Publish</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="publish"
              value={published}
              onChange={(e)=> setPublished(e.target.value)}
            
            >
              <MenuItem value={true}>true</MenuItem>
              <MenuItem value={false}>false</MenuItem>
            </Select>
          </FormControl>
          <br />
          <br />

          <div style={{display:"flex", justifyContent:"center", gap:6}}>
          <Button
            variant="contained"
            style={{backgroundColor:"#1B4D3E"}}
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
                    published: published,
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
                  published: published,
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
            Update
          </Button>





          <Button
            variant="contained"
            style={{backgroundColor:"#AA0000"}}
            size={"large"}
            onClick={async () => {
              const confirmDelete = window.confirm('Are you sure you want to delete this item?');
              if (confirmDelete) {
                try {
                  await axios.delete(
                    `${PORT_LINK}/admin/course/${currentCourse.courses._id}`,
                    
                    {
                      headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                      },
                    }
                  );
                  navigate('/courses')
                } catch (error) {
                  console.error('Error deleting item:', error);
                }
              }
      
            }
          }

          >
            Delete
          </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};
