import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import React, {useCallback} from 'react';
import {Button, SafeAreaView, StyleSheet} from 'react-native';
import {PAGES} from '../../src_old/navigation/AppNavigation';
import {KText} from '../components';
import {colors} from '../staticData/colors';

const STACK = ['TypeScript', 'React Native', 'Axios', 'Mob X'];

export const About = ({
  navigation,
}: {
  navigation: BottomTabNavigationProp<any, any>;
}) => {
  const renderItem = useCallback(
    (text: string) => <KText key={text} text={text} style={styles.stackText} />,
    [],
  );

  const toQuates = useCallback(() => navigation.navigate(PAGES.QUOTES), []);

  return (
    <SafeAreaView style={styles.main}>
      <KText
        style={styles.title}
        text={`Тестовое задание по вакансии\nReact Native.`}
      />
      {STACK.map(renderItem)}

      <Button title="К катировкам" onPress={toQuates} color="#000" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: colors.background,
    paddingHorizontal: 20,
  },
  title: {
    marginVertical: 20,
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    color: '#000',
  },
  stackText: {
    marginBottom: 20,
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    backgroundColor: '#fff',
    color: '#000',
    borderRadius: 8,
    paddingVertical: 7,
  },
});
