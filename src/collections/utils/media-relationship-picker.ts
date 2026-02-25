import type {
  PayloadComponent,
  RelationshipField,
  RelationshipFieldClientComponent,
} from "payload";

type MediaRelationshipPickerClientProps = {
  buttonLabel?: string;
  emptyLabel?: string;
  helperText?: string;
  modalTitle?: string;
  pageSize?: number;
};

type MediaRelationshipPickerComponent = PayloadComponent<
  RelationshipFieldClientComponent,
  MediaRelationshipPickerClientProps
>;

const mediaRelationshipPickerComponentPath =
  "@/components/payload/MediaRelationshipPickerField";

export const createMediaRelationshipPickerComponent = (
  clientProps?: MediaRelationshipPickerClientProps
): MediaRelationshipPickerComponent => ({
  path: mediaRelationshipPickerComponentPath,
  exportName: "MediaRelationshipPickerField",
  ...(clientProps ? { clientProps } : {}),
});

export const withMediaRelationshipPicker = <TField extends RelationshipField>(
  field: TField,
  clientProps?: MediaRelationshipPickerClientProps
): TField => ({
  ...field,
  admin: {
    ...field.admin,
    components: {
      ...field.admin?.components,
      Field: createMediaRelationshipPickerComponent(clientProps),
    },
  },
});
