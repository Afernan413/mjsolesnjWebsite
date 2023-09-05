import styled, {css} from "styled-components";
import Link from "next/link";
import {Button} from "reactstrap";

const StyledButton = styled(Button)`
  text-decoration: none;
  background-color:#FE654F;
  border: 0;
  color:white;
  padding: 5px 15px;
  border-radius: 5px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  svg{
    height: 20px;
    margin-right: 5px;
    
  }
  ${props => props.size === 'Large' && css`
    font-size: 1.1rem;
    padding: 10px 20px;
  `}
  ${props => props.color === 'White' && css`
    background-color: white;
    color: black;
  `}
  
`;

export default function PrimaryButton({children, ...rest}){
    return(
        <StyledButton {...rest}>{children}</StyledButton>
    )
}