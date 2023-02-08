from pyteal import *

def register():
    # Get the current ID counter
    ID = App.globalGet(Bytes("id"))
    # Get the tx sender
    sender = Txn.sender()

    # Assign the ID with the address
    App.globalPut(Itob(ID), sender)
    # Assign the address with the ID
    App.globalPut(sender, Itob(ID))

    # Increments the ID by one
    App.globalPut(Bytes("id"), Add(ID, 1))

    return ID


def getAddr(ID):
    return App.globalGet(ID)


def getId(address):
    return App.globalGet(address)
