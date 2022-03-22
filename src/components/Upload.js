import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import { makeStorageClient } from "../services/ipfs";
import { useForm } from "react-hook-form";

import "../styles/Upload.css";
import { Storefront } from "@mui/icons-material";

function Upload() {
  const { register, handleSubmit } = useForm();

  async function storeFiles(files) {
    const client = makeStorageClient;
    const cid = await client.put(files);
    console.log("stored files with cid:", cid);
    return cid;
  }

  const [filename, setFilename] = useState();

  const onSubmit = (data) => {
    const cid = storeFiles(data.filename);
    console.log(cid);

    // TODO: what next (???)
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
              onChange={(e) => setFilename(e.target.value)}
              {...register("filename")}
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
    </main>
  );
}

export default Upload;
