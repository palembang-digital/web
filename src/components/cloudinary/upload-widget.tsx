import { Button } from "@//components/ui/button";
import { CldUploadWidget, CldUploadWidgetProps } from "next-cloudinary";

export function UploadWidget(props: CldUploadWidgetProps) {
  return (
    <CldUploadWidget
      options={{
        multiple: false,
        sources: ["local", "url", "camera"],
      }}
      signatureEndpoint="/api/sign-cloudinary-params"
      {...props}
    >
      {({ open }) => {
        return (
          <Button variant="outline" onClick={() => open()}>
            Upload Image
          </Button>
        );
      }}
    </CldUploadWidget>
  );
}
