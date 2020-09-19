import React, { Component } from 'react'
import CryptoJS from "react-native-crypto-js";

export default class Home extends Component {

    render() {
        const ciphertext = this.props.location.search.split('=')[1];
        //console.log(this.props);
        let originalText = "Please generate the url";
        let originalJson = null;
        let cardsA = [];
        let cardsB = [];
        if (ciphertext) {
            try {
                // Decrypt
                let bytes = CryptoJS.AES.decrypt(ciphertext, 'secret key 123');
                originalText = bytes.toString(CryptoJS.enc.Utf8);
                originalJson = JSON.parse(originalText);
    
                //console.log("dECRYPT");
                //console.log(originalText); // 'my message'
                //console.log(originalJson);
                //decode
                //check if its valid
                //show
                //console.log(this.props.location.search);
                cardsA = originalJson['items'].map(function (item, i) {
                    return <div className="feature" key={item["ProductA"]}>{item["category"]} <span>{item["ProductA"]}</span></div>;
                });
                cardsB = originalJson['items'].map(function (item, i) {
                    return <div className="feature" key={item["ProductA"]}>{item["category"]} <span>{item["ProductB"]}</span></div>;
                });
            } catch (error) {
                //console.log(error);
            }

        }


         if (cardsA.length!==0 && cardsB.length!==0) {
            return (
                <div>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 mb-5">
                                <h2 className="main-head">COMPARE</h2>
                            </div>
    
                            <div className="col-md-6">
                                <div className="pricing-table purple">
    
                                    {/* <div className="pricing-label">Fixed Price</div> */}
                                    <h2>{originalJson["items"][0]["ProductA"]}</h2>
                                    <h5>Product Details</h5>
                                    <div className="pricing-features">
                                        {cardsA}
                                        {/* <div className="feature">Bandwith<span>50 GB</span></div>
                            <div className="feature">Add-On Domains<span>10</span></div>
                            <div className="feature">SSD Storage<span>250 GB</span></div>
                            <div className="feature">Mail Adresses<span>25</span></div>
                            <div className="feature">Support<span>Only Mail</span></div> */}
                                    </div>
    
                                    {/* <div className="price-tag">
                            <span className="symbol">$</span>
                            <span className="amount">7.99</span>
                            <span className="after">/month</span>
                            </div> */}
    
                                    <a className="price-button" href="#">BUY</a>
                                </div>
                            </div>
    
                            <div className="col-md-6">
                                <div className="pricing-table purple">
    
                                    {/* <div className="pricing-label">Fixed Price</div> */}
                                    <h2>{originalJson["items"][0]["ProductB"]}</h2>
                                    <h5>Product Details</h5>
                                    <div className="pricing-features">
                                        {cardsB}
                                        {/* <div className="feature">Bandwith<span>50 GB</span></div>
                            <div className="feature">Add-On Domains<span>10</span></div>
                            <div className="feature">SSD Storage<span>250 GB</span></div>
                            <div className="feature">Mail Adresses<span>25</span></div>
                            <div className="feature">Support<span>Only Mail</span></div> */}
                                    </div>
    
                                    {/* <div className="price-tag">
                            <span className="symbol">$</span>
                            <span className="amount">7.99</span>
                            <span className="after">/month</span>
                            </div> */}
    
                                    <a className="price-button" href="#">BUY</a>
                                </div>
                            </div>
    
    
    
                            <div className="col-md-12 mb-5">
                                
                            </div>
    
                        </div>
                    </div>
                </div>
            )

        } else {
            return (<div>

            </div>)
        }
    }
}
