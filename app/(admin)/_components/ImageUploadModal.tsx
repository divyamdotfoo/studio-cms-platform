"use client";

import { useRef, useState, useCallback } from "react";
import { nanoid } from "nanoid";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Upload, AlertTriangle } from "lucide-react";
import { useImageStore } from "./useImageStore";

const MAX_SIZE_KB = 500;
const MAX_SIZE_BYTES = MAX_SIZE_KB * 1024;
const MAX_PENDING = 4;

function getExt(filename: string): string {
  const dot = filename.lastIndexOf(".");
  if (dot === -1) return "jpg";
  return filename.slice(dot + 1).toLowerCase();
}

interface ImageUploadModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projectId: string;
  onImageAdded: (targetPath: string) => void;
}

export function ImageUploadModal({
  open,
  onOpenChange,
  projectId,
  onImageAdded,
}: ImageUploadModalProps) {
  const store = useImageStore();
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const atCap = store.pendingCount >= MAX_PENDING;

  const resetState = useCallback(() => {
    if (preview) URL.revokeObjectURL(preview);
    setError(null);
    setPreview(null);
    setSelectedFile(null);
    if (inputRef.current) inputRef.current.value = "";
  }, [preview]);

  const handleOpenChange = useCallback(
    (next: boolean) => {
      if (!next) resetState();
      onOpenChange(next);
    },
    [onOpenChange, resetState]
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    if (preview) URL.revokeObjectURL(preview);
    setPreview(null);
    setSelectedFile(null);

    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select an image file.");
      return;
    }

    if (file.size > MAX_SIZE_BYTES) {
      const sizeKB = Math.round(file.size / 1024);
      setError(
        `Image is ${sizeKB} KB — must be under ${MAX_SIZE_KB} KB. Please compress or resize the image before uploading.`
      );
      return;
    }

    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleConfirm = () => {
    if (!selectedFile) return;

    const ext = getExt(selectedFile.name);
    const id = nanoid(5);
    const targetPath = `/project/${projectId}/${id}.${ext}`;

    store.addFile(targetPath, selectedFile);
    onImageAdded(targetPath);
    handleOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Upload Image</DialogTitle>
          <DialogDescription>
            Upload one image at a time. Each image must be under{" "}
            <strong>{MAX_SIZE_KB} KB</strong>. Maximum{" "}
            <strong>{MAX_PENDING}</strong> new images per save. For more,
            contact <strong>Divyam</strong>.
          </DialogDescription>
        </DialogHeader>

        {atCap ? (
          <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 text-amber-800 text-[14px] rounded-md">
            <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
            <p>
              You have already added {MAX_PENDING} images in this session.
              Commit your current changes first, then you can add more.
            </p>
          </div>
        ) : (
          <>
            <div>
              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                className="w-full h-24 border-dashed border-2 text-drift hover:text-ink"
                onClick={() => inputRef.current?.click()}
              >
                <Upload className="w-5 h-5 mr-2" />
                {selectedFile ? "Change image" : "Choose image"}
              </Button>
            </div>

            {error && (
              <div className="flex items-start gap-3 p-3 bg-red-50 border border-red-200 text-red-700 text-[13px] rounded-md">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                <p>{error}</p>
              </div>
            )}

            {preview && !error && (
              <div className="space-y-3">
                <div className="relative w-full aspect-video bg-shell border border-sand overflow-hidden rounded-md">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-full object-contain"
                  />
                </div>
                <p className="text-[13px] text-drift truncate">
                  {selectedFile?.name} (
                  {Math.round((selectedFile?.size ?? 0) / 1024)} KB)
                </p>
              </div>
            )}
          </>
        )}

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => handleOpenChange(false)}
          >
            Cancel
          </Button>
          {!atCap && (
            <Button
              type="button"
              onClick={handleConfirm}
              disabled={!selectedFile || !!error}
            >
              Add Image
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
