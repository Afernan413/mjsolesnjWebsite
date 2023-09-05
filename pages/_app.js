import {createGlobalStyle} from "styled-components";
import {CartContextProvider} from "@/components/CartContext";

const GlobalStyles = createGlobalStyle`
  body{
    content-visibility: auto;
  }
  @import url('https://fonts.googleapis.com/css2?family=Assistant:wght@200&display=swap');  body{
    padding:0;
    margin:0;
    font-family: 'Assistant', sans-serif;
    font-weight: lighter;


  }
`;
export default function App({ Component, pageProps }) {
  return(
      <>
        <GlobalStyles/>
          <CartContextProvider>
              <Component {...pageProps} />
          </CartContextProvider>


      </>

  )
}
