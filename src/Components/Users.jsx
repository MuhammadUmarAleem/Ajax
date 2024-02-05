import React, { useState, useEffect } from "react";
import {
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBBadge,
  MDBBtn,
  MDBSpinner,
  MDBInput,
  MDBSwitch,
} from "mdb-react-ui-kit";
import axios from "axios";
import Cookies from "js-cookie";

const Users = () => {
  const [data, setData] = useState([]);
  const [basicModal, setBasicModal] = useState(false);
  const [deleteModal, setdeleteModal] = useState(false);
  const [addModal, setaddModal] = useState(false);
  const [submitting, setsubmitting] = useState(false);
  const [username, setusername] = useState("");
  const [name, setname] = useState("");
  const [surname, setsurname] = useState("");
  const [email, setemail] = useState("");
  const [address, setaddress] = useState("");
  const [refnumber, setrefnumber] = useState("");
  const [id, setid] = useState(0);

  useEffect(() => {
    GetUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setsubmitting(true);

    const form = e.target;
    const formData = new FormData(form);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_URI}/register`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            "api-key": process.env.REACT_APP_API_KEY,
          },
        }
      );

      const responseData = response.data;
      setsubmitting(false);

      if (responseData.message === "already") {
        alert("EMAIL OR USERNAME ALREADY EXISTS");
      } else {
        form.reset();
        alert("Register Successfully");
        setaddModal(false);
        GetUsers();
      }
    } catch (error) {
      console.error("Error:", error.message);
      setsubmitting(false);
      setaddModal(false);
    }
  };

  async function handleDelete() {
    setsubmitting(true);
    await fetch(`${process.env.REACT_APP_URI}/DeleteUser?id=${id}`, {
      method: "DELETE",
      headers: {
        "api-key": process.env.REACT_APP_API_KEY,
      },
    })
      .then((response) => {
        if (!response.ok) {
          setsubmitting(false);
          throw new Error("Request failed.");
        }
        return response.json();
      })
      .then((data) => {
        if (data.message == "deleted") {
          setsubmitting(false);
          setdeleteModal(false);
          GetUsers();
        }
      })
      .catch((error) => {
        setsubmitting(false);
        console.error("Error:", error);
      });
  }

  const handleUpdate = async (e) => {
    e.preventDefault();
    setsubmitting(true);

    const form = e.target;
    const formData = new FormData(form);

    const data = {
      username: username,
      name: name,
      surname: surname,
      email: email,
      address: address,
      refnumber: refnumber,
    };

    console.log(data, formData);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_URI}/updateUser?id=${id}&username=${username}&name=${name}&surname=${surname}&email=${email}&address=${address}&refnumber=${refnumber}`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "api-key": process.env.REACT_APP_API_KEY,
          },
        }
      );

      console.log("Response:", response.data);
      form.reset();
      GetUsers();
      setsubmitting(false);
      alert("User Update Successfully");
      setBasicModal(false);
    } catch (error) {
      console.error("Error:", error.message);
      setsubmitting(false);
    }
  };

  async function GetUsers() {
    console.log("run");
    try {
      const response = await fetch(`${process.env.REACT_APP_URI}/GetUsers`, {
        method: "GET",
        headers: {
          "api-key": process.env.REACT_APP_API_KEY,
        },
      });

      if (!response.ok) {
        throw new Error("Request failed.");
      }

      const data = await response.json();
      setData(data.data);
    } catch (error) {
      console.error("Error:", error);
    }
  }
  const logout = () => {
    Cookies.remove("email");
    Cookies.remove("login");
    window.location.href = "/";
  };
  if (Cookies.get("login")) {
    return (
      <div>
        <div>
          <div>
            <div class="row">
              <div class="col-lg-12 grid-margin stretch-card">
                <div class="card">
                  <div class="card-body">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <h4 className="card-title">Users</h4>
                      <MDBBtn
                        className="mb-4 px-5"
                        color="dark"
                        size="lg"
                        style={{
                          backgroundColor: "#fbbc04",
                          color: "white",
                          borderRadius: "30px",
                          border: "none",
                          marginTop: "10px",
                        }}
                        onClick={() => {
                          setaddModal(true);
                        }}
                      >
                        Add User
                      </MDBBtn>
                    </div>
                    <div class="table-responsive">
                      <table className="table table-striped">
                        <thead>
                          <tr>
                            <th
                              style={{
                                backgroundColor: "black",
                                color: "white",
                              }}
                            >
                              {" "}
                              Id{" "}
                            </th>
                            <th
                              style={{
                                backgroundColor: "black",
                                color: "white",
                              }}
                            >
                              {" "}
                              UserName{" "}
                            </th>
                            <th
                              style={{
                                backgroundColor: "black",
                                color: "white",
                              }}
                            >
                              {" "}
                              Name{" "}
                            </th>
                            <th
                              style={{
                                backgroundColor: "black",
                                color: "white",
                              }}
                            >
                              {" "}
                              SurName{" "}
                            </th>
                            <th
                              style={{
                                backgroundColor: "black",
                                color: "white",
                              }}
                            >
                              {" "}
                              Email{" "}
                            </th>
                            <th
                              style={{
                                backgroundColor: "black",
                                color: "white",
                              }}
                            >
                              {" "}
                              Thether Address{" "}
                            </th>
                            <th
                              style={{
                                backgroundColor: "black",
                                color: "white",
                              }}
                            >
                              {" "}
                              Reference Number{" "}
                            </th>
                            <th
                              style={{
                                backgroundColor: "black",
                                color: "white",
                              }}
                            >
                              {" "}
                              Active{" "}
                            </th>
                            <th
                              style={{
                                backgroundColor: "black",
                                color: "white",
                              }}
                            >
                              {" "}
                              Update{" "}
                            </th>
                            <th
                              style={{
                                backgroundColor: "black",
                                color: "white",
                              }}
                            >
                              {" "}
                              Delete{" "}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.map((row, index) => (
                            <tr>
                              <td
                                className="py-1"
                                key={index}
                                style={{
                                  backgroundColor:
                                    index % 2 === 0 ? "#191c24" : "black",
                                  color: "white",
                                }}
                              >
                                {row.id}
                              </td>
                              <td
                                key={index}
                                style={{
                                  backgroundColor:
                                    index % 2 === 0 ? "#191c24" : "black",
                                  color: "white",
                                }}
                              >
                                {row.username}
                              </td>
                              <td
                                key={index}
                                style={{
                                  backgroundColor:
                                    index % 2 === 0 ? "#191c24" : "black",
                                  color: "white",
                                }}
                              >
                                {row.name}
                              </td>
                              <td
                                key={index}
                                style={{
                                  backgroundColor:
                                    index % 2 === 0 ? "#191c24" : "black",
                                  color: "white",
                                }}
                              >
                                {row.surname}
                              </td>
                              <td
                                key={index}
                                style={{
                                  backgroundColor:
                                    index % 2 === 0 ? "#191c24" : "black",
                                  color: "white",
                                }}
                              >
                                {row.email}
                              </td>
                              <td
                                key={index}
                                style={{
                                  backgroundColor:
                                    index % 2 === 0 ? "#191c24" : "black",
                                  color: "white",
                                }}
                              >
                                {row.address}
                              </td>
                              <td
                                key={index}
                                style={{
                                  backgroundColor:
                                    index % 2 === 0 ? "#191c24" : "black",
                                  color: "white",
                                }}
                              >
                                {row.refnumber}
                              </td>
                              <td
                                key={index}
                                style={{
                                  backgroundColor:
                                    index % 2 === 0 ? "#191c24" : "black",
                                  color: "white",
                                }}
                              >
                                {row.active}
                              </td>
                              <td
                                key={index}
                                style={{
                                  backgroundColor:
                                    index % 2 === 0 ? "#191c24" : "black",
                                  color: "white",
                                }}
                              >
                                <button
                                  style={{ color: "green" }}
                                  onClick={() => {
                                    setusername(row.username);
                                    setname(row.name);
                                    setsurname(row.surname);
                                    setemail(row.email);
                                    setaddress(row.address);
                                    setrefnumber(row.refnumber);
                                    setid(row.id);
                                    setBasicModal(true);
                                  }}
                                >
                                  <i class="mdi mdi-sync"></i>
                                </button>
                              </td>
                              <td
                                key={index}
                                style={{
                                  backgroundColor:
                                    index % 2 === 0 ? "#191c24" : "black",
                                  color: "white",
                                }}
                              >
                                <button
                                  style={{ color: "red" }}
                                  onClick={() => {
                                    setid(row.id);
                                    setdeleteModal(true);
                                  }}
                                >
                                  <i class="mdi mdi-delete"></i>
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <MDBModal show={basicModal} setShow={setBasicModal} tabIndex="-1">
          <MDBModalDialog>
            <MDBModalContent>
              <MDBModalHeader>
                <MDBModalTitle>Update User</MDBModalTitle>
                <MDBBtn
                  className="btn-close"
                  color="#fff"
                  style={{ color: "white" }}
                  onClick={() => {
                    setBasicModal(false);
                  }}
                ></MDBBtn>
              </MDBModalHeader>
              <form
                encType="multipart/form-data"
                id="inventoryform"
                className="course-search-form"
                onSubmit={handleUpdate}
              >
                <MDBModalBody>
                  <img
                    src="./assets/untitled-1-2-s8t.png"
                    width="100"
                    height="100"
                    className="brandlogo d-inline-block align-top"
                    alt="CryptoFiBank"
                    style={{ marginBottom: "30px" }}
                  />
                  <div className="d-flex align-items-center">
                    <div>
                      <MDBInput
                        wrapperClass="mb-4"
                        label={"Username"}
                        id={"formControlLg"}
                        size={"lg"}
                        required
                        name="username"
                        value={username}
                        onChange={(e) => {
                          setusername(e.target.value);
                        }}
                      />
                    </div>
                    <div style={{ marginLeft: "20px" }}>
                      <MDBInput
                        wrapperClass="mb-4"
                        label={"Name"}
                        id={"formControlLg"}
                        size={"lg"}
                        required
                        name="name"
                        value={name}
                        onChange={(e) => {
                          setname(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  {/* <div className="d-flex align-items-center"> */}

                  {/* </div> */}
                  <div className="d-flex align-items-center">
                    <div>
                      <MDBInput
                        wrapperClass="mb-4"
                        label={"Surname"}
                        id={"formControlLg"}
                        size={"lg"}
                        required
                        name="surname"
                        value={surname}
                        onChange={(e) => {
                          setsurname(e.target.value);
                        }}
                      />
                    </div>
                    <div style={{ marginLeft: "20px" }}>
                      <MDBInput
                        wrapperClass="mb-4"
                        label={"Refrence Number"}
                        id={"formControlLg"}
                        size={"lg"}
                        required
                        name="refnumber"
                        value={refnumber}
                        onChange={(e) => {
                          setrefnumber(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  {/* <div className="d-flex align-items-center"> */}

                  <MDBInput
                    wrapperClass="mb-4"
                    label={"Email"}
                    id={"formControlLg"}
                    size={"lg"}
                    required
                    name="email"
                    value={email}
                    onChange={(e) => {
                      setemail(e.target.value);
                    }}
                  />
                  {/* </div><div className="d-flex align-items-center"> */}
                  <MDBInput
                    wrapperClass="mb-4"
                    label={"Tether Address"}
                    id={"formControlLg"}
                    size={"lg"}
                    required
                    name="address"
                    value={address}
                    onChange={(e) => {
                      setaddress(e.target.value);
                    }}
                  />
                  {/* </div><div className="d-flex align-items-center"> */}

                  {/* </div> */}
                </MDBModalBody>

                <MDBModalFooter>
                  <MDBBtn
                    className="mb-4 px-5"
                    color="dark"
                    size="lg"
                    style={{
                      backgroundColor: "#fbbc04",
                      color: "white",
                      borderRadius: "30px",
                      border: "none",
                      marginTop: "10px",
                    }}
                    // onClick={()=>{makeTransaction();}}
                  >
                    {submitting ? <MDBSpinner /> : <span>Submit</span>}
                  </MDBBtn>
                </MDBModalFooter>
              </form>
            </MDBModalContent>
          </MDBModalDialog>
        </MDBModal>

        <MDBModal show={deleteModal} setShow={setdeleteModal} tabIndex="-1">
          <MDBModalDialog>
            <MDBModalContent>
              <MDBModalHeader>
                <MDBModalTitle>Delete User</MDBModalTitle>
                <MDBBtn
                  className="btn-close"
                  color="#fff"
                  style={{ color: "white" }}
                  onClick={() => {
                    setdeleteModal(false);
                  }}
                ></MDBBtn>
              </MDBModalHeader>
              <MDBModalBody>
                <img
                  src="./assets/untitled-1-2-s8t.png"
                  width="100"
                  height="100"
                  className="brandlogo d-inline-block align-top"
                  alt="CryptoFiBank"
                  style={{ marginBottom: "30px" }}
                />
                <h1>Are you sure you want to delete?</h1>
              </MDBModalBody>

              <MDBModalFooter>
                <MDBBtn
                  className="mb-4 px-5"
                  color="dark"
                  size="lg"
                  style={{
                    backgroundColor: "#fbbc04",
                    color: "white",
                    borderRadius: "30px",
                    border: "none",
                    marginTop: "10px",
                  }}
                  onClick={() => {
                    setdeleteModal(false);
                  }}
                >
                  <span>No</span>
                </MDBBtn>
                <MDBBtn
                  className="mb-4 px-5"
                  color="dark"
                  size="lg"
                  style={{
                    backgroundColor: "Red",
                    color: "white",
                    borderRadius: "30px",
                    border: "none",
                    marginTop: "10px",
                  }}
                  onClick={() => {
                    handleDelete();
                  }}
                >
                  {submitting ? <MDBSpinner /> : <span>Yes</span>}
                </MDBBtn>
              </MDBModalFooter>
            </MDBModalContent>
          </MDBModalDialog>
        </MDBModal>

        <MDBModal show={addModal} setShow={setaddModal} tabIndex="-1">
          <MDBModalDialog>
            <MDBModalContent>
              <MDBModalHeader>
                <MDBModalTitle>Add User</MDBModalTitle>
                <MDBBtn
                  className="btn-close"
                  color="#fff"
                  style={{ color: "white" }}
                  onClick={() => {
                    setaddModal(false);
                  }}
                ></MDBBtn>
              </MDBModalHeader>
              <form
                encType="multipart/form-data"
                id="inventoryform"
                className="course-search-form"
                onSubmit={handleSubmit}
              >
                <MDBModalBody>
                  <img
                    src="./assets/untitled-1-2-s8t.png"
                    width="100"
                    height="100"
                    className="brandlogo d-inline-block align-top"
                    alt="CryptoFiBank"
                    style={{ marginBottom: "30px" }}
                  />
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div>
                      <MDBInput
                        wrapperClass="mb-4"
                        label={"Username"}
                        id={"formControlLg"}
                        size={"lg"}
                        required
                        name="username"
                        autoComplete="off"
                      />
                    </div>
                    <div style={{ marginLeft: "20px" }}>
                      <MDBInput
                        wrapperClass="mb-4"
                        label={"Your Name"}
                        id={"formControlLg"}
                        size={"lg"}
                        required
                        name="name"
                        autoComplete="off"
                      />
                    </div>
                  </div>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div>
                      <MDBInput
                        wrapperClass="mb-4"
                        label={"Your Surname"}
                        id={"formControlLg"}
                        size={"lg"}
                        required
                        name="surname"
                        autoComplete="off"
                      />
                    </div>
                    <div style={{ marginLeft: "20px" }}>
                      <MDBInput
                        wrapperClass="mb-4"
                        label={"Enter Reference Number"}
                        id={"formControlLg"}
                        size={"lg"}
                        required
                        name="refnumber"
                        autoComplete="off"
                      />
                    </div>
                  </div>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div>
                      <MDBInput
                        wrapperClass="mb-4"
                        // type="email"
                        label={"Email"}
                        id={"formControlLg"}
                        size={"lg"}
                        required
                        name="email"
                        autoComplete="off"
                      />
                    </div>
                    <div style={{ marginLeft: "20px" }}>
                      <MDBInput
                        wrapperClass="mb-4"
                        type="password"
                        label={"Password"}
                        id={"formControlLg"}
                        size={"lg"}
                        required
                        name="password"
                        autoComplete="off"
                      />
                    </div>
                  </div>

                  <MDBInput
                    wrapperClass="mb-4"
                    label={"Just Enter The Tether ERC-20 Address"}
                    id={"formControlLg"}
                    size={"lg"}
                    required
                    name="address"
                    autoComplete="off"
                  />
                </MDBModalBody>

                <MDBModalFooter>
                  <MDBBtn
                    className="mb-4 px-5"
                    color="dark"
                    size="lg"
                    style={{
                      backgroundColor: "#fbbc04",
                      color: "white",
                      borderRadius: "30px",
                      border: "none",
                      marginTop: "10px",
                    }}
                  >
                    {submitting ? <MDBSpinner /> : <span>Add</span>}
                  </MDBBtn>
                </MDBModalFooter>
              </form>
            </MDBModalContent>
          </MDBModalDialog>
        </MDBModal>
      </div>
    );
  }
};

export default Users;
