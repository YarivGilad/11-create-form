import styled from "styled-components";
import { flexbox } from "./mixins";

//Horizontal div
export const HBox = styled.div`
  ${flexbox()};
`;
//Vertical div
export const VBox = styled.div`
  ${flexbox({ dir: "column" })};
`;
//Top Vertical div
export const TVBox = styled.div`
  ${flexbox({ dir: "column", jc: "flex-start" })};
`;
//Left Vertical div
export const LVBox = styled.div`
  ${flexbox({ dir: "column", ai: "flex-start" })};
`;
//Top Left Vertical div
export const TLVBox = styled.div`
  ${flexbox({ dir: "column", jc: "flex-start", ai: "flex-start" })};
`;

//Left Vertical form
export const LVForm = styled.form`
  ${flexbox({ dir: "column", ai: "flex-start" })};
`;
