import React from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm, UseFormRegister } from "react-hook-form";

import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

import GVButton from "components/GVButton";
import GVBox from "components/GVBox";
import GVInput from "components/GVInput";
import GVTypography from "components/GVTypography";

import useAttributeTypes, { AttributeTypeData } from "hooks/attributes/useAttributeTypes";
import useAttributes, { AttributeData } from "hooks/attributes/useAttributes";

import attributeService from "services/attribute-service";
import DataTable from "features/Tables/DataTable";

import { ExtraColorKeys, FullPalletColorsKeys, GradientKeys } from "assets/theme/base/colors";
import DashboardLayout from "layouts/system-layouts/DashboardLayout";


type AttributeDataForm = {
  attributeName: string;
  attributeType: string;
  attributeDescription?: string;
}

type AttributeNameConstraints = "required" | "minLength" | "maxLength";

const attributeMessagesDict = {
	required: "O nome do atributo deve ser informado",
	minLength: "O nome do atributo deve ter no mínimo 5 caracteres",
	maxLength: "O nome do atributo deve ter no máximo 30 caracteres",
} as const;

function prepareAttributesForTable(attributes: AttributeData[], attributeTypesDict: any) {
  return {
    columns: [
      {
        accessorKey: "name",
        header: 'Nome do atributo',
        // footer: (props: any) => props.column.id,
      },
      {
        accessorKey: "description",
        header: "Descrição do atributo",
        // footer: (props: any) => props.column.id,
      },
      {
        accessorKey: "attributeType",
        header: "Tipo do atributo",
      }
    ],
    rows: attributes && attributes.map((attribute: any) => ({
      name: attribute.name,
      description: attribute.description,
      attributeType: attributeTypesDict && attributeTypesDict[attribute.attributeTypeUUID].name,
    })),
  };
}

type FormSelectProps = {
  errors: any;
  attributeTypes: AttributeTypeData[];
}

const FormSelect = React.forwardRef<
  HTMLSelectElement,
  { label: string } & ReturnType<UseFormRegister<AttributeDataForm>> & FormSelectProps
>(({ onChange, onBlur, name, label, errors, attributeTypes }, ref) => (
  <>
    <InputLabel id="attribute-type-select-label">{label}</InputLabel>
    <Select
      error={errors.attributeType ? true : false}
      labelId="attribute-type-select-label"
      label={label}
      ref={ref}
      onChange={onChange}
      onBlur={onBlur}
      name={name}
      defaultValue=""
    >
      <MenuItem key="not_selected" value=""><em>Não selecionado</em></MenuItem>
      {attributeTypes && (attributeTypes as AttributeTypeData[]).map((attrType: AttributeTypeData) => (
        <MenuItem key={attrType.externalUUID} value={attrType.externalUUID} title={attrType.description}>{attrType.name}</MenuItem>
      ))}
    </Select>
    {errors.attributeType && (
    <GVTypography
      variant="caption"
      color={"error" as GradientKeys & ExtraColorKeys}
      fontWeight="light">
        O tipo do atributo deve ser informado
      </GVTypography>
    )}
  </>
))

const FormInput = React.forwardRef<
  HTMLInputElement,
  { label: string; errors: any; fullWidth?: boolean } & ReturnType<UseFormRegister<AttributeDataForm>>
>(({ onChange, onBlur, name, label, errors }, ref) => (
  <GVInput 
    label={label}
    ref={ref}
    onChange={onChange}
    onBlur={onBlur}
    name={name}
    error={errors.attributeName ? true : false}
    type="text"
    fullWidth
  />
));

export default function CreateAttributes() {
  const location = useLocation();
  const match = location.pathname.match(/\/game\/([0-9a-f]{8}\-[0-9a-f]{4}\-[0-9a-f]{4}\-[0-9a-f]{4}\-[0-9a-f]{12})/);
  const gameUUID = match![1];
  const [ attributeTypes ] = useAttributeTypes();
  const { attributes, refreshAttributes } = useAttributes(gameUUID);
  const attributeTypesDict = attributeTypes && (attributeTypes as AttributeData[]).reduce((acc: any, attributeType: AttributeTypeData) => {
    acc[attributeType.externalUUID] = attributeType;
    return acc;
  }, ({}));

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<AttributeDataForm>({
    defaultValues: {
      attributeType: '',
    },
    resetOptions: {
      keepDirty: false,
      keepErrors: false,
      keepTouched: false,
      keepValues: false,
    }
  });
  const navigate = useNavigate();

  const submitAttribute = async (data: AttributeDataForm) => {
    const response = await attributeService.createAttributeForGame({
      attributeTypeUUID: data.attributeType,
      gameUUID,
      name: data.attributeName,
      description: data.attributeDescription,
    });
    if (!!response) {
      reset();
      refreshAttributes();
      console.log(response);
    }
  }

  const { columns, rows } = prepareAttributesForTable(attributes, attributeTypesDict);
  return (
    <DashboardLayout>
      <GVBox mt={3}>
        <Grid width="100%" xs={12}>
          <GVButton onClick={() => navigate('..')}>
            <Icon>left_arrow</Icon>
          </GVButton>
        </Grid>
      </GVBox>
      <GVBox mt={6}>
        <GVBox
          component="form"
          role="form"
          flexDirection="column"
          alignItems="flex-start"
          width="80%"
          onSubmit={handleSubmit(submitAttribute)}
        >
          <FormInput
            label="Nome do atributo"
            {...register("attributeName", { required: true, minLength: 5, maxLength: 30 })}
            errors={errors}
            fullWidth
          />
          {errors.attributeName && (
            <GVTypography
              variant="caption"
              color={"error" as GradientKeys & ExtraColorKeys}
              fontWeight="light"
              display="block"
            >
              {attributeMessagesDict[errors.attributeName.type as AttributeNameConstraints]}
            </GVTypography>
          )}
          <FormControl sx={{ minWidth: 140, marginTop: 3, }}>
            <FormSelect
              label="Tipo do atributo"
              errors={errors}
              attributeTypes={ attributeTypes as AttributeTypeData[]}
              {...register("attributeType", { required: true })}
            />
          </FormControl>
          <GVInput
            label="Descrição do atributo"
            multiline
            rows={5}
            {...register("attributeDescription")}
            sx={{marginTop: 3}}
            fullWidth/>
          <GVButton customVariant="gradient" color={"info" as FullPalletColorsKeys} onClick={() => handleSubmit(submitAttribute)()}>Adicionar</GVButton>
        </GVBox>
      </GVBox>
      <GVBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <GVBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <GVTypography variant="h6" color={"white" as GradientKeys & ExtraColorKeys}>
                  Atributos criados
                </GVTypography>
              </GVBox>
              <GVBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </GVBox>
            </Card>
          </Grid>          
        </Grid>
      </GVBox>
    </DashboardLayout>
  );
}