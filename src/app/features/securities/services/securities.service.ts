import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, delay } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import {
  Security,
  Stock,
  Future,
  Forex,
  SecuritiesFilters,
  SecuritiesPage,
  PriceHistory,
  PricePoint,
  OptionChain,
  StockOption,
  SortConfig,
} from '../models/security.model';

@Injectable({ providedIn: 'root' })
export class SecuritiesService {
  private readonly baseUrl = `${environment.apiUrl}/order/orders`;

  constructor(private readonly http: HttpClient) {}

  /**
   * Get list of stocks with filters and pagination
   */
  getStocks(
    filters: SecuritiesFilters = {},
    page = 0,
    size = 10,
    sort?: SortConfig
  ): Observable<SecuritiesPage<Stock>> {
    let params = new HttpParams()
      .set('status', "ALL")

    return this.http.get<SecuritiesPage<Stock>>(`${this.baseUrl}`, { params });
  }


  /**
   * Get list of futures with filters and pagination
   */
  getFutures(
    filters: SecuritiesFilters = {},
    page = 0,
    size = 10,
    sort?: SortConfig
  ): Observable<SecuritiesPage<Future>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sortBy', sort?.field || 'ticker')
      .set('sortDirection', sort?.direction || 'asc');

    return this.http.get<any>(`${environment.apiUrl}/stock/api/listings/futures`, { params }).pipe(
      map(response => ({
        ...response,
        content: response.content.map((item: any) => {
          // Handle zero/null prices
          const price = item.price || 1.0;
          const change = item.change || 0;
          const changePercent = price > 0 ? (change / price) * 100 : 0;
          
          return {
            id: item.listingId,
            ticker: item.ticker,
            name: item.name,
            exchange: item.exchangeMICCode,
            price: price,
            currency: 'USD',
            change: change,
            changePercent: changePercent,
            volume: item.volume || 0,
            maintenanceMargin: (item.initialMarginCost || 0) * 0.8,
            initialMarginCost: item.initialMarginCost || 0,
            type: 'FUTURE' as const,
            lastUpdated: new Date().toISOString(),
            settlementDate: item.settlementDate,
            contractSize: 1,
            openInterest: 0,
            high: price * 1.02,
            low: price * 0.98,
            open: price,
            previousClose: price - change,
            bid: price > 0 ? price - 0.01 : 0.99,
            ask: price > 0 ? price + 0.01 : 1.01,
          } as Future;
        })
      }))
    );
  }

  /**
   * Get list of forex pairs with filters and pagination
   */
  getForex(
    filters: SecuritiesFilters = {},
    page = 0,
    size = 10,
    sort?: SortConfig
  ): Observable<SecuritiesPage<Forex>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sortBy', sort?.field || 'ticker')
      .set('sortDirection', sort?.direction || 'asc');

    return this.http.get<any>(`${environment.apiUrl}/stock/api/listings/forex`, { params }).pipe(
      map(response => ({
        ...response,
        content: response.content.map((item: any) => {
          // Handle zero/null prices
          const price = item.price || 1.0;
          const change = item.change || 0;
          const changePercent = price > 0 ? (change / price) * 100 : 0;
          
          return {
            id: item.listingId,
            ticker: item.ticker,
            name: item.name,
            exchange: item.exchangeMICCode,
            price: price,
            currency: 'USD',
            change: change,
            changePercent: changePercent,
            volume: item.volume || 0,
            maintenanceMargin: (item.initialMarginCost || 0) * 0.8,
            initialMarginCost: item.initialMarginCost || 0,
            type: 'FOREX' as const,
            lastUpdated: new Date().toISOString(),
            baseCurrency: item.ticker.split('/')[0] || 'USD',
            quoteCurrency: item.ticker.split('/')[1] || 'USD',
            bid: price > 0 ? price - 0.0001 : 0.9999,
            ask: price > 0 ? price + 0.0001 : 1.0001,
            spread: 0.0002,
            high: price * 1.01,
            low: price * 0.99,
            open: price,
            previousClose: price - change,
          } as Forex;
        })
      }))
    );
  }

  /**
   * Get stock by ticker
   */
  getStockByTicker(ticker: string): Observable<Stock> {
    return this.getStocks({}, 0, 100).pipe(
      map(page => {
        const stock = page.content.find(s => s.ticker === ticker);
        if (!stock) throw new Error(`Stock ${ticker} not found`);
        return stock;
      })
    );
  }

  /**
   * Get future by id (listingId)
   */
  getFutureById(id: number): Observable<Future> {
    const params = new HttpParams().set('period', 'MONTH');
    return this.http.get<any>(`${environment.apiUrl}/stock/api/listings/${id}`, { params }).pipe(
      map((item: any) => {
        // Handle zero/null prices
        const price = item.price || 1.0;
        const change = item.change || 0;
        const changePercent = price > 0 ? (change / price) * 100 : 0;
        
        return {
          id: item.listingId,
          ticker: item.ticker,
          name: item.name,
          exchange: item.exchangeMICCode,
          price: price,
          currency: 'USD',
          change: change,
          changePercent: changePercent,
          volume: item.volume || 0,
          maintenanceMargin: (item.initialMarginCost || 0) * 0.8,
          initialMarginCost: item.initialMarginCost || 0,
          type: 'FUTURE' as const,
          lastUpdated: new Date().toISOString(),
          settlementDate: item.settlementDate,
          contractSize: 1,
          openInterest: 0,
          high: price * 1.02,
          low: price * 0.98,
          open: price,
          previousClose: price - change,
          bid: price > 0 ? price - 0.01 : 0.99,
          ask: price > 0 ? price + 0.01 : 1.01,
        } as Future;
      })
    );
  }

  /**
   * Get forex by id (listingId)
   */
  getForexById(id: number): Observable<Forex> {
    const params = new HttpParams().set('period', 'MONTH');
    return this.http.get<any>(`${environment.apiUrl}/stock/api/listings/${id}`, { params }).pipe(
      map((item: any) => {
        // Handle zero/null prices
        const price = item.price || 1.0;
        const change = item.change || 0;
        const changePercent = price > 0 ? (change / price) * 100 : 0;
        
        return {
          id: item.listingId,
          ticker: item.ticker,
          name: item.name,
          exchange: item.exchangeMICCode,
          price: price,
          currency: 'USD',
          change: change,
          changePercent: changePercent,
          volume: item.volume || 0,
          maintenanceMargin: (item.initialMarginCost || 0) * 0.8,
          initialMarginCost: item.initialMarginCost || 0,
          type: 'FOREX' as const,
          lastUpdated: new Date().toISOString(),
          baseCurrency: item.ticker.split('/')[0],
          quoteCurrency: item.ticker.split('/')[1],
          bid: price > 0 ? price - 0.0001 : 0.9999,
          ask: price > 0 ? price + 0.0001 : 1.0001,
          spread: 0.0002,
          high: price * 1.01,
          low: price * 0.99,
          open: price,
          previousClose: price - change,
        } as Forex;
      })
    );
  }

  /**
   * Get price history for a security
   */
  getPriceHistory(ticker: string, period: string): Observable<PriceHistory> {
    // Map period from component format to API format
    const periodMap: Record<string, string> = {
      'day': 'DAY',
      'week': 'WEEK',
      'month': 'MONTH',
      'year': 'YEAR',
      '5year': 'FIVE_YEARS',
      'all': 'ALL'
    };

    const apiPeriod = periodMap[period] || 'MONTH';

    // Extract listing id from ticker (ticker contains the id in this context)
    const listingId = ticker;

    const params = new HttpParams().set('period', apiPeriod);

    return this.http.get<any>(`${environment.apiUrl}/stock/api/listings/${listingId}`, { params }).pipe(
      map((response: any) => {
        // Map the response to PriceHistory format
        const priceData = response.priceHistory ? response.priceHistory.map((point: any) => ({
          date: point.date,
          price: point.price,
          volume: point.volume || 0
        })) : [];
        return {
          ticker: response.ticker || ticker,
          period: period,
          data: priceData
        } as PriceHistory;
      })
    );
  }

  /**
   * Get option chain for a stock
   */
  getOptionChain(ticker: string, settlementDate: string): Observable<OptionChain> {
    return this.getMockOptionChain(ticker, settlementDate);
  }

  /**
   * Get available settlement dates for options
   */
  getOptionSettlementDates(ticker: string): Observable<string[]> {
    return of([
      '2026-03-31',
      '2026-04-30',
      '2026-05-31',
      '2026-06-30',
      '2026-09-30',
      '2026-12-31',
    ]).pipe(delay(100));
  }

  // ─── Mock Data Methods ────────────────────────────────────────────────────

  private getMockOptionChain(ticker: string, settlementDate: string): Observable<OptionChain> {
    const currentPrice = 178.25; // AAPL example
    const strikes = [165, 170, 175, 180, 185, 190, 195, 200];

    const expiry = new Date(settlementDate);
    const today = new Date();
    const daysToExpiry = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    const calls: StockOption[] = strikes.map(strike => ({
      strike,
      type: 'CALL' as const,
      last: Math.max(0.01, currentPrice - strike + (Math.random() * 5)),
      theta: -(Math.random() * 0.15 + 0.01),
      bid: Math.max(0.01, currentPrice - strike + (Math.random() * 4)),
      ask: Math.max(0.02, currentPrice - strike + (Math.random() * 6)),
      volume: Math.floor(Math.random() * 5000) + 100,
      openInterest: Math.floor(Math.random() * 10000) + 500,
      inTheMoney: strike < currentPrice,
    }));

    const puts: StockOption[] = strikes.map(strike => ({
      strike,
      type: 'PUT' as const,
      last: Math.max(0.01, strike - currentPrice + (Math.random() * 5)),
      theta: -(Math.random() * 0.15 + 0.01),
      bid: Math.max(0.01, strike - currentPrice + (Math.random() * 4)),
      ask: Math.max(0.02, strike - currentPrice + (Math.random() * 6)),
      volume: Math.floor(Math.random() * 5000) + 100,
      openInterest: Math.floor(Math.random() * 10000) + 500,
      inTheMoney: strike > currentPrice,
    }));

    return of({
      settlementDate,
      daysToExpiry,
      calls,
      puts,
      strikes,
    }).pipe(delay(200));
  }

  // ─── Helper Methods ────────────────────────────────────────────────────────

  private applyFilters<T extends Security>(items: T[], filters: SecuritiesFilters): T[] {
    let result = [...items];

    if (filters.search) {
      const search = filters.search.toLowerCase();
      result = result.filter(item =>
        item.ticker.toLowerCase().includes(search) ||
        item.name.toLowerCase().includes(search)
      );
    }

    if (filters.exchange) {
      result = result.filter(item =>
        item.exchange.toLowerCase().includes(filters.exchange!.toLowerCase())
      );
    }

    if (filters.priceMin !== undefined) {
      result = result.filter(item => item.price >= filters.priceMin!);
    }
    if (filters.priceMax !== undefined) {
      result = result.filter(item => item.price <= filters.priceMax!);
    }

    if (filters.volumeMin !== undefined) {
      result = result.filter(item => item.volume >= filters.volumeMin!);
    }
    if (filters.volumeMax !== undefined) {
      result = result.filter(item => item.volume <= filters.volumeMax!);
    }

    if (filters.marginMin !== undefined) {
      result = result.filter(item => item.maintenanceMargin >= filters.marginMin!);
    }
    if (filters.marginMax !== undefined) {
      result = result.filter(item => item.maintenanceMargin <= filters.marginMax!);
    }

    return result;
  }

  private applySorting<T extends Security>(items: T[], sort: SortConfig): T[] {
    return [...items].sort((a, b) => {
      let aVal: number | string;
      let bVal: number | string;

      switch (sort.field) {
        case 'price': aVal = a.price; bVal = b.price; break;
        case 'volume': aVal = a.volume; bVal = b.volume; break;
        case 'change': aVal = a.changePercent; bVal = b.changePercent; break;
        case 'margin': aVal = a.maintenanceMargin; bVal = b.maintenanceMargin; break;
        case 'ticker': aVal = a.ticker; bVal = b.ticker; break;
        case 'name': aVal = a.name; bVal = b.name; break;
        default: return 0;
      }

      if (typeof aVal === 'string') {
        const comparison = aVal.localeCompare(bVal as string);
        return sort.direction === 'asc' ? comparison : -comparison;
      }

      return sort.direction === 'asc' ? aVal - (bVal as number) : (bVal as number) - aVal;
    });
  }

  private paginate<T>(items: T[], page: number, size: number): Observable<SecuritiesPage<T>> {
    const totalElements = items.length;
    const totalPages = Math.ceil(totalElements / size);
    const start = page * size;
    const content = items.slice(start, start + size);

    return of({
      content,
      totalElements,
      totalPages,
      number: page,
      size,
    }).pipe(delay(300));
  }
}
