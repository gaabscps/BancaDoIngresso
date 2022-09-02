/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useState } from 'react';
import { Container } from 'reactstrap';

// ICON
import { ReactComponent as SvgExample } from '../assets/images/svg/SvgExample.svg';
import ModalCustom from '../components/Utils/Modal';

const ExampleTables = (): JSX.Element => {
  // modal
  const [showModal, setShowModal] = useState(false);

  return (
    <Container>
      <div className="pt-5 pb-5">
        <h3>Modal</h3>
        <br />
        <ModalCustom title="Modal" show={showModal} setShow={setShowModal}>
          <div className="pt-5 pb-5">
            <h3>Modal</h3>
            <br />
            Lorem
          </div>
        </ModalCustom>
        <SvgExample className="mr-2 svg-icon" onClick={() => setShowModal(true)} />
      </div>
    </Container>
  );
};

export default ExampleTables;
