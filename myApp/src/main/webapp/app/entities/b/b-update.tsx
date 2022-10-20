import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IA } from 'app/shared/model/a.model';
import { getEntities as getAs } from 'app/entities/a/a.reducer';
import { IB } from 'app/shared/model/b.model';
import { getEntity, updateEntity, createEntity, reset } from './b.reducer';

export const BUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const as = useAppSelector(state => state.myapp.a.entities);
  const bEntity = useAppSelector(state => state.myapp.b.entity);
  const loading = useAppSelector(state => state.myapp.b.loading);
  const updating = useAppSelector(state => state.myapp.b.updating);
  const updateSuccess = useAppSelector(state => state.myapp.b.updateSuccess);

  const handleClose = () => {
    navigate('/b');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getAs({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...bEntity,
      ...values,
      a: as.find(it => it.id.toString() === values.a.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {}
      : {
          ...bEntity,
          a: bEntity?.a?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="myApp.b.home.createOrEditLabel" data-cy="BCreateUpdateHeading">
            <Translate contentKey="myApp.b.home.createOrEditLabel">Create or edit a B</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? (
                <ValidatedField name="id" required readOnly id="b-id" label={translate('global.field.id')} validate={{ required: true }} />
              ) : null}
              <ValidatedField id="b-a" name="a" data-cy="a" label={translate('myApp.b.a')} type="select">
                <option value="" key="0" />
                {as
                  ? as.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/b" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default BUpdate;
