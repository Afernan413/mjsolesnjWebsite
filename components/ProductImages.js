import styled from "styled-components";
import {useState} from "react";

const ImageButtons = styled.div`
      display: flex;
      img{
        max-width: 100%;
        max-height: 100%;
        object-fit: cover;
      }
      flex-grow: 0;
      margin-top: 10px;
    `
const ImageButton = styled.div`
    border: 2px solid #FE654F;
    ${props => props.active? `
      border-color:#FE654F;
    ` : `
        border-color:transparent;
    ` }  
      height: 50px;
      cursor: pointer;
      border-radius: 4px;
    `;
export default function ProductImages({images}){

    const [activeImage, setActiveImage] = useState(images?.[0])
    return(
        <>
        <img src={activeImage}/>

            <ImageButtons>
                {images.length>1 && images.slice(0).map(image =>(
                    <ImageButton
                        active={image===activeImage}
                        onClick={() => setActiveImage(image)}>
                        <img src={image} alt=""/>
                    </ImageButton>
                ))}
            </ImageButtons>
        </>
    )
}