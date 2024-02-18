import { dataUrl, debounce, getImageSize } from "@/lib/utils";
import { CldImage } from "next-cloudinary";
import { PlaceholderValue } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";

function TransformedImage({
  image,
  type,
  title,
  isTransforming,
  transformationConfig,
  setIsTransforming,
  hasDownload = false,
}: TransformedImageProps) {
  function handleDownload() {}
  return (
    <div className="flex flex-col gap-4">
      <div className="flex-between">
        <h3 className="h3-bold text-dark-600">Tranformed</h3>

        {hasDownload && (
          <button className="download-btn" onClick={handleDownload}>
            <Image
              src="/assets/images/icons/download.svg"
              alt="Download image"
              width={24}
              height={24}
              className="pb-[6px]"
            />
          </button>
        )}
      </div>

      {image?.publicId && transformationConfig ? (
        <div className="relative">
          <CldImage
            width={getImageSize(type, image, "width")}
            height={getImageSize(type, image, "height")}
            src={image?.publicId}
            alt={image.title}
            sizes="(max-width: 767px) 100vw, 50vw"
            placeholder={dataUrl as PlaceholderValue}
            className="media-uploader_cldImage"
            onLoad={() => {}}
            onError={() => {
              debounce(() => {
                setIsTransforming && setIsTransforming(false);
              }, 8000);
            }}
            {...transformationConfig}
          />
          {isTransforming && (
            <div className="transforming-loader">
              <Image
                src="/assets/icons/spinners.svg"
                width={50}
                height={50}
                alt="Tranforming"
              />
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
