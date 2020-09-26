import React, {useState}from "react";
import { Button, Form, FormGroup, Label, Input, Spinner, Card, CardText, CardBody, InputGroup, InputGroupAddon, InputGroupText} from 'reactstrap';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './TinyUrlForm.css';

const TinyUrlForm = () => {
    const [spinner, setSpinner] = useState(false);
    const [longURL, setLongURL] = useState('');
    const [shortURL, setShortURL] = useState('');
    const [custom, setCustom] = useState('');
    const [warning, setWarning] = useState('');

    const formOnChangeHandler = (event) => {
        setLongURL(event.target.value);
    };

    const customOnChangeHandler = (event) => {
        setCustom(event.target.value);
    };

    const onClickHandler = async() => {
        setWarning('');
        setSpinner(true);
        let postURL, data;
        if(custom.length === 0) {
            data = {longURL: longURL};
            postURL = await Axios.create({
                baseURL: 'http://www.sturl.xyz/api/tiny' ,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type' : 'application/json'
                }
            });
        } else {
            data = {
                longURL: longURL,
                customCode: custom
            };
            postURL = await Axios.create({
                baseURL: 'http://www.sturl.xyz/api/tiny/custom' ,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type' : 'application/json'
                }
            });
        }

       const response = await postURL.post('', data).catch(err =>{
           setWarning(err.response.data);
       });
       if(response) {
           setShortURL(response.data.shortURL);
       }
        setSpinner(false);
    };

    return (
        <div className="UrlForm">
            <Form>
                <FormGroup>
                    <Label for="exampleText">Paste Your Url Here:</Label>
                    <Input type="textarea" name="text" id="exampleText"
                           onChange={formOnChangeHandler}/> <br/>
                </FormGroup>
                <Button onClick={onClickHandler} color="dark">Generate</Button> <br/>
                {spinner? <Spinner color="secondary" /> : null} <br/>
                <p className="warning">{warning}</p>
            </Form>
            <Label for="exampleText">Or Customize The Suffix:</Label>
            <InputGroup>
                <InputGroupAddon addonType="append">
                    <InputGroupText>http://www.sturl.xyz/</InputGroupText>
                </InputGroupAddon>
                <Input onChange={customOnChangeHandler}/>
            </InputGroup>
            <Label for="exampleText">Result:</Label>
            <Card>
                <CardBody>
                    <CardText>
                        <a href={'http://' + shortURL}>{shortURL}</a>
                    </CardText>
                </CardBody>
            </Card>
        </div>
    );
};

export default TinyUrlForm;