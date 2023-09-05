import Link from "next/link";
import styled from "styled-components";
import Center from "@/components/center";
import React, {useContext} from 'react'
import {CartContext} from "@/components/CartContext";
const StyledHeader = styled.header`
  background-color:#1A1A1D;
`;

const Logo = styled(Link)`
  img{
    display: inline-flex;
    width: 100px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
`;

const StyledNav = styled.nav`
  display: flex;
  gap: 15px;
  .dropmenu{
    height: fit-content;
    position: relative;
    display: inline-block;
    float: right;
    
    
  }
  .dropdownmenu{
    display: none;
    position: absolute;
    background-color: grey;
    width: max-content;
    z-index: 1;
    padding: 5px;
    height: max-content;
    
  }
  .dropdownmenu a:hover{
    background-color: #1A1A1D;
    color:#fff;
  }
  
  a:hover{
    text-decoration: underline;
    padding: 0.25px;
  }
  
  .dropmenu:hover .dropdownmenu{
    display: grid;
    border-style: solid;
    border-color: white;
    background-color: #1A1A1D;
    
    
    
  }
  .dropmenu:hover .drop-down{
    background-color: transparent;
    
  }
`;

const NavLinks = styled(Link)`
  color: whitesmoke;
  text-decoration: none;
  height: fit-content;
  
  
`;
export default function Header(){

    const {cartProducts} = useContext(CartContext);

    return(
        <StyledHeader>
            <Center>
                <Wrapper>
                    <Logo href={'/'}>
                        <img src='https://mjsoles-ecommerce.s3.amazonaws.com/MJSOLES.png'/>
                        </Logo>
                    <StyledNav>
                        <NavLinks href={'/'}>Home</NavLinks>
                        <div className="dropmenu">
                        <NavLinks className="drop-down" href={'/collections/footwear/allFootwear'}>Footwear
                        </NavLinks>
                            <div className="dropdownmenu">
                                <NavLinks href={'/collections/footwear/adidas'}>Adidas</NavLinks>
                                <NavLinks href={'/collections/footwear/nike'}>Nike</NavLinks>
                                <NavLinks href={'/collections/footwear/new-balance'}>New Balance</NavLinks>
                                <NavLinks href={'/collections/footwear/jordan'}>Jordan</NavLinks>
                            </div>
                        </div>
                        <NavLinks href={'/collections/apparel/allApparel'}>Clothing</NavLinks>
                        <NavLinks href={'/account'}>Account</NavLinks>
                        <NavLinks href={'/cart'}>Cart ({cartProducts.length})</NavLinks>
                    </StyledNav>
                </Wrapper>

            </Center>
        </StyledHeader>
    )
}