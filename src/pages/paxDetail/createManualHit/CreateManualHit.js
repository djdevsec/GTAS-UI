import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Modal, Button } from "react-bootstrap";
import { manualHit, hitcats } from "../../../services/serviceWrapper";
import Form from "../../../components/form/Form";
import Xl8 from "../../../components/xl8/Xl8";
import LabelledInput from "../../../components/labelledInput/LabelledInput";
import { asArray } from "../../../utils/utils";

const CreateManualHit = props => {
  const cb = () => {};
  const [show, setShow] = useState(false);
  const [wlCategories, setWlCategories] = useState([]);
  const paxId = props.paxId;
  const flightId = props.flightId;

  const handleClose = (status, res) => {
    setShow(false);
    props.callback(Date.now());
  };
  const handleShow = () => setShow(true);

  useEffect(() => {
    hitcats.get().then(res => {
      const wlc = asArray(res).map(wl => {
        return {
          label: wl.label,
          value: wl.id,
          key: wl.id
        };
      });
      setWlCategories(wlc);
    });
  }, []);

  return (
    <>
      <Button variant="outline-danger" size="sm" onClick={handleShow}>
        <Xl8 xid="cmh001">Create Manual Hit</Xl8>
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <Xl8 xid="cmh001">Create Manual Hit</Xl8>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            title=""
            submitService={manualHit.post}
            callback={handleClose}
            action="add"
            id="createManualHit"
            cancellable
          >
            <LabelledInput
              datafield
              labelText={<Xl8 xid="cmh002">Passenger ID:</Xl8>}
              inputType="text"
              name="paxId"
              inputVal={paxId || ""}
              alt="nothing"
              readOnly={true}
              spacebetween
              callback={cb}
            />
            <LabelledInput
              datafield
              labelText={<Xl8 xid="cmh003">Flight ID:</Xl8>}
              inputType="text"
              name="flightId"
              inputVal={flightId || ""}
              alt={<Xl8 xid="2">Flight ID:</Xl8>}
              callback={cb}
              readOnly={true}
              spacebetween
            />
            <LabelledInput
              inputType="select"
              labelText={<Xl8 xid="cmh004">Hit Category:</Xl8>}
              name="hitCategoryId"
              alt={<Xl8 xid="2">Hit Category:</Xl8>}
              datafield
              required
              callback={cb}
              options={wlCategories}
              spacebetween
            />
            <LabelledInput
              datafield
              labelText={<Xl8 xid="cmh005">Description:</Xl8>}
              inputType="text"
              name="description"
              required=""
              inputVal=""
              alt={<Xl8 xid="2">Description:</Xl8>}
              callback={cb}
              spacebetween
            />
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};
CreateManualHit.propTypes = {
  paxId: PropTypes.string,
  flightId: PropTypes.string,
  callback: PropTypes.func
};

export default CreateManualHit;
