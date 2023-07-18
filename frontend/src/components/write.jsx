import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { fetchcategories } from "../store/category";
function Write() {
  const navigate = useNavigate();
    const [categoriesSelected, setCategoeisSelected] = useState([]);
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.category.categories);
    const user = useSelector((state) => state.user.user);
    console.log('userrr', user);
    useEffect(() => {
        const getCategories = async () => {
          const res = await axios.get("/categories");
          console.log("categories", res);
          dispatch(fetchcategories(res.data));
        };
        if (categories.length === 0) {
            getCategories();
        }
      }, []);
      const handleSelectedCat = (event) => {
        const options =event.target.options;
        console.log('options', options);
        let values = [];
        for (let i =0; i < options.length; i++) {
            if (options[i].selected) {
                values.push(options[i].value);
            }
        }
        console.log(values);
        setCategoeisSelected(values);
      }
      const handleChangeFile  = (e) => {
        console.log('file', e.target.files);
        setFile(e.target.files[0]);
      }
      const handleSubmit = async (e) => {
        e.preventDefault();
        const newPost = {
            title,
            description,
            categories: categoriesSelected,
            username: user.username,
        }
        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name", filename);
            data.append("file", file);
            try {
                await axios.post("/upload", data);
                newPost.picture = filename;
            } catch (err) {
                console.log('err', err);
            }
        }
        try {
            const res = await axios.post("/posts", newPost);
            console.log('create post result', res);
            navigate('/');
        } catch (err) {
            console.log(err);
        }
      }
  return (
  
    <div class="card" style={{ width: '50rem',marginTop:'5rem',marginLeft:'33rem' }}>
    <div class="card-body">
    <Form className="container mt-5" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Categories</Form.Label>
        <Form.Select aria-label="Default select example" multiple={true} onChange={(e) => handleSelectedCat(e)}>
       
            {categories.map((cat) => (
                <option key={cat._id}>{cat.name}</option>
            ))}
         </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Image</Form.Label>
        {file && (
            <img src={URL.createObjectURL(file)} alt="" width="100"/>
        )}
        <Form.Control type="file" placeholder="Password" onChange={(e) => handleChangeFile(e)}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" placeholder="Enter Post Title" 
        onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Description</Form.Label>
        <Form.Control type="text" placeholder="Description" 
        onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>
      <Button
        variant="primary"
        type="submit"
      >
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
  
  );
}

export default Write;
