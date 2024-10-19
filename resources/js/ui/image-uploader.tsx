"use client";

import { useState, useRef, DragEvent } from "react";
import { Button } from "@/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/ui/card";
import { AlertCircle, Upload, Image as ImageIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/ui/alert";

export default function DragDropImageUploader() {
    const [isDragging, setIsDragging] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadStatus, setUploadStatus] = useState<
        "idle" | "success" | "error"
    >("idle");
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        const droppedFile = e.dataTransfer.files[0];
        handleFile(droppedFile);
    };

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            handleFile(selectedFile);
        }
    };

    const handleFile = (file: File) => {
        if (file && file.type.startsWith("image/")) {
            setFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
            setUploadStatus("idle");
        } else {
            setFile(null);
            setPreviewUrl(null);
            setUploadStatus("error");
        }
    };

    const handleUpload = async () => {
        if (!file) return;

        setIsUploading(true);
        setUploadStatus("idle");

        // Simulating an upload process
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // In a real application, you would send the file to your server here
        // const formData = new FormData()
        // formData.append('image', file)
        // const response = await fetch('/api/upload', { method: 'POST', body: formData })
        // if (response.ok) { setUploadStatus('success') } else { setUploadStatus('error') }

        setIsUploading(false);
        setUploadStatus("success"); // Simulating a successful upload
    };

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle>Upload Image</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div
                    className={`border-2 border-dashed rounded-lg p-4 text-center ${
                        isDragging
                            ? "border-primary bg-primary/10"
                            : "border-muted-foreground"
                    }`}
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                >
                    {previewUrl ? (
                        <div className="relative aspect-video">
                            <img
                                src={previewUrl}
                                alt="Preview"
                                className="object-contain w-full h-full"
                            />
                        </div>
                    ) : (
                        <div className="py-8">
                            <ImageIcon className="mx-auto h-12 w-12 text-muted-foreground" />
                            <p className="mt-2 text-sm text-muted-foreground">
                                Drag and drop your image here, or click to
                                select
                            </p>
                            <p className="mt-1 text-xs text-muted-foreground">
                                Only image files are allowed
                            </p>
                        </div>
                    )}
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileInput}
                        accept="image/*"
                        className="hidden"
                    />
                </div>
                {uploadStatus === "error" && (
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>
                            Please select a valid image file.
                        </AlertDescription>
                    </Alert>
                )}
                {uploadStatus === "success" && (
                    <Alert>
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Success</AlertTitle>
                        <AlertDescription>
                            Image uploaded successfully!
                        </AlertDescription>
                    </Alert>
                )}
            </CardContent>
            <CardFooter>
                <Button
                    onClick={handleUpload}
                    disabled={!file || isUploading}
                    className="w-full"
                >
                    {isUploading ? (
                        <>
                            <Upload className="mr-2 h-4 w-4 animate-spin" />
                            Uploading...
                        </>
                    ) : (
                        <>
                            <Upload className="mr-2 h-4 w-4" />
                            Upload Image
                        </>
                    )}
                </Button>
            </CardFooter>
        </Card>
    );
}
