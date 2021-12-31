// import { useRef } from "react"
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./Form.css";
import { Table } from "./Table.jsx";

export const Form = () => {
  const [form, setForm] = useState({
    address: "",
    age: "",
    department: "",
    file: "",
    marital_status: "Married",
    name: "",
    salary: "",
  });

  const [item, setItem] = useState([]);
  const [page, setPage] = useState(1);

  const ref = useRef(null);
  // console.log("ref", ref?.current?.files[0]);

  const handleChange = (e) => {
    console.log(e.target.checked);
    let { name, value } = e.target;
    // console.log("Ref", ref.current.files[0]);

    if (e.target.name === "file") {
      //   console.log("file-n", e.target.files[0]);
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setForm({
            ...form,
            file: reader.result,
          });
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else if (e.target.type === "checkbox") {
      if (e.target.checked) {
        value = "Single";
      } else {
        value = "Married";
      }
      setForm({
        ...form,
        [name]: value,
      });
    } else {
      setForm({
        ...form,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    addUser();
    // img_upload();
  };
  const addUser = () => {
    console.log("user is added to db");
    const payload = form;
    fetch("http://localhost:3001/users", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "content-type": "application/json",
      },
    }).then(() => {
      getUsers();
    });
  };

  useEffect(() => {
    getUsers();
  }, [page]);
  const getUsers = () => {
    axios
      .get(`http://localhost:3001/users?_page=${page}&_limit=3`)
      .then(({ data }) => {
        console.log("response", data);
        setItem(data);
      });
  };

  //   console.log("form", form);
  return (
    <>
      <h1>Users Detail Form</h1>
      <div className="main">
        <form onSubmit={handleSubmit}>
          <input
            onChange={handleChange}
            type="text"
            name="name"
            placeholder="name"
          />
          <br />
          <input
            onChange={handleChange}
            type="number"
            name="age"
            placeholder="age"
          />
          <br />
          <input
            onChange={handleChange}
            type="text"
            name="address"
            placeholder="address"
          />
          <br />

          <select onChange={handleChange} name="department">
            <option value="">--Please choose departmnet--</option>
            <option value="D-1">D-1</option>
            <option value="D-2">D-2</option>
            <option value="B-1">B-1</option>
            <option value="B-2">B-2</option>
          </select>
          <br />
          <input
            onChange={handleChange}
            type="number"
            name="salary"
            placeholder="salary"
          />
          <br />
          <div>
            {/* <br /> */}
            <div className="border">
              <label className="label">Single</label>
              <input
                onChange={handleChange}
                type="checkbox"
                name="marital_status"
                className="checkbox"
              />
            </div>
          </div>
          <br />
          <input onChange={handleChange} name="file" ref={ref} type="file" />
          <img
            className="img"
            src={
              form.file
                ? form.file
                : "https://static.thenounproject.com/png/396915-200.png"
            }
            alt="preview_img"
          />
          <br />
          <input type="submit" value="Submit" className="paginatin_btn" />
        </form>
        <div>
          <Table item={item} />
          <button
            className="paginatin_btn"
            onClick={() => {
              setPage(page - 1);
            }}
          >
            Previous
          </button>
          <button
            className="paginatin_btn"
            onClick={() => {
              setPage(page + 1);
            }}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

/*
<button
  onClick={() => {
    img_upload();
  }}
>
  Upload image
</button>
*/

/* 
    curl --location --request POST 'https://api.imgur.com/3/image' \
  --header 'Authorization: Client-ID {{clientId}}' \
  --form 'image="R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"'
  
  */

/* const img_upload = () => {
      const apiKey = "6efbc912b306632";
      const new_key = "e4e7da1d036e2a4";
      console.log("img upload");
      var formdata = new FormData();
      formdata.append("image", ref.current.files[0]);
      axios({
        method: "post",
        url: "https://api.imgur.com/3/upload",
        data: formdata,
        headers: {
          Authorization: `Client-ID {${new_key}}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("data", data);
          return;
        });
    };
  
    ----- due to status code 429 i drop to upload it on imgur api------
    */

/*
    address: ""
  age: ""
  department: ""
  file: """
  marital_status: ""
  name: ""
  salary: ""
    */
