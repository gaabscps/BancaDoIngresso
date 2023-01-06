import React from 'react';
import { Col, Form, FormGroup, Row } from 'reactstrap';
import { TextArea } from '@/components';
import { FormData, FormErrors, OnChangeFormInput } from '@/hooks/useForm';
import ClientComment from '@/model/ClientComment';
import { getItem } from '@/helpers/common/localStorage';
import { REACT_APP_USER } from '@/utils/config';
import avatar from '@/assets/images/avatar/avatar.png';
import { AuthUser } from '@/model/AuthUser';
import dayjs from 'dayjs';

interface RegisterCommentContentProps {
  formData: FormData;
  formErrors: FormErrors;
  comments: ClientComment[];
  onChangeFormInput: OnChangeFormInput;
}

// eslint-disable-next-line no-shadow
export enum FormInputComment {
  comment = 'comment',
}

export const RegisterCommentContent: React.FC<RegisterCommentContentProps> = ({
  formData,
  formErrors,
  comments,
  onChangeFormInput,
}) => {
  const user = getItem(String(REACT_APP_USER)) as AuthUser;
  return (
    <Form
      noValidate={true}
      onSubmit={(e): void => {
        e.preventDefault();
      }}
    >
      <Row>
        <Col md={12}>
          <FormGroup className="mb-2">
            <TextArea
              name="comment"
              label={
                <div className="media profile-media" title={user?.name}>
                  <img className="user-img" src={user?.imageUrl ? user?.imageUrl : avatar} alt="" />
                  <div className="media-body profile-name">
                    <span>{user?.name}</span>
                    <div className="profile-user" style={{ marginTop: '5px' }}>
                      {dayjs(new Date()).format('DD/MM/YYYY [às] HH:mm')} <i className=""></i>
                    </div>
                  </div>
                </div>
              }
              rows={6}
              placeholder="Escreva um comentário"
              value={formData[FormInputComment.comment]}
              onChange={e => onChangeFormInput(FormInputComment.comment)(e.target.value)}
              error={formErrors.comment && formErrors.comment[0]}
            />
          </FormGroup>
        </Col>
      </Row>
      {comments && comments.length > 0 ? (
        comments.map(data => (
          <Row key={data.id}>
            <Col md={12}>
              <Row>
                <Col md={12}>
                  <div className="media profile-media" title={user?.name}>
                    <img
                      className="user-img"
                      src={data.bindingUser.imageURL ? data.bindingUser.imageURL : avatar}
                      alt=""
                    />
                    <div className="media-body profile-name">
                      <span>{data.bindingUser.name}</span>
                      <div className="profile-user" style={{ marginTop: '5px' }}>
                        {dayjs(data.commentDate).format('DD/MM/YYYY [às] HH:mm')}{' '}
                        <i className=""></i>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <textarea className={'text-area-comment'} disabled={true} value={data.comment} />
                </Col>
              </Row>
            </Col>
          </Row>
        ))
      ) : (
        <Row>
          <Col md={12}>
            <textarea
              className={'text-area-comment'}
              disabled={true}
              value={
                'Nenhum comentário ainda foi feito. Deixe o primeiro comentário escrevendo algo no campo acima.'
              }
            />
          </Col>
        </Row>
      )}
    </Form>
  );
};
