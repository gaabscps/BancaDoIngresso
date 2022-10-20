import React from 'react';
import Module from '@/model/Module';
import Permission from '@/model/Permission';
import { Input } from 'reactstrap';

interface StateProps {
  module: Module;
}

interface DispatchProps {
  check(permission: Permission): void;
}

type Props = StateProps & DispatchProps;

export const ListModule: React.FC<Props> = (props: Props): JSX.Element => (
  <table>
    <tbody>
      {props.module.permissions.map(data => (
        <tr key={data.id}>
          <td style={{ verticalAlign: 'baseline' }}>
            <Input type="checkbox" onChange={() => props.check(data)} />
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
