import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Vk} from '../../../../shared/ui/CustomIcons/Vk';
import {useOpenUrl} from '../../../../shared/hooks/useOpenUrl';
import {useOrgSocialQuery} from '../../queries/orgSocialQueries';
import {useCurrentOrgStore} from '../../stores/useCurrentOrgStore';

export const OrgVKButton = () => {
  const orgId = useCurrentOrgStore(state => state.orgId);
  const {data} = useOrgSocialQuery({idorganization: orgId!});

  const openUrl = useOpenUrl();

  const handlePress = async () => {
    const vkUrl = data?.social?.vk;

    if (!vkUrl) {
      return;
    }

    await openUrl(vkUrl);
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Vk />
    </TouchableOpacity>
  );
};
