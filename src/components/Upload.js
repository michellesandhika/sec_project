import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import ReCAPTCHA from "react-google-recaptcha";

import { TextField, Button, Alert } from "@mui/material";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";

import { makeStorageClient } from "../services/ipfs";
import { verifyCaptcha } from "../services/utilities";
import "../styles/Upload.css";

function Upload() {
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm();
  const [ filename, setFilename ] = useState();

  const [ error, setError ] = useState(false);
  const [ message, setMessage ] = useState('');

  const storeFiles = async (files) => {
    const client = makeStorageClient;
    const cid = await client.put(files);
    return cid;
  };

  const onSubmit = (data) => {
    if (!data.captcha) {
      setError(true);
      setMessage("Please verify that you're not a robot.");
      return;
    }

    const cid = storeFiles(data.filename);
    console.log(cid);

    // TODO: upload information to firestore (remove comment after done)
    // if there is duplicate
    //     -> setError(false);
    //     -> setMessage('This image has already been uploaded, please upload a new image.');

    navigate('/account');
  };

  const handleCaptcha = async (value) => {
    const success = await verifyCaptcha(value);

    if (success)
      setValue("captcha", value);
  };

  return (
    <main className="upload__container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Upload File</h2>

        {error && <Alert severity="error">{message}</Alert>}

        <div className="upload__info">
          <TextField label="Title" fullWidth required {...register("title")} />
          <TextField
            label="Description"
            multiline
            fullWidth
            {...register("description")}
          />
          <TextField
            label="Price"
            type="number"
            fullWidth
            required
            {...register("price")}
          />
        </div>

        <div className="upload__file">
          <label htmlFor="upload-file">
            <TextField
              id="upload-file"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              {...register("filename", { 
                onChange: (e) => setFilename(e.target.value)
              })}
            />
            <Button
              variant="outlined"
              component="span"
              startIcon={<AttachFileOutlinedIcon />}
            >
              Choose file
            </Button>
          </label>
          <TextField
            value={filename?.split("\\")[2] || "No file chosen"}
            InputProps={{ readOnly: true }}
            size="small"
            fullWidth
          />
        </div>

        <ReCAPTCHA
          sitekey="6LdRy_0eAAAAAL08kTosI_LnAgBf8SDI_XSiWvQz"
          onChange={handleCaptcha}
        />

        <Button
          type="submit"
          variant="contained"
          startIcon={<FileUploadOutlinedIcon />}
        >
          Upload
        </Button>
      </form>
    </main>
  );
}

export default Upload;
