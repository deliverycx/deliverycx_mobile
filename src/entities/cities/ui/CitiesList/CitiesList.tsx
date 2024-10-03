import React, {FC} from 'react';
import {
  Insets,
  SectionList,
  StyleProp,
  StyleSheet,
  Text,
  ViewStyle,
} from 'react-native';
import {COLORS, INDENTS} from '../../../../shared/styles';
import {Container} from '../../../../shared/ui/Container';
import {InfoStatus} from '../../../../shared/ui/InfoStatus';
import {ListButton} from '../../../../shared/ui/ListButton';
import {useCityGroups} from '../../hooks/useCityGroups';
import {useCitiesQuery} from '../../queries/citiesQueries';
import {City} from '../../types/citiesTypes';
import {CitiesSkeleton} from '../CitiesSkeleton';

type Props = {
  onChange: (city: City) => void;
  style?: StyleProp<ViewStyle>;
  searchValue: string;
  scrollIndicatorInsets?: Insets;
};

export const CitiesList: FC<Props> = ({
  onChange,
  style,
  searchValue,
  scrollIndicatorInsets,
}) => {
  const {isFetched} = useCitiesQuery();
  const cityGroups = useCityGroups({searchValue});

  if (!isFetched) {
    return <CitiesSkeleton />;
  }

  if (cityGroups.length === 0 && isFetched) {
    return (
      <Container style={styles.notFoundOrg}>
        <InfoStatus
          variant="sad"
          text="К сожалению, у нас пока нет ресторана в вашем городе."
        />
      </Container>
    );
  }

  return (
    <SectionList
      style={[styles.sectionList, style]}
      sections={cityGroups}
      keyExtractor={item => item.id}
      renderItem={({item}) => (
        <ListButton
          onPress={() => onChange(item)}
          style={styles.button}
          key={item.id}
          text={item.name}
        />
      )}
      scrollIndicatorInsets={scrollIndicatorInsets}
      renderSectionHeader={({section: {title}}) => {
        return <Text style={styles.letter}>{title}</Text>;
      }}
    />
  );
};

export const styles = StyleSheet.create({
  sectionList: {
    backgroundColor: COLORS.backgroundPrimary,
  },
  letter: {
    paddingLeft: INDENTS.main,
    paddingRight: INDENTS.main,
    paddingTop: 8,
    paddingBottom: 8,
    color: COLORS.main,
    backgroundColor: COLORS.backgroundSecondary,
    fontSize: 18,
  },
  button: {
    marginLeft: INDENTS.main,
    paddingRight: INDENTS.main,
    paddingTop: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  buttonText: {
    fontSize: 18,
  },
  notFoundOrg: {
    flex: 1,
    justifyContent: 'center',
  },
});
