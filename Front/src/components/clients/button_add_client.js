import Button from 'react-bootstrap/Button';

function AddClientButton({handleAddClientButton}) {
  return (
    <>
      <Button variant="outline-primary" onClick={() => handleAddClientButton()} >Add New Client</Button>
    </>
  );
}

export default AddClientButton;