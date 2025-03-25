import styled from "styled-components";
import { lighten, darken } from "polished";
import { countries } from "../data/countries.js";
import { VBox, LVBox, LVForm, HBox } from "../styles/containers.js";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Robot } from "../types.js";
import { useRobots } from "../state/robots.store.js";
import { shortId } from "../utils/rand.util.js";


const email_regex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const Create = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Robot>();

  const {
    robotsList,
    setRobotsList,
    setSelectedRobot
  } = useRobots()

  const navigate = useNavigate();

  console.log({ errors });

  function onSubmit(data:Robot){
    console.log({ data });
    data.id = robotsList.length + 1;
    data.show = true;
    data.avatar = `https://robohash.org/${shortId()}`;

    // if we had a server side to store the form data...
    // const res = await dispatch(add_robot_to_server(data))
    setRobotsList([data,...robotsList]);
    setSelectedRobot(data);
    navigate("/browse");
  }
  return (
    <Wrapper>
      <Title>Create your own Bot!</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Label>Full Name</Label>
        <Box>
          <Input
            type="text"
            placeholder="First Name"
            error_styled={!!errors.first_name}
            {...register("first_name", {
              required: "First name is required",
              minLength: { value: 2, message: "First name is too short" },
            })}
          />
          <Spacer w="1rem" />
          <Input
            type="text"
            placeholder="Last Name"
            error_styled={!!errors.last_name}
            {...register("last_name", {
              required: "Last name is required",
              minLength: { value: 2, message: "Last name is too short" },
            })}
          />
        </Box>
        <ErrorMsg show={!!errors.first_name || !!errors.last_name}>
          {errors.first_name?.message || errors.last_name?.message}
        </ErrorMsg>
        <LVexpand>
          <Label>Email</Label>
          <ExpandedInput
            type="text"
            placeholder="email address"
            error_styled={!!errors.email}
            {...register("email", {
              required: "Email address is required",
              pattern: {
                value: email_regex,
                message: "Email address is not valid",
              },
            })}
          />
        </LVexpand>
        <ErrorMsg show={!!errors.email}>{errors.email?.message}</ErrorMsg>
        <LVexpand>
          <Label >Country</Label>
          <CountrySelectWrap error_styled={!!errors.country}>
            <Select
             
              {...register("country", { required: "Country is required" })}
            >
              <option value="">Please select</option>
              {Object.keys(countries).map((cc) => {
                const { name, emoji } = countries[cc];
                return (
                  <option key={cc} value={name}>
                    {emoji} &nbsp; {name}
                  </option>
                );
              })}
            </Select>
          </CountrySelectWrap>
        </LVexpand>
        <ErrorMsg show={!!errors.country}>{errors.country?.message}</ErrorMsg>
        <LVexpand>
          <Label>Description</Label>
          <Description
            rows={6}
            placeholder="a bit about da bot..."
            error_styled={!!errors.description}
            {...register("description", {
              required: "Description is required",
              minLength: { value: 10, message: "Description is too short" },
            })}
          />
        </LVexpand>
        <ErrorMsg show={!!errors.description}>
          {errors.description?.message}
        </ErrorMsg>
        <Spacer h="1rem" />
        <Submit>Create</Submit>
      </Form>
    </Wrapper>
  );
};

const Wrapper = styled(VBox)`
  /* border: magenta solid 1px; */
  /* width: 100%; */
  /* margin-bottom: 1rem; */
`;

const Title = styled.h1`
  font-family: sans-serif;
  font-size: 2.2rem;
  margin-bottom: 1rem;
`;

const Form = styled(LVForm)`
  /* border: cyan solid 1px; */
  padding: 3rem;

  min-height: 40rem;
  min-width: 40rem;
  background: white;
  border-radius: 6px;
  box-shadow: inset 0px 0px 14px 1px rgba(133, 133, 133, 1);
`;

