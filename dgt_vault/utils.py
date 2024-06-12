import os
import mariadb
from dataclasses import dataclass
from dotenv import load_dotenv

load_dotenv()


@dataclass
class Account:
    """Class for retrieving and temporarily storing the account that the trades will be carried out on."""
    user_address: str
    private_key: str
    account_info: str


@dataclass
class AssetDetail:
    """Simple class to store details of an Algorand asset we want to swap."""
    token_code: str
    token_asset_id: int
    num_decimal_places: int


def get_db_connection():
    print(os.getenv("db_host"))
    try:
        conn = mariadb.connect(
            user=os.getenv("db_user"),
            password=os.getenv("db_pass"),
            host=os.getenv("db_host"),
            port=int(os.getenv("db_port")),
            database=os.getenv("db_name"),
            autocommit=True,
            ssl=False
        )
    except mariadb.Error as e:
        print(f"Error connecting to off-chain DB: {e}")
        return None

    return conn


def get_supported_algo_assets(network: str, cursor) -> dict:
    """Returns a dictionary with details of the Algorand assets that this bot allows to be traded."""
    assets = {}
    try:
        cursor.execute(
            "SELECT id, token_code, token_asset_id FROM assets WHERE token_network=? AND is_native=1 ORDER BY id ASC", (network,))
    except mariadb.Error as e:
        print(f"Error attempting to query for supported assets: {e}")
        return None

    for (id, token_code, token_asset_id) in cursor:
        assets[id] = AssetDetail(
            token_code, token_asset_id, 18)

    return assets
