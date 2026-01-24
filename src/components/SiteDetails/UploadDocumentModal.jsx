import { useRef, useState } from "react";
import ModalWrapper from "../ModalWrapper";

const UploadDocumentModal = ({ onClose }) => {
  const [documents, setDocuments] = useState([]);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const newDoc = {
      id: Date.now(),
      name: file.name,
      file,
    };

    setDocuments((prev) => [...prev, newDoc]);
  };

  return (
    <ModalWrapper onClose={onClose}>
      <h2 className="text-xl font-semibold mb-4 text-center">
        Upload Documents
      </h2>

      <h3 className="m-2 p-2">
        Upload all documents related to this site
      </h3>


      <input
        type="file"
        multiple
        ref={fileInputRef}
        onChange={handleFileChange}
     
      />

      <div className="flex gap-3 m-2 p-2">
        <button
          onClick={() => fileInputRef.current.click()}
          className="w-full bg-cyan-950 text-white font-medium px-4 py-3 rounded-xl hover:bg-gray-800 transition"
        >
          Upload +
        </button>

        <button
          onClick={onClose}
          className="w-full bg-gray-200 text-black font-medium px-4 py-3 rounded-xl hover:bg-gray-400 transition"
        >
          Cancel
        </button>
      </div>
    </ModalWrapper>
  );
};

export default UploadDocumentModal;
