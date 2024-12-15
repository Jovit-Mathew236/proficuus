"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useUser } from "@/lib/context/userContext";
import { Ticket } from "@/components/ticket";
import { Participant } from "../dashboard/proficuus24/participents/participants";
import html2canvas from "html2canvas";
import { Download, Camera, Upload } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import ReactCrop, { Crop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { makeAspectCrop } from "react-image-crop";

export const Profile = () => {
  const { userData, error, loading } = useUser();
  const [isDownloading, setIsDownloading] = useState(false);
  const [profileImageError, setProfileImageError] = useState(false);
  const ticketRef = useRef<HTMLDivElement>(null);
  const profileImageRef = useRef<HTMLDivElement>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [crop, setCrop] = useState<Crop>({
    unit: "%",
    width: 100,
    height: 100,
    x: 0,
    y: 0,
  });
  const [showCropModal, setShowCropModal] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  // const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const [completedCrop, setCompletedCrop] = useState<Crop>();
  const [isCropping, setIsCropping] = useState(false);

  const fieldMapping: Record<string, keyof Participant> = {
    Zone: "zone",
    College: "collage",
    Phone: "phone",
    "Alternative Phone": "alternativephone",
    Year: "year",
  };

  const handleDownloadTicket = () => {
    setIsDownloading(true);
  };

  const handleDownloadProfileImage = () => {
    if (profileImageRef.current) {
      html2canvas(profileImageRef.current, {
        useCORS: true,
        scale: 3,
        backgroundColor: null,
        imageTimeout: 0,
        allowTaint: true,
        logging: false,
      })
        .then((canvas) => {
          const dataUrl = canvas.toDataURL("image/png");
          const link = document.createElement("a");
          link.href = dataUrl;
          link.download = `${userData?.name || "Profile"}-generated-image.png`;
          link.click();
        })
        .catch((error) => {
          console.error("Error generating profile image", error);
          alert("Failed to generate profile image. Please try again.");
        });
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check file size and type
      // if (file.size > 10 * 1024 * 1024) {
      //   // 10MB limit
      //   alert("File is too large. Please choose an image under 10MB.");
      //   return;
      // }

      if (!file.type.startsWith("image/")) {
        alert("Please upload an image file.");
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        // Create an image element to get natural dimensions
        const img = new window.Image() as HTMLImageElement;
        img.onload = () => {
          // If image is too large, scale it down
          if (img.width > 4096 || img.height > 4096) {
            const canvas = document.createElement("canvas");
            const scale = Math.min(4096 / img.width, 4096 / img.height);
            canvas.width = img.width * scale;
            canvas.height = img.height * scale;
            const ctx = canvas.getContext("2d");
            if (ctx) {
              ctx.imageSmoothingEnabled = true;
              ctx.imageSmoothingQuality = "high";
              ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
              setUploadedImage(canvas.toDataURL("image/png", 1.0));
            }
          } else {
            setUploadedImage(reader.result as string);
          }
          setShowCropModal(true);
        };
        img.src = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget;
    setCrop(
      centerCrop(
        makeAspectCrop(
          {
            unit: "%",
            width: 90,
          },
          1,
          width,
          height
        ),
        width,
        height
      )
    );
  };

  function centerCrop(crop: Crop, imageWidth: number, imageHeight: number) {
    const centerX = imageWidth / 2;
    const centerY = imageHeight / 2;
    return {
      unit: crop.unit,
      x: centerX - (crop.width || 0) / 2,
      y: centerY - (crop.height || 0) / 2,
      width: crop.width,
      height: crop.height,
    };
  }

  const getCroppedImg = (
    image: HTMLImageElement,
    crop: Crop
  ): Promise<string> => {
    return new Promise((resolve) => {
      const canvas = document.createElement("canvas");
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;

      // Set canvas dimensions to match the crop size
      canvas.width = crop.width;
      canvas.height = crop.height;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        throw new Error("No 2d context");
      }

      // Draw the cropped image
      ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height
      );

      // Convert to base64 with maximum quality
      resolve(canvas.toDataURL("image/jpeg", 1.0));
    });
  };

  const handleCropComplete = async () => {
    if (imgRef.current && completedCrop?.width && completedCrop?.height) {
      setIsCropping(true);
      try {
        const croppedImageUrl = await getCroppedImg(
          imgRef.current,
          completedCrop
        );
        setUploadedImage(croppedImageUrl);
        setShowCropModal(false);
      } catch (error) {
        console.error("Error cropping image:", error);
        alert("Failed to crop image. Please try again.");
      } finally {
        setIsCropping(false);
      }
    }
  };

  useEffect(() => {
    const downloadTicket = async () => {
      if (isDownloading && ticketRef.current) {
        try {
          const canvas = await html2canvas(ticketRef.current, {
            useCORS: true,
            scale: 3,
            scrollX: 0,
            scrollY: 0,
            backgroundColor: null,
            imageTimeout: 0,
            allowTaint: true,
            logging: false,
          });

          const dataUrl = canvas.toDataURL("image/png");
          const link = document.createElement("a");
          link.href = dataUrl;
          link.download = `${
            userData?.name + " proficuus'24 ticket" || "proficuus'24 ticket"
          }.png`;
          link.click();
        } catch (error) {
          console.error("Error generating ticket download", error);
          alert("Failed to generate ticket. Please try again.");
        } finally {
          setIsDownloading(false);
        }
      }
    };

    if (isDownloading) {
      downloadTicket();
    }
  }, [isDownloading, userData?.name]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-1 md:px-4 py-4 grid md:grid-cols-3 gap-6">
      {/* Profile Card */}
      <Card className="md:col-span-1 rounded-2xl">
        <CardHeader className="items-center">
          <div className="relative">
            <Image
              src={userData?.imageUrl || "/images/logo.png"}
              alt="Profile"
              width={150}
              height={150}
              className="rounded-full h-36 w-36 object-cover border-4 border-blue-500 shadow-lg transition-transform hover:scale-105"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/images/logo.png";
                setProfileImageError(true);
              }}
            />
            {profileImageError && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-full">
                <Camera className="text-white" size={48} />
              </div>
            )}
          </div>
          <CardTitle className="text-center mt-4">
            <p className="text-xl font-bold">
              {userData?.name || "Loading..."}
            </p>
            <p className="text-sm mt-1">{userData?.email || "Loading..."}</p>
          </CardTitle>
          <Badge variant="secondary" className="mt-2">
            {userData?.isCoordinator
              ? "Coordinator"
              : userData?.uid
              ? "Participant"
              : "Volunteer"}
          </Badge>
        </CardHeader>
        <CardContent className="px-2 py-3 md:p-6">
          <div className="grid grid-cols-2 gap-4 bg-neutral-100/10  backdrop-blur-sm rounded-xl p-4 shadow-xl">
            {Object.keys(fieldMapping).map((field) => (
              <div
                key={field}
                className={cn(
                  "group",
                  "bg-white/30 dark:bg-background/30",
                  "border border-neutral-300 dark:border-neutral-600/10",
                  "rounded-xl p-4",
                  "text-center",
                  "transition-all duration-300",
                  "hover:shadow-lg hover:scale-[1.03]",
                  "hover:border-blue-300 dark:hover:border-blue-700",
                  "transform origin-center"
                )}
              >
                <p
                  className={cn(
                    "font-semibold",
                    "text-neutral-700 dark:text-neutral-200",
                    "mb-2",
                    "text-sm uppercase tracking-wider",
                    "group-hover:text-blue-600 dark:group-hover:text-blue-400",
                    "transition-colors"
                  )}
                >
                  {field}
                </p>
                <p
                  className={cn(
                    "text-base",
                    "font-light",
                    "text-neutral-900 dark:text-neutral-100",
                    "group-hover:text-blue-800 dark:group-hover:text-blue-300"
                  )}
                >
                  {userData?.[fieldMapping[field]] || "N/A"}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Ticket and Profile Image Section */}
      <div className="md:col-span-2 space-y-6">
        {/* Ticket Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Your Event Ticket</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center mb-6">
              <div
                ref={ticketRef}
                className={`flex justify-center items-center h-fit w-fit ${
                  isDownloading ? "min-w-[800px]" : ""
                }`}
              >
                <Ticket
                  name={userData?.name || "Loading..."}
                  zone={userData?.zone || "Loading..."}
                  collage={userData?.collage || "Loading..."}
                  userId={userData?.uid || "Loading..."}
                  isDownloading={isDownloading}
                />
              </div>
            </div>
            <div className="flex justify-center">
              <Button
                onClick={handleDownloadTicket}
                className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 transition-all"
              >
                <Download className="mr-2" /> Download Ticket
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Profile Image Generator */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Profile Image Generator</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center">
              <div
                ref={profileImageRef}
                className="relative w-72 h-72 mb-6 overflow-hidden shadow-lg"
              >
                <div className="relative inset-0 bg-gradient-to-br from-blue-100 to-indigo-100 z-0"></div>
                <Image
                  src="/images/dp.png"
                  alt="Background"
                  layout="fill"
                  objectFit="cover"
                  className="absolute z-20"
                />
                <Image
                  src={
                    uploadedImage || userData?.imageUrl || "/images/logo.png"
                  }
                  alt="Profile pic"
                  layout="fill"
                  objectFit="cover"
                  quality={100}
                  unoptimized
                  className="absolute z-10"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/images/logo.png";
                  }}
                />
              </div>
              <div className="flex flex-col md:flex-row gap-4">
                <Button
                  onClick={() =>
                    document.getElementById("imageUpload")?.click()
                  }
                  className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 transition-all"
                >
                  <Upload className="mr-2" /> Upload Image
                </Button>
                <Button
                  onClick={handleDownloadProfileImage}
                  className="bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 transition-all"
                >
                  <Camera className="mr-2" /> Download Profile Image
                </Button>
              </div>
              <input
                type="file"
                id="imageUpload"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {showCropModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl w-full">
            <h3 className="text-lg font-semibold mb-4">Crop Image</h3>
            <ReactCrop
              crop={crop}
              onChange={(c, percentCrop) => setCrop(percentCrop)}
              onComplete={(c) => setCompletedCrop(c)}
              aspect={1}
              circularCrop
            >
              <Image
                ref={imgRef}
                src={uploadedImage || ""}
                alt="Crop"
                onLoad={onImageLoad}
                width={500}
                height={500}
                style={{ maxWidth: "100%" }}
                unoptimized
              />
            </ReactCrop>
            <div className="flex justify-end gap-4 mt-4">
              <Button variant="outline" onClick={() => setShowCropModal(false)}>
                Cancel
              </Button>
              <Button onClick={handleCropComplete} disabled={isCropping}>
                {isCropping ? "Processing..." : "Apply"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
