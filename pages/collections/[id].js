import Center from "@/components/center";
import Header from "@/components/header";
import styled from "styled-components";
import Footer from "@/components/footer";
import {mongooseConnect} from "@/lib/mongoose";
import {Product} from "@/models/Product";
import PrimaryButton from "@/components/PrimaryButtons";
import ProductImages from "@/components/ProductImages";
import {useContext} from "react";
import {CartContext} from "@/components/CartContext";
import swal from 'sweetalert';

const Background = styled.div`
  background-color:#1A1A1D;
  padding: 30px 0;
`;
const Title = styled.h1`
  color: white;
  margin: 0;
  font-size: 3rem;
  text-align: left;
  padding-bottom: 50px;
`;

const Box = styled.div`
  display: block;
  img{
    border-radius: 10px;
    width: 500px;
    height: 500px;
    object-fit: cover;
  }
`

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 0.8fr 1.2fr;
  @media only screen and (max-width: 770px){
    grid-template-columns: 0.5fr;
  }
  gap: 40px;
  margin-top: 40px;
  .myLink{
    background-color: transparent;
    color: white;
    font-size: 30px;
    border: 3px groove #FE654F;
  }
  .myLink:hover{
    border: 4px solid white;
  }
  padding-bottom: 20px;
`
const Description = styled.p`
  padding-top: 20px;
  color: ghostwhite;
`

const ItemRow = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 20px;

`
const Item = styled.span`
  color:#FE654F;
  font-weight: bold;
  font-size: 30px;
  
`
export function BoxElem({product}){
    if(product.properties.Box === undefined){
        return(
            <></>
        )
    }
    return(
        <Item id="box">Box: {product.properties.Box} Box</Item>
    )
}
export default function ProductPage({product}){

    const {addProduct} = useContext(CartContext);
    const {cartProducts} = useContext(CartContext);


    function add_Product(){
        if(cartProducts.includes(product._id)){
            swal('This Item is already in your cart')
        }else {
            addProduct(product._id)
        }
    }

    return(
        <>
            <Background>

                <Header/>
                <Center>
                    <Wrapper>
                        <Box>
                            <ProductImages images={product.images}/>
                        </Box>
                        <div>
                            <Title>{product.title}</Title>
                            <ItemRow>
                            <Item>Size: {product.properties.Size}</Item>
                            </ItemRow>
                            <ItemRow>
                                <Item>Condition: {product.properties.Condition}</Item>
                            </ItemRow>
                            <ItemRow>
                                {BoxElem({product})}

                            </ItemRow>
                            <ItemRow>

                                <Item>${product.price}</Item>

                            </ItemRow>

                            <PrimaryButton className="myLink" onClick={() => add_Product(product._id)} >Add To Cart</PrimaryButton>

                            <Description>{product.description}</Description>
                        </div>


                    </Wrapper>

                </Center>

            </Background>
            <Footer/>


        </>
    )
}

export async function getServerSideProps(context){
    await mongooseConnect()
    const {id} = context.query;
    const product = await Product.findById(id);
        return{
            props:{
                product: JSON.parse(JSON.stringify(product))
            }
        }
}