const Label = styled.label`
  margin-top: 1rem; 
  color: coral;
  font-size: 2rem;
  font-family: "Arial";
  margin-bottom: 0.5rem;
`;
const Box = styled(HBox)`
  /* border: magenta solid 1px; */
  width: 100%;
`;
const LVexpand = styled(LVBox)`
  /* border: magenta solid 1px; */
  width: 100%;
`;
interface InputProps{
  error_styled: boolean,
}
const Input = styled.input<InputProps>`
  font-size: 2rem;
  font-family: "Arial";
  border-radius: 4px;
  padding: 1rem 2rem;
  outline: none;
  border: 2px ${({ error_styled }) => (error_styled ? "red" : "transparent")}
    solid;
  background-color: ${({ error_styled }) =>
    error_styled ? lighten(0.4, "red") : "lightgray"};
  color: ${({ error_styled }) => (error_styled ? "red" : "slategray")};
  &::placeholder {
    color: ${({ error_styled }) => (error_styled ? "red" : "slategray")};
  }
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    transition: background-color 5000s ease-in-out 0s;
    -webkit-text-fill-color: slategray;
  }
  &:focus {
    border: darkgray 2px solid;
    border: 2px ${({ error_styled }) => (error_styled ? "red" : "transparent")}
      solid;
    background-color: ${({ error_styled }) =>
      error_styled ? lighten(0.4, "red") : "lightgray"};
    color: ${({ error_styled }) => (error_styled ? "red" : "slategray")};
  }
`;
const ExpandedInput = styled(Input)`
  width: 100%;
`;
interface SpacerProps{
  w?: string,
  h?: string,
  show?: boolean,
}
const Spacer = styled.div<SpacerProps>`
  width: ${({ w }) => w || 0};
  height: ${({ h }) => h || 0};
  display: ${({ show }) => (show === false ? "none" : "block")};
`;
interface CountrySelectWrapProps{
  error_styled: boolean,
}

const CountrySelectWrap = styled.div<CountrySelectWrapProps>`
  border-radius: 4px;
  padding: 1rem 2rem;
  background-color: lightgray;
  width: 100%;
  outline: none;
  border: 2px transparent solid;
  &:focus {
    border: darkgray 2px solid;
  }
  border: 2px ${({ error_styled }) => (error_styled ? "red" : "transparent")}
    solid;
  background-color: ${({ error_styled }) =>
    error_styled ? lighten(0.4, "red") : "lightgray"};
  select {
    color: ${({ error_styled }) => (error_styled ? "red" : "slategray")};
  }
`;
const Select = styled.select`
  font-size: 2rem;
  font-family: "Arial";
  color: slategray;
  border: none;
  box-shadow: none;
  outline: none;
  background: transparent;
  background-image: none;
  -webkit-appearance: none;
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    transition: background-color 5000s ease-in-out 0s;
    -webkit-text-fill-color: slategray;
    /* -webkit-text-font-size: 3rem;
    font-size: 2rem; */
  }
`;
interface DescriptionProps{
  error_styled: boolean,
}
const Description = styled.textarea<DescriptionProps>`
  width: 100%;
  font-size: 2rem;
  font-family: "Arial";
  border-radius: 4px;
  padding: 1rem 2rem;
  border: 2px ${(p) => (p.error_styled ? "red" : "transparent")} solid;
  outline: none;
  background-color: ${({ error_styled }) =>
    error_styled ? lighten(0.4, "red") : "lightgray"};
  color: slategray;
  &::placeholder {
    color: ${({ error_styled }) => (error_styled ? "red" : "slategray")};
  }
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    transition: background-color 5000s ease-in-out 0s;
    -webkit-text-fill-color: slategray;
  }
  &:focus {
    border: darkgray 2px solid;
    background-color: lightgray;
  }
`;
interface ErrorMsgProps{
  show?: boolean,
}
const ErrorMsg = styled.h1<ErrorMsgProps>`
  color: red;
  border: red dashed 1px;
  border-radius: 6px;
  display: ${({ show }) => (show ? "block" : "none")};

  align-self: center;
  text-align: center;
  padding: 0.6rem;
  width: 100%;
  margin: 1rem 0;
  font-size: 1.6rem;
  font-family: "Arial";
`;
const Submit = styled.button`
  width: 100%;
  outline-style: none;
  border-style: none;
  background: deeppink;
  text-transform: uppercase;
  color: white;
  font-size: 2.2rem;
  /* font-family:'Arial'; */
  padding: 1rem 2rem;
  border-radius: 4px;
  cursor: pointer;
  font-family: "Yanone Kaffeesatz", sans-serif;

  &:hover {
    background: ${darken(0.1, "deeppink")};
  }
  &:active {
    background: ${lighten(0.1, "deeppink")};
  }
  border: 2px transparent solid;
  &:focus {
    border: ${darken(0.2, "deeppink")} 2px solid;
  }
`;
