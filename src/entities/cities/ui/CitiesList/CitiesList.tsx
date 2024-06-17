import React, {FC} from 'react';
import {Text, SectionList, StyleSheet} from 'react-native';
import {useCityGroups} from '../../hooks/useCityGroups';
import {COLORS, INDENTS} from '../../../../shared/styles';
import {ListButton} from '../../../../shared/ui/ListButton';
import {City} from '../../types/citiesTypes';

type Props = {
  onChange: (city: City) => void;
};

export const CitiesList: FC<Props> = ({onChange}) => {
  const cityGroups = useCityGroups();

  return (
    <SectionList
      style={styles.sectionList}
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
      scrollIndicatorInsets={{top: -1, bottom: 0}}
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
});
