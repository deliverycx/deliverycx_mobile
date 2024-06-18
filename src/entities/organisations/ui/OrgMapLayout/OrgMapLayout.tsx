import React, {FC, useState, useCallback} from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import {useOrganisationsQuery} from '../../queries/organisationsQueries';
import {OrgInfo} from '../OrgInfo';
import {OrgMap} from '../OrgMap';
import {Organisation} from '../../types/organisationsTypes';

type Props = {
  style?: StyleProp<ViewStyle>;
  onChange: () => void;
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

  if (!data) {
    return null;
  }

  return (
    <>
      <OrgMap data={data} style={style} onOrgPress={setOrganisationInfo} />
      {organisationInfo && (
        <OrgInfo
          data={organisationInfo}
          onSelect={() => {}}
          onCloseRequest={handleOrgInfoClose}
        />
      )}
    </>
  );
};
