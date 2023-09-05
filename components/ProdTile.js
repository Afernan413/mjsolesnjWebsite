import styled from "styled-components";
import {Button} from "reactstrap";
import PrimaryButton from "@/components/PrimaryButtons";

const Box = styled.div`
  height: 200px;
  width: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  img{
    border-radius: 10px;
    height: 200px;
    width: 200px;
    object-fit: cover;
    
  }
`
const ProductWrapper = styled.div`
    a{
      text-decoration: none;
    }
`

const Title = styled.h5`
  margin: 5px;
  text-align: center;
  color: white;
`
const PriceRow = styled.h3`
  margin-top: 5px;
  color: white;
  text-align: center;
`
export default function ProdTile({_id,title,description,price,images}){
    const url = '/collections/'+_id
    return(
        <ProductWrapper>
            <a href={url}>
                <Box>
                    <div>
                        <img src = {images[0]} alt = ""/>
                    </div>
                </Box>
                <Title>
                    {title}
                </Title>
                <PriceRow>${price}</PriceRow>

            </a>


        </ProductWrapper>

    )
}