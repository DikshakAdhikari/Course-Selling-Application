import axios from "axios";
import React, { useEffect, useState } from "react";
import { PORT_LINK } from "../../Config";
import { Button, Card, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const UserCourses = () => {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    const fun = async () => {
      try {
        const cou = await axios.get(`${PORT_LINK}/users/courses`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("tokenUser")}`,
          },
        });
        // console.log(cou.data.userCourses);
        setCourses(cou.data.userCourses);
      } catch (err) {
        console.log(err);
      }
    };

    fun();
  }, []);

  return (
    <div>
      <Typography
        variant={"h4"}
        style={{ display: "flex", justifyContent: "center", margin: 30 }}
      >
        Courses to Purchase
      </Typography>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 15,
        }}
      >
        {courses.map((course) => (
          <div key={course._id}>
            <Course course={course} />
          </div>
        ))}
      </div>
    </div>
  );
};

const Course = ({ course }) => {
  const navigate = useNavigate();
  // console.log("wwweeee");
  return (
    <div>
      <Card
        varint={"outlined"}
        style={{ padding: 20, height: "50vh", width: "20vw" }}
      >
        <center>
          <h1>{course.title}</h1>
          <h3>{course.description}</h3>
          <img
            src={course.imageLink}
            alt={course.title}
            style={{ height: "140px" }}
          />
          <h3>{course.price}</h3>
          <Button
            variant="contained"
            onClick={async () => {
              try {
                //console.log(course._id);
                const response = await fetch(
                  `${PORT_LINK}/users/courses/${course._id}`,
                  {
                    method: "POST", // You can use 'POST', 'PUT', 'DELETE', etc. as needed
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem('tokenUser')}`,
                    },
                  }
                );
               // console.log(response);
                navigate(`/user/purchasedCourses/${course._id}`);
              } catch (err) {
                console.log(err);
              }
            }}
          >
            Buy Now
          </Button>
        </center>
      </Card>
    </div>
  );
};
