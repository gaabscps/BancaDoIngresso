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
    <tbody>
      {props.module.permissions.map(data => (
        <tr key={data.id}>
          <td style={{ verticalAlign: 'baseline' }}>
            <Input
              type="checkbox"
              value={data.check}
              checked={data.check === 'true'}
              onChange={e => props.check(e, data)}
            />
          </td>
          <td
            style={{
              fontSize: '0.75rem',
              fontWeight: '300',
              color: 'rgba(0,0,0,0.87)',
            }}
          >
            {data.name}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);
