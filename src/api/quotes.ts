import axios, {AxiosRequestConfig} from 'axios';
import {action, observable, runInAction} from 'mobx';
import {useContext, createContext} from 'react';

export type QuotesResponseSuccess = {
  [key: string]: {
    id: number;
    last: string;
    lowestAsk: string;
    highestBid: string;
    percentChange: string;
    baseVolume: string;
    quoteVolume: string;
    isFrozen: string;
    postOnly: string;
    high24hr: string;
    low24hr: string;
  };
};

export type QuotesResponseError = {error: string};

export class Api<TRequest> {
  @observable isError = false;
  @observable isLoading = false;
  @observable data: QuotesResponseSuccess = {};
  @observable error?: unknown;
  private _abortController?: AbortController = new AbortController();

  @action.bound
  public async requestWithInterval(params?: TRequest) {
    this.abort();
    const abortController = new AbortController();
    this._abortController = abortController;

    while (!abortController.signal.aborted) {
      await this._request({
        params,
        signal: abortController.signal,
      });

      await new Promise((r: any) => setTimeout(r, 5000));
    }
  }

  public abort() {
    this._abortController?.abort();
  }

  @action
  private async _request(config: AxiosRequestConfig) {
    try {
      this.isError = false;
      this.isLoading = true;
      this.error = undefined;

      const reponse = await axios.request<
        QuotesResponseSuccess | QuotesResponseError
      >({
        method: 'GET',
        url: 'https://poloniex.com/public?command=returnTicker',
        ...config,
      });

      runInAction(() =>
        reponse.data.error
          ? null
          : (this.data = reponse.data as QuotesResponseSuccess),
      );
    } catch (e) {
      if (!config.signal?.aborted) {
        runInAction(() => {
          this.isError = true;
          this.error = e;
        });
      }
    } finally {
      if (!config.signal?.aborted) {
        runInAction(() => (this.isLoading = false));
      }
    }
  }
}

const StoreContext = createContext(new Api<{}>());

const useStoreContext = () => useContext(StoreContext);

export default useStoreContext;
