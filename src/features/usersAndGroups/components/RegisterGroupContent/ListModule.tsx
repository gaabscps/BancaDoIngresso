import React from 'react';
import { Input } from 'reactstrap';
import { CheckBoxModule, CheckBoxPermission } from '../../screens/List';

interface StateProps {
  module: CheckBoxModule;
}

interface DispatchProps {
  check(e: React.ChangeEvent<HTMLInputElement>, permission: CheckBoxPermission): void;
}

type Props = StateProps & DispatchProps;

export const ListModule: React.FC<Props> = (props: Props): JSX.Element => (
  <table>
    <tbody style={{ width: '100%' }}>
      {props.module.permissions.map(data => (
        <div className="checkbox-list" key={data.id}>
          <Input
            type="checkbox"
            value={data.check}
            checked={data.check === 'true'}
            onChange={e => props.check(e, data)}
          />
          <span title={data.name} className="checkbox-list-name">
            {data.name}
          </span>
        </div>
      ))}
    </tbody>
  </table>
);
