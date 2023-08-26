import axios from "axios";
import React, { useEffect, useState } from "react";

import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { PORT_LINK } from "../../Config";

export const Courses = () => {
  const [courses, getCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const data = async () => {
      const response = await axios.get(`${PORT_LINK}/admin/courses`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      // console.log(response.data.courses);
      getCourses(response.data.courses);
    };
    data();
  }, [courses]);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "20px",
        backgroundColor: "#eee",
      }}
    >
      {courses.map((course) => (
        <div key={course.title}>
          <Course course={course} />
        </div>
      ))}
    </div>
  );
};

const Course = ({ course }) => {
  const navigate = useNavigate();
  // console.log("wwweeee");
  //        return (<div >
  //         <Card varint={"outlined"} style={{ padding: 20, height:"50vh", width:"20vw"}}>
  //           <center>
  //             <h1>{course.title}</h1>
  //             <h3>{course.description}</h3>
  //             <img src={course.imageLink} alt={course.title} style={{height:"140px"}} />
  //             <h3>{course.price}</h3>
  //             <Button variant="contained"
  //             onClick={()=> {

  //              navigate(`/updateCourse/${course._id}`)
  //             }}>Edit</Button>
  //             </center>
  //             </Card>
  //         </div>
  //        )
  // }

  return (
    <div style={{ marginTop: 20, backgroundColor: "#eeeeee" }}>
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="200"
            image={course.imageLink}
            alt={course.title}
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              fontWeight="bold"
            >
              {course.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <h3>{course.description}</h3>
            </Typography>
            <Typography
              gutterBottom
              variant="h8"
              fontWeight="bold"
              component="div"
            >
              ${course.price}
            </Typography>
            <div style={{display:"flex", justifyContent:"center", gap:6}}>
            <Button
            style={{backgroundColor:"#1B4D3E"}}
              variant="contained"
              onClick={() => {
                navigate(`/updateCourse/${course._id}`);
              }}
            >
              Update
            </Button>

            <Button
              variant="contained"
              style={{backgroundColor:"#AA0000"}}
              onClick={async () => {
                const confirmDelete = window.confirm(
                  "Are you sure you want to delete this item?"
                );
                if (confirmDelete) {
                  try {
                    await axios.delete(
                      `${PORT_LINK}/admin/course/${course._id}`,

                      {
                        headers: {
                          Authorization: `Bearer ${localStorage.getItem(
                            "token"
                          )}`,
                        },
                      }
                    );
                   
                  } catch (error) {
                    console.error("Error deleting item:", error);
                  }
                }
                navigate("/courses");
              }}
            >
              Delete
            </Button>
            </div>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
};
