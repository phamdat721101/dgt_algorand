At the moment, DigiTrust integrates with the following DEXs:

- [Tinyman](https://tinyman.org/)

## Development Setup

This repo requires Python 3.7 or higher. We recommend you use a Python virtual environment to install the required dependencies.

Set up venv (one time):

- `python3 -m venv venv`

Active venv:

- `. venv/bin/activate` (if your shell is bash/zsh)
- `. venv/bin/activate.fish` (if your shell is fish)

Install dependencies:

- `pip install -r requirements.txt`

The `tinyman-py-sdk` package is also needed but it is not yet released on PYPI. It can be installed directly from the tinyman-py-sdk repository with pip:

`pip install git+https://github.com/tinymanorg/tinyman-py-sdk.git`

## Off-chain DB

This bot is implemented to make use of an off-chain MariaDB database that currently contains two tables:

- The `assets` table holds token identification details of the Algorand native token and Algorand Standard Assets (ASAs) that can be traded with the bot.
- The `trades` table is where the bot looks for trade requests you want performed on behalf of your Algorand wallet.

Schema definitions for these tables can be found in the file [db/schema.sql](./db/schema.sql).

The file [db/init.sql](./db/init.sql) contains SQL statements to initialize the `assets` table with the details of the tokens supported so far by this bot. Details for the tokens on both Algorand's testnet and mainnet are included. Support for additional tokens can easily be integrated of course by adding their details to this table. However there MUST be liquidity pools available for any token pairs that you want to set up trades for on the DEXs that this bot integrates with.