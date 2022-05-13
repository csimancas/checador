import React, { useState } from "react";
import { LoginForm } from "../../components/LoginForm/LoginForm";
import { RegisterForm } from "../../components/RegisterForm/registerForm";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { db } from "../../firebase/firebaseConfig";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/userSlice";

const Login = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("@colegioherbart.edu.mx");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [register, setRegister] = useState(false);
  const [level, setLevel] = useState("");
  const [campus, setCampus] = useState("");
  const [phone, setPhone] = useState("");
  const [uid, setUid] = useState("");

  const onChangeName = (event) => {
    setName(event.target.value);
  };

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const onChangeConfirmPassword = (event) => {
    setConfirm(event.target.value);
  };

  const onChangeConfirm = (event) => {
    setConfirm(event.target.value);
  };

  const onChangePhone = (event) => {
    setPhone(event.target.value);
  };

  const onChangeLevel = (event) => {
    setLevel(event.target.value);
  };

  const onChangeCampus = (event) => {
    setCampus(event.target.value);
  };

  const tryRegister = async () => {
    const auth = getAuth();
    if (password.length > 0 && password === confirm) {
      createUserWithEmailAndPassword(auth, email, password).then((response) => {
        setUid(response.user.uid);
      });
      try {
        const infoData = {
          uid: uid,
          name: name,
          email: email,
          password: password,
          phone: phone,
          level: level,
          campus: campus,
        };
        await addDoc(collection(db, "users"), { infoData });
        dispatch(setUser(infoData));
        navigate("/CheckPage");
      } catch (e) {
        console.log("Error adding document:", e);
      }
    } else {
      alert("Las contraseñas no coinciden");
    }
  };

  const tryLogin = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password).then((response) => {
      navigate("/CheckPage");
    });
  };

  return (
    <>
      {!register ? (
        <LoginForm
          email={email}
          password={password}
          setEmail={onChangeEmail}
          setPassword={onChangePassword}
          register={register}
          confirm={confirm}
          setConfirm={onChangeConfirmPassword}
          action={tryLogin}
        />
      ) : (
        <RegisterForm
          name={name}
          setName={onChangeName}
          email={email}
          setEmail={onChangeEmail}
          password={password}
          setPassword={onChangePassword}
          confirm={confirm}
          setConfirm={onChangeConfirm}
          phone={phone}
          setPhone={onChangePhone}
          level={level}
          setLevel={onChangeLevel}
          campus={campus}
          setCampus={onChangeCampus}
          action={tryRegister}
        />
      )}
      <Typography onClick={() => setRegister(!register)}>
        {!register ? "¿Aun no tienes una cuenta? Click aqui" : "Iniciar Sesión"}
      </Typography>
    </>
  );
};

export { Login };
