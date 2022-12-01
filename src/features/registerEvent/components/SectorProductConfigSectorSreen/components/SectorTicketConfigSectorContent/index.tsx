/* eslint-disable import/no-unresolved */
import React, { Fragment } from 'react';
import { InputFile, SelectCustom } from '@/components';
import { Form, FormGroup } from 'reactstrap';
import { SectorProductConfigSectorContainerProps } from '../../screens/ui';
import { SectorRegisterToDropDownScreen } from '../../../SectorRegisterToDropDownScreen/screens';

// eslint-disable-next-line no-shadow
export enum States {
  default = 'default',
  loading = 'loading',
}

// eslint-disable-next-line no-shadow
export enum FormInputName {
  section = 'section',
  imageBase64 = 'imageBase64',
}

export const SectorProductConfigSectorContent: React.FC<
  Pick<
    SectorProductConfigSectorContainerProps,
    'formConfigSector' | 'configSectorActions' | 'configSectorStates'
  >
> = ({ formConfigSector, configSectorActions, configSectorStates }) => {
  const { formData, formErrors, onChangeFormInput, onChangeFormFileInput, formNameFiles } =
    formConfigSector;

  const sectorSelected = configSectorStates?.sectorDropdown.find(
    sector => sector.id === formData[FormInputName.section],
  );

  return (
    <Fragment>
      <Form
        noValidate={true}
        onSubmit={(e): void => {
          e.preventDefault();
        }}
      >
        <FormGroup className="mb-2">
          <SelectCustom
            name="section"
            label="Nome do setor"
            placeholder="Digite ou selecione o nome do setor"
            value={formData[FormInputName.section]}
            onChange={e => onChangeFormInput(FormInputName.section)(e?.value as string)}
            error={formErrors.section && formErrors.section[0]}
            options={configSectorStates.sectorDropdown.map(sector => ({
              value: sector.id,
              label: sector.name,
            }))}
          />
          <SectorRegisterToDropDownScreen
            sectorStates={sectorSelected}
            sectorActions={configSectorActions}
          />
        </FormGroup>
        <FormGroup className="mb-2">
          <InputFile
            name="imageBase64"
            label="Imagem do setor (opcional)"
            fileName={formNameFiles?.imageBase64}
            onChange={e =>
              onChangeFormFileInput(FormInputName.imageBase64)(
                (e.target as HTMLInputElement)?.files?.[0],
              )
            }
            error={formErrors.imageBase64 && formErrors.imageBase64[0]}
          />
        </FormGroup>
      </Form>
    </Fragment>
  );
};