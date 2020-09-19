import React, { Component } from 'react'
import { Form, Input, Button, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import CryptoJS from "react-native-crypto-js";
import { BrowserRouter, Route, Link } from "react-router-dom";
import {ToastsContainer, ToastsStore} from 'react-toasts';
import "./generator.css";





export default class Generator extends Component {
  copied = false;
  constructor(props) {
    super(props);
    this.state = {
      counter: 1,
      date: new Date(),
      linkgenerated: null,
    };
    
    // this.onFinish = this.onFinish.bind(this);
  }
  //   islinkgenerated=false;

  // show_toast = (x) => {
  //   this.setState((x)=>{});
  //   if (this.copied) {
  //     return ("Copied Successfully!!")
  //   }
  // };

  copyCodeToClipboard = () => {
    this.copied = true;
    const el = this.textArea;
    el.select()
    document.execCommand("copy");
    //console.log("Copied to clipboard!");
    ToastsStore.success("Copied to clipboard!");
  }
  
  inputChangedHandler(x) {
    //console.log(x);
  }


  onFinish = values => {

    this.islinkgenerated = true;
    //console.log('Received values of form:', values);
    //console.log(typeof (values));
    //console.log(JSON.stringify(values));
    //console.log(typeof (JSON.stringify(values)));
    //console.log(JSON.parse(JSON.stringify(values)));
    // Encrypt
    let ciphertext = CryptoJS.AES.encrypt(JSON.stringify(values), 'secret key 123').toString();

    //console.log("Encrupted message");
    //console.log(ciphertext);
    // Decrypt
    let bytes = CryptoJS.AES.decrypt(ciphertext, 'secret key 123');
    let originalText = bytes.toString(CryptoJS.enc.Utf8);

    //console.log("dECRYPT");
    //console.log(originalText); // 'my message'
    this.setState((state) => {
      return { counter: state.counter + 1, linkgenerated: window.location.origin+"?id=" + ciphertext };
    });

    // this.setState=({linkgenerated :"http://localhost:3000/"+ciphertext});
  }

  render() {
    return (
      <div>
        <ToastsContainer store={ToastsStore}/>
        <div className="gen container" >
        <h2>COMPARE GENERATOR</h2>
        <Form name="dynamic_form_nest_item" onFinish={this.onFinish} autoComplete="off">
          <Form.List name="items">
            {(fields, { add, remove }) => {
              return (
                <div className="d-flex flex-column ">
                  {fields.map(field => (
                    <Space className="smallFlex" key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="start">
                      <Form.Item
                        className="FormItem"
                        // style={{"width" : "300px"}}
                        {...field}
                        name={[field.name, 'category']}
                        fieldKey={[field.fieldKey, 'category']}
                        rules={[{ required: true, message: 'Missing category name' }]}
                      >
                        <Input placeholder="Category Name" />
                      </Form.Item>
                      <Form.Item
                                              // style={{"width" : "300px"}}
                                              

                                              className="FormItem"
                        {...field}
                        name={[field.name, 'ProductA']}
                        fieldKey={[field.fieldKey, 'ProductA']}
                        rules={[{ required: true, message: 'Missing Product A attribute value' }]}
                      >
                        <Input placeholder="Product A" />
                      </Form.Item>
                      <Form.Item
                      
                                              // style={{"width" : "300px"}}
                                              className="FormItem"
                        {...field}
                        name={[field.name, 'ProductB']}
                        fieldKey={[field.fieldKey, 'ProductB']}
                        rules={[{ required: true, message: 'Missing Product B attribute value' }]}
                      >
                        <Input placeholder="Product B" />
                      </Form.Item>

                      <MinusCircleOutlined
                        onClick={() => {
                          remove(field.name);
                        }}
                      />
                    </Space>


                  ))}

                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => {
                        add();
                      }}
                      block
                    >
                      <PlusOutlined /> Add field
                        </Button>
                  </Form.Item>
                </div>
              );
            }}
          </Form.List>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
                </Button>
          </Form.Item>


        </Form>
        {/* <p>Link generated : {this.state.linkgenerated == null ? "Not YET" : this.state.linkgenerated}</p> */}

        <div onClick={() => this.copyCodeToClipboard()}>
          <p>Double click here to copy the url.</p>
          <textarea
            ref={(textarea) => this.textArea = textarea}
            onChange={(event)=>this.inputChangedHandler(event)}
            value={this.state.linkgenerated?this.state.linkgenerated:"Please submit your data to generate your url."}
          />
          {/* {this.show_toast} */}
        </div>



        </div>
        
        {/* <Link to={this.state.linkgenerated?this.state.linkgenerated:'/test'}> */}
        {/* </Link> */}


      </div>
    );
  }
}

