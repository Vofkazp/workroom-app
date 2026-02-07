import React, {useEffect, useRef, useState} from "react";
import Modal from "./Modal";
import Button from "./Button";

type Crop = {
  x: number;
  y: number;
  size: number;
};

type Props = {
  src: string;
  onCrop: (blob: Blob | null) => void;
};

export default function ImageCropper({src, onCrop}: Props) {
  const [openModal, setOpenModal] = useState<boolean>(true);
  const imgRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [crop, setCrop] = useState<Crop>({
    x: 0,
    y: 0,
    size: 150,
  });

  useEffect(() => {
    if (!imgRef.current) return;
    const rect = imgRef.current.getBoundingClientRect();
    const size = Math.min(rect.width, rect.height);
    setCrop({
      size,
      x: (rect.width - size) / 2,
      y: (rect.height - size) / 2,
    });
  }, [imgRef]);

  const dragging = useRef(false);
  const resizing = useRef(false);
  const start = useRef({x: 0, y: 0});

  const onMouseDown = (e: React.MouseEvent) => {
    dragging.current = true;
    start.current = {x: e.clientX, y: e.clientY};
  };

  const onResizeDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    resizing.current = true;
    start.current = {x: e.clientX, y: e.clientY};
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!imgRef.current) return;

    const rect = imgRef.current.getBoundingClientRect();

    if (dragging.current) {
      setCrop((c) => ({
        ...c,
        x: Math.max(
            0,
            Math.min(rect.width - c.size, c.x + e.movementX)
        ),
        y: Math.max(
            0,
            Math.min(rect.height - c.size, c.y + e.movementY)
        ),
      }));
    }

    if (resizing.current) {
      setCrop((c) => ({
        ...c,
        size: Math.max(50, c.size + e.movementX),
      }));
    }
  };

  const stop = () => {
    dragging.current = false;
    resizing.current = false;
  };

  const cropImage = () => {
    const img = imgRef.current;
    const canvas = canvasRef.current;
    if (!img || !canvas) return;

    const scaleX = img.naturalWidth / img.clientWidth;
    const scaleY = img.naturalHeight / img.clientHeight;

    canvas.width = crop.size * scaleX;
    canvas.height = crop.size * scaleY;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(
        img,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.size * scaleX,
        crop.size * scaleY,
        0,
        0,
        canvas.width,
        canvas.height
    );

    canvas.toBlob((blob) => {
      if (blob) onCrop(blob);
    }, "image/jpeg", 0.9);
    setOpenModal(false);
  };

  const closeModal = () => {
    onCrop(null);
    setOpenModal(false);
  }

  return (
      <div>
        <Modal isOpen={openModal} title="Image cropper" classList="image-cropper" onClose={closeModal}>
          <div className="modal-body">
            <div
                onMouseMove={onMouseMove}
                onMouseUp={stop}
                onMouseLeave={stop}
                className="crop-container"
            >
              <img
                  className="image-crop"
                  ref={imgRef}
                  src={src}
                  alt="image-cropper"
                  draggable={false}
              />
              <div
                  className="frame-crop"
                  onMouseDown={onMouseDown}
                  style={{
                    left: crop.x,
                    top: crop.y,
                    width: crop.size,
                    height: crop.size,
                  }}
              >
                <div
                    className="dot-crop"
                    onMouseDown={onResizeDown}
                />
              </div>
              <canvas ref={canvasRef} style={{display: "none"}}/>
            </div>
          </div>
          <div className="cropper-footer">
            <Button click={cropImage} title="Обрезать" classList="btn-primary"/>
          </div>
        </Modal>
      </div>
  );
}
