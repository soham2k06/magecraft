"use client";

import { dataUrl, debounce, download, getImageSize } from "@/lib/utils";
import { CldImage, getCldImageUrl } from "next-cloudinary";
import { PlaceholderValue } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

function TransformedImage({
  image,
  type,
  title,
  isTransforming,
  transformationConfig,
  setIsTransforming,
  hasDownload = false,
}: TransformedImageProps) {
  function handleDownload(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    download(
      getCldImageUrl({
        width: image?.width,
        height: image?.height,
        src: image?.publicId,
        ...transformationConfig,
      }),
      title
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex-between">
        <h3 className="h3-bold text-dark-600">Tranformed</h3>

        {hasDownload && (
          <TooltipProvider>
            <Tooltip delayDuration={200}>
              <TooltipTrigger asChild>
                <button className="download-btn" onClick={handleDownload}>
                  <Image
                    src="/assets/icons/download.svg"
                    alt="Download image"
                    width={24}
                    height={24}
                    className="pb-[6px]"
                  />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Download image</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>

      {image?.publicId && transformationConfig ? (
        <div className="relative">
          <CldImage
            width={getImageSize(type, image, "width")}
            height={getImageSize(type, image, "height")}
            src={image?.publicId}
            alt={image.title}
            sizes={"(max-width: 767px) 100vw, 50vw"}
            placeholder={dataUrl as PlaceholderValue}
            className="transformed-image"
            onLoad={() => setIsTransforming && setIsTransforming(false)}
            onError={() =>
              debounce(
                () => setIsTransforming && setIsTransforming(false),
                8000
              )()
            }
            {...transformationConfig}
          />

          {isTransforming && (
            <div className="transforming-loader">
              <Image
                src="/assets/icons/spinner.svg"
                width={50}
                height={50}
                alt="spinner"
              />
              <p className="text-white/80">Good things take time</p>
            </div>
          )}
        </div>
      ) : (
        <div className="transformed-placeholder">Transformed Image</div>
      )}
    </div>
  );
}

export default TransformedImage;
