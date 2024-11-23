import { MinimalTiptapEditor } from "@/components/minimal-tiptap";
import { FormControl, FormItem, FormMessage } from "@/components/ui/form";
import AutoFormLabel from "../common/label";
import AutoFormTooltip from "../common/tooltip";
import { AutoFormInputComponentProps } from "../types";

export default function AutoFormRichTextarea({
  label,
  isRequired,
  field,
  fieldConfigItem,
  fieldProps,
}: AutoFormInputComponentProps) {
  const { showLabel: _showLabel, ...fieldPropsWithoutShowLabel } = fieldProps;
  const showLabel = _showLabel === undefined ? true : _showLabel;

  return (
    <FormItem>
      {showLabel && (
        <AutoFormLabel
          label={fieldConfigItem?.label || label}
          isRequired={isRequired}
        />
      )}
      <FormControl>
        <MinimalTiptapEditor
          autofocus={false}
          className="w-full"
          editable={true}
          editorClassName="focus:outline-none"
          editorContentClassName="p-5"
          immediatelyRender={false}
          injectCSS={true}
          onChange={(value) => field.onChange(value)}
          output="html"
          placeholder={fieldConfigItem.inputProps?.placeholder}
          throttleDelay={1000}
          value={field.value}
        />
      </FormControl>
      <AutoFormTooltip fieldConfigItem={fieldConfigItem} />
      <FormMessage />
    </FormItem>
  );
}
