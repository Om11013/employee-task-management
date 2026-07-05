import React, { useRef } from "react";
import {
  useAttachments,
  useUploadAttachment,
  useDeleteAttachment,
} from "../hooks/useAttachments";

const API_URL = "http://localhost:3000";

export const TaskAttachments = ({ taskId }: { taskId: number }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { data: attachments, isLoading } = useAttachments(taskId);
  const { mutate: uploadFile, isPending: isUploading } = useUploadAttachment();
  const { mutate: deleteFile, isPending: isDeleting } = useDeleteAttachment();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadFile({ taskId, file });
    }
  };

  const getFileIcon = (mimeType: string) => {
    if (mimeType === "application/pdf") {
      return (
        <svg
          className="w-8 h-8 text-red-500"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
            clipRule="evenodd"
          />
        </svg>
      );
    }
    return (
      <svg
        className="w-8 h-8 text-blue-500"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
          clipRule="evenodd"
        />
      </svg>
    );
  };

  return (
    <div className="mt-6 border-t border-gray-200 pt-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Attachments</h3>

      {/* Upload Area */}
      <div
        className="flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 hover:bg-gray-50 transition-colors"
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="text-center cursor-pointer">
          <svg
            className="mx-auto h-12 w-12 text-gray-300"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
              clipRule="evenodd"
            />
          </svg>
          <div className="mt-4 flex text-sm leading-6 text-gray-600 justify-center">
            <label className="relative cursor-pointer rounded-md bg-white font-semibold text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 hover:text-blue-500">
              <span>{isUploading ? "Uploading..." : "Upload a file"}</span>
              <input
                type="file"
                className="sr-only"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="application/pdf,image/png,image/jpeg,image/jpg"
                disabled={isUploading}
              />
            </label>
            <p className="pl-1">or drag and drop</p>
          </div>
          <p className="text-xs leading-5 text-gray-600">
            PNG, JPG, PDF up to 5MB
          </p>
        </div>
      </div>

      {/* Attachment List */}
      <div className="mt-6 space-y-4 max-h-[300px] overflow-y-auto pr-2">
        {isLoading && (
          <div className="text-sm text-gray-500">Loading attachments...</div>
        )}
        {attachments?.map((file) => (
          <div
            key={file.id}
            className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm"
          >
            <div className="flex items-center space-x-4">
              {getFileIcon(file.fileType)}
              <div>
                <a
                  href={`${API_URL}${file.fileUrl}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-medium text-blue-600 hover:underline"
                >
                  {file.fileName}
                </a>
                <p className="text-xs text-gray-500">
                  {(file.fileSize / 1024 / 1024).toFixed(2)} MB •{" "}
                  {new Date(file.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            <button
              onClick={() => deleteFile(file.id)}
              disabled={isDeleting}
              className="text-red-500 hover:text-red-700 p-2 rounded-md hover:bg-red-50 transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
