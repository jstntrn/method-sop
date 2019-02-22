import React, { Component } from 'react';
import './ContentModal.scss'
import axios from  'axios'

export default class ContentModal extends Component{
    constructor(props){
        super(props)

        this.state = {
            type: 'text',
            title: '',
            content: '',
            url: ''
        }
    }

    handleChange(prop, val){
        this.setState({
            [prop]: val
        })
    }

    handleCancel(){
        const { createModal } = this.props
        createModal()
    }

    handleCreate(){
        const { slideID, createModal, updateDisplay } = this.props
        const { type, title, content } = this.state
        axios.post(`/api/content/${slideID}`, {
            type: type,
            title: title,
            content: content
        })
        .then(res => {
            updateDisplay()
            createModal()
        })
        .catch(err => console.log(err))
    }

    uploadFile = (signedRequest, file, url) => {
        // here we're just setting the header, as defined in the docs, to tell amazon what type of file we're going to have
         const options = {
           headers: {
             'Content-Type': file.type,
           },
         };
         //and we simply make our request.
         axios
         .put(signedRequest, file, options)
         .then(response => {
           this.setState({ url });
           // Here we can do anything with the URL, setting state isn't required - but you may want to put this URL in your database.
         })
         .catch(err => {
           if (err.response.status === 403) {
             alert(
               `Your request for a signed URL failed with a status 403. Double check the CORS configuration and bucket policy in the README. You also will want to double check your AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY in your .env and ensure that they are the same as the ones that you created in the IAM dashboard. You may need to generate new keys\n${
                 err.stack
               }`
             );
           } else {
             alert(`ERROR: ${err.status}\n ${err.stack}`);
           }
         });
     };

    getSignedRequest = (e) => {
        let file = e.target.files[0];
        // here, we are getting the entire file, and it's properties. just like e.target.value is returning us some text on a input text onChange, we'll get an array of files that were uploaded. Since we're only uploading one - we will just pull it by referencing e.target.files[0]
        
        axios.get('/sign-s3', { //this is our own endpoint we will set up, and this is just a fancy way to send params. as long as you get the filename and type through, you can do it however you like.
        params: {
            'file-name': file.name,
            'file-type': file.type
        }
        }).then( (response) => {
        // like i said earlier, we are grabbing a "signed request" and a url, from amazon that is allowing us to actually upload the file. The url is where the file WILL be stored - but it hasn't been yet. 
        //if we successfully get a response and enter the .then, then we will call the uploadFile function (described later ) with our 
        // 1) signedRequest, 2) file (taken from above), and 3) url where the image will go 
        const { signedRequest, url } = response.data 
        this.uploadFile(signedRequest, file, url)

        }).catch( err => {
        // just catches the error of something went wrong on the server end
        console.log(err)
        })
    }

    render(){
        const { title, content } = this.state
        return(
            <div className='modal-wrapper'>
                <button className='modal-button cancel' onClick={() => this.handleCancel()}><i className="fas fa-times"></i></button>
                <div className='modal-inputs'>
                    <div className='modal-top'>
                        <select name='type' onChange={(e) => this.handleChange('type', e.target.value)} >
                            <option value='text'>Text</option>
                            <option value='url'>URL</option>
                            <option value='doc'>Document</option>
                            <option value='img'>Image</option>
                            <option value='pdf'>PDF</option>
                            <option value='code'>Code</option>
                        </select>
                        <input className='modal-title' value={title} placeholder={'title'} onChange={(e) => this.handleChange('title', e.target.value)} />
                    </div>
                    <textarea className='modal-content' value={content} placeholder={'content'} onChange={(e) => this.handleChange('content', e.target.value)} />
                    <div className='modal-upload-wrapper'>
                        <input className='modal-upload' type='file' name='file-upload' onChange={this.getSignedRequest}></input>
                        <img src={this.state.url} alt='uploaded-image' />
                    </div>
                </div>
                <button className='modal-button create' onClick={() => this.handleCreate()}><i className="fas fa-check"></i></button>
            </div>
        )
    }
}