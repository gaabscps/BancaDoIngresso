/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useState } from 'react';
import { Container } from 'reactstrap';

// COMPONENTS
import Button from '../components/Utils/Button';
import { ModalCustom, ModalConfirmation } from '../components/Utils/Modal';

const ExampleTables = (): JSX.Element => {
  // modal
  const [showModalCustom, setShowModalCustom] = useState(false);
  const [showConfirmation, setShowModalConfirmation] = useState(false);

  const handleOpenModalCustom = (): void => setShowModalCustom(true);
  const handleCloseModalCustom = (): void => setShowModalCustom(false);

  const handleOpenModalConfirmation = (): void => setShowModalConfirmation(true);
  const handleCloseModalConfirmation = (): void => setShowModalConfirmation(false);

  const handleActionModal = (): void => {
    alert('Ação efetuada com sucesso!'); // eslint-disable-line no-alert
    handleCloseModalConfirmation();
    handleCloseModalCustom();
  };

  return (
    <Container>
      <div className="pt-5 pb-5">
        <h3>Modal</h3>
        <br />

        {/* Modal component */}
        <ModalCustom
          title="Modal Custom"
          show={showModalCustom}
          setShow={setShowModalCustom}
          onBtnAction={handleActionModal} // Caso não seja passado, o botão de ação não será renderizado
          btnLabel="Ação"
          isCard
          // Para deixar o modal com o estilo de card
        >
          {/* Conteúdo da modal */}
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
        </ModalCustom>

        {/* Modal component confirmation */}
        {/* OBS:Modal não tem children */}
        <ModalConfirmation
          show={showConfirmation}
          setShow={setShowModalConfirmation}
          onBtnAction={handleActionModal}
        />

        {/* Button to open modal */}
        <Button theme="dark" onClick={handleOpenModalCustom}>
          Open Modal Custom
        </Button>
        <br />
        <br />
        {/* Button to open modal confirmation */}
        <Button theme="dark" onClick={handleOpenModalConfirmation}>
          Open Modal Confitmation
        </Button>
      </div>
    </Container>
  );
};

export default ExampleTables;
