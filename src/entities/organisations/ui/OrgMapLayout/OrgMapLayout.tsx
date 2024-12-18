import React, {FC, useCallback, useEffect, useState} from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import {useOrganisationsQuery} from '../../queries/organisationsQueries';
import {Organisation} from '../../types/organisationsTypes';
import {OrgInfo} from '../OrgInfo';
import {OrgMap} from '../OrgMap';

type Props = {
  style?: StyleProp<ViewStyle>;
  cityId: string;
};

export const OrgMapLayout: FC<Props> = ({cityId, style}) => {
  const {data} = useOrganisationsQuery({cityId});

  const [organisationInfo, setOrganisationInfo] = useState<Organisation | null>(
    null,
  );

  const handleOrgInfoClose = useCallback(() => {
    setOrganisationInfo(null);
  }, []);

  useEffect(() => {
    if (data?.length === 1) {
      setOrganisationInfo(data[0]);
    }
  }, [data]);

  if (!data) {
    return null;
  }

  return (
    <>
      <OrgMap data={data} style={style} onOrgPress={setOrganisationInfo} />
      {organisationInfo && (
        <OrgInfo data={organisationInfo} onCloseRequest={handleOrgInfoClose} />
      )}
    </>
  );
};
