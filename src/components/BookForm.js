import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import swal from 'sweetalert';
import { v4 as uuidv4 } from 'uuid';

const BookForm = (props) => {
  const [book, setBook] = useState(() => {
    return {
      bookname: props.book ? props.book.bookname : '',
      author: props.book ? props.book.author : '',
      quantity: props.book ? props.book.quantity : '',
      price: props.book ? props.book.price : '',
      date: props.book ? props.book.date : ''
    };
  });

  const { bookname, author, price, quantity } = book;

  const handleOnSubmit = (event) => {
    event.preventDefault();
    const values = [bookname, author];

    const allFieldsFilled = values.every((field) => {
      const value = `${field}`.trim();
      return value.length > '6';
    });

    if (allFieldsFilled) {
      const book = {
        id: uuidv4(),
        bookname,
        author,
        price,
        quantity,
        date: new Date().toLocaleString()
      };
      props.handleOnSubmit(book);
    } else {
      swal({
        title: "Input Error!",
        text: " Book & Author Name should be of minimum 6 characters",
        icon: "warning",
        buttons: 'OK',
        dangerMode: true,
      })
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setBook({
      ...book, [name]: value
    })
  };

  return (
    <div className="main-form">
      <Form onSubmit={handleOnSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Book Name</Form.Label>
          <Form.Control
            className="input-control"
            required={true}
            type="text"
            name="bookname"
            value={bookname}
            placeholder="Enter name of book"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="author">
          <Form.Label>Book Author</Form.Label>
          <Form.Control
            className="input-control"
            required={true}
            type="text"
            name="author"
            value={author}
            placeholder="Enter name of author"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="quantity">
          <Form.Label>Quantity</Form.Label>
          <Form.Control
            className="input-control"
            required={true}
            type="number"
            name="quantity"
            min={1}
            max={1000}
            value={quantity}
            placeholder="Enter available quantity"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="price">
          <Form.Label>Book Price</Form.Label>
          <Form.Control
            className="input-control"
            required={true}
            type="number"
            name="price"
            min={0}
            value={price}
            placeholder="Enter price of book"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="submit-btn">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default BookForm;
