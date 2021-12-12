import { useState } from "react";
import Compressor from "compressorjs";
import { useStorageContext } from "../firebase/storageContext";

const MediaUpload = () => {
  const [file, setFile] = useState();
  const [files, setFiles] = useState();
  const { uploadFile, updateMultipleFiles, progress } = useStorageContext();

  const fixQuality = (fileSize) => {
    let compressQuality;
    if (fileSize > 12000) {
      compressQuality = 0.1;
    } else if (fileSize > 8000) {
      compressQuality = 0.2;
    } else if (fileSize > 6000) {
      compressQuality = 0.4;
    } else if (fileSize > 4000) {
      compressQuality = 0.6;
    } else if (fileSize > 2000) {
      compressQuality = 0.8;
    } else if (fileSize > 1000) {
      compressQuality = 0.9;
    }

    return compressQuality;
  };

  const compressFiles = (allFiles) => {
    let fileArr = [];
    for (let i = 0; i < allFiles.length; i++) {
      new Compressor(allFiles[i], {
        quality: fixQuality(file.size),
        success: (compressedResult) => {
          fileArr.push(compressedResult);
        },
      });
    }
    setFiles(fileArr);
  };

  const compressFile = (file) => {
    new Compressor(file, {
      quality: fixQuality(file.size),
      success: (compressedResult) => {
        console.log(compressedResult);
        setFile(compressedResult);
      },
    });
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen  p-3 
    bg-blue-500 text-gray-700"
    >
      <div className=" bg-blue-200 rounded-md p-2  flex flex-col text-base font-semibold">
        <div className=" w-72 p-2 self-center flex flex-col">
          <p className="pb-1 text-lg">Your Profile</p>
          <input
            type="file"
            accept=".jpg,.jpeg,.png"
            onChange={(e) => compressFile(e.target.files[0])}
          />

          <div className="mt-1 text-xs text-gray-500">
            A profile picture is useful for visualization to the birthday baby
            who are you
          </div>
          <button
            className="p-1.5 mb-3 mt-3  text-gray-100 rounded-lg bg-blue-500 w-min self-start"
            onClick={() => uploadFile(file, "profile")}
          >
            Upload
          </button>
        </div>
        <div className="w-72 p-2 self-center flex flex-col">
          <label className="pb-1">Pictures with or of birthday baby</label>
          <input
            type="file"
            accept=".jpg,.jpeg,.png"
            multiple
            onChange={(e) => compressFiles(e.target.files)}
          />
          <div className="mt-1 text-xs text-gray-500">
            upload enjoyed moments with birthday baby or pictures of birthday
            baby
          </div>
          <button
            className="p-1.5 mb-3 mt-3 text-gray-100 rounded-lg 
bg-blue-500 w-min self-start"
            onClick={() => updateMultipleFiles(files, "picsWithBaby")}
          >
            Upload
          </button>
        </div>
        <div className=" w-72 p-2 self-center flex flex-col">
          <label className="pb-1">Wish video</label>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
          <div className="mt-1 text-xs text-gray-500">
            Make your wish as video and upload
          </div>
          <button
            className="p-1.5 mb-3 mt-3 text-gray-100 rounded-lg 
bg-blue-500 w-min self-start"
            onClick={() => uploadFile(file, "video")}
          >
            Upload
          </button>
          <div className="relative pt-1">
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-300">
              <div
                style={{ width: progress + "%" }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaUpload;
