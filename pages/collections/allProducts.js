import Header from "@/components/header";
import getServerSideProps from "@/components/serverProps";
import ProdTile from "@/components/ProdTile";
import styled from "styled-components";
import Center from "@/components/center";
import Footer from "@/components/footer";

const Background = styled.div`
  background-color:#1A1A1D;
  padding: 30px 0;
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
const Title = styled.h1`
  color: white;
  margin: 0;
  font-size: 3rem;
  text-align: left;
  padding-bottom: 50px;
`;

export default function allFootwearPage({RecentProductsAll}) {
    return(
        <div>
            <Header/>
            <Background>
                <Center>
                    <div>
                        <Title>Latest Arrivals (New)</Title>
                    </div>
                    <DisplayProductGrid>
                        {RecentProductsAll?.length > 0 && RecentProductsAll.map(product => (
                            <ProdTile key="noError" {...product}/>
                        ))}
                    </DisplayProductGrid>
                </Center>
            </Background>
            <Footer/>
        </div>
    );
}

export {getServerSideProps};


