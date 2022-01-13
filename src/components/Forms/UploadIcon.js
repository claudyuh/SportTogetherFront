import React, {useState} from "react";
import "./UploadIcon.css";
import { Button, Spinner } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { dialogActions } from '../../store/modal'
import ModalReg from "../UI/ModalReg";

const UploadIcon = (props) => {

  const [isLoading, setIsLoading] = useState(false)
  const [selectedFile, setSelectedFile] = useState()
  const [responseOk, setResponseOk] = useState(false)
  const [preview, setPreview] = useState()

  const dispatch = useDispatch()
  useSelector((state) => state.dialog.modalToggle)

  const token = useSelector((state) => state.authentication.token)
  const title = useSelector((state) => state.dialog.modalTitle)


  const handleBack = () => {
    setSelectedFile(null)
    setResponseOk(false)
  }

  const handleModalClose = () => {
    setSelectedFile(null)
    setResponseOk(false)
    dispatch(dialogActions.modalToggle())
  }

  const handleImage = (event) => {
		setSelectedFile(event.target.files[0]);
	};

  const handlePreview = () => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append('cover', selectedFile);
      const objectUrl = URL.createObjectURL(selectedFile)
      setPreview(objectUrl)
      setResponseOk(true)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  };

  const handleUpload = async () => {
    setIsLoading(true)
    const formData = new FormData();
		formData.append(title==='Change profile picture' ? 'profile':'cover', selectedFile);
    const response = await fetch(`http://localhost:5000/upload${title==='Change profile picture'?'profile':'cover'}picture`,
    {
      method: 'POST',
      headers:{'Authorization': "Bearer " + token},
      body: formData
    })
    const responseData = await response.json()
    if(!response.ok){
      console.log('response NOT OK', responseData)
    }else{
      console.log('responseOK Upload', responseData)
      setTimeout(() => {
        window.location.reload(false);
      }, 500);
    }
    setIsLoading(false)
    setResponseOk(false)
    setPreview(null)
    dispatch(dialogActions.modalToggle())
  }
	
  return (
    <ModalReg title={title} size="lg" fullscreen="false">
      {!responseOk && <form encType="multipart/form-data" className='formStyleButtons'>
        <div> Allowed formats (.jpeg, .jpg, .png) </div>
        <div className="wrapper">
          <div className="file-upload">
            <input type="file" id="fileUpload" name={title==='Change profile picture' ? 'profile':'cover'} onChange={handleImage}/>
            <i className="fa fa-arrow-up" style={{'fontSize':'40px'}}></i>
          </div>
        </div>
        <Button onClick={handlePreview} variant="light" disabled={!selectedFile ? true:false}>Preview</Button>
      </form>}
      {responseOk && <form className='formStyleButtons1'>
        {isLoading && <div>Please don't close this window while we processing your request</div>}
        <img src={preview} alt="preview" className="mb-3"/>
        {isLoading && <Spinner animation="border" variant="primary"/>}
        
          <Button onClick={handleBack}  disabled={isLoading} style={{float:'left', marginLeft:'25px'}}>Back</Button>
          <Button onClick={handleUpload}  disabled={isLoading}>Upload</Button>
          <Button onClick={handleModalClose}  disabled={isLoading}>Close</Button>
       
      </form>}
    </ModalReg>
  );
};


export default UploadIcon;