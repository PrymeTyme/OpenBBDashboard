const path = require("path");
const express = require("express");
const cors = require("cors")
const bodyParser = require("body-parser");
const {spawn, spawnSync} = require('child_process');
const fs = require("fs");
const { readFile } = require('fs/promises');

const config = JSON.parse(fs.readFileSync('config.json'))


const pythonPath = config.pythonPath;
const etfGatewayPath = config.etfGatewayPath;
const etfResultFile = config.etfResultFile;
const etfHoldingsResultFile = config.etfHoldingsResultFile
const newsResultFile = config.newsResultFile
const overviewResultFile = config.overviewResultFile

const app = express();
const port = 5000

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



//middle ware


app.use(express.static(path.join(__dirname, "..", "dist")));
app.use(express.static("public"));



   app.get('/',(req,res)=>{
    res.sendFile(`${__dirname}/public/index.html`);
  } )  

 app.get('/test',(req,res)=>{
  console.log('API request......')
  res.json({ test:'TEST'})
 })
 let ticker = ""

 app.post('/setTicker',(req,res)=>{
  const body = req.body
  ticker = body.ticker
  console.log(ticker)
 })

 app.get('/etf-sectors', async (req, res, next) => {
  
  const args = [
    etfGatewayPath,
    'get_etf_sectors',
    etfResultFile
  ];
  

  const python = spawn(pythonPath, args);

  let result = '';
  let error = '';

  python.stdout.on('data', (data) => {
    console.log('Pipe data from python script "ETF-Sectors"..');
    try {
      result = data.toString().trim();
      console.log(result);
      result = result.split("\n"[0]);
      result = result[1].trim();
      console.log(result);
    } catch (err) {
      console.error('Error occurred while handling data from Python script "ETF-Sectors":', err);
      error = 'Error occurred while handling data from Python script "ETF-Sectors"';
    }
  });

  python.stderr.on('data', (data) => {
    error = data.toString().trim();
  });

  python.on('close', async (code) => {
    console.log(`child process close all stdio with code ${code}`);
    const status = result === 'OK';
    if (status) {
      console.log('Reached OK status');
      try {
        const buffer = await readFile(etfResultFile, 'utf8');
        const resultParsed = JSON.parse(buffer?.toString());
        res.send(resultParsed);
      } catch (err) {
        console.error('Error occurred while reading result file "etf_sector_results":', err);
        res.status(500).send('Server error');
      }
    } else {
      console.log(error + 'from etf_sectors_results');
      res.status(500).send('Server error');
    }
  });
});

app.get('/etf-holdings', async (req, res, next) => {
 
  const args = [
    etfGatewayPath,
    'get_etf_holdings',
    etfHoldingsResultFile,
    ticker.toString()
  ];
  

  const python = spawn(pythonPath, args);

  let result = '';
  let error = '';

  python.stdout.on('data', (data) => {
    console.log('Pipe data from python script "ETF Holdings"..');
    try {
      result = data.toString().trim();
      result = result.split("\n"[0]);
      result = result[1].trim();
      console.log(result);
    } catch (err) {
      console.error('Error occurred while handling data from Python script "ETF Holdings":', err);
      error = 'Error occurred while handling data from Python script "ETF Holdings"';
    }
  });

  python.stderr.on('data', (data) => {
    error = data.toString().trim();
  });

  python.on('close', async (code) => {
    console.log(`child process close all stdio with code ${code}`);
    const status = result === 'OK';
    if (status) {
      console.log('Reached OK status');
      try {
        const buffer = await readFile(etfHoldingsResultFile, 'utf8');
        const resultParsed = JSON.parse(buffer?.toString());
        res.send(resultParsed);
      } catch (err) {
        console.error('Error occurred while reading result file "etf_holdings_results":', err);
        res.status(500).send('Server error');
      }
    } else {
      console.log(error + 'from etf_holdings_results');
      res.status(500).send('Server error');
    }
  });
});

app.get('/news', async (req, res, next) => {
  const newsTicker = (ticker === "SPY") ? "SP500" : ticker;
 
  const args = [
    etfGatewayPath,
    'get_news',
    newsResultFile,
    newsTicker.toString()
  ];


  const python = spawn(pythonPath, args);

  let result = '';
  let error = '';

  python.stdout.on('data', (data) => {
    console.log('Pipe data from python script.. "News"');
    try {
      result = data.toString().trim();
      console.log(result);
    } catch (err) {
      console.error('Error occurred while handling data from Python script "News":', err);
      error = 'Error occurred while handling data from Python script "News"';
    }
  });

  python.stderr.on('data', (data) => {
    error = data.toString().trim();
  });

  python.on('close', async (code) => {
    console.log(`child process close all stdio with code ${code}`);
    const status = result === 'OK';
    if (status) {
      console.log('Reached OK status');
      try {
        const buffer = await readFile(newsResultFile, 'utf8');
        const resultParsed = JSON.parse(buffer?.toString());
        res.send(resultParsed);
      } catch (err) {
        console.error('Error occurred while reading result file "news_result":', err);
        res.status(500).send('Server error');
      }
    } else {
      console.log(error + 'from news_result');
      res.status(500).send('Server error');
    }
  });
});


app.get('/overview', async (req, res, next) => {

  const args = [
    etfGatewayPath,
    'get_overview',
    overviewResultFile,
    ticker.toString()
  ];
  

  const python = spawn(pythonPath, args);

  let result = '';
  let error = '';

  python.stdout.on('data', (data) => {
    console.log('Pipe data from python script.."Overview"');
    try {
      result += data.toString();
    } catch (err) {
      console.error('Error occurred while handling data from Python script "Overview":', err);
      error = 'Error occurred while handling data from Python script "Overview"';
    }
  });

  python.stderr.on('data', (data) => {
    error = data.toString().trim();
  });

  python.on('close', async (code) => {
    console.log(`child process close all stdio with code ${code}`);
    const status = result.includes('OK');
    if (status) {
      console.log('Reached OK status');
      try {
        const buffer = await readFile(overviewResultFile, 'utf8');
        const resultParsed = JSON.parse(buffer?.toString());
        res.send(resultParsed);
      } catch (err) {
        console.error('Error occurred while reading result file overview:', err);
        res.status(500).send('Server error');
      }
    } else {
      console.log(error + ' from overview');
      res.status(500).send('Server error');
    }
  });
});




app.listen(port, () => {
    console.log(`APP /server startet > listening to http://localhost:${port}`)
})