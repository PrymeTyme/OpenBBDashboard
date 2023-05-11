from openbb_terminal.sdk import openbb
import pandas as pd

""" symbols = openbb.etf.holdings('XLK')
dia_symbols = list(symbols.index.drop(['N/A']))
dia_valuation = openbb.stocks.ca.screener(similar = dia_symbols, data_type = 'performance') #valuation
dia_valuation = dia_valuation.sort_values(by = ['Price'], ascending = False).convert_dtypes()

test_symbol = openbb.stocks.ca.screener(similar=['XLC','XLY','XLP','XLE','XLF','XLV','XLI','XLB','XLRE','XLK','XLU','SPY'],data_type='performance')#how to get specifix sector etf data
test_symbol_perf = dia_valuation.sort_values(by = ['Price'], ascending = False).convert_dtypes()
print(test_symbol_perf)

print(dia_valuation.head(5)) """

sector_holdings = openbb.etf.holdings('XLK') # drop NA

symbols = sector_holdings.index.to_list()

performance = openbb.stocks.ca.screener(similar=symbols,data_type='performance')
performance = performance.sort_values(by=['Perf Half'],ascending=False)
print(performance.head(5)) 

#print(sector_holdings)

""" test = openbb.etf.ln('XLK')
print(test) """

sectors = ['XLC','XLY','XLP','XLE','XLF','XLV','XLI','XLB','XLRE','XLK','XLU','SPY']

sector_performance = openbb.stocks.ca.screener(similar=sectors,data_type='performance')

sector_performance = sector_performance.sort_values(by=['Perf Half'],ascending=False)
print(sector_performance) 

#hotfix-test



