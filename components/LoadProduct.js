import Center from "@/components/center";
import styled from "styled-components";
import PrimaryButton from "@/components/PrimaryButtons";
import prodTile from "@/components/ProdTile";
import ProdTile from "@/components/ProdTile";


const Background = styled.div`
  background-color:#1A1A1D;
  padding: 30px 0;
`;

const Header = styled.h1`
  color: white;
  margin: 0;
  font-size: 3rem;
  text-align: center;
`;

const Description = styled.h2`
  color: white;
  font-size : 1.25rem;
  text-align: center;
  font-style: italic;
`;

const DisplayProductGrid = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 0.5fr 0.5fr 0.5fr 0.5fr;
  gap: 30px;
  padding-top : 20px;
  grid-row-start: auto;
  @media only screen and (max-width: 1177px){
      grid-template-columns: 0.5fr 0.5fr 0.5fr 0.5fr;
  }
  @media only screen and (max-width: 947px){
    grid-template-columns: 0.5fr 0.5fr 0.5fr;
  }
  @media only screen and (max-width: 717px){
    grid-template-columns: 0.5fr 0.5fr;
  }
  @media only screen and (max-width: 486px){
    grid-template-columns: 0.5fr;
 
  }
  
`
const SeeAllBtn = styled.div`
  padding-top: 30px;
  margin: 0;
  display: flex;
  justify-content: center;
  font-size: 20px;
  

`
export default function LoadProduct({ProductGridTitle, Product}){
    return(
        <Background>

            <Center>
                <div>
                    <Header>{ProductGridTitle}</Header>
                </div>

                <Center>
                    <DisplayProductGrid>
                        {Product?.length > 0 && Product.map(product => (
                            <ProdTile key="NoError" {...product}/>
                        ))}
                    </DisplayProductGrid>
                </Center>

            </Center>

        </Background>
    )
}