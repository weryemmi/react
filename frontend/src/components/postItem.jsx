import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { fetchcategories } from "../store/category";
function PostItem() {
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location);
  const path = location.pathname.split("/")[2];
  console.log(path);
  const [post, setPost] = useState({});
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categories);
  const user = useSelector((state) => state.user.user);
  console.log("userrr", user);
  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("/posts/" + path);
      console.log(res);
      setPost(res.data);
      setTitle(res.data.title);
      setDescription(res.data.description);
    };
    getPost();
  }, []);
  const handleUptadePost = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put("/posts/" + path, {
        title,
        description,
        username: user.username,
      });
      console.log("update post result", res);
    } catch (err) {
      console.log(err);
    }
  };
  const handleDeletePost = async () => {
    try {
      const res = await axios.delete("/posts/" + path, {
        data: {username: user.username}
      });
      console.log("delete post result", res);
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  }
  const imagePath = "http://localhost:5000/images/";
  return (
    <div>
      {/* {post.username === user.username && ( */}
   
      <Button variant="danger" type="submit" onClick={handleDeletePost} style= {{marginTop:'2%', marginLeft:'80%'}}>
      <i class="fa-solid fa-trash"></i>  Supprimer
 </Button>


    {/* )} */}
    <div class="card" style={{ width: '50rem',marginTop:'5rem',marginLeft:'33rem' }}>
 <div class="card-body">
      <Form className="container mt-5" onSubmit={handleUptadePost}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Categories</Form.Label>
        <div>
          {post.categories &&
            post.categories.map((cat) => <span key={cat._id} className="ms-3" style= {{color:'#7b7bed'}}><i class="fas fa-book-open"></i> {cat}</span>)}
        </div>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Image</Form.Label>
        {post.picture && (
          <img src={imagePath + post.picture} alt="" width="100" />
        )}
        {/* <Form.Control type="file" placeholder="Password" onChange={(e) => handleChangeFile(e)}/> */}
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Post Title"
          value={title}
          disabled={user.username !== post.username}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Description</Form.Label>
        <Form.Control
          type="text"
          placeholder="Description"
          value={description}
          disabled={user.username !== post.username}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
      {/* {error && (
        <Alert className="mt-2" key="danger" variant="danger">
          Please verify your username/password !
        </Alert>
      )} */}
      </Form>
    </div>
    </div>
    </div>
  );
}

export default PostItem;
