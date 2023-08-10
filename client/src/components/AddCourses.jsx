import { Button, Card, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PORT_LINK } from "../Config";

export const AddCourses = () => {
  const [title, setTitle] = useState("");
  const [description, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [imageLink, setImage] = useState("");
  const [published, setPublished] = useState("");
  const navigate = useNavigate();
  console.log(published);
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
            id="outlined-basic"
            fullWidth={true}
            label="title"
            variant="outlined"
            onChange={(e) => setTitle(e.target.value)}
          />
          <br />
          <br />
          <TextField
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
          <Button
            variant="contained"
            size={"large"}
            onClick={async () => {
              try {
                await axios.post(
                  `${PORT_LINK}/admin/courses`,
                  { title, description, price, imageLink, published },
                  {
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                  }
                );
                alert("Course Created Successfully!");
              } catch (err) {
                console.log(err);
              }
            }}
          >
            Add Course
          </Button>
          <Button
            variant="contained"
            size={"large"}
            onClick={() => navigate("/courses")}
          >
            All Courses
          </Button>
        </Card>
      </div>
    </div>
  );
};
