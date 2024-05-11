import React from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { UseFormRegister, useForm } from "react-hook-form";

import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

import useActionTypes from "hooks/actions/useActionTypes";
import useScheduleTypes from "hooks/actions/useScheduleTypes";
import useAttributes from "hooks/attributes/useAttributes";

import GVButton from "components/GVButton";
import GVBox from "components/GVBox";
import GVInput from "components/GVInput";
import GVTypography from "components/GVTypography";

import DashboardLayout from "layouts/system-layouts/DashboardLayout";
import DataTable from "features/Tables/DataTable";
import colorUtils from "utils/colorUtils";
import actionService, { ActionData } from "services/action-service";
import useActions from "hooks/actions/useActions";


type ActionDataForm = {
  actionName: string;
  actionType: string;
  scheduleType: string;
  actionDescription?: string;
  scheduleExpression?: string;
  attribute: string;
}

type SelectDataType = {
  externalUUID: string;
  description?: string;
  name: string;
}

type FormSelectProps = {
  errors: any;
  errorMessage: string;
  selectOptions: SelectDataType[];
}

const FormSelect = React.forwardRef<
  HTMLSelectElement,
  { label: string } & ReturnType<UseFormRegister<ActionDataForm>> & FormSelectProps
>(({ onChange, onBlur, name, label, errors, errorMessage, selectOptions }, ref) => (
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
      {selectOptions && (selectOptions as SelectDataType[]).map((attrType: SelectDataType) => (
        <MenuItem key={attrType.externalUUID} value={attrType.externalUUID} title={attrType.description}>{attrType.name}</MenuItem>
      ))}
    </Select>
    {errors.attributeType && (
    <GVTypography
      variant="caption"
      color={colorUtils.convertStringToTypographyColor("error")}
      fontWeight="light">
        {errorMessage}
      </GVTypography>
    )}
  </>
))

const FormInput = React.forwardRef<
  HTMLInputElement,
  { label: string; errors: any; fullWidth?: boolean } & ReturnType<UseFormRegister<ActionDataForm>>
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

type ActionNameConstraints = "required" | "minLength" | "maxLength";
const actionNameMessagesDict = {
	required: "O nome da ação deve ser informado",
	minLength: "O nome da ação deve ter no mínimo 5 caracteres",
	maxLength: "O nome da ação deve ter no máximo 30 caracteres",
} as const;

function prepareActionsForTable(actions: ActionData[], actionTypeDict: any, attributesDict: any) {
  return {
    columns: [
      {
        accessorKey: "name",
        header: 'Nome da ação',
        // footer: (props: any) => props.column.id,
      },
      {
        accessorKey: "description",
        header: "Descrição da ação",
        // footer: (props: any) => props.column.id,
      },
      {
        accessorKey: "actionType",
        header: "Tipo da ação",
      },
      {
        accessorKey: "attribute",
        header: "Atributo",
      }
    ],
    rows: actions && actions.map((action) => ({
      name: action.name,
      description: action.description,
      actionType: actionTypeDict && actionTypeDict[action.actionTypeUUID].name,
      attribute: attributesDict && attributesDict[action.attributeUUID].name,
    })),
  };
}

export default function CreateActions() {
  const location = useLocation();
  const match = location.pathname.match(/\/game\/([0-9a-f]{8}\-[0-9a-f]{4}\-[0-9a-f]{4}\-[0-9a-f]{4}\-[0-9a-f]{12})/);
  const gameUUID = match![1];
  const { actionTypes, actionTypesDict } = useActionTypes();
  const [ scheduleTypes ] = useScheduleTypes();
  const { attributes, attributesDict } = useAttributes(gameUUID);
  const { actions, refreshActions } = useActions(gameUUID);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
  } = useForm<ActionDataForm>({
    defaultValues: {
      actionType: '',
      scheduleType: '',
      attribute: '',
    },
    resetOptions: {
      keepDirty: false,
      keepErrors: false,
      keepTouched: false,
      keepValues: false,
    }
  });
  const watchActionType: string = watch('actionType');
  const navigate = useNavigate();

  const { rows, columns } = prepareActionsForTable(actions, actionTypesDict, attributesDict);

  const submitAction = async (data: ActionDataForm) => {
    const response = await actionService.createAction({
      gameUUID,
      name: data.actionName,
      attributeUUID: data.attribute,
      actionTypeUUID: data.actionType,
      description: data.actionDescription,
      scheduleTypeUUID: data.scheduleType,
      schedule: data.scheduleExpression,
    });
    if (!!response) {
      reset();
      refreshActions();
    }
  }

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
          onSubmit={handleSubmit(submitAction)}
        >
          <FormInput
            label="Nome da ação"
            {...register("actionName", { required: true, minLength: 5, maxLength: 30 })}
            errors={errors}
            fullWidth
          />
          {errors.actionName && (
            <GVTypography
              variant="caption"
              color={colorUtils.convertStringToTypographyColor("error")}
              fontWeight="light"
              display="block"
            >
              {actionNameMessagesDict[errors.actionName.type as ActionNameConstraints]}
            </GVTypography>
          )}
          <GVInput
            label="Descrição da ação"
            multiline
            rows={5}
            {...register("actionDescription")}
            sx={{marginTop: 3}}
            fullWidth/>
          <GVBox display="flex" flexDirection="column" sx={{ marginBottom: 3 }}>
            <FormControl sx={{ minWidth: 140, marginTop: 3, }}>
              <FormSelect
                label="Atributo a ser alterado pela ação"
                errors={errors}
                selectOptions={ attributes as SelectDataType[]}
                errorMessage="O attributo a ser alterado pela ação deve ser informado"
                {...register("attribute", { required: true })}
              />
            </FormControl>
            <FormControl sx={{ minWidth: 140, marginTop: 3 }}>
              <FormSelect
                label="Tipo da ação"
                errors={errors}
                selectOptions={ actionTypes as SelectDataType[]}
                errorMessage="O tipo da ação deve ser informado"
                {...register("actionType", { required: true })}
              />
            </FormControl>
            { (!!watchActionType && actionTypesDict[watchActionType].name === 'ACAO AGENDADA') &&
            (
              <>
                <FormControl sx={{ minWidth: 140, marginTop: 3 }}>
                  <FormSelect
                    label="Tipo de agendamento da ação"
                    errors={errors}
                    selectOptions={ scheduleTypes as SelectDataType[]}
                    errorMessage="O tipo de agendamenteo da ação deve ser informado"
                    {...register("actionType", { required: true })}
                  />
                </FormControl>
                <GVInput
                  label="Descrição da ação"
                  multiline
                  rows={5}
                  {...register("actionDescription")}
                  sx={{marginTop: 3}}
                  fullWidth/>
              </>            
            )}
          </GVBox>
          <GVButton customVariant="gradient" color={colorUtils.convertStringToPalleteColor("info")} onClick={() => handleSubmit(submitAction)()}>Adicionar</GVButton>
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
                <GVTypography variant="h6" color={colorUtils.convertStringToTypographyColor("white")}>
                  Ações criadas
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