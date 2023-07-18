import React from 'react';
import { useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import ListGroup from "react-bootstrap/ListGroup";
import Post from "./Post";
import { fetchPosts } from "../store/posts";
import { fetchcategories } from "../store/category";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { MDBBtn, MDBIcon,MDBListGroupItem,MDBBadge } from 'mdb-react-ui-kit';

function Posts() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post.posts);
  const categories = useSelector((state) => state.category.categories);
  const location = useLocation();
  const user = useSelector((state) => state.user.user);
  console.log('location', location);
  const { search } = location; // const search = location.search;
  useEffect(() => {
    const getCategories = async () => {
      const res = await axios.get("/categories");
      console.log("categories", res);
      dispatch(fetchcategories(res.data));
    };
    const getPosts = async () => {
      const res = await axios.get("/posts" + search);
      console.log("posts", res);
      dispatch(fetchPosts(res.data));
    };
    getCategories();
    getPosts();
  }, [search]);
  console.log("stateposts", posts);
  return (
    <div>
<Navbar collapseOnSelect expand="lg" className="" style= {{backgroundColor: '#efdfe569',marginTop:'2%'}} >
<Container>
  <Navbar.Brand>
   
  </Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="me-auto">
      </Nav>
      <Nav>
{Object.keys(user).length > 0 && (
  <div>
<div className="ms-2">
    
</div>
<div className="ms-2" >
    
<Link to='/write' class="btn btn-danger btn-rounded" style= {{textDecoration: 'none', color: 'white'}}><i class="fas fa-plus"></i> Ajouter Post</Link> {'   '}
<Link to='/category' class="btn btn-warning btn-rounded" style= {{ color: 'white'}}><i class="fas fa-plus"></i> Ajouter Catégorie</Link>
</div>
</div>
)}
</Nav>
      </Navbar.Collapse>
      </Container>
      </Navbar>
<>
      <div className='me-1' style= {{marginBottom: '5%', color: 'inherit'}}>
   
      <h2>
     Chercher par Catégorie:
         


{categories.map((category) => (

<Button variant="primary"  key={category._id} style= {{marginLeft: '2%'}}>
  <Link to={`/?category=${category.name}`}  style= {{color: 'white'}}>
<MDBIcon className='me-2' fab icon='stack-overflow' />  {category.name}
</Link></Button>

))} </h2>
      </div>
    </>
   
<div class="row row-cols-1 row-cols-md-5 g-6">
  
      {posts.map((post) => (
     
        <Post key={post._id} post={post}  />
      
      ))}
      </div>
    </div>
  );
}

export default Posts;
