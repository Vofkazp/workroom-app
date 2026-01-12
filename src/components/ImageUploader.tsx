import {useEffect, useState} from "react";
import {useFile} from "../services/File";
import ImageCropper from "./ImageCropper";
import Loader from "./Loader";
import Button from "./Button";

type Props = {
  name: string;
  value?: string;
  classList?: string;
  onChange: (name: string, url: string) => void;
};

export default function ImageUploader({name, value = "", classList, onChange}: Props) {
  const {UploadImage, getImage, deleteFile} = useFile();
  const [file, setFile] = useState<File | null>(null);
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const [url, setUrl] = useState<string | null>(null);
  const [isCropping, setIsCropping] = useState(false);
  const [loading, setLoading] = useState(false);
  const [publicId, setPublicId] = useState<string | null>(null);

  useEffect(() => {
    if (!value) return;
    (async () => {
      const res = await getImage(value, "image");
      if (res?.status) setUrl(res.response.url);
    })();
  }, [value]);

  useEffect(() => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setSelectedImg(url);
    return () => {
      URL.revokeObjectURL(url);
    };
  }, [file]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      setFile(null);
      setIsCropping(true);
      setTimeout(() => setFile(f), 0);
    }
  };

  const upload = async (blob: Blob | null) => {
    if (!blob) return;
    setIsCropping(false);
    setSelectedImg(null);
    setLoading(true);
    const formData = new FormData();
    formData.append("file", blob, "crop.jpg");
    try {
      const res = await UploadImage(formData);
      if (res?.status) {
        setUrl(res.response.url);
        setPublicId(res.response.publicId);
        onChange(name, res.response.publicId);
      }
    } finally {
      setLoading(false);
    }
  };

  const close = async () => {
    if (!publicId) return;
    try {
      setLoading(true);
      const result = await deleteFile(publicId, "image");
      if (!result?.status) return;
      setPublicId(null);
      setSelectedImg(null);
      setUrl(null);
      onChange(name, "");
    } finally {
      setLoading(false);
    }
  }

  return (
      <div className={`upload-file ${classList || ""}${url ? " uploaded" : ""}`}>
        {url && <Button click={close} classList="clear-id" path="close" fill="#000"/>}
        <label className="preview-image"
               style={{backgroundImage: `url(${url || "./images/upload.svg"})`}}>
          <input type="file" accept="image/*" onChange={handleFileChange} disabled={isCropping || loading}/>
          <p className="upload-title">Загрузить...</p>
        </label>
        {isCropping && selectedImg && (
            <ImageCropper
                src={selectedImg}
                onCrop={(blob) => {
                  upload(blob);
                  setIsCropping(false);
                  setSelectedImg(null);
                }}
            />
        )}
        {loading && <Loader size="mini" speed="slow"/>}
      </div>
  );
}
