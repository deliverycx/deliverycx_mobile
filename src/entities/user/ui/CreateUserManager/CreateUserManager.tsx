import {useUserStore} from '../../stores/useUserStore';
import {useCreateUser} from '../../queries/userQueries';
import {useEffect} from 'react';
import {Alert} from 'react-native';

export const CreateUserManager = () => {
  const user = useUserStore(state => state.user);
  const setUser = useUserStore(state => state.setUser);
  const {mutateAsync} = useCreateUser();

  useEffect(() => {
    if (user || !useUserStore.persist.hasHydrated()) {
      return;
    }

    (async function () {
      try {
        const userResponse = await mutateAsync();
        setUser(userResponse);
      } catch (err) {
        Alert.alert(
          'Не удалось создать пользователя',
          'Приложение продолжает работать, но могут возникнуть ошибки при оформлении заказа',
          [{text: 'Хорошо'}],
        );
      }
    })();
  }, [user, setUser, mutateAsync]);

  return null;
};
