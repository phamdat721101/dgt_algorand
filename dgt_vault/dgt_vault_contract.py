# pyright: reportMissingModuleSource=false
from algopy import (
    Asset,
    Global,
    Txn,
    UInt64,
    arc4,
    gtxn,
    itxn,
)


class DgtVault(arc4.ARC4Contract):
    asset_id: UInt64
    unitary_price: UInt64

    @arc4.abimethod(allow_actions=["NoOp"], create="require")
    def create_application(self, asset_id: Asset, unitary_price: UInt64) -> None:
        """
        Creates an application with the given asset ID and unitary price.

        Args:
            asset_id (Asset): The ID of the asset for the application.
            unitary_price (UInt64): The unitary price of the application.

        Returns:
            None
        """
        self.asset_id = asset_id.id
        self.unitary_price = unitary_price

    @arc4.abimethod
    def set_price(self, unitary_price: UInt64) -> None:
        """
        Sets the unitary price for an item.

        Args:
            unitary_price (UInt64): The new unitary price for the item.

        Returns:
            None
        """
        assert Txn.sender == Global.creator_address

        self.unitary_price = unitary_price

    @arc4.abimethod
    def opt_in_to_asset(self, mbr_pay: gtxn.PaymentTransaction) -> None:
        """
        Opt in to an asset.

        Args:
            mbr_pay (gtxn.PaymentTransaction): The payment transaction.

        Raises:
            AssertionError: If the sender is not the creator address.
            AssertionError: If the current application address is already opted in to the asset.
            AssertionError: If the receiver of the payment transaction is not the current application address.
            AssertionError: If the amount of the payment transaction is not equal to the minimum balance plus the asset
            opt-in minimum balance.

        Returns:
            None
        """
        assert Txn.sender == Global.creator_address
        assert not Global.current_application_address.is_opted_in(Asset(self.asset_id))

        assert mbr_pay.receiver == Global.current_application_address
        assert mbr_pay.amount == Global.min_balance + Global.asset_opt_in_min_balance

        itxn.AssetTransfer(
            xfer_asset=self.asset_id,
            asset_receiver=Global.current_application_address,
            asset_amount=0,
        ).submit()

    @arc4.abimethod
    def buy(
        self,
        buyer_txn: gtxn.PaymentTransaction,
        quantity: UInt64,
    ) -> None:
        """
        Buys a certain quantity of an asset.

        Args:
            buyer_txn (gtxn.PaymentTransaction): The payment transaction of the buyer.
            quantity (UInt64): The quantity of the asset to be bought.

        Raises:
            AssertionError: If the unitary price is zero.
            AssertionError: If the sender of the buyer transaction is not the same as the sender of the
              current transaction.
            AssertionError: If the receiver of the buyer transaction is not the same as the current application address.
            AssertionError: If the amount of the buyer transaction is not equal to the unitary price
            multiplied by the quantity.

        Returns:
            None
        """
        assert self.unitary_price != UInt64(0)

        decoded_quantity = quantity
        assert buyer_txn.sender == Txn.sender
        assert buyer_txn.receiver == Global.current_application_address
        assert buyer_txn.amount == self.unitary_price * decoded_quantity

        itxn.AssetTransfer(
            xfer_asset=self.asset_id,
            asset_receiver=Txn.sender,
            asset_amount=decoded_quantity,
        ).submit()

    @arc4.abimethod(allow_actions=["DeleteApplication"])
    def delete_application(self) -> None:
        """
        Deletes the application by transferring the asset and making a payment to the creator address.

        Raises:
            AssertionError: If the sender of the transaction is not the creator address.

        Returns:
            None
        """
        assert Txn.sender == Global.creator_address

        itxn.AssetTransfer(
            xfer_asset=self.asset_id,
            asset_receiver=Global.creator_address,
            asset_amount=0,
            asset_close_to=Global.creator_address,
        ).submit()

        itxn.Payment(
            receiver=Global.creator_address,
            amount=0,
            close_remainder_to=Global.creator_address,
        ).submit()