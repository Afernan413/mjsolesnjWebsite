import Header from "@/components/header";
import LatestProd from "@/components/LatestProd";
import getServerSideProps from "@/components/serverProps";
import PrimaryButton from "@/components/PrimaryButtons";
import styled from "styled-components";
import Footer from "@/components/footer";


const Title = styled.h1`
  color: white;
  text-align: center;
`;

const FrontBanner = styled.div`
  display: flex;
  background-color:#1A1A1D;
  justify-content: center;
  position: relative;
  img{
    border-radius: 5px;
    max-height: 300px;
    position: relative;
    filter: opacity(50%);
  }
  h1{
    padding-top: 125px;
    margin: 0;
    position: absolute;
  }

`
const SeeAllBtn = styled.div`
  position: absolute;
  padding-top: 230px;
  display: flex;
  .myLink{
    background-color: transparent;
    color: white;
    font-size: 30px;
    border: 3px groove white;
  }
  .myLink:hover{
    border: 4px solid white;
  }
`
export default function HomePage({TenRecentProductsUsed, TenRecentProductsNew}) {
  return(
          <div>
              <Header/>
<div>
    <FrontBanner>
        <img src='https://mjsoles-ecommerce.s3.amazonaws.com/MJSolesBaner.png'/>
        <Title>Browse All Our Latest Products</Title>
        <SeeAllBtn>
            <PrimaryButton className="myLink" href={'/collections/allProducts'}>See All</PrimaryButton>
        </SeeAllBtn>
    </FrontBanner>


</div>

              <LatestProd ProductGridTitle = "Used" Product= {TenRecentProductsUsed}/>
              <LatestProd ProductGridTitle = "New" Product= {TenRecentProductsNew}/>
              <Footer/>
          </div>
  );
}

export {getServerSideProps}
