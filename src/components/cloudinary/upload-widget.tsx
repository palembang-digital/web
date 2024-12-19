import { Button } from "@/components/ui/button";
import { CldUploadWidget, CldUploadWidgetProps } from "next-cloudinary";

type UploadWidgetProps = CldUploadWidgetProps & {
  label?: string;
};

export function UploadWidget({ label, ...props }: UploadWidgetProps) {
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
            {label || "Upload Image"}
          </Button>
        );
      }}
    </CldUploadWidget>
  );
}
