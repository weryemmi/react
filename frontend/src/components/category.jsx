import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { fetchcategories } from "../store/category";
function Category() {
  const navigate = useNavigate();
          const [name, setTitle] = useState('');
    
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
                                                                     
      
      
      const handleSubmit = async (e) => {
        e.preventDefault();
        const newCategory = {
            name,
        }
        try {
            const res = await axios.post("/categories", newCategory);
            console.log('create newCategory result', res);
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
        <Form.Label>Name categorie</Form.Label>
        <Form.Control type="text" placeholder="Enter Category Title" 
        onChange={(e) => setTitle(e.target.value)}
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

export default Category;
