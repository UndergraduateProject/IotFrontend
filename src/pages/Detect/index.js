import React from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import "./detect.css"
import detect_pc1 from "../../images/detect_pc1.png";
import detect_pc2 from "../../images/detect_pc2.png";
import detect_pc3 from "../../images/detect_pc3.png";
import detect_slider_pc1 from "../../images/detect_slider_pc1.png";
import detect_slider_pc2 from "../../images/detect_slider_pc2.png";
import detect_slider_pc3 from "../../images/detect_slider_pc3.png";
import detect_slider_pc4 from "../../images/detect_slider_pc4.png";
import ProgressBar from 'react-bootstrap/ProgressBar'
import Carousel from 'react-elastic-carousel'
import styled from "styled-components"
import Sidebar from '../../component/Sidebar'


const Item = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  // background-color: green;
  width: 100%;
  // height: 150px;
  // margin: 15px;
`

function Detect() {

    return (
        <div className="detect_body">
            <Sidebar />
            <ProgressBar className="progressBar" animated now={50} />
            <div className="progressBar_detail">Loading Pictures…</div>
            <img className="detect_pc1" src={detect_pc1}/> 
            <div className="detect_background">
                <img className="detect_pc2" src={detect_pc2}/>
                <div className="detect_arrow"> >>> </div>
                <img className="detect_pc3" src={detect_pc3}/> 
                <div className="detect_status">Status Analysis</div>
                <div className="detect_detail">xxx:0.00%  <br />123 <br /> 456</div>
            </div>
            <Carousel itemPadding={[0, 10]} className="detect_slider_adjust" itemsToShow={3}>
                <Item>
                    <img className="detect_slider_pc" src={detect_slider_pc1}/> 
                </Item>       

                <Item>
                    <img className="detect_slider_pc" src={detect_slider_pc2}/> 
                </Item>                       

                <Item>
                    <img className="detect_slider_pc" src={detect_slider_pc3}/> 
                </Item>                             

                <Item>
                    <img className="detect_slider_pc" src={detect_slider_pc4}/> 
                </Item>                                      

            </Carousel>
        </div>
        )
    }
    
export default Detect;
           