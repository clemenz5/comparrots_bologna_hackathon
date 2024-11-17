import Tesseract from "tesseract.js";
import React, { useState } from "react";
import Camera, { FACING_MODES } from "react-html5-camera-photo";

import "react-html5-camera-photo/build/css/index.css";
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "@chakra-ui/react";
const PhotoAnalyzer = (props: {onResult: (result: string) => void}) => {
  function handleTakePhoto(dataUri, onResult: (res:string)=>void) {
    Tesseract.recognize(dataUri, "eng", { logger: m => console.log(m) })
      .then(({ data: { text } }) => {
        onResult(text)
      })
      .catch((err) => {
        console.error(err);
      });
  }
  const [open, setOpen] = useState(false)


  return (
    <DialogRoot  lazyMount open={open} onOpenChange={(e) => setOpen(e.open)}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Take Photo
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Scan Document</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Camera isImageMirror={false} idealFacingMode={FACING_MODES.ENVIRONMENT} onTakePhoto={(uri)=> {
            handleTakePhoto(uri, (result)=> {
                props.onResult(result)
                 setOpen(false)
            })
            }} />
        </DialogBody>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
};

export default PhotoAnalyzer;
