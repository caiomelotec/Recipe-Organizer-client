import { useState } from "react";
import { AuthForm } from "../componentes/AuthForm";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [password, setPassword] = useState({
    confirmPassword: "",
  });
  const [inputs, setInputs] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const notify = () => toast(success);

  const notifyError = () => toast(error);

  console.log(password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (
        inputs.firstname.length != 0 &&
        inputs.lastname.length != 0 &&
        inputs.email.length != 0 &&
        inputs.password.length >= 8 &&
        inputs.password === password.confirmPassword
      ) {
        const res = await axios.post(
          "https://koch-8dbe7c0d957c.herokuapp.com/api/register",
          inputs,
          {
            withCredentials: true,
          }
        );
        navigate("/login");
        setSuccess(res.data);
      } else if (inputs.password.length < 8) {
        setError("Das Passwort muss mindestens 8 Zeichen lang sein.");
        notifyError();
      } else if (
        inputs.firstname.length === 0 ||
        inputs.lastname.length === 0 ||
        inputs.email.length === 0
      ) {
        setError("Bitte füllen Sie die Felder vollständig aus.");
        notifyError();
      } else if (inputs.password !== password.confirmPassword) {
        setError("Die Passwörter stimmen nicht überein");
        notifyError();
      }
      notify();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AuthForm
      title="Neues Konto erstellen"
      emailPlaceholder="Email"
      passwordPlaceholder="Passwort"
      buttonText="Konto erstellen"
      linkText="Du hast bereits ein Koch-Konto?"
      linkTo="/login"
      handleInputChange={handleInputChange}
      handleSubmit={handleSubmit}
      error={error}
      success={success}
      setPassword={setPassword}
    />
  );
};
