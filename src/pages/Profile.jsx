import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../styles/Profile.css";
import { DeleteAccountModal } from "../componentes/DeleteAccountModal";

export const Profile = () => {
  const { userId } = useParams();
  const [err, setErr] = useState(null);
  const [user, setUser] = useState(null);
  const [file, setFile] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [deletemodal, setDeleteModal] = useState(false);

  // Function to update the user's profile image
  const handleUploadImg = async (e) => {
    e.preventDefault();
    const imgUrl = await upload();
    try {
      await axios.put(
        "https://koch-8dbe7c0d957c.herokuapp.com/updateuserprofileimg",
        {
          img: file ? imgUrl : "",
        },
        { withCredentials: true }
      );
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  // upload User IMG
  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post(
        "https://koch-8dbe7c0d957c.herokuapp.com/uploaduserprofileimg",
        formData
      );
      console.log(res.data);
      return res.data;
    } catch (err) {
      console.log(err);
      w;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await axios.get(
          `https://koch-8dbe7c0d957c.herokuapp.com/api/usersbyid/${userId}`,
          { withCredentials: true }
        );
        setUser(userResponse.data);

        const recipesResponse = await axios.get(
          `https://koch-8dbe7c0d957c.herokuapp.com/recipesbyuserid/${userId}`,
          { withCredentials: true }
        );
        setRecipes(recipesResponse.data);
      } catch (err) {
        setErr(err.response.data);
        console.log(err.response.data);
      }
    };

    if (userId) {
      fetchData();
    }
  }, [userId]);

  // Handle errors
  if (!user && err) {
    return <h1>{err}</h1>;
  } else if (!user) {
    return <h1>Loading...</h1>;
  }

  const userdata = user ? user : null;
  const recipesdata = recipes ? recipes : null;

  return (
    <div className="profile-page-wrapper">
      <div className="profile-page-container">
        <section className="profile-first-section">
          <img src={userdata.img} alt="" className="user-profile-img" />
          <h1>{userdata.firstname + " " + userdata.lastname}</h1>
          <input
            style={{ display: "none" }}
            type="file"
            id="file"
            name="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <div className="upload-file-div">
            <label className="file" htmlFor="file" id="file">
              Bild auswählen
            </label>
            <button onClick={handleUploadImg} id="file">
              Bild hochladen
            </button>
          </div>
          <p className="profile-id">{userdata.id}</p>
        </section>
        <section className="profile-second-section">
          <p>Email: {userdata.email}</p>{" "}
          <div
            className="delete-account-btn"
            onClick={() => setDeleteModal(!deletemodal)}
          >
            Konto löschen
          </div>
        </section>
        <section className="profile-third-section">
          <h3>Meine Rezepte:</h3>
          {/* <h1>{recipes.recipe_name}</h1> */}
          {recipesdata.map((item) => (
            <div key={item.recipe_id} className="recipe-per-userId-div">
              <img src={item.imgUrl} alt="" />
              <div>
                <Link
                  to={`https://koch-by-caio-melo.netlify.app/recipes/${item.recipe_id}`}
                  style={{ color: "inherit" }}
                >
                  <h3>{item.recipe_name}</h3>
                </Link>
                <p>{item.date}</p>
              </div>
            </div>
          ))}
        </section>
      </div>
      <DeleteAccountModal
        deletemodal={deletemodal}
        setDeleteModal={setDeleteModal}
      />
    </div>
  );
};
