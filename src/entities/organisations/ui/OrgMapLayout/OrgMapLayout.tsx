import React, {FC, useState, useCallback, useEffect} from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import {useOrganisationsQuery} from '../../queries/organisationsQueries';
import {OrgInfo} from '../OrgInfo';
import {OrgMap} from '../OrgMap';
import {Organisation} from '../../types/organisationsTypes';

type Props = {
  style?: StyleProp<ViewStyle>;
  onChange: (org: Organisation) => void;
  cityId: string;
};

export const OrgMapLayout: FC<Props> = ({cityId, style, onChange}) => {
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
        <OrgInfo
          data={organisationInfo}
          onSelect={onChange}
          onCloseRequest={handleOrgInfoClose}
        />
      )}
    </>
  );
};
