import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

function Post(props) {
    const { post } = props;
    const imagePath = "http://localhost:5000/images/";
  return (

  <div class="col">
    <div class="card">
    {post.picture && (
      <img src={imagePath + post.picture}  class="card-img-top" alt=""/>
      )}
      <div class="card-body">
        <h5 class="card-title">{post.title}</h5>
        <p class="card-text">
        {post.description}
        </p>

        <Button variant="primary">
     <Link to={`/post/${post._id}`}
     style= {{textDecoration: 'none', color: 'inherit'}}
     >
     More details
     </Link>
     </Button>
      </div>
    </div>
  </div>
  );
}

export default Post;