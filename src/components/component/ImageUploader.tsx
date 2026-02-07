import {useEffect, useState} from "react";
import {useFile} from "../../services/File";
import ImageCropper from "./ImageCropper";
import Loader from "./Loader";
import Button from "./Button";
import {useField} from "formik";

export default function ImageUploader({name, classList}: { name: string; classList?: string; }) {
  const {UploadImage, getImage, deleteFile} = useFile();
  const [field, , helpers] = useField<string>(name);
  const [url, setUrl] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const [isCropping, setIsCropping] = useState(false);
  const [loading, setLoading] = useState(false);
  const [publicId, setPublicId] = useState("");

  useEffect(() => {
    if (!field.value) return;
    setPublicId(field.value);
    (async () => {
      const res = await getImage(field.value, "image");
      if (res?.status) setUrl(res.response.url);
    })();
  }, [field.value]);

  useEffect(() => {
    if (!file) return;
    const preview = URL.createObjectURL(file);
    setSelectedImg(preview);
    return () => URL.revokeObjectURL(preview);
  }, [file]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setIsCropping(true);
    setFile(f);
  };

  const upload = async (blob: Blob | null) => {
    setIsCropping(false);
    setSelectedImg(null);
    if (!blob) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("file", blob, "crop.jpg");
    try {
      const res = await UploadImage(formData);
      if (res?.status) {
        setUrl(res.response.url);
        setPublicId(res.response.publicId);
        helpers.setValue(res.response.publicId);
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
      setPublicId("");
      setSelectedImg(null);
      setUrl(null);
      helpers.setValue("");
    } finally {
      setLoading(false);
    }
  }

  return (
      <div className={`upload-file ${classList || ""}${url ? " uploaded" : ""}`}>
        {url && <Button click={close} classList="clear-id" path="close" fill="#000"/>}
        <label className="preview-image"
               style={{backgroundImage: `url(${url || "/images/upload.svg"})`}}>
          <input type="file" accept="image/*" onChange={handleFileChange} disabled={isCropping || loading}/>
          <p className="upload-title">Загрузить...</p>
        </label>
        {isCropping && selectedImg && (<ImageCropper src={selectedImg} onCrop={upload}/>)}
        {loading && <Loader size="mini" speed="slow"/>}
      </div>
  );
}
