from openbb_terminal.sdk import openbb
import pandas as pd

import json
import sys

""" symbols = openbb.etf.holdings('XLK')
dia_symbols = list(symbols.index.drop(['N/A']))
dia_valuation = openbb.stocks.ca.screener(similar = dia_symbols, data_type = 'performance') #valuation
dia_valuation = dia_valuation.sort_values(by = ['Price'], ascending = False).convert_dtypes()

test_symbol = openbb.stocks.ca.screener(similar=['XLC','XLY','XLP','XLE','XLF','XLV','XLI','XLB','XLRE','XLK','XLU','SPY'],data_type='performance')#how to get specifix sector etf data
test_symbol_perf = dia_valuation.sort_values(by = ['Price'], ascending = False).convert_dtypes()
print(test_symbol_perf)

print(dia_valuation.head(5)) """

""" sector_holdings = openbb.etf.holdings('XLK')  """# drop NA

""" symbols = sector_holdings.index.to_list() """
""" 
performance = openbb.stocks.ca.screener(similar=symbols,data_type='performance')
performance = performance.sort_values(by=['Perf Half'],ascending=False)
print(performance.head(5)) 
 """
#print(sector_holdings)

""" test = openbb.etf.ln('XLK')
print(test) """

def get_etf_sectors():
    sectors = ['XLC','XLY','XLP','XLE','XLF','XLV','XLI','XLB','XLRE','XLK','XLU','SPY']
   # sector_performance = openbb.stocks.ca.screener(similar=sectors,data_type='performance')
   # sector_performance = sector_performance.sort_values(by=['Perf Half'],ascending=False)
    sector_performance = openbb.stocks.ca.screener(similar=sectors,data_type='performance') #here i can extract the full name with the Company key.
    #print(sector_performance)
    json_data = sector_performance.to_json(indent=4)
    #json_data["Ticker"] = json_data.pop("Ticker\n\n")
    #json_object_result = json.dumps(json_data,indent=4)

    with open(sys.argv[2],"w") as outfile:
        outfile.write(json_data)

    print('OK') 

#hotfix-test

def get_etf_holdings_test():
    
    sector_holdings = openbb.etf.holdings('XLK') # drop NA
    sector_holdings.reset_index(inplace=True)
    json_data = sector_holdings.to_json(indent=4)
    #print(sector_holdings)

    #symbols = sector_holdings.index.to_list()

    with open(sys.argv[2],"w") as outfile:
        outfile.write(json_data)

    print('OK') 

def get_etf_holdings(ticker):
   
    sector_holdings = openbb.etf.holdings(ticker) 
    sector_holdings.reset_index(inplace=True)
    json_data = sector_holdings.to_json()
    ticker_list = json.loads(json_data)
    ticker_list_final = list(ticker_list['Symbol'].values())
    

    for i in ticker_list_final:
        if i == "N/A":
            ticker_list_final.remove(i)

    stock_performance = openbb.stocks.ca.screener(similar=ticker_list_final,data_type='performance')
    json_data_performance = stock_performance.to_json(indent=4)

    with open(sys.argv[2],"w") as outfile:
        outfile.write(json_data_performance)

    print('OK') 

def get_news(ticker):
    news = openbb.etf.news(ticker,10)
    json_list = []
    for i in news:
        json_object =json.dumps(i[1],indent=4)
        data =json.loads(json_object)
        json_list.append(data)
    final = json.dumps(json_list,indent=4)

    with open(sys.argv[2],"w") as outfile:
        outfile.write(final)

    print('OK')




def ticker_overview(ticker):
    try:
        ta_sum = openbb.stocks.ta.summary(ticker)
    except Exception:
        ta_sum = ""

    if not ta_sum:
        ta_sum = "Sorry, no technical analysis summary available for "+str(ticker)+ " at the moment!"

    overview = openbb.etf.overview(ticker)
    overview.loc["TA Summary"] = ta_sum

    json_overview = overview.to_json(indent=2)

    with open(sys.argv[2], "w") as outfile:
        outfile.write(json_overview)

    print('OK')


if sys.argv[1] == 'get_etf_sectors':
    get_etf_sectors()
if sys.argv[1] == 'get_etf_holdings':
    get_etf_holdings(sys.argv[3]) 
if sys.argv[1] == 'get_news':
    get_news(sys.argv[3])
if sys.argv[1] == 'get_overview':
    ticker_overview(sys.argv[3])           
sys.stdout.flush()    



