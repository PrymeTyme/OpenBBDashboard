<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

[![Stargazers][stars-shield]][stars-url]
[![Forks][forks-shield]][forks-url]
[![Contributors][contributors-shield]][contributors-url]
[![MIT License][license-shield]][license-url]

[![Issues][issues-shield]][issues-url]
[![Bugs Open][bugs-open-shield]][bugs-open-url]
[![Bugs Closed][bugs-closed-shield]][bugs-closed-url]

[![GitHub release](https://img.shields.io/github/release/OpenBB-finance/OpenBBTerminal.svg?maxAge=3600)](https://github.com/OpenBB-finance/OpenBBTerminal/releases)
[![Code style: black](https://img.shields.io/badge/code%20style-black-000000.svg)](https://github.com/psf/black)
[![TODOs](https://badgen.net/https/api.tickgit.com/badgen/github.com/OpenBB-finance/OpenBBTerminal/main)](https://www.tickgit.com/browse?repo=github.com/OpenBB-finance/OpenBBTerminal&branch=main)

![Discord Shield](https://discordapp.com/api/guilds/831165782750789672/widget.png?style=shield)
[![Twitter](https://img.shields.io/twitter/url/https/twitter.com/openbb_finance.svg?style=social&label=Follow%20%40openbb_finance)](https://twitter.com/openbb_finance)

<!-- PROJECT LOGO -->

|This is a project which utilizes the power of the open source project of OpenBB and its SDK. in this case ive build a tool
to quickly scan the S&P500 and its sectors via the select sector spiders and run a relative strength comparison to filter strong/weak sectors and stocks |
|:--:|
| [![openbb.jpg](/images/openbb_gradient.png)](https://openbb.co) |
| Check their website at [openbb.co](https://openbb.co) |

<br />

<p align="center">
  <h3 align="center">ETF Sector/Stocks Relative Strength Comparison Screener 🚀</h3>
  <h4 align="center"></h4>
  <p align="center"></p>

  <p align="center">
     <a >
        <img src="images/openbbTest.gif" alt="OpenBB Terminal Illustration" width="100%"/>
     </a>
  </p>

  <p align="center">
    <a href="https://docs.openbb.co/terminal/installation"><strong>≪  OpenBB Installation Guide</strong></a>
  </p>
</p>

<!-- TABLE OF CONTENTS -->
<details closed="closed">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li><a href="#1-installation">Installation of OpenBB</a></li>
    <li><a href="#2-contributing">Installation of ETF WebApp</a></li>
    <li><a href="#4-disclaimer">Disclaimer</a></li>
    <li><a href="#5-contacts">Contacts</a></li>
    <li><a href="#7-contributors">Contributors</a></li>
  </ol>
</details>

## 1. Installation of OpenBB

If you wish to install the OpenBB Terminal or the OpenBB SDK, please use one of the following options:

| **OpenBB Terminal**                                                       | **Usage**                                                               |
| :------------------------------------------------------------------------ | :---------------------------------------------------------------------- |
| [Windows Installer](https://docs.openbb.co/terminal/installation/windows) | Recommended way for Windows if you just want to use the OpenBB Terminal |
| [MacOS Installer](https://docs.openbb.co/terminal/installation/macos)     | Recommended way for MacOS if you just want to use the OpenBB Terminal   |
| [Source](https://docs.openbb.co/terminal/installation/source)             | If you wish to contribute to the development of the OpenBB Terminal     |
| [Docker](https://docs.openbb.co/terminal/installation/docker)             | An alternative way if you just want to use the OpenBB Terminal          |

| **OpenBB SDK** &nbsp; &nbsp; &nbsp; &nbsp;                    | **Usage**                                                           |
| :------------------------------------------------------------ | :------------------------------------------------------------------ |
| [PyPI](https://docs.openbb.co/terminal/installation/pypi)     | If you wish to use the OpenBB SDK in Python or Jupyter Notebooks    |
| [Source](https://docs.openbb.co/terminal/installation/source) | If you wish to contribute to the development of the OpenBB Terminal |
| nbsp;                                                         |

## 2. Installation of the ETF Screener Webapp

| **ETF screener webapp** &nbsp; &nbsp; &nbsp; &nbsp;                                                                      | **Usage**                                                                    |
| :----------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------- |
| [Clone This Repository](https://docs.github.com/de/repositories/creating-and-managing-repositories/cloning-a-repository) | Make a local clone of this repository                                        |
| Install Node dependencies                                                                                                | navigate to the /website directory and `npm install`                         |
| Install Server dependencies                                                                                              | navigate to the /website/server directory and `npm install`                  |
| Install Python dependencies\*\*                                                                                          | navigate to the Project directory and `pip install -r requirements-full.txt` |

| nbsp;  
\*\*this is optional!! only needed if you dont have the sdk from openBB |

### Running this Project locally

- locate the config.json file within the website/server folder and replace the PATHS accordingly to your environemnts and file paths
  for example wherever your openbb python env is located change: `"pythonPath": "PATH_TO_YOUR_PYTHON_ENVOIRNEMENT/obb/python.exe",`
  to `"pythonPath":"C:/ProgramData/Anaconda3/envs/obb/python.exe"`
- cd into website/ and run this command: ` npm-run-all -p start-server start` to run the webapp
  this will launch the webapp in production as it utilizes nodemon if you make any changes in the code the server will restart automatically
  if you want to ignore some files you need to locate the nodemon.json file within the server directory and at the file you wish to ignore in the list!
- you need to have your own [NEWS API KEY](https://docs.openbb.co/terminal/usage/guides/api-keys) if you have one best set them directly in the terminal

### NOTE THIS PROJECT IS A WORK IN PROGRESS AND THERFORE NOT STABLE!

There might be some bugs here and there , aswell as some features are still in planning some known issues:

- the NEWS_TOKEN_API key must be set by you either in the .env file or best via openbb terminal [NEWS API KEY GUIDE](https://docs.openbb.co/terminal/usage/guides/api-keys)
- as this project currently doesnt use any local storage nor a backend databse at the moment
  all data is lost if you close a session
- the loading time may take a while and there might be some retries if a api call made an error so be patient or refresh the page
- the results a single stored in json files , so each new api call overwrites the current json result so each api call and result
  will be made on the fly(will change if i integrate a database and call the apis from the server beforehand)
- sometimes the table wont collapse and you cant see the holdings of the etf just refresh the page

### Provide feedback

The team of openbb and iam most active on [our Discord](https://openbb.co/discord), feel free to reach out to us for feedback.

## 3. Disclaimer

Trading in financial instruments involves high risks including the risk of losing some, or all, of your investment
amount, and may not be suitable for all investors.

Before deciding to trade in a financial instrument you should be fully informed of the risks and costs associated with trading the financial markets, carefully consider your investment objectives, level of experience, and risk appetite, and seek professional advice where needed.

The data contained in the OpenBBTerminal is not necessarily accurate.

OpenBB and any provider of the data contained in this website will not accept liability for any loss or damage as a result of your trading, or your reliance on the information displayed.

All names, logos, and brands of third parties that may be referenced in our sites, products or documentation are trademarks of their respective owners. Unless otherwise specified, OpenBB and its products and services are not endorsed by, sponsored by, or affiliated with these third parties.
Our use of these names, logos, and brands is for identification purposes only, and does not imply any such endorsement, sponsorship, or affiliation.

## Contributors

OpenBB wouldn't be OpenBB without you. If we are going to disrupt financial industry, every contribution counts. Thank you for being part of this journey.

<a href="https://github.com/OpenBB-finance/OpenBBTerminal/graphs/contributors">
   <img src="https://contributors-img.web.app/image?repo=OpenBB-finance/OpenBBTerminal" width="800"/>
</a>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/OpenBB-finance/OpenBBTerminal.svg?style=for-the-badge
[contributors-url]: https://github.com/OpenBB-finance/OpenBBTerminal/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/OpenBB-finance/OpenBBTerminal.svg?style=for-the-badge
[forks-url]: https://github.com/OpenBB-finance/OpenBBTerminal/network/members
[stars-shield]: https://img.shields.io/github/stars/OpenBB-finance/OpenBBTerminal.svg?style=for-the-badge
[stars-url]: https://github.com/OpenBB-finance/OpenBBTerminal/stargazers
[issues-shield]: https://img.shields.io/github/issues/OpenBB-finance/OpenBBTerminal.svg?style=for-the-badge&color=blue
[issues-url]: https://github.com/OpenBB-finance/OpenBBTerminal/issues
[bugs-open-shield]: https://img.shields.io/github/issues/OpenBB-finance/OpenBBTerminal/bug.svg?style=for-the-badge&color=yellow
[bugs-open-url]: https://github.com/OpenBB-finance/OpenBBTerminal/issues?q=is%3Aissue+label%3Abug+is%3Aopen
[bugs-closed-shield]: https://img.shields.io/github/issues-closed/OpenBB-finance/OpenBBTerminal/bug.svg?style=for-the-badge&color=success
[bugs-closed-url]: https://github.com/OpenBB-finance/OpenBBTerminal/issues?q=is%3Aissue+label%3Abug+is%3Aclosed
[license-shield]: https://img.shields.io/github/license/OpenBB-finance/OpenBBTerminal.svg?style=for-the-badge
[license-url]: https://github.com/OpenBB-finance/OpenBBTerminal/blob/main/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/DidierRLopes
