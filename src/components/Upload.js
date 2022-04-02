import React, { useState } from "react";

import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";

import { makeStorageClient } from "../services/ipfs";
import { useForm } from "react-hook-form";
import "../styles/Upload.css";

function Upload() {
  const iconSize = 100;
  const { register, handleSubmit } = useForm();
  const [ filename, setFilename ] = useState();

  const [ success, setSuccess ] = useState(false);
  const [ message, setMessage ] = useState('This image has already been uploaded, please upload a new image.');
  const [ dialog, setDialog ] = useState(false);

  const storeFiles = async (files) => {
    const client = makeStorageClient;
    const cid = await client.put(files);
    return cid;
  };

  const onSubmit = (data) => {
    const cid = storeFiles(data.filename);
    console.log(cid);

    // TODO: upload firesbase firestore (remove comment after done)
    // if there is duplicate
    //     -> setMessage('This image has already been uploaded, please upload a new image.');
    //     -> setSuccess(false);
    // else 
    //     -> setMessage('Image uploaded successfully.');
    //     -> setSuccess(true);

    setDialog(true);
  };

  return (
    <main className="upload__container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Upload File</h2>

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

        <Button
          type="submit"
          variant="contained"
          startIcon={<FileUploadOutlinedIcon />}
        >
          Upload
        </Button>
      </form>

      <Dialog open={dialog} onClose={() => setDialog(false)} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{success ? "Success" : "Error"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{message}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialog(false)} variant="outlined">Close</Button>
        </DialogActions>
      </Dialog>
    </main>
  );
}

export default Upload;
