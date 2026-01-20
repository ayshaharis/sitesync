import ModalWrapper from "../ModalWrapper";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { dailyUpdateSchema } from "../../validation/dailyUpdateSchema";
import { set } from "zod";

const DailyUpdateModal = ({
  onClose,
  open,
  data,
  mode,
  openEdit,
  updateId,
  onSubmitDailyUpdate
}) => {
  const [newImages, setNewImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    return () => {
      imagePreview.forEach(img => URL.revokeObjectURL(img.preview));
    };
  }, [imagePreview]);

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(dailyUpdateSchema),
  
  });

  const { id } = useParams();

  useEffect(() => {
    if (mode === "edit" && data) {
      reset(data);
      setExistingImages(data.images||[]);
      setNewImages([]);
      setImagePreview([]);
    }
    if(mode==="add"){
      reset({});
      setExistingImages([]);
      setNewImages([]);
      setImagePreview([]);
    }
  }, [data, mode,open,openEdit, reset]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    const previews = files.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));

    setNewImages(prev => [...prev, ...files]);
    setImagePreview(prev => [...prev, ...previews]);
  };

  const removeExistingImage = (index) => {
    setExistingImages(prev => prev.filter((_, i) => i !== index));
  };

  const removeNewImage = (index) => {
    URL.revokeObjectURL(imagePreview[index].preview);
    setImagePreview(prev => prev.filter((_, i) => i !== index));
    setNewImages(prev => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (formData) => {
    setUploading(true);
    try {
      await onSubmitDailyUpdate({
        mode,
        rowId: mode === "edit" ? updateId : null,
        data: formData,
        selectedImages: newImages,
        remainingImages: existingImages
      });
      reset();
      setNewImages([]);
      setImagePreview([]);
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  if (!openEdit && !open) return null;

  return (
    <ModalWrapper onClose={onClose}>
      <div className="fixed inset-0 bg-black/10 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-2xl shadow-xl w-11/12 md:w-2/3 lg:w-1/2">
          <h2 className="text-xl font-bold mb-4 text-green-800">
            {mode === "edit" ? "Edit Daily Updates" : "Add Daily Updates"}
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <input type="date" {...register("date")} className="w-full border p-2 rounded-lg" />
            {errors.date && <p className="text-red-500">{errors.date.message}</p>}

            <input type="number" {...register("workers")} placeholder="Workers" className="w-full border p-2 rounded-lg" />
            <input type="number" {...register("worker_wage")} placeholder="Worker wage" className="w-full border p-2 rounded-lg" />
            <input type="number" {...register("expenses")} placeholder="Expenses" className="w-full border p-2 rounded-lg" />
            <input type="text" {...register("description")} placeholder="Description" className="w-full border p-2 rounded-lg" />
            <textarea {...register("summary")} rows="3" className="w-full border p-2 rounded-lg" />

            {/* Image Upload */}
            <input type="file" accept="image/*" multiple onChange={handleImageChange} />

       
            {(existingImages.length > 0 || imagePreview.length > 0) && (
              <div className="mt-3 grid grid-cols-3 gap-2">
                {existingImages.map((url, index) => (
                  <div key={url} className="relative">
                    <img src={url} className="w-full h-24 object-cover rounded-lg border" />
                    <button
                      type="button"
                      onClick={() => removeExistingImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center"
                    >
                      ×
                    </button>
                  </div>
                ))}

                {imagePreview.map((img, index) => (
                  <div key={index} className="relative">
                    <img src={img.preview} className="w-full h-24 object-cover rounded-lg border" />
                    <button
                      type="button"
                      onClick={() => removeNewImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-end gap-3 mt-4">
              <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded-lg">
                Cancel
              </button>
              <button type="submit" disabled={uploading} className="px-4 py-2 bg-green-700 text-white rounded-lg">
                {uploading ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default DailyUpdateModal;
