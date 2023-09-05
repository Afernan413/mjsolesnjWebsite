import Header from "@/components/header";
import styled from "styled-components";
import Footer from "@/components/footer";
import Center from "@/components/center";
import {Button} from "reactstrap";
import PrimaryButton from "@/components/PrimaryButtons";
import {useContext, useEffect, useState} from "react";
import {CartContext} from "@/components/CartContext";
import axios from "axios";
import Input from "@/components/input";
import {wait} from "next/dist/build/output/log";

const Background = styled.div`
  background-color:#1A1A1D;
  padding: 30px 0;
`;

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 0.6fr;
  @media only screen and (max-width: 653px){
    grid-template-columns: 0.5fr;
  }
  gap: 40px;
  margin-top: 40px;
  
`

const Box = styled.div`
  background-color: #9b9b9b;
  border-radius: 10px;
  padding: 30px;
  .myLink{
    background-color: #FE654F;
    font-size: 30px;
    border: 3px solid #FE654F;
  }
  .myLink2{
    background-color: #FE654F;
    font-size: 30px;
    border: 3px solid #FE654F;
    display: flex;
  }
  .myLink:hover,.myLink2:hover{
    border: 4px solid white;
  }
`

const StyledTable = styled.table`
  width: 100%;
  th{
    text-transform: uppercase;
    font-weight: 500;
    text-align: center;
  }
  td{
    border-top: 1px solid black;
    text-align: center;
    vertical-align: center;
  }
`
const ProductImageCell = styled.td`
  
  img{
    max-width: 150px;
    max-height: 150px;
  }
  padding: 20px 0;
  p{
    text-transform: uppercase;
    padding-left: 40px;
    max-width: 300px;
    padding-top: 40px;
    @media only screen and (max-width: 653px){
      padding-top: 0px;
    }
  }
  a{
    text-decoration: none;
    color: black;
  }
  a:hover{
    text-decoration: underline;
  }
  display: flex;
  
`
const ProductImageBox = styled.div`
  max-width: 150px;
  max-height: 140px;
  background-color: white;
  border-style: solid;
  contain: content;
  border-radius: 10px;
  border-color:  black;
  
`
const QuantityButton = styled.button`
  background-color: transparent;
  margin-top: 10px;
  display: block;
  svg{
    width: 15px;
  }
  cursor: pointer;
`
const StyledLabel = styled.text`
  margin-left: 10px;
  padding: 0 3px;
  
`
const StyledTotal = styled.td`
    padding-top: 10px;
    text-align: right;
`
const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 25px;
  
`
const EmptyCart = styled.div`
  text-align: center;
  font-style: italic;
  font-weight: bold;
`

const CityHolder = styled.div`
  display: flex;
  gap: 5px;
  
`
export default function CartPage(){
    const{cartProducts,addProduct, removeProduct} = useContext(CartContext);
    const [products, setProducts] = useState([]);
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [city, setCity] = useState('')
    const [zipcode, setZipcode] = useState('')
    const [streetAddress, setStreetAddress] = useState('')
    const [country, setCountry] = useState('')
    const [IsSuccess, setIsSuccess] = useState(false)
    useEffect(() => {
        if(cartProducts.length>0){
            axios.post('/api/cart', {ids:cartProducts})
                .then(response=>{
                    setProducts(response.data)
                })
        }
        setProducts([])
    }, [cartProducts]);

    useEffect(() => {

        if(window?.location.href.includes('success')){
            setIsSuccess(true);
            localStorage.setItem('cart', JSON.stringify([]));
        }
    }, []);
    function lessOfThisProduct(id){
        removeProduct(id);
        localStorage.setItem('cart', JSON.stringify([]));
    }
    async function doPayment(){
        const response = await axios.post('/api/checkout', {
            name,email,city,zipcode,streetAddress,country,cartProducts,
        });
        if(response.data.url){
            window.location = response.data.url;
        }
    }

    let total = 0;

    for(const productID of cartProducts){
        const price = products.find(p=> p._id === productID)?.price || 0;
        total += price;
    }

    if(IsSuccess){
        return(
            <>
            <Header/>
                <Background>
                    <Center>
                        <Box>
                            <h1>
                                Thanks for shopping with us!
                            </h1>
                            <p>
                                 You will receive an email shortly!
                            </p>
                        </Box>

                    </Center>
                </Background>
                <Footer/>

            </>

        );
    }
    return(
        <>
        <Header/>
            <Background>
                <Center>
                    <ColumnsWrapper>
                        <Box>
                            <h2>YOUR CART</h2>
                            {!cartProducts?.length && (
                                <EmptyCart>
                                    <p>YOUR CART IS EMPTY</p>
                                    <ButtonBox>
                                        <ButtonBox>
                                        <PrimaryButton href='/collections/allProducts' className="myLink2">
                                            Continue Shopping
                                        </PrimaryButton>
                                    </ButtonBox>
                                    </ButtonBox>

                                </EmptyCart>

                            )}
                            {products?.length > 0 && (
                            <StyledTable>
                                <thead>
                                <tr>
                                    <th><h3>Product</h3></th>
                                    <th><h3>Quantity</h3></th>
                                    <th><h3>Price</h3></th>
                                </tr>
                                </thead>
                                <tbody>
                                    {products.map(product => (
                                        <tr>
                                            <ProductImageCell>
                                                <ProductImageBox>
                                                    <img src={product.images[0]}/>
                                                </ProductImageBox>
                                                <a href={'/collections/'+product._id}>
                                                    <p>{product.title}</p>
                                                </a>
                                            </ProductImageCell>
                                            <td>
                                                <StyledLabel className="quantityLabel">{cartProducts.filter(id=> id=== product._id).length}</StyledLabel>

                                            </td>
                                            <td>${product.price}</td>

                                            <QuantityButton
                                                onClick={()=>lessOfThisProduct(product._id)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                </svg>
                                            </QuantityButton>

                                        </tr>
                                    ))}

                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <StyledTotal>Estimated Total: ${total}</StyledTotal>

                                    </tr>
                                </tbody>
                            </StyledTable>
                            )}
                        </Box>
                        {!!cartProducts?.length && (
                            <Box>
                                <h2>
                                    ORDER INFORMATION
                                </h2>
                                    <Input type="text" placeholder="Name" value={name} name="name" onChange={ev => setName(ev.target.value)}/>
                                <Input type="text" placeholder="Email" value={email}  name="email" onChange={ev => setEmail(ev.target.value)}/>
                                <CityHolder>
                                    <Input type="text" placeholder="City" value={city} name="city" onChange={ev => setCity(ev.target.value)}/>
                                    <Input type="text" placeholder="Postal Code" value={zipcode} name="zipcode" onChange={ev => setZipcode(ev.target.value)}/>
                                </CityHolder>

                                <Input type="text" placeholder="Street Address" value={streetAddress} name="streetAddress" onChange={ev => setStreetAddress(ev.target.value)}/>
                                <Input type="text" placeholder="Country" value={country} name="country" onChange={ev => setCountry(ev.target.value)}/>


                                    <PrimaryButton onClick={doPayment} className="myLink">
                                    Check Out
                                </PrimaryButton>

                            </Box>
                        )}

                    </ColumnsWrapper>




                </Center>





            </Background>
            <Footer/>
        </>


    )
}