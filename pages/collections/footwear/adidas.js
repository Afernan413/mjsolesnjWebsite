import Header from "@/components/header";
import getServerSideProps from "@/components/serverProps";
import ProdTile from "@/components/ProdTile";
import styled from "styled-components";
import Center from "@/components/center";
import LoadProduct from "@/components/LoadProduct";
import Footer from "@/components/footer";

const Background = styled.div`
  background-color:#1A1A1D;
  padding: 30px 0;
`;


export default function AdidasPage({AdidasFootwear}) {
    return(
        <div>
            <Header/>
            <Background>
                <LoadProduct ProductGridTitle = "Adidas Footwear" Product= {AdidasFootwear}/>
            </Background>
            <Footer/>
        </div>
    );
}

export {getServerSideProps};


