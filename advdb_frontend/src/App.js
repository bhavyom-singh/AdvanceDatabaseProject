import logo from './logo.svg';
import './App.css';
import React from 'react'
import axios from 'axios';
import { 
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label,
  Dropdown, DropdownToggle, DropdownMenu, DropdownItem, FormFeedback 
 } from 'reactstrap';

 import Notification, {notify} from 'react-notify-toast';
 import $ from 'jquery'

const options = [
  {value:'Male', label:'male'},
  {value:'Female', label:'female'},
  {value:'Other', label:'other'},
]

class App extends React.Component{
  constructor(props) {
    super(props);
    this.output = { name:'', age:'', email:'', gender:'', interestedin:''}
    this.state = {
      output : this.output
    };
    this.toggle_gender = this.toggle_gender.bind(this);
    this.state = {
      dropdownOpen_gender: false
    };
    this.toggle_interest = this.toggle_interest.bind(this);
    this.state = {
      dropdownOpen_interest: false
    };
  }

  // componentDidMount(){
  //   $("Button").on("click",function(){
  //     $("Input").val = "";
  //   });
  // }
  toggle_gender() {
    this.setState(prevState => ({
      dropdownOpen_gender: !prevState.dropdownOpen_gender
    }));
  }

  toggle_interest() {
    this.setState(prevState => ({
      dropdownOpen_interest: !prevState.dropdownOpen_interest
    }));
  }

  state = { 
    details: [], 
    
    
  }
  
  saveAll(){
    console.log(this.state.output)
    console.log('=============')
    console.log(JSON.stringify(this.state.output))
    let json_output = JSON.stringify(this.state.output)
    
    axios
      .post("http://localhost:8000/api/", json_output, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        let text_color = {  background: "#157347", text : "#FFFFFF"}
        notify.show("Data Saved Successfully!!!", "custom",5000, text_color)
        console.log(response)
      })
      .catch(error => {
        let text_color = { background: "#c82333", text : "#FFFFFF"}
        console.log(error)
        notify.show("There was an error saving data. Please try again later.", "custom", 5000, text_color)
        
      })
  }  

  handleOnchange = (e) => {
    let { name, value } = e.target;
    const output = { ...this.state.output, [name]: value };
    this.setState({ output });
  }
  handleOnchange_gender = (e) => {
    let value = e.currentTarget.textContent
    const output = { ...this.state.output, 'gender': value };
    this.setState({ output });
  }
  handleOnchange_interestedin = (e) => {
    let value = e.currentTarget.textContent
    const output = { ...this.state.output, 'interestedin': value };
    this.setState({ output });
  }

  // componentDidMount(){
  //   let data;
  //   axios.get('http://localhost:8000')
  //   .then(res => {
  //     data = res.data;
  //     this.setState({
  //       details: data
  //     });
  //   }).catch(err =>{ })
  // }
  render(){
    return(
      <><div className="App-header">
        <Notification />
        <h1>Streamify</h1>
        <p>Stream text with ease</p>
        <hr></hr>
        <Form>
          <FormGroup>
            <Label for='name'>Name</Label>
            <Input type="text" name="name" onChange={this.handleOnchange} placeholder="Enter name"></Input>
          </FormGroup>
          <FormGroup>
            <Label for='email'>Email</Label>
            <Input type="text" name="email" onChange={this.handleOnchange} placeholder="Enter email"></Input>
          </FormGroup>
          <FormGroup>
            <Label for='age'>Age</Label>
            <Input type="text" name="age" onChange={this.handleOnchange} placeholder="Enter age"></Input>
          </FormGroup>
          <div className='inline-Gender-Interest'>
            <FormGroup className='inline-child-gender'>
              <Dropdown isOpen={this.state.dropdownOpen_gender} toggle={this.toggle_gender}>
                <DropdownToggle caret>
                  Gender
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem header>Select Gender</DropdownItem>
                  <DropdownItem onClick={this.handleOnchange_gender}>Male</DropdownItem>
                  <DropdownItem onClick={this.handleOnchange_gender}>Female</DropdownItem>
                  <DropdownItem onClick={this.handleOnchange_gender}>Others</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </FormGroup>
            <FormGroup className='inline-child-interest'>
              <Dropdown isOpen={this.state.dropdownOpen_interest} toggle={this.toggle_interest} onChange={this.handleOnchange}>
                <DropdownToggle caret>
                  Interest
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem header>Select interest</DropdownItem>
                  <DropdownItem onClick={this.handleOnchange_interestedin}>Sports</DropdownItem>
                  <DropdownItem onClick={this.handleOnchange_interestedin}>Books</DropdownItem>
                  <DropdownItem onClick={this.handleOnchange_interestedin}>Beauty</DropdownItem>
                  <DropdownItem onClick={this.handleOnchange_interestedin}>Home</DropdownItem>
                  <DropdownItem onClick={this.handleOnchange_interestedin}>Pet Supply</DropdownItem>
                  <DropdownItem onClick={this.handleOnchange_interestedin}>Electronics</DropdownItem>
                  <DropdownItem onClick={this.handleOnchange_interestedin}>Clothing</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </FormGroup>
          </div>

        </Form>
        <div className='btn-pad'>
          <Button className="btn btn-success" onClick={() => this.saveAll()}>Add Data</Button>
        </div>
      </div>
        </>
    )
  }
}

export default App;
