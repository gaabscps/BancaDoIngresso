import React /* , { useEffect } */ from 'react';
import { Container /* , Button */ } from 'reactstrap';

// import { useHistory } from "react-router-dom";

// import Lottie from "react-lottie";

// import animationData from "../../../../../assets/lottie-files/75879-success.json";

const Success = (): JSX.Element => (
  /*
  const history = useHistory();
  const defaultOptions = {
    loop: false,
    autoplay: true,
    // animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  */

  // useEffect(() => {
  //   setTimeout(() => {
  //     window.location.href = "/";
  //   }, 5000);
  // }, []);

  <>
    {/* <Lottie options={defaultOptions} /> */}

    <Container className="mt-3 text-center">
      <h3>Senha recuperada com sucesso!</h3>
      <span>
        Enviaremos você para os eu dashboard em alguns instantes, use seu
        <b> email</b> e sua <b>nova senha</b> para efetuar login.
      </span>
      <h6 className="mt-4">Um segundo, estamos configurando seu painel administrativo!</h6>
      {/* <Button
          onClick={() => history.push("/")}
          color="primary"
          outline
          className="btn-block"
        >
          Login
        </Button> */}
    </Container>
  </>
);
export default Success;
