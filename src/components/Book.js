import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';

const Book = ({
  id,
  bookname,
  author,
  price,
  quantity,
  date,
  handleRemoveBook
}) => {
  const history = useHistory();

  const handleDeleteBook = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover.",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          handleRemoveBook(id)
          swal("Book Deleted!", {
            icon: "success",
          });
        }
      });
  }

  return (
    <Card style={{ width: '18rem' }} className="book">
      <Card.Body>
        <Card.Title className="book-title">{bookname}</Card.Title>
        <div className="book-details">
          <div>Author: {author}</div>
          <div>Quantity: {quantity} </div>
          <div>Price: {price} </div>
          <div>Date: {new Date(date).toDateString()}</div>
        </div>
        <Button variant="primary" onClick={() => history.push(`/edit/${id}`)}>
          Edit
        </Button>{' '}
        <Button variant="danger" onClick={() => handleDeleteBook(id)}>
          Delete
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Book;
