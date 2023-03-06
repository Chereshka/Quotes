import {NavigationProp, useNavigation} from '@react-navigation/native';
import {observer} from 'mobx-react';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import useStoreContext from '../api/quotes';
import {KText} from '../components';

export const Quotes = observer(
  ({navigation}: {navigation: NavigationProp<any, any>}) => {
    // const navigation = useNavigation();

    const api = useStoreContext();
    const {isError, isLoading, data} = api;

    const renderItem = useCallback(
      (title: string, first: string, second: string, third: string) => (
        <View style={styles.row} key={title}>
          <KText text={title} style={[styles.rowElement, styles.rowTitle]} />
          <KText text={first} style={[styles.rowElement, styles.rowText]} />
          <KText text={second} style={[styles.rowElement, styles.rowText]} />
          <KText text={third} style={[styles.rowElement, styles.rowText]} />
        </View>
      ),
      [],
    );

    const header = useMemo(
      () =>
        renderItem(
          'Имя тикера',
          'Последняя цена',
          'Самая высокая цена',
          'Процент изменения цен',
        ),
      [],
    );

    const list = useMemo(
      () =>
        Object.entries(data ?? {}).map(([key, value]) =>
          renderItem(
            key,
            value.lowestAsk,
            value.highestBid,
            value.percentChange,
          ),
        ),
      [data],
    );

    useEffect(() => {
      navigation.addListener('focus', e => api.requestWithInterval({}));
      navigation.addListener('blur', e => api.abort());

      return () => {
        navigation.removeListener('focus', e => api.requestWithInterval({}));
        navigation.addListener('blur', e => api.abort());
      };
    }, [navigation]);

    return (
      <SafeAreaView style={styles.main}>
        {header}
        <ScrollView>{list}</ScrollView>

        {isLoading && <ActivityIndicator size="large" style={styles.loader} />}
        {isError && <KText text="Ошибка обновления" style={styles.error} />}
      </SafeAreaView>
    );
  },
);

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 2,
  },
  rowElement: {
    width: '25%',
    textAlign: 'center',
    textAlignVertical: 'center',
    paddingBottom: 4,
    padding: 5,
  },
  rowTitle: {
    color: '#000',
    fontWeight: '700',
  },
  rowText: {
    borderLeftWidth: 2,
  },
  loader: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 70,
    borderRadius: 20,
    backgroundColor: '#fff',
  },
  error: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    backgroundColor: '#fff',
    borderColor: 'red',
    color: 'red',
    borderWidth: 2,
  },
});
