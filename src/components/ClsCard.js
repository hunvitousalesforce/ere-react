import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Modal, Form, Row, Col, Toast, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSchool,
  faPenToSquare,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { faPersonCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function ClsCard({ title, classId, teacherId }) {
  const navigate = useNavigate();
  function viewClassDetail(id, name) {
    navigate("/classroom/" + id);
  }

  useEffect(() => {
    setClassnameUpdate(title);
  }, []);

  const [classnameUpdate, setClassnameUpdate] = useState("");
  const [showUpdate, setShowUpdate] = useState(false);
  const handleCloseUpdate = () => setShowUpdate(false);
  const handleShowUpdate = () => setShowUpdate(true);

  const [showDelete, setShowDelete] = useState(false);
  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);

  async function deleteClassroom(id) {
    var result = null;
    try {
      result = await axios.delete(
        "http://localhost:5137/api/v1/classroom/" + id
      );
    } catch (e) {
      console.log(e);
    }
    if (result.data.success === true) {
      handleCloseDelete();
      window.location.reload();
    }
  }

  async function updateClassroom() {
    handleCloseUpdate();
    var result = null;
    const data = {
      id: classId,
      name: classnameUpdate,
      teacherId: teacherId,
      teacherName: "",
    };
    try {
      result = await axios.put("http://localhost:5137/api/v1/classroom", data);
    } catch (e) {
      console.log(e);
    }

    if (result.data.success === true) {
      window.location.reload();
    }
  }

  return (
    <div class="card text-dark bg-light mb-3 w-100">
      <Modal show={showDelete} onHide={handleCloseDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure you want to delete?</Modal.Title>
        </Modal.Header>
        {/* <Modal.Body>
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
            <Form.Label column sm="3">
              Classname
            </Form.Label>
            <Col sm="9">
              <Form.Control
                required
                type="text"
                placeholder="My Class"
                value={classnameUpdate}
                onChange={(e) => setClassnameUpdate(e.target.value)}
              />
            </Col>
          </Form.Group>
        </Modal.Body> */}
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDelete}>
            Dismiss
          </Button>
          <Button onClick={() => deleteClassroom(classId)} variant="danger">
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showUpdate} onHide={handleCloseUpdate}>
        <Modal.Header closeButton>
          <Modal.Title>Update Classroom</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
            <Form.Label column sm="3">
              Classname
            </Form.Label>
            <Col sm="9">
              <Form.Control
                required
                type="text"
                placeholder="My Class"
                value={classnameUpdate}
                onChange={(e) => setClassnameUpdate(e.target.value)}
              />
            </Col>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseUpdate}>
            Cancel
          </Button>
          <Button onClick={updateClassroom} variant="primary">
            Update
          </Button>
        </Modal.Footer>
      </Modal>
      <div class="card-header d-flex justify-content-between">
        <div>
          <FontAwesomeIcon className="text-primary" icon={faSchool} />
          <span className="ms-2 sp">{classId}</span>
        </div>
        <div>
          <FontAwesomeIcon
            onClick={handleShowUpdate}
            className="text-primary mx-3"
            icon={faPenToSquare}
          />
          <FontAwesomeIcon
            onClick={handleShowDelete}
            className="text-danger"
            icon={faTrashCan}
          />
        </div>
      </div>
      <div class="card-body">
        <a
          onClick={() => viewClassDetail(classId)}
          class="card-title sp-heading-no-bold"
        >
          {title}
        </a>
        <div>
          <FontAwesomeIcon
            className="text-primary mt-2"
            icon={faPersonCircleCheck}
          />
          <span class="card-text ms-2 sp">{teacherId}</span>
        </div>
      </div>
    </div>
  );
}

export default ClsCard;